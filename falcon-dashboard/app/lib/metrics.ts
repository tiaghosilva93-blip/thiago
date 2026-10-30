import { ApiData, Campaign, AdSet, Settings } from './types';
import { addDays, periodRange, Period } from './format';

export function round2(v: number) {
  return Math.round(v * 100) / 100;
}

export function cplOf(spend: number, leads: number): number | null {
  return leads ? round2(spend / leads) : null;
}

export function ctrOf(clicks: number, impressions: number): number | null {
  return impressions ? round2((clicks / impressions) * 100) : null;
}

export function convRateOf(leads: number, clicks: number): number | null {
  return clicks ? round2((leads / clicks) * 100) : null;
}

// ---- aggregation of daily rows over a date range, for a set of campaign ids ----
export function sumDaily(daily: ApiData['daily'], ids: Set<string>, start: string, end: string) {
  let spend = 0, leads = 0, impressions = 0, clicks = 0;
  for (const r of daily) {
    if (r.date < start || r.date > end) continue;
    if (!ids.has(r.campaign_id)) continue;
    spend += r.spend; leads += r.leads; impressions += r.impressions; clicks += r.clicks;
  }
  spend = round2(spend);
  return { spend, leads, impressions, clicks, cpl: cplOf(spend, leads), ctr: ctrOf(clicks, impressions) };
}

export function perCampaignInRange(daily: ApiData['daily'], start: string, end: string) {
  const map = new Map<string, { spend: number; leads: number; impressions: number; clicks: number }>();
  for (const r of daily) {
    if (r.date < start || r.date > end) continue;
    const cur = map.get(r.campaign_id) || { spend: 0, leads: 0, impressions: 0, clicks: 0 };
    cur.spend += r.spend; cur.leads += r.leads; cur.impressions += r.impressions; cur.clicks += r.clicks;
    map.set(r.campaign_id, cur);
  }
  return map;
}

export type CampaignMetric = Campaign & {
  spend: number; leads: number; impressions: number; clicks: number;
  cpl: number | null; ctr: number | null; convRate: number | null;
  frequency: number | null;
  adsets: AdSet[];
};

export function campaignMetricsForPeriod(data: ApiData, campaigns: Campaign[], period: Period): CampaignMetric[] {
  const [start, end] = periodRange(period, data.today);
  const byCampaign = perCampaignInRange(data.daily, start, end);
  const adsetsByCampaign = new Map<string, AdSet[]>();
  for (const a of data.adsets) {
    const arr = adsetsByCampaign.get(a.campaign_id) || [];
    arr.push(a);
    adsetsByCampaign.set(a.campaign_id, arr);
  }
  // frequency per campaign: derive from adInsights (last 30d window) summed impressions/reach not available at campaign level directly;
  // approximate using ad-level rows rolled up by campaign_id (impressions-weighted frequency not exact, but good proxy).
  const freqByCampaign = new Map<string, { imp: number; freqSum: number }>();
  for (const r of data.adInsights) {
    const cur = freqByCampaign.get(r.campaign_id) || { imp: 0, freqSum: 0 };
    cur.imp += r.impressions;
    cur.freqSum += r.frequency * r.impressions;
    freqByCampaign.set(r.campaign_id, cur);
  }

  return campaigns.map((c) => {
    const agg = byCampaign.get(c.id) || { spend: 0, leads: 0, impressions: 0, clicks: 0 };
    const spend = round2(agg.spend);
    const f = freqByCampaign.get(c.id);
    return {
      ...c,
      spend,
      leads: agg.leads,
      impressions: agg.impressions,
      clicks: agg.clicks,
      cpl: cplOf(spend, agg.leads),
      ctr: ctrOf(agg.clicks, agg.impressions),
      convRate: convRateOf(agg.leads, agg.clicks),
      frequency: f && f.imp ? round2(f.freqSum / f.imp) : null,
      adsets: adsetsByCampaign.get(c.id) || [],
    };
  });
}

export type Health = 'ok' | 'learning' | 'alert';

export function campaignHealth(m: CampaignMetric, settings: Settings, nowISO: string): Health {
  if (m.status !== 'ACTIVE') return 'ok';
  const createdDays = m.created_time ? Math.floor((new Date(nowISO).getTime() - new Date(m.created_time).getTime()) / 86400000) : 999;
  const totalLeadsSoFar = m.adsets.length ? m.leads : m.leads;
  if (createdDays <= 10 && totalLeadsSoFar < 50) return 'learning';
  if (m.cpl !== null && m.cpl > settings.cplMax) return 'alert';
  if (m.frequency !== null && m.frequency > settings.frequencyAlert) return 'alert';
  return 'ok';
}

