'use client';

import { useMemo } from 'react';
import { ApiData, Settings } from '../../lib/types';
import { Period, PERIOD_LABEL, periodRange, previousPeriodRange, addDays, fmtBRL, fmtInt, fmtCPL, KIND_COLOR } from '../../lib/format';
import { campaignMetricsForPeriod, sumDaily, topBottomByCPL, campaignHealth, round2, cplOf } from '../../lib/metrics';
import { KpiCard, Delta, TrendArea, Donut, UnitBars, HealthPill, EstimateBadge, RankList } from '../ui';

export default function Overview({ data, settings, period, unit }: { data: ApiData; settings: Settings; period: Period; unit: 'all' | 'Méier' | 'Taquara' }) {
  const activeCampaigns = useMemo(() => {
    let rows = data.campaigns.filter((c) => c.status === 'ACTIVE');
    if (unit !== 'all') rows = rows.filter((c) => c.unit === unit);
    return rows;
  }, [data, unit]);

  const activeIds = useMemo(() => new Set(activeCampaigns.map((c) => c.id)), [activeCampaigns]);

  const metrics = useMemo(() => campaignMetricsForPeriod(data, activeCampaigns, period), [data, activeCampaigns, period]);

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
    const [start, end] = previousPeriodRange(period, data.today);
    return sumDaily(data.daily, activeIds, start, end);
  }, [data, activeIds, period]);

  const byUnit = useMemo(() => {
    const [start, end] = periodRange(period, data.today);
    const activeAll = data.campaigns.filter((c) => c.status === 'ACTIVE');
    const byCampaign = new Map<string, { spend: number; leads: number }>();
    for (const r of data.daily) {
      if (r.date < start || r.date > end) continue;
      const cur = byCampaign.get(r.campaign_id) || { spend: 0, leads: 0 };
      cur.spend += r.spend; cur.leads += r.leads;
      byCampaign.set(r.campaign_id, cur);
    }
    return ['Méier', 'Taquara'].map((u) => {
      const sub = activeAll.filter((c) => c.unit === u);
      let spend = 0, leads = 0;
      for (const c of sub) { const a = byCampaign.get(c.id); if (a) { spend += a.spend; leads += a.leads; } }
      return { unit: u, spend: round2(spend), leads };
    });
  }, [data, period]);

  const trendRows = useMemo(() => {
    const days = period === '30d' ? 30 : 7;
    const end = data.today;
    const byDate = new Map<string, { spend: number; leads: number; cpl: number }>();
    const start = addDays(end, -(days - 1));
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
  }, [data, period, activeIds]);

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

  const ranking = useMemo(() => topBottomByCPL(metrics.map((m) => ({ name: m.name, cpl: m.cpl, leads: m.leads })), 5), [metrics]);

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
        <KpiCard glow="#36d1a8" icon="users" title={`Leads · ${PERIOD_LABEL[period]}`} value={fmtInt(kpis.leads)}>
          <Delta curr={kpis.leads} prev={prevKpis.leads} />
        </KpiCard>
        <KpiCard glow="#ffc857" icon="target" title={`CPL médio · ${PERIOD_LABEL[period]}`} value={fmtCPL(kpis.cpl)}>
          {kpis.cpl !== null && prevKpis.cpl !== null ? <Delta curr={kpis.cpl} prev={prevKpis.cpl} invert /> : <span className="delta flat">sem leads suficientes</span>}
        </KpiCard>
        <KpiCard glow="#ff7900" icon="wallet" title={`Investimento · ${PERIOD_LABEL[period]}`} value={fmtBRL(kpis.spend)}>
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
            <span className="panel-sub">últimos {period === '30d' ? 30 : 7} dias{unit !== 'all' ? ` · ${unit}` : ''}</span>
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
        <div className="panel">
          <div className="panel-head"><h3>Investimento por unidade</h3><span className="panel-sub">{PERIOD_LABEL[period]}</span></div>
          <UnitBars rows={byUnit} />
        </div>
      </div>

      <div className="panel-grid two">
        <div className="panel">
          <div className="panel-head"><h3>Status das campanhas</h3><span className="panel-sub">visão rápida</span></div>
          <div className="status-row-list">
            <div className="status-row-item"><HealthPill state="ok" /><span>{statusCounts.ok} campanha(s) dentro da meta</span></div>
            <div className="status-row-item"><HealthPill state="learning" /><span>{statusCounts.learning} campanha(s) em fase de aprendizado</span></div>
            <div className="status-row-item"><HealthPill state="alert" /><span>{statusCounts.alert} campanha(s) com alerta (CPL/frequência)</span></div>
          </div>
        </div>
        <div className="panel">
          <div className="panel-head"><h3>Top 5 melhores · CPL</h3><span className="panel-sub">{PERIOD_LABEL[period]}</span></div>
          <RankList title="" rows={ranking.best.map((r) => ({ label: r.name, value: r.cpl as number }))} color="#36d1a8" valueFmt={fmtCPL as any} />
        </div>
        <div className="panel">
          <div className="panel-head"><h3>Top 5 piores · CPL</h3><span className="panel-sub">{PERIOD_LABEL[period]}</span></div>
          <RankList title="" rows={ranking.worst.map((r) => ({ label: r.name, value: r.cpl as number }))} color="#ff5d6c" valueFmt={fmtCPL as any} />
        </div>
      </div>
    </section>
  );
}
