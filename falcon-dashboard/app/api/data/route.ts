import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const GRAPH = 'https://graph.facebook.com/v22.0';

let cache: { at: number; payload: any } | null = null;
const CACHE_MS = 180_000;

function classify(name: string) {
  const n = name.toUpperCase();
  let unit = 'Outro';
  if (n.includes('MEIER') || n.includes('MÉIER')) unit = 'Méier';
  else if (n.includes('TAQUARA')) unit = 'Taquara';

  let kind = 'Outro';
  if (n.includes('ALCANCE')) kind = 'Alcance';
  else if (n.includes('BOLS')) kind = 'Bolsão';
  else if (n.includes('KIDS') || n.includes('CONVIV')) kind = 'Kids';
  else if (n.includes('CONCURSO') || n.includes('MILITAR')) kind = 'Concurso';
  else if (n.includes('RODRIGO')) kind = 'Institucional';

  let format = 'Imagem';
  if (n.includes('VIDEO') || n.includes('VÍDEO')) format = 'Vídeo';
  else if (n.includes('WPP')) format = 'WhatsApp';

  return { unit, kind, format };
}

function leadsFromActions(actions: any[] | undefined): number {
  if (!actions) return 0;
  for (const a of actions) {
    if (a.action_type === 'lead' || a.action_type === 'onsite_conversion.lead_grouped') {
      return Math.round(parseFloat(a.value));
    }
  }
  return 0;
}

function sumActionTypes(actions: any[] | undefined, types: string[]): number {
  if (!actions) return 0;
  let total = 0;
  for (const a of actions) {
    if (types.includes(a.action_type)) total += parseFloat(a.value) || 0;
  }
  return Math.round(total);
}

function audienceType(targeting: any): string {
  if (!targeting) return 'Amplo';
  const customs = [...(targeting.custom_audiences || []), ...(targeting.excluded_custom_audiences || [])];
  const hasLookalike = customs.some((c: any) => (c.name || '').toUpperCase().includes('LOOKALIKE') || (c.name || '').toUpperCase().includes('LAL') || c.subtype === 'LOOKALIKE');
  if (hasLookalike) return 'Lookalike';
  if ((targeting.custom_audiences || []).length > 0) return 'Remarketing';
  if (targeting.flexible_spec && targeting.flexible_spec.some((f: any) => f.interests)) return 'Interesse';
  return 'Amplo';
}

