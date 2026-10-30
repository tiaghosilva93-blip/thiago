'use client';

import { useMemo } from 'react';
import { ApiData, Settings } from '../../lib/types';
import { Period, periodRange, fmtBRL, fmtInt, fmtCPL } from '../../lib/format';
import { campaignMetricsForPeriod, cplOf, round2, topBottomByCPL } from '../../lib/metrics';
import { KpiCard, Donut, EstimateBadge, RankList, Icon } from '../ui';

export default function Quality({ data, settings, period, unit }: { data: ApiData; settings: Settings; period: Period; unit: 'all' | 'Méier' | 'Taquara' }) {
  const campaigns = useMemo(() => {
    let rows = data.campaigns.filter((c) => c.status === 'ACTIVE');
    if (unit !== 'all') rows = rows.filter((c) => c.unit === unit);
    return rows;
  }, [data, unit]);

  const metrics = useMemo(() => campaignMetricsForPeriod(data, campaigns, period), [data, campaigns, period]);

  const totals = useMemo(() => {
    const leads = metrics.reduce((s, c) => s + c.leads, 0);
    const spend = metrics.reduce((s, c) => s + c.spend, 0);
    const qualified = Math.round(leads * (settings.qualificationRate / 100));
    const sales = Math.round(qualified * (settings.closeRate / 100));
    return { leads, spend: round2(spend), qualified, sales, cplQualified: cplOf(spend, qualified), cplSale: cplOf(spend, sales) };
  }, [metrics, settings]);

  const byCampaignQuality = useMemo(() => {
    return metrics
      .filter((c) => c.leads > 0)
      .map((c) => ({
        name: c.name, leads: c.leads,
        qualified: Math.round(c.leads * (settings.qualificationRate / 100)),
        cpl: c.cpl, cplQualified: cplOf(c.spend, Math.round(c.leads * (settings.qualificationRate / 100))),
      }))
      .sort((a, b) => b.leads - a.leads);
  }, [metrics, settings]);

  const bestSource = useMemo(() => topBottomByCPL(metrics.map((m) => ({ name: m.name, cpl: m.cpl, leads: m.leads })), 5).best, [metrics]);

  return (
    <section className="wrap main-col">
      <div className="kpi-grid">
        <KpiCard glow="#ffc857" icon="users" title="Leads brutos" value={fmtInt(totals.leads)} />
        <KpiCard glow="#36d1a8" icon="target" title="Leads qualificados" value={fmtInt(totals.qualified)} sub={<EstimateBadge text={`taxa de ${settings.qualificationRate}% configurada`} />} />
        <KpiCard glow="#ff7900" icon="wallet" title="Custo por lead qualificado" value={fmtCPL(totals.cplQualified)} sub={<EstimateBadge />} />
        <KpiCard glow="#ff5d8f" icon="target" title="Vendas (estimado)" value={fmtInt(totals.sales)} sub={<EstimateBadge text={`taxa de fechamento de ${settings.closeRate}%`} />} />
      </div>

      <div className="panel-grid two">
        <div className="panel">
          <div className="panel-head"><h3>Leads brutos vs. qualificados</h3></div>
          <Donut
            segments={[
              { label: 'Qualificados (estimado)', value: totals.qualified, color: '#36d1a8' },
              { label: 'Não qualificados', value: Math.max(0, totals.leads - totals.qualified), color: '#8c93b8' },
            ]}
            centerValue={fmtInt(totals.leads)}
            centerLabel="leads totais"
          />
        </div>
        <div className="panel">
          <div className="panel-head"><h3>Melhor origem (por CPL)</h3><span className="panel-sub">proxy — sem CRM conectado ainda</span></div>
          <RankList title="" rows={bestSource.map((r) => ({ label: r.name, value: r.cpl as number }))} color="#36d1a8" valueFmt={fmtCPL as any} />
        </div>
      </div>

      <div className="panel">
        <div className="panel-head"><h3>Taxa de qualificação por campanha</h3><span className="panel-sub">{settings.qualificationRate}% aplicado uniformemente — ajuste em Configurações</span></div>
        <div className="table-scroll">
          <table className="datatable">
            <thead><tr><th>Campanha</th><th>Leads</th><th>Qualificados (est.)</th><th>CPL</th><th>CPL qualificado (est.)</th></tr></thead>
            <tbody>
              {byCampaignQuality.map((r) => (
                <tr key={r.name}>
                  <td>{r.name}</td>
                  <td>{fmtInt(r.leads)}</td>
                  <td>{fmtInt(r.qualified)}</td>
                  <td>{fmtCPL(r.cpl)}</td>
                  <td>{fmtCPL(r.cplQualified)}</td>
                </tr>
              ))}
              {byCampaignQuality.length === 0 && <tr><td colSpan={5} className="empty-note">Sem leads no período.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel crm-panel">
        <div className="panel-head"><h3>Integração com CRM</h3></div>
        <div className="crm-empty-state">
          <span className="crm-icon"><Icon name="crm" /></span>
          <div>
            <p><strong>Nenhum CRM conectado.</strong> Quando um CRM for integrado, aqui aparecerão: status do lead (novo, em contato, matrícula), valor da venda e responsável pelo atendimento — por lead e por campanha/criativo.</p>
            <p className="crm-note">Até lá, os números de leads qualificados e vendas acima são <strong>estimativas</strong> calculadas a partir das taxas configuradas em Configurações, não dados reais de fechamento.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