export function topBottomByCPL(rows: { name: string; cpl: number | null; leads: number }[], n = 5) {
  const withCpl = rows.filter((r) => r.cpl !== null && r.leads > 0);
  const sorted = withCpl.slice().sort((a, b) => (a.cpl as number) - (b.cpl as number));
  return { best: sorted.slice(0, n), worst: sorted.slice(-n).reverse() };
}

// ---- ad-level metrics (last 30d, from account-wide adInsights) ----
export type AdMetric = {
  ad_id: string; adset_id: string; campaign_id: string;
  spend: number; impressions: number; clicks: number; ctr: number | null; frequency: number;
  leads: number; cpl: number | null; convRate: number | null;
};

export type AdSetMetric = AdSet & {
  spend: number; impressions: number; clicks: number; ctr: number | null; frequency: number;
  leads: number; cpl: number | null; convRate: number | null;
};

export function adsetMetrics(data: ApiData, campaignId: string): AdSetMetric[] {
  const byAdset = new Map(data.adsetInsights.map((r) => [r.adset_id, r]));
  return data.adsets
    .filter((a) => a.campaign_id === campaignId)
    .map((a) => {
      const r = byAdset.get(a.id);
      const spend = r ? r.spend : 0;
      const leads = r ? r.leads : 0;
      return {
        ...a, spend, impressions: r?.impressions || 0, clicks: r?.clicks || 0,
        ctr: r ? ctrOf(r.clicks, r.impressions) : null, frequency: r ? round2(r.frequency) : 0,
        leads, cpl: cplOf(spend, leads), convRate: r ? convRateOf(leads, r.clicks) : null,
      };
    });
}

export function adMetricsForAdset(data: ApiData, adsetId: string): AdMetric[] {
  return data.adInsights
    .filter((r) => r.adset_id === adsetId)
    .map((r) => ({
      ad_id: r.ad_id, adset_id: r.adset_id, campaign_id: r.campaign_id,
      spend: r.spend, impressions: r.impressions, clicks: r.clicks,
      ctr: ctrOf(r.clicks, r.impressions), frequency: round2(r.frequency),
      leads: r.leads, cpl: cplOf(r.spend, r.leads), convRate: convRateOf(r.leads, r.clicks),
    }));
}

export function adMetrics(data: ApiData, ids: Set<string>): AdMetric[] {
  return data.adInsights
    .filter((r) => ids.has(r.campaign_id))
    .map((r) => ({
      ad_id: r.ad_id, adset_id: r.adset_id, campaign_id: r.campaign_id,
      spend: r.spend, impressions: r.impressions, clicks: r.clicks,
      ctr: ctrOf(r.clicks, r.impressions), frequency: round2(r.frequency),
      leads: r.leads, cpl: cplOf(r.spend, r.leads), convRate: convRateOf(r.leads, r.clicks),
    }));
}

export type FatigueInfo = { ad_id: string; frequency: number; ctrDropPct: number | null; fatigued: boolean };

export function fatigueByAd(data: ApiData, settings: Settings): Map<string, FatigueInfo> {
  const byAd = new Map<string, { week_start: string; ctr: number; frequency: number; impressions: number }[]>();
  for (const r of data.adWeekly) {
    const arr = byAd.get(r.ad_id) || [];
    arr.push({ week_start: r.week_start, ctr: r.ctr, frequency: r.frequency, impressions: r.impressions });
    byAd.set(r.ad_id, arr);
  }
  const out = new Map<string, FatigueInfo>();
  for (const [adId, rows] of byAd) {
    const withData = rows.filter((r) => r.impressions > 0).sort((a, b) => a.week_start.localeCompare(b.week_start));
    if (withData.length === 0) continue;
    const last = withData[withData.length - 1];
    const first = withData[0];
    const ctrDropPct = withData.length > 1 && first.ctr > 0 ? round2(((first.ctr - last.ctr) / first.ctr) * 100) : null;
    const fatigued = (last.frequency > settings.frequencyAlert) || (ctrDropPct !== null && ctrDropPct > settings.ctrDropAlert);
    out.set(adId, { ad_id: adId, frequency: round2(last.frequency), ctrDropPct, fatigued });
  }
  return out;
}