async function graphGet(path: string, params: Record<string, string>) {
  const token = process.env.META_ACCESS_TOKEN;
  const url = new URL(`${GRAPH}${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  url.searchParams.set('access_token', token || '');
  const res = await fetch(url.toString(), { cache: 'no-store' });
  const json = await res.json();
  if (json.error) {
    throw new Error(`Graph API error on ${path}: ${json.error.message}`);
  }
  return json;
}

function todayISO() {
  const d = new Date();
  const tz = new Date(d.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${tz.getFullYear()}-${pad(tz.getMonth() + 1)}-${pad(tz.getDate())}`;
}

function addDaysISO(iso: string, delta: number) {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + delta);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

async function fetchAll() {
  const account = process.env.META_AD_ACCOUNT_ID;
  if (!account || !process.env.META_ACCESS_TOKEN) {
    throw new Error('Variáveis META_ACCESS_TOKEN / META_AD_ACCOUNT_ID não configuradas.');
  }

  const statusFilter = JSON.stringify([{ field: 'effective_status', operator: 'IN', value: ['ACTIVE', 'PAUSED'] }]);

  const today = todayISO();
  const since64 = addDaysISO(today, -64);
  const since30 = addDaysISO(today, -29);
  const since60 = addDaysISO(today, -59);

  const [campaignsResp, adsetsResp] = await Promise.all([
    graphGet(`/${account}/campaigns`, {
      fields: 'id,name,status,effective_status,objective,daily_budget,created_time',
      filtering: statusFilter,
      limit: '200',
    }),
    graphGet(`/${account}/adsets`, {
      fields: 'id,campaign_id,name,status,effective_status,daily_budget,optimization_goal,destination_type,billing_event,created_time,targeting',
      filtering: statusFilter,
      limit: '200',
    }),
  ]);

  const campaignsRaw: any[] = campaignsResp.data || [];
  const adsetsRaw: any[] = adsetsResp.data || [];

  const daily: any[] = [];
  const creatives: any[] = [];
  const videoIdsToResolve = new Map<string, { campaign_id: string; ad_id: string }>();
  const videoAdIds = new Set<string>();
  const adRowsByCampaign = new Map<string, any[]>();

  await Promise.all(
    campaignsRaw.map(async (c) => {
      const [insightsResp, adsResp] = await Promise.all([
        graphGet(`/${c.id}/insights`, {
          time_increment: '1',
          time_range: JSON.stringify({ since: since64, until: today }),
          fields: 'spend,actions,date_start,impressions,clicks',
          limit: '70',
        }).catch(() => ({ data: [] })),
        graphGet(`/${c.id}/ads`, {
          fields: 'id,name,status,creative.fields(id,object_story_spec,image_url,thumbnail_url,video_id)',
          limit: '100',
        }).catch(() => ({ data: [] })),
      ]);

      for (const row of insightsResp.data || []) {
        daily.push({
          campaign_id: c.id,
          date: row.date_start,
          spend: Math.round(parseFloat(row.spend || '0') * 100) / 100,
          leads: leadsFromActions(row.actions),
          impressions: parseInt(row.impressions || '0', 10),
          clicks: parseInt(row.clicks || '0', 10),
        });
      }

      adRowsByCampaign.set(c.id, adsResp.data || []);
      for (const ad of adsResp.data || []) {
        const cr = ad.creative || {};
        const videoId = cr.video_id || cr.object_story_spec?.video_data?.video_id;
        if (videoId) {
          videoIdsToResolve.set(videoId, { campaign_id: c.id, ad_id: ad.id });
          videoAdIds.add(ad.id);
        }
      }
    })
  );

  const videoPermalinks = new Map<string, string>();
  await Promise.all(
    Array.from(videoIdsToResolve.keys()).map(async (vid) => {
      try {
        const v = await graphGet(`/${vid}`, { fields: 'permalink_url' });
        if (v.permalink_url) videoPermalinks.set(vid, 'https://www.facebook.com' + v.permalink_url);
      } catch {
        /* ignore */
      }
    })
  );

  const adPreviewUrls = new Map<string, string>();
  await Promise.all(
    Array.from(videoAdIds).map(async (adId) => {
      try {
        const p = await graphGet(`/${adId}/previews`, { ad_format: 'MOBILE_FEED_STANDARD' });
        const body: string | undefined = p.data?.[0]?.body;
        const match = body?.match(/src="([^"]+)"/);
        if (match) adPreviewUrls.set(adId, match[1].replace(/&amp;/g, '&'));
      } catch {
        /* ignore */
      }
    })
  );

  for (const c of campaignsRaw) {
    const { unit, kind, format } = classify(c.name);
    const ads = adRowsByCampaign.get(c.id) || [];
    for (const ad of ads) {
      const cr = ad.creative || {};
      const spec = cr.object_story_spec || {};
      let headline = '';
      if (spec.link_data) headline = spec.link_data.name || '';
      else if (spec.video_data) headline = spec.video_data.title || '';
      const videoId = cr.video_id || spec.video_data?.video_id;
      const permalink = videoId ? videoPermalinks.get(videoId) || null : null;
      const embedUrl = adPreviewUrls.get(ad.id) || null;

      creatives.push({
        campaign_id: c.id,
        campaign_name: c.name,
        campaign_status: c.status,
        unit,
        kind,
        format,
        ad_id: ad.id,
        ad_name: ad.name,
        ad_status: ad.status,
        headline,
        thumb: cr.image_url || cr.thumbnail_url || null,
        full_img: cr.image_url || cr.thumbnail_url || null,
        video_embed_url: embedUrl,
        video_permalink: permalink,
      });
    }
  }

  const campaignRows = campaignsRaw.map((c) => {
    const { unit, kind, format } = classify(c.name);
    return {
      id: c.id,
      name: c.name,
      status: c.status,
      effective_status: c.effective_status,
      objective: c.objective || '',
      unit,
      kind,
      format,
      daily_budget: Math.round(parseInt(c.daily_budget || '0', 10)) / 100,
      created_time: c.created_time || '',
    };
  });

  const adsetRows = adsetsRaw.map((a) => {
    const t = a.targeting || {};
    const genders = !t.genders || t.genders.length === 0 ? 'Todos' : t.genders.includes(1) && t.genders.includes(2) ? 'Todos' : t.genders.includes(1) ? 'Masculino' : 'Feminino';
    return {
      id: a.id,
      campaign_id: a.campaign_id,
      name: a.name,
      status: a.status,
      effective_status: a.effective_status,
      daily_budget: Math.round(parseInt(a.daily_budget || '0', 10)) / 100,
      optimization_goal: a.optimization_goal || '',
      destination_type: a.destination_type || '',
      billing_event: a.billing_event || '',
      created_time: a.created_time || '',
      audience_type: audienceType(t),
      age_min: t.age_min ?? null,
      age_max: t.age_max ?? null,
      genders,
    };
  });

  // ---- account-wide aggregate calls (one request each, regardless of account size) ----
  const [adsetAggResp, adAggResp, adWeeklyResp, demoResp, placementResp, deviceResp, regionResp, activitiesResp] = await Promise.all([
    graphGet(`/${account}/insights`, {
      level: 'adset',
      fields: 'adset_id,campaign_id,spend,impressions,clicks,ctr,frequency,actions',
      time_range: JSON.stringify({ since: since30, until: today }),
      limit: '500',
    }).catch(() => ({ data: [] })),
    graphGet(`/${account}/insights`, {
      level: 'ad',
      fields: 'ad_id,adset_id,campaign_id,spend,impressions,clicks,ctr,frequency,actions',
      time_range: JSON.stringify({ since: since30, until: today }),
      limit: '500',
    }).catch(() => ({ data: [] })),
    graphGet(`/${account}/insights`, {
      level: 'ad',
      time_increment: '7',
      fields: 'ad_id,spend,impressions,clicks,ctr,frequency,actions',
      time_range: JSON.stringify({ since: since60, until: today }),
      limit: '500',
    }).catch(() => ({ data: [] })),
    graphGet(`/${account}/insights`, {
      level: 'campaign',
      breakdowns: 'age,gender',
      fields: 'campaign_id,spend,actions,impressions,clicks',
      time_range: JSON.stringify({ since: since30, until: today }),
      limit: '500',
    }).catch(() => ({ data: [] })),
    graphGet(`/${account}/insights`, {
      level: 'campaign',
      breakdowns: 'publisher_platform,platform_position',
      fields: 'campaign_id,spend,actions,impressions,clicks',
      time_range: JSON.stringify({ since: since30, until: today }),
      limit: '500',
    }).catch(() => ({ data: [] })),
    graphGet(`/${account}/insights`, {
      level: 'campaign',
      breakdowns: 'impression_device',
      fields: 'campaign_id,spend,actions,impressions,clicks',
      time_range: JSON.stringify({ since: since30, until: today }),
      limit: '500',
    }).catch(() => ({ data: [] })),
    graphGet(`/${account}/insights`, {
      level: 'campaign',
      breakdowns: 'region',
      fields: 'campaign_id,spend,actions,impressions,clicks',
      time_range: JSON.stringify({ since: since30, until: today }),
      limit: '500',
    }).catch(() => ({ data: [] })),
    graphGet(`/${account}/activities`, {
      fields: 'event_type,event_time,translated_event_type,extra_data,actor_name,object_name',
      limit: '100',
    }).catch(() => ({ data: [] })),
  ]);

  const adsetInsights = (adsetAggResp.data || []).map((r: any) => ({
    adset_id: r.adset_id,
    campaign_id: r.campaign_id,
    spend: Math.round(parseFloat(r.spend || '0') * 100) / 100,
    impressions: parseInt(r.impressions || '0', 10),
    clicks: parseInt(r.clicks || '0', 10),
    ctr: parseFloat(r.ctr || '0'),
    frequency: parseFloat(r.frequency || '0'),
    leads: leadsFromActions(r.actions),
  }));

  const adInsights = (adAggResp.data || []).map((r: any) => ({
    ad_id: r.ad_id,
    adset_id: r.adset_id,
    campaign_id: r.campaign_id,
    spend: Math.round(parseFloat(r.spend || '0') * 100) / 100,
    impressions: parseInt(r.impressions || '0', 10),
    clicks: parseInt(r.clicks || '0', 10),
    ctr: parseFloat(r.ctr || '0'),
    frequency: parseFloat(r.frequency || '0'),
    leads: leadsFromActions(r.actions),
  }));

  const adWeekly = (adWeeklyResp.data || []).map((r: any) => ({
    ad_id: r.ad_id,
    week_start: r.date_start,
    spend: Math.round(parseFloat(r.spend || '0') * 100) / 100,
    impressions: parseInt(r.impressions || '0', 10),
    clicks: parseInt(r.clicks || '0', 10),
    ctr: parseFloat(r.ctr || '0'),
    frequency: parseFloat(r.frequency || '0'),
    leads: leadsFromActions(r.actions),
  }));

  const toBreakdownRow = (r: any, extraKeys: string[]) => {
    const row: any = {
      campaign_id: r.campaign_id,
      spend: Math.round(parseFloat(r.spend || '0') * 100) / 100,
      impressions: parseInt(r.impressions || '0', 10),
      clicks: parseInt(r.clicks || '0', 10),
      leads: leadsFromActions(r.actions),
    };
    for (const k of extraKeys) row[k] = r[k] ?? null;
    return row;
  };

  const demographics = (demoResp.data || []).map((r: any) => toBreakdownRow(r, ['age', 'gender']));
  const placements = (placementResp.data || []).map((r: any) => toBreakdownRow(r, ['publisher_platform', 'platform_position']));
  const devices = (deviceResp.data || []).map((r: any) => toBreakdownRow(r, ['impression_device']));
  const regions = (regionResp.data || []).map((r: any) => toBreakdownRow(r, ['region']));

  const activities = (activitiesResp.data || []).map((r: any) => ({
    event_type: r.event_type || '',
    event_time: r.event_time || '',
    translated_event_type: r.translated_event_type || r.event_type || '',
    extra_data: r.extra_data || '',
    actor_name: r.actor_name || '',
    object_name: r.object_name || '',
  }));

  return {
    generated_at: new Date().toISOString(),
    today,
    campaigns: campaignRows,
    adsets: adsetRows,
    adsetInsights,
    daily,
    adInsights,
    adWeekly,
    creatives,
    demographics,
    placements,
    devices,
    regions,
    activities,
  };
}

export async function GET() {
  try {
    if (cache && Date.now() - cache.at < CACHE_MS) {
      return NextResponse.json(cache.payload, { headers: { 'x-cache': 'hit' } });
    }
    const payload = await fetchAll();
    cache = { at: Date.now(), payload };
    return NextResponse.json(payload, { headers: { 'x-cache': 'miss' } });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Erro desconhecido' }, { status: 500 });
  }
}
