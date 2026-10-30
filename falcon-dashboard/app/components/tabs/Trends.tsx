'use client';

import { useMemo } from 'react';
import { ApiData } from '../../lib/types';
import { fmtBRL, fmtInt, fmtCPL } from '../../lib/format';
import { longTermDaily, weekOverWeek, monthOverMonth, seasonalityByWeekday } from '../../lib/metrics';
import { TrendArea, Delta, Bar } from '../ui';

export default function Trends({ data, unit }: { data: ApiData; unit: 'all' | 'Méier' | 'Taquara' }) {
  const campaigns = useMemo(() => {
    let rows = data.campaigns;
    if (unit !== 'all') rows = rows.filter((c) => c.unit === unit);
    return rows;
  }, [data, unit]);
  const ids = useMemo(() => new Set(campaigns.map((c) => c.id)), [campaigns]);

  const longTerm = useMemo(() => longTermDaily(data.daily, ids, data.today, 90), [data, ids]);
  const wow = useMemo(() => weekOverWeek(data.daily, ids, data.today), [data, ids]);
  const mom = useMemo(() => monthOverMonth(data.daily, ids, data.today), [data, ids]);
  const seasonality = useMemo(() => seasonalityByWeekday(data.daily, ids), [data, ids]);

  const activities = useMemo(() => {
    return data.activities
      .map((a) => {
        let extra: any = {};
        try { extra = JSON.parse(a.extra_data || '{}'); } catch { /* ignore */ }
        return { ...a, extra };
      })
      .sort((a, b) => b.event_time.localeCompare(a.event_time))
      .slice(0, 40);
  }, [data]);

  const cplSeries = longTerm.map((r) => (r.leads ? Math.round((r.spend / r.leads) * 100) / 100 : 0));
  const maxSeasonSpend = Math.max(1, ...seasonality.map((s) => s.avgSpend));

  return (
    <section className="wrap main-col">
      <div className="panel">
        <div className="panel-head"><h3>Investimento, Leads &amp; CPL — últimos 90 dias</h3></div>
        <TrendArea rows={longTerm} series={[
          { key: 'spend', color: '#ff7900', label: 'Investimento (R$)', values: longTerm.map((r) => r.spend) },
          { key: 'leads', color: '#36d1a8', label: 'Leads', values: longTerm.map((r) => r.leads) },
          { key: 'cpl', color: '#ffc857', label: 'CPL (R$)', values: cplSeries },
        ]} />
      </div>

      <div className="panel-grid two">
        <div className="panel">
          <div className="panel-head"><h3>Semana a semana</h3><span className="panel-sub">últimos 7 dias vs. 7 dias anteriores</span></div>
          <div className="compare-rows">
            <div className="compare-row"><span>Investimento</span><strong>{fmtBRL(wow.curr.spend)}</strong><Delta curr={wow.curr.spend} prev={wow.prev.spend} /></div>
            <div className="compare-row"><span>Leads</span><strong>{fmtInt(wow.curr.leads)}</strong><Delta curr={wow.curr.leads} prev={wow.prev.leads} /></div>
            <div className="compare-row"><span>CPL</span><strong>{fmtCPL(wow.curr.cpl)}</strong>{wow.curr.cpl !== null && wow.prev.cpl !== null && <Delta curr={wow.curr.cpl} prev={wow.prev.cpl} invert />}</div>
          </div>
        </div>
        <div className="panel">
          <div className="panel-head"><h3>Mês a mês</h3><span className="panel-sub">últimos 30 dias vs. 30 dias anteriores</span></div>
          <div className="compare-rows">
            <div className="compare-row"><span>Investimento</span><strong>{fmtBRL(mom.curr.spend)}</strong><Delta curr={mom.curr.spend} prev={mom.prev.spend} /></div>
            <div className="compare-row"><span>Leads</span><strong>{fmtInt(mom.curr.leads)}</strong><Delta curr={mom.curr.leads} prev={mom.prev.leads} /></div>
            <div className="compare-row"><span>CPL</span><strong>{fmtCPL(mom.curr.cpl)}</strong>{mom.curr.cpl !== null && mom.prev.cpl !== null && <Delta curr={mom.curr.cpl} prev={mom.prev.cpl} invert />}</div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head"><h3>Sazonalidade por dia da semana</h3><span className="panel-sub">médias dos últimos 90 dias</span></div>
        <div className="segment-bars">
          {seasonality.map((s) => (
            <div className="segment-bar-row" key={s.label}>
              <span className="segment-bar-label">{s.label}</span>
              <Bar pct={(s.avgSpend / maxSeasonSpend) * 100} color="#4fa3ff" />
              <span className="segment-bar-value">{fmtBRL(s.avgSpend)}/dia · {s.avgLeads.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} leads/dia · CPL {fmtCPL(s.cpl)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="panel-head"><h3>Histórico de mudanças</h3><span className="panel-sub">criativos, orçamento, status — direto do Gerenciador de Anúncios</span></div>
        <div className="activity-list">
          {activities.map((a, i) => (
            <div className="activity-row" key={i}>
              <span className="activity-time mono">{new Date(a.event_time).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
              <span className="activity-text">
                <strong>{a.translated_event_type}</strong> — {a.object_name}
                {a.extra?.old_value && a.extra?.new_value && <span className="activity-change"> ({String(a.extra.old_value)} → {String(a.extra.new_value)})</span>}
              </span>
            </div>
          ))}
          {activities.length === 0 && <p className="empty-note">Nenhuma atividade recente.</p>}
        </div>
      </div>
    </section>
  );
}
