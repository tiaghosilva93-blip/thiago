'use client';

import { useMemo } from 'react';
import { ApiData, Settings } from '../../lib/types';
import { fmtCPL, fmtInt } from '../../lib/format';
import { campaignMetricsForPeriod, adMetrics, fatigueByAd, computeAlerts, weekOverWeek, topBottomByCPL } from '../../lib/metrics';
import { AlertCard, Icon } from '../ui';

export default function Alerts({ data, settings, unit }: { data: ApiData; settings: Settings; unit: 'all' | 'Méier' | 'Taquara' }) {
  const campaigns = useMemo(() => {
    let rows = data.campaigns.filter((c) => c.status === 'ACTIVE');
    if (unit !== 'all') rows = rows.filter((c) => c.unit === unit);
    return rows;
  }, [data, unit]);
  const ids = useMemo(() => new Set(campaigns.map((c) => c.id)), [campaigns]);

  const metrics30 = useMemo(() => campaignMetricsForPeriod(data, campaigns, '30d'), [data, campaigns]);
  const adM = useMemo(() => adMetrics(data, ids), [data, ids]);
  const fatigue = useMemo(() => fatigueByAd(data, settings), [data, settings]);
  const alerts = useMemo(() => computeAlerts(data, metrics30, adM, fatigue, settings, data.generated_at), [data, metrics30, adM, fatigue, settings]);

  const wow = useMemo(() => weekOverWeek(data.daily, ids, data.today), [data, ids]);
  const ranking = useMemo(() => topBottomByCPL(metrics30.map((m) => ({ name: m.name, cpl: m.cpl, leads: m.leads })), 1), [metrics30]);

  const insights = useMemo(() => {
    const list: string[] = [];
    if (wow.curr.cpl !== null && wow.prev.cpl !== null) {
      const diff = wow.curr.cpl - wow.prev.cpl;
      if (diff < 0) list.push(`O CPL médio caiu ${Math.abs(diff).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} na última semana em relação à anterior — tendência positiva.`);
      else if (diff > 0) list.push(`O CPL médio subiu ${diff.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} na última semana — vale revisar criativos e segmentação.`);
    }
    if (wow.curr.leads !== null && wow.prev.leads) {
      const pct = ((wow.curr.leads - wow.prev.leads) / wow.prev.leads) * 100;
      if (Math.abs(pct) > 10) list.push(`Volume de leads ${pct > 0 ? 'cresceu' : 'caiu'} ${Math.abs(pct).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}% na última semana.`);
    }
    if (ranking.best.length > 0) {
      const b = ranking.best[0];
      list.push(`${b.name} é a campanha com melhor CPL agora (${fmtCPL(b.cpl)}) — considere aumentar o orçamento dela.`);
    }
    const fatiguedCount = Array.from(fatigue.values()).filter((f) => f.fatigued).length;
    if (fatiguedCount > 0) list.push(`${fatiguedCount} criativo(s) mostrando sinais de fadiga — recomenda-se testar novos criativos nessas campanhas.`);
    const learningCount = metrics30.filter((c) => {
      const createdDays = c.created_time ? Math.floor((new Date(data.generated_at).getTime() - new Date(c.created_time).getTime()) / 86400000) : 999;
      return c.status === 'ACTIVE' && createdDays <= 10 && c.leads < 50;
    }).length;
    if (learningCount > 0) list.push(`${learningCount} campanha(s) ainda em fase de aprendizado — evite pausar ou editar nos próximos dias para não reiniciar o aprendizado.`);
    return list;
  }, [wow, ranking, fatigue, metrics30, data.generated_at]);

  const bySeverity = { high: alerts.filter((a) => a.severity === 'high'), medium: alerts.filter((a) => a.severity === 'medium'), low: alerts.filter((a) => a.severity === 'low') };

  return (
    <section className="wrap main-col">
      <div className="panel">
        <div className="panel-head"><h3>Alertas automáticos</h3><span className="panel-sub">{alerts.length} alerta(s) ativo(s) · limites definidos em Configurações</span></div>
        <div className="alert-list">
          {bySeverity.high.map((a, i) => <AlertCard key={'h' + i} severity="high" title={a.title} detail={a.detail} />)}
          {bySeverity.medium.map((a, i) => <AlertCard key={'m' + i} severity="medium" title={a.title} detail={a.detail} />)}
          {bySeverity.low.map((a, i) => <AlertCard key={'l' + i} severity="low" title={a.title} detail={a.detail} />)}
          {alerts.length === 0 && <p className="empty-note">Nenhum alerta no momento — tudo dentro das metas configuradas.</p>}
        </div>
      </div>

      <div className="panel">
        <div className="panel-head"><h3>Insights automáticos &amp; recomendações</h3></div>
        <div className="insight-list">
          {insights.map((text, i) => (
            <div className="insight-row" key={i}>
              <span className="insight-icon"><Icon name="trend" /></span>
              <span>{text}</span>
            </div>
          ))}
          {insights.length === 0 && <p className="empty-note">Sem insights relevantes para o período atual.</p>}
        </div>
      </div>
    </section>
  );
}
