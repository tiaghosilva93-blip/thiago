'use client';

import { useMemo } from 'react';
import { ApiData, Settings } from '../../lib/types';
import { DateRange, comparisonRangeFor, addDays, fmtBRL, fmtInt, fmtCPL, KIND_COLOR, simplifyCampaignName } from '../../lib/format';
import { campaignMetricsForRange, sumDaily, topBottomByCPL, campaignHealth, round2, cplOf, filterCampaigns } from '../../lib/metrics';
import { KpiCard, Delta, TrendArea, Donut, HealthPill, EstimateBadge, RankList } from '../ui';

export default function Overview({ data, settings, range, unit, vertente }: { data: ApiData; settings: Settings; range: DateRange; unit: 'all' | 'Méier' | 'Taquara'; vertente: string }) {
  const activeCampaigns = useMemo(() => filterCampaigns(data.campaigns, unit, vertente), [data, unit, vertente]);

  const activeIds = useMemo(() => new Set(activeCampaigns.map((c) => c.id)), [activeCampaigns]);

  const metrics = useMemo(() => campaignMetricsForRange(data, activeCampaigns, range.start, range.end), [data, activeCampaigns, range.start, range.end]);

  const kpis = useMemo(() => {
    const spend = metrics.reduce((s, c) => s + c.spend, 0);
    const leads = metrics.reduce((s, c) => s + c.leads, 0);
    const qualified = Math.round(leads * (settings.qualificationRate / 100));
    return {
      spend: round2(spend), leads, cpl: cplOf(spend, leads), n: metrics.length,
      qualified, cplQualified: cplOf(spend, qualified),
    };
  }, [metrics, settings.qualificationRate]);

  const prevKpis = useMemo(() => {
    const [start, end] = comparisonRangeFor(range.start, range.end);
    return sumDaily(data.daily, activeIds, start, end);
  }, [data, activeIds, range.start, range.end]);

  const trendRows = useMemo(() => {
    const start = range.start, end = range.end;
    const d1 = new Date(start + 'T00:00:00'), d2 = new Date(end + 'T00:00:00');
    const days = Math.max(1, Math.round((d2.getTime() - d1.getTime()) / 86400000) + 1);
    const byDate = new Map<string, { spend: number; leads: number; cpl: number }>();
    for (const r of data.daily) {
      if (r.date < start || r.date > end) continue;
      if (!activeIds.has(r.campaign_id)) continue;
      const cur = byDate.get(r.date) || { spend: 0, leads: 0, cpl: 0 };
      cur.spend += r.spend; cur.leads += r.leads;
      byDate.set(r.date, cur);
    }
    const out: { date: string; spend: number; leads: number; cpl: number }[] = [];
    for (let i = 0; i < days; i++) {
      const d = addDays(start, i);
      const r = byDate.get(d) || { spend: 0, leads: 0, cpl: 0 };
      out.push({ date: d, spend: round2(r.spend), leads: r.leads, cpl: r.leads ? round2(r.spend / r.leads) : 0 });
    }
    return out;
  }, [data, range.start, range.end, activeIds]);

  const creativesStats = useMemo(() => {
    let total = 0, activeCount = 0, video = 0, image = 0;
    const byKind = new Map<string, number>();
    for (const row of data.creatives) {
      if (!activeIds.has(row.campaign_id)) continue;
      total++;
      if (row.ad_status === 'ACTIVE') activeCount++;
      if (row.format === 'Vídeo') video++; else image++;
      byKind.set(row.kind, (byKind.get(row.kind) || 0) + 1);
    }
    const kindSegments = Array.from(byKind.entries()).map(([label, value]) => ({ label, value, color: KIND_COLOR[label] || KIND_COLOR.Outro }));
    return { total, activeCount, video, image, kindSegments };
  }, [data, activeIds]);

  const statusCounts = useMemo(() => {
    let ok = 0, learning = 0, alert = 0;
    for (const m of metrics) {
      const h = campaignHealth(m, settings, data.generated_at);
      if (h === 'ok') ok++; else if (h === 'learning') learning++; else alert++;
    }
    return { ok, learning, alert };
  }, [metrics, settings, data.generated_at]);

  const ranking = useMemo(() => topBottomByCPL(metrics.map((m) => ({ name: simplifyCampaignName(m), cpl: m.cpl, leads: m.leads })), 5), [metrics]);

  const todayPacing = useMemo(() => {
    let spent = 0;
    for (const r of data.daily) {
      if (r.date === data.today && activeIds.has(r.campaign_id)) spent += r.spend;
    }
    const budget = activeCampaigns.reduce((s, c) => s + c.daily_budget, 0);
    spent = round2(spent);
    return { spent, budget, pct: budget ? Math.min(100, Math.round((spent / budget) * 100)) : 0 };
  }, [data, activeIds, activeCampaigns]);

  return (
    <section className="wrap main-col">
      <div className="kpi-grid">
        <KpiCard glow="#36d1a8" icon="users" title="Leads" value={fmtInt(kpis.leads)}>
          <Delta curr={kpis.leads} prev={prevKpis.leads} />
        </KpiCard>
        <KpiCard glow="#ffc857" icon="target" title="CPL médio" value={fmtCPL(kpis.cpl)}>
          {kpis.cpl !== null && prevKpis.cpl !== null ? <Delta curr={kpis.cpl} prev={prevKpis.cpl} invert /> : <span className="delta flat">sem leads suficientes</span>}
        </KpiCard>
        <KpiCard glow="#ff7900" icon="wallet" title="Investimento" value={fmtBRL(kpis.spend)}>
          <Delta curr={kpis.spend} prev={prevKpis.spend} />
        </KpiCard>
        <KpiCard glow="#ff5d8f" icon="target" title="CPL de lead qualificado" value={fmtCPL(kpis.cplQualified)}
          sub={<span>{fmtInt(kpis.qualified)} leads qualificados (estimado) <EstimateBadge /></span>} />
        <KpiCard glow="#4fa3ff" icon="megaphone" title="Campanhas ativas" value={fmtInt(kpis.n)}
          sub={`${statusCounts.ok} saudáveis · ${statusCounts.learning} em aprendizado · ${statusCounts.alert} com alerta`} />
        <KpiCard glow="#36d1a8" icon="gauge" title="Ritmo do orçamento hoje" value={`${todayPacing.pct}%`}
          sub={`${fmtBRL(todayPacing.spent)} de ${fmtBRL(todayPacing.budget)}`} />
      </div>

      <div className="panel-grid">
        <div className="panel wide">
          <div className="panel-head">
            <h3>Leads &amp; CPL</h3>
            <span className="panel-sub">{trendRows.length} dia(s){unit !== 'all' ? ` · ${unit}` : ''}</span>
          </div>
          <TrendArea rows={trendRows} series={[
            { key: 'leads', color: '#36d1a8', label: 'Leads', values: trendRows.map((r) => r.leads) },
            { key: 'cpl', color: '#ffc857', label: 'CPL (R$)', values: trendRows.map((r) => r.cpl) },
          ]} />
        </div>
        <div className="panel">
          <div className="panel-head"><h3>Criativos por tipo</h3><span className="panel-sub">campanhas ativas</span></div>
          <Donut segments={creativesStats.kindSegments} centerValue={String(creativesStats.total)} centerLabel="criativos" />
        </div>
      </div>

      <div className="panel-grid two">
        <div className="panel">
          <div className="panel-head"><h3>Top 5 melhores · CPL</h3></div>
          <RankList title="" rows={ranking.best.map((r) => ({ label: r.name, value: r.cpl as number }))} color="#36d1a8" valueFmt={fmtCPL as any} />
        </div>
        <div className="panel">
          <div className="panel-head"><h3>Top 5 piores · CPL</h3></div>
          <RankList title="" rows={ranking.worst.map((r) => ({ label: r.name, value: r.cpl as number }))} color="#ff5d6c" valueFmt={fmtCPL as any} />
        </div>
      </div>
    </section>
  );
}