export function sparklineForAd(data: ApiData, adId: string, field: 'ctr' | 'frequency'): number[] {
  return data.adWeekly
    .filter((r) => r.ad_id === adId)
    .sort((a, b) => a.week_start.localeCompare(b.week_start))
    .map((r) => r[field]);
}

// ---- demographics / placements / devices / regions aggregation ----
export function aggBreakdown<T extends Record<string, any>>(rows: ApiData['demographics'], ids: Set<string>, keyFn: (r: any) => string) {
  const map = new Map<string, { spend: number; leads: number; impressions: number; clicks: number }>();
  for (const r of rows) {
    if (!ids.has(r.campaign_id)) continue;
    const key = keyFn(r);
    const cur = map.get(key) || { spend: 0, leads: 0, impressions: 0, clicks: 0 };
    cur.spend += r.spend; cur.leads += r.leads; cur.impressions += r.impressions; cur.clicks += r.clicks;
    map.set(key, cur);
  }
  return Array.from(map.entries()).map(([key, v]) => ({
    key, spend: round2(v.spend), leads: v.leads, impressions: v.impressions, clicks: v.clicks,
    cpl: cplOf(v.spend, v.leads), ctr: ctrOf(v.clicks, v.impressions),
  }));
}

export function audienceTypeAgg(data: ApiData, ids: Set<string>) {
  const adsetType = new Map<string, string>();
  for (const a of data.adsets) adsetType.set(a.id, a.audience_type);
  const byType = new Map<string, { spend: number; leads: number }>();
  for (const r of data.adInsights) {
    if (!ids.has(r.campaign_id)) continue;
    const type = adsetType.get(r.adset_id) || 'Amplo';
    const cur = byType.get(type) || { spend: 0, leads: 0 };
    cur.spend += r.spend; cur.leads += r.leads;
    byType.set(type, cur);
  }
  return Array.from(byType.entries()).map(([type, v]) => ({ type, spend: round2(v.spend), leads: v.leads, cpl: cplOf(v.spend, v.leads) }));
}

// ---- funnel ----
export function funnelSteps(agg: { impressions: number; clicks: number; leads: number }, settings: Settings) {
  const qualified = Math.round(agg.leads * (settings.qualificationRate / 100));
  const sales = Math.round(qualified * (settings.closeRate / 100));
  return [
    { label: 'Impressões', value: agg.impressions, color: '#4fa3ff' },
    { label: 'Cliques', value: agg.clicks, color: '#36d1a8' },
    { label: 'Leads', value: agg.leads, color: '#ffc857' },
    { label: 'Leads qualificados', value: qualified, color: '#ff7900', sub: 'estimativa' },
    { label: 'Vendas', value: sales, color: '#ff5d8f', sub: 'estimativa' },
  ];
}

export function destinationGroup(destType: string): string {
  if (destType === 'WHATSAPP') return 'WhatsApp';
  if (destType === 'WEBSITE') return 'Website Form';
  if (destType === 'ON_AD' || destType === 'ON_PAGE' || destType === 'MESSENGER') return 'Instant Form';
  return destType || 'Outro';
}

// ---- week/month over week/month ----
export function weekOverWeek(daily: ApiData['daily'], ids: Set<string>, today: string) {
  const curr = sumDaily(daily, ids, addDays(today, -6), today);
  const prev = sumDaily(daily, ids, addDays(today, -13), addDays(today, -7));
  return { curr, prev };
}

export function monthOverMonth(daily: ApiData['daily'], ids: Set<string>, today: string) {
  const curr = sumDaily(daily, ids, addDays(today, -29), today);
  const prev = sumDaily(daily, ids, addDays(today, -59), addDays(today, -30));
  return { curr, prev };
}

export function seasonalityByWeekday(daily: ApiData['daily'], ids: Set<string>) {
  const buckets = Array.from({ length: 7 }, () => ({ spend: 0, leads: 0, n: 0 }));
  for (const r of daily) {
    if (!ids.has(r.campaign_id)) continue;
    const d = new Date(r.date + 'T00:00:00');
    const wd = d.getDay();
    buckets[wd].spend += r.spend; buckets[wd].leads += r.leads; buckets[wd].n += 1;
  }
  const labels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  return buckets.map((b, i) => ({
    label: labels[i],
    avgSpend: b.n ? round2(b.spend / b.n) : 0,
    avgLeads: b.n ? round2(b.leads / b.n) : 0,
    cpl: cplOf(b.spend, b.leads),
  }));
}

