'use client';

import { Fragment, useMemo, useState } from 'react';
import { ApiData, Settings } from '../../lib/types';
import { Period, fmtBRL, fmtInt, fmtCPL, fmtPct, fmtFreq, KIND_COLOR } from '../../lib/format';
import { campaignMetricsForPeriod, campaignHealth, adsetMetrics, adMetricsForAdset } from '../../lib/metrics';
import { Chip, StatusPill, HealthPill, Icon } from '../ui';

export default function Campaigns({ data, settings, period, unit }: { data: ApiData; settings: Settings; period: Period; unit: 'all' | 'Méier' | 'Taquara' }) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'ACTIVE' | 'PAUSED'>('ACTIVE');
  const [objectiveFilter, setObjectiveFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<{ field: string; dir: 'asc' | 'desc' }>({ field: 'spend', dir: 'desc' });
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [expandedAdset, setExpandedAdset] = useState<Set<string>>(new Set());

  const objectives = useMemo(() => Array.from(new Set(data.campaigns.map((c) => c.objective).filter(Boolean))), [data]);

  const filteredCampaigns = useMemo(() => {
    let rows = data.campaigns;
    if (unit !== 'all') rows = rows.filter((c) => c.unit === unit);
    if (statusFilter !== 'all') rows = rows.filter((c) => c.status === statusFilter);
    if (objectiveFilter !== 'all') rows = rows.filter((c) => c.objective === objectiveFilter);
    if (search) rows = rows.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
    return rows;
  }, [data, unit, statusFilter, objectiveFilter, search]);

  const metrics = useMemo(() => campaignMetricsForPeriod(data, filteredCampaigns, period), [data, filteredCampaigns, period]);

  const sorted = useMemo(() => {
    const rows = metrics.slice();
    rows.sort((a: any, b: any) => {
      const av = a[sort.field], bv = b[sort.field];
      const an = av === null || av === undefined, bn = bv === null || bv === undefined;
      if (an && bn) return 0;
      if (an) return 1;
      if (bn) return -1;
      if (typeof av === 'string') return sort.dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      return sort.dir === 'asc' ? av - bv : bv - av;
    });
    return rows;
  }, [metrics, sort]);

  const toggleSort = (field: string) => setSort((s) => ({ field, dir: s.field === field && s.dir === 'desc' ? 'asc' : 'desc' }));
  const toggleExpand = (id: string) => setExpanded((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleAdsetExpand = (id: string) => setExpandedAdset((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <section className="wrap main-col">
      <div className="panel">
        <div className="panel-head">
          <h3>Campanhas &amp; Conjuntos de Anúncios</h3>
          <span className="panel-sub">Conjuntos/anúncios usam agregado dos últimos 30 dias · campanha usa o período selecionado no topo</span>
        </div>
        <div className="search-row">
          <input type="search" placeholder="Buscar por nome…" value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="chip-filter">
            {(['ACTIVE', 'PAUSED', 'all'] as const).map((s) => (
              <button key={s} data-active={statusFilter === s} onClick={() => setStatusFilter(s)}>{s === 'ACTIVE' ? 'Ativas' : s === 'PAUSED' ? 'Pausadas' : 'Todas'}</button>
            ))}
          </div>
          <select className="select-filter" value={objectiveFilter} onChange={(e) => setObjectiveFilter(e.target.value)}>
            <option value="all">Todos objetivos</option>
            {objectives.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div className="table-scroll">
          <table className="datatable">
            <thead>
              <tr>
                <th style={{ width: 24 }} />
                <th onClick={() => toggleSort('name')}>Campanha</th>
                <th onClick={() => toggleSort('status')}>Status</th>
                <th onClick={() => toggleSort('spend')}>Gasto</th>
                <th onClick={() => toggleSort('leads')}>Leads</th>
                <th onClick={() => toggleSort('cpl')}>CPL</th>
                <th onClick={() => toggleSort('ctr')}>CTR</th>
                <th onClick={() => toggleSort('frequency')}>Frequência</th>
                <th onClick={() => toggleSort('convRate')}>Conv. formulário</th>
                <th>Saúde</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((c) => {
                const open = expanded.has(c.id);
                const health = campaignHealth(c, settings, data.generated_at);
                const adsets = adsetMetrics(data, c.id);
                return (
                  <Fragment key={c.id}>
                    <tr className="row-clickable" onClick={() => toggleExpand(c.id)}>
                      <td><span className={`expander ${open ? 'open' : ''}`}><Icon name="chevron" /></span></td>
                      <td>{c.name} <Chip text={c.kind} color={KIND_COLOR[c.kind] || KIND_COLOR.Outro} /></td>
                      <td><StatusPill status={c.status} /></td>
                      <td>{fmtBRL(c.spend)}</td>
                      <td>{fmtInt(c.leads)}</td>
                      <td className={c.cpl !== null && c.cpl > settings.cplMax ? 'cell-alert' : c.cpl !== null && c.cpl > settings.cplTarget ? 'cell-warn' : ''}>{fmtCPL(c.cpl)}</td>
                      <td>{fmtPct(c.ctr)}</td>
                      <td className={c.frequency !== null && c.frequency > settings.frequencyAlert ? 'cell-warn' : ''}>{fmtFreq(c.frequency)}</td>
                      <td>{fmtPct(c.convRate)}</td>
                      <td><HealthPill state={health} /></td>
                    </tr>
                    {open && (
                      <tr className="row-detail">
                        <td colSpan={10}>
                          <div className="adset-table-wrap">
                            {adsets.length === 0 && <p className="empty-note">Nenhum conjunto de anúncios encontrado.</p>}
                            {adsets.map((a) => {
                              const adOpen = expandedAdset.has(a.id);
                              const ads = adMetricsForAdset(data, a.id);
                              return (
                                <div className="adset-block" key={a.id}>
                                  <div className="adset-row" onClick={() => toggleAdsetExpand(a.id)}>
                                    <span className={`expander ${adOpen ? 'open' : ''}`}><Icon name="chevron" /></span>
                                    <span className="adset-name">{a.name}</span>
                                    <Chip text={a.audience_type} color="#4fa3ff" />
                                    <Chip text={a.optimization_goal} color="#8c93b8" />
                                    <StatusPill status={a.status} />
                                    <span className="adset-metric">{fmtBRL(a.spend)}</span>
                                    <span className="adset-metric">{fmtInt(a.leads)} leads</span>
                                    <span className="adset-metric">CPL {fmtCPL(a.cpl)}</span>
                                    <span className="adset-metric">CTR {fmtPct(a.ctr)}</span>
                                    <span className="adset-metric">Freq {fmtFreq(a.frequency)}</span>
                                  </div>
                                  {adOpen && (
                                    <div className="ads-mini-table">
                                      <table className="datatable">
                                        <thead>
                                          <tr><th>Anúncio</th><th>Gasto</th><th>Leads</th><th>CPL</th><th>CTR</th><th>Frequência</th><th>Conv.</th></tr>
                                        </thead>
                                        <tbody>
                                          {ads.map((ad) => {
                                            const cr = data.creatives.find((x) => x.ad_id === ad.ad_id);
                                            return (
                                              <tr key={ad.ad_id}>
                                                <td>{cr?.ad_name || ad.ad_id}</td>
                                                <td>{fmtBRL(ad.spend)}</td>
                                                <td>{fmtInt(ad.leads)}</td>
                                                <td>{fmtCPL(ad.cpl)}</td>
                                                <td>{fmtPct(ad.ctr)}</td>
                                                <td className={ad.frequency > settings.frequencyAlert ? 'cell-warn' : ''}>{fmtFreq(ad.frequency)}</td>
                                                <td>{fmtPct(ad.convRate)}</td>
                                              </tr>
                                            );
                                          })}
                                          {ads.length === 0 && <tr><td colSpan={7} className="empty-note">Sem dados de anúncios nos últimos 30 dias.</td></tr>}
                                        </tbody>
                                      </table>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
              {sorted.length === 0 && <tr><td colSpan={10} className="empty-note">Nenhuma campanha encontrada para esse filtro.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
