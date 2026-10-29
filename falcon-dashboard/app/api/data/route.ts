import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const GRAPH = 'https://graph.facebook.com/v22.0';

type Campaign = {
  id: string;
  name: string;
  status: string;
  objective?: string;
  daily_budget?: string;
};

type DailyRow = { campaign_id: string; date: string; spend: number; leads: number };

type CreativeRow = {
  campaign_id: string;
  campaign_name: string;
  campaign_status: string;
  unit: string;
  kind: string;
  format: string;
  ad_id: string;
  ad_name: string;
  ad_status: string;
  headline: string;
  thumb: string | null;
  full_img: string | null;
  video_embed_url: string | null;
};

let cache: { at: number; payload: any } | null = null;
const CACHE_MS = 90_000;

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

  const campaignsResp = await graphGet(`/${account}/campaigns`, {
    fields: 'id,name,status,objective,daily_budget',
    filtering: JSON.stringify([{ field: 'effective_status', operator: 'IN', value: ['ACTIVE'] }]),
    limit: '200',
  });
  const campaigns: Campaign[] = campaignsResp.data || [];

  const today = todayISO();
  const since = addDaysISO(today, -34);

  const daily: DailyRow[] = [];
  const creatives: CreativeRow[] = [];
  const videoIdsToResolve = new Map<string, { campaign_id: string; ad_id: string }>();
  const adRowsByCampaign = new Map<string, any[]>();

  await Promise.all(
    campaigns.map(async (c) => {
      const [insightsResp, adsResp] = await Promise.all([
        graphGet(`/${c.id}/insights`, {
          time_increment: '1',
          time_range: JSON.stringify({ since, until: today }),
          fields: 'spend,actions,date_start',
          limit: '40',
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
        });
      }

      adRowsByCampaign.set(c.id, adsResp.data || []);
      for (const ad of adsResp.data || []) {
        const cr = ad.creative || {};
        const videoId = cr.video_id || cr.object_story_spec?.video_data?.video_id;
        if (videoId) videoIdsToResolve.set(videoId, { campaign_id: c.id, ad_id: ad.id });
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

  for (const c of campaigns) {
    const { unit, kind, format } = classify(c.name);
    const ads = adRowsByCampaign.get(c.id) || [];
    for (const ad of ads) {
      const cr = ad.creative || {};
      const spec = cr.object_story_spec || {};
      let headline = '';
      if (spec.link_data) headline = spec.link_data.name || '';
      else if (spec.video_data) headline = spec.video_data.title || '';
      const videoId = cr.video_id || spec.video_data?.video_id;
      const permalink = videoId ? videoPermalinks.get(videoId) : null;
      const embedUrl = permalink
        ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(permalink)}&show_text=false&width=560`
        : null;

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
      });
    }
  }

  const campaignRows = campaigns.map((c) => {
    const { unit, kind, format } = classify(c.name);
    return {
      id: c.id,
      name: c.name,
      status: c.status,
      unit,
      kind,
      format,
      daily_budget: Math.round(parseInt(c.daily_budget || '0', 10)) / 100,
    };
  });

  return {
    generated_at: new Date().toISOString(),
    today,
    campaigns: campaignRows,
    daily,
    creatives,
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