export function longTermDaily(daily: ApiData['daily'], ids: Set<string>, today: string, days: number) {
  const start = addDays(today, -(days - 1));
  const byDate = perCampaignInRangeByDate(daily, ids, start, today);
  const out: { date: string; spend: number; leads: number; impressions: number; clicks: number }[] = [];
  for (let i = 0; i < days; i++) {
    const d = addDays(start, i);
    const r = byDate.get(d) || { spend: 0, leads: 0, impressions: 0, clicks: 0 };
    out.push({ date: d, spend: round2(r.spend), leads: r.leads, impressions: r.impressions, clicks: r.clicks });
  }
  return out;
}

function perCampaignInRangeByDate(daily: ApiData['daily'], ids: Set<string>, start: string, end: string) {
  const map = new Map<string, { spend: number; leads: number; impressions: number; clicks: number }>();
  for (const r of daily) {
    if (r.date < start || r.date > end) continue;
    if (!ids.has(r.campaign_id)) continue;
    const cur = map.get(r.date) || { spend: 0, leads: 0, impressions: 0, clicks: 0 };
    cur.spend += r.spend; cur.leads += r.leads; cur.impressions += r.impressions; cur.clicks += r.clicks;
    map.set(r.date, cur);
  }
  return map;
}

// ---- alerts ----
export type Alert = { severity: 'high' | 'medium' | 'low'; title: string; detail: string };

export function computeAlerts(data: ApiData, campaignMetrics: CampaignMetric[], adMetricsRows: AdMetric[], fatigueMap: Map<string, FatigueInfo>, settings: Settings, nowISO: string): Alert[] {
  const alerts: Alert[] = [];
  if (settings.alertsEnabled.cplAbove) {
    for (const c of campaignMetrics) {
      if (c.status !== 'ACTIVE' || c.cpl === null) continue;
      if (c.cpl > settings.cplMax) {
        alerts.push({ severity: 'high', title: `CPL muito acima da meta — ${c.name}`, detail: `CPL de ${c.cpl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} vs. máximo aceitável de ${settings.cplMax.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}.` });
      } else if (c.cpl > settings.cplTarget) {
        alerts.push({ severity: 'medium', title: `CPL acima da meta — ${c.name}`, detail: `CPL de ${c.cpl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} vs. meta de ${settings.cplTarget.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}.` });
      }
    }
  }
  if (settings.alertsEnabled.highFrequency) {
    for (const c of campaignMetrics) {
      if (c.status !== 'ACTIVE' || c.frequency === null) continue;
      if (c.frequency > settings.frequencyAlert) {
        alerts.push({ severity: 'medium', title: `Frequência alta — ${c.name}`, detail: `Frequência de ${c.frequency.toLocaleString('pt-BR')} (alerta configurado em ${settings.frequencyAlert}).` });
      }
    }
  }
  if (settings.alertsEnabled.learningPhase) {
    for (const c of campaignMetrics) {
      const createdDays = c.created_time ? Math.floor((new Date(nowISO).getTime() - new Date(c.created_time).getTime()) / 86400000) : 999;
      if (c.status === 'ACTIVE' && createdDays <= 10 && c.leads < 50) {
        alerts.push({ severity: 'low', title: `Em fase de aprendizado — ${c.name}`, detail: `Campanha criada há ${createdDays} dia(s) e ainda não atingiu 50 conversões — o algoritmo da Meta ainda está otimizando a entrega.` });
      }
    }
  }
  if (settings.alertsEnabled.creativeFatigue) {
    const byAdId = new Map(data.creatives.map((c) => [c.ad_id, c]));
    for (const [adId, info] of fatigueMap) {
      if (!info.fatigued) continue;
      const cr = byAdId.get(adId);
      alerts.push({
        severity: 'medium',
        title: `Criativo com sinais de fadiga — ${cr?.ad_name || adId}`,
        detail: `Frequência ${info.frequency.toLocaleString('pt-BR')}${info.ctrDropPct !== null ? ` · CTR caiu ${info.ctrDropPct.toLocaleString('pt-BR')}% desde a primeira semana` : ''}.`,
      });
    }
  }
  const order = { high: 0, medium: 1, low: 2 };
  return alerts.sort((a, b) => order[a.severity] - order[b.severity]);
}
