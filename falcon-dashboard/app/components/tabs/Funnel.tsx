'use client';

import { useMemo } from 'react';
import { ApiData, Settings } from '../../lib/types';
import { Period, periodRange, fmtBRL, fmtCPL, fmtInt } from '../../lib/format';
import { sumDaily, funnelSteps, destinationGroup, cplOf, round2 } from '../../lib/metrics';
import { FunnelChart, EstimateBadge, Chip } from '../ui';

export default function Funnel({ data, settings, period, unit }: { data: ApiData; settings: Settings; period: Period; unit: 'all' | 'Méier' | 'Taquara' }) {
  const campaigns = useMemo(() => {
    let rows = data.campaigns.filter((c) => c.status === 'ACTIVE');
    if (unit !== 'all') rows = rows.filter((c) => c.unit === unit);
    return rows;
  }, [data, unit]);
  const ids = useMemo(() => new Set(campaigns.map((c) => c.id)), [campaigns]);

  const [start, end] = periodRange(period, data.today);
  const agg = useMemo(() => sumDaily(data.daily, ids, start, end), [data, ids, start, end]);

  const steps = useMemo(() => funnelSteps(agg, settings), [agg, settings]);

  const costPerStep = useMemo(() => steps.map((s) => ({ label: s.label, cost: s.value ? round2(agg.spend / s.value) : null })), [steps, agg.spend]);

  const byDestination = useMemo(() => {
    const campaignToGroup = new Map<string, string>();
    for (const a of data.adsets) {
      if (!ids.has(a.campaign_id)) continue;
      campaignToGroup.set(a.campaign_id, destinationGroup(a.destination_type));
    }
    const groups = new Map<string, { spend: number; leads: number; impressions: number; clicks: number }>();
    for (const r of data.daily) {
      if (r.date < start || r.date > end) continue;
      const g = campaignToGroup.get(r.campaign_id);
      if (!g) continue;
      const cur = groups.get(g) || { spend: 0, leads: 0, impressions: 0, clicks: 0 };
      cur.spend += r.spend; cur.leads += r.leads; cur.impressions += r.impressions; cur.clicks += r.clicks;
      groups.set(g, cur);
    }
    return Array.from(groups.entries()).map(([group, v]) => ({
      group, spend: round2(v.spend), leads: v.leads, cpl: cplOf(v.spend, v.leads),
      convRate: v.clicks ? round2((v.leads / v.clicks) * 100) : null,
    }));
  }, [data, ids, start, end]);

  return (
    <section className="wrap main-col">
      <div className="panel">
        <div className="panel-head">
          <h3>Funil de conversão</h3>
          <span className="panel-sub">Impressões → Cliques → Leads → Qualificados → Vendas <EstimateBadge text="qualificados/vendas = estimativa" /></span>
        </div>
        <FunnelChart steps={steps} />
      </div>

      <div className="panel-grid two">
        <div className="panel">
          <div className="panel-head"><h3>Custo por etapa</h3></div>
          <div className="cost-step-list">
            {costPerStep.map((c, i) => (
              <div className="cost-step-row" key={i}>
                <span>{c.label}</span>
                <span className="mono">{c.cost !== null ? fmtBRL(c.cost) : '—'}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <div className="panel-head"><h3>Instant Form vs. Website Form vs. WhatsApp</h3><span className="panel-sub">destino configurado no conjunto de anúncios</span></div>
          <div className="table-scroll">
            <table className="datatable">
              <thead><tr><th>Destino</th><th>Gasto</th><th>Leads</th><th>CPL</th><th>Conv. clique→lead</th></tr></thead>
              <tbody>
                {byDestination.map((r) => (
                  <tr key={r.group}>
                    <td><Chip text={r.group} color={r.group === 'WhatsApp' ? '#36d1a8' : r.group === 'Website Form' ? '#4fa3ff' : '#ff7900'} /></td>
                    <td>{fmtBRL(r.spend)}</td>
                    <td>{fmtInt(r.leads)}</td>
                    <td>{fmtCPL(r.cpl)}</td>
                    <td>{r.convRate !== null ? r.convRate.toLocaleString('pt-BR') + '%' : '—'}</td>
                  </tr>
                ))}
                {byDestination.length === 0 && <tr><td colSpan={5} className="empty-note">Sem dados no período.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
