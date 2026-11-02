'use client';

import { Fragment, useEffect, useMemo, useState } from 'react';
import { ApiData, Settings, Creative } from '../../lib/types';
import { DateRange, imgProxy, fmtBRL, fmtInt, fmtCPL, fmtPct, fmtFreq, KIND_COLOR, simplifyCampaignName } from '../../lib/format';
import { campaignMetricsForRange, campaignHealth, adsetMetrics, adMetricsForAdset, adMetrics, fatigueByAd, sparklineForAd, filterCampaigns, AdMetric } from '../../lib/metrics';
import { Chip, StatusPill, HealthPill, Icon, Sparkline } from '../ui';

export default function Campaigns({ data, settings, range, unit, vertente }: { data: ApiData; settings: Settings; range: DateRange; unit: 'all' | 'Méier' | 'Taquara'; vertente: string }) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'ACTIVE' | 'PAUSED'>('ACTIVE');
  const [objectiveFilter, setObjectiveFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<{ field: string; dir: 'asc' | 'desc' }>({ field: 'spend', dir: 'desc' });
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [expandedAdset, setExpandedAdset] = useState<Set<string>>(new Set());
  const [lightbox, setLightbox] = useState<{ ad: Creative; group: { name: string }; m: AdMetric | undefined } | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const objectives = useMemo(() => Array.from(new Set(data.campaigns.map((c) => c.objective).filter(Boolean))), [data]);

  const filteredCampaigns = useMemo(() => {
    let rows = data.campaigns;
    if (unit !== 'all') rows = rows.filter((c) => c.unit === unit);
    if (vertente !== 'all') rows = rows.filter((c) => c.kind === vertente);
    if (statusFilter !== 'all') rows = rows.filter((c) => c.status === statusFilter);
    if (objectiveFilter !== 'all') rows = rows.filter((c) => c.objective === objectiveFilter);
    if (search) rows = rows.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || simplifyCampaignName(c).toLowerCase().includes(search.toLowerCase()));
    return rows;
  }, [data, unit, vertente, statusFilter, objectiveFilter, search]);

  const metrics = useMemo(() => campaignMetricsForRange(data, filteredCampaigns, range.start, range.end), [data, filteredCampaigns, range.start, range.end]);

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

  const creativeCampaigns = useMemo(() => filterCampaigns(data.campaigns, unit, vertente), [data, unit, vertente]);
  const creativeIds = useMemo(() => new Set(creativeCampaigns.map((c) => c.id)), [creativeCampaigns]);
  const adMetricMap = useMemo(() => new Map(adMetrics(data, creativeIds).map((m) => [m.ad_id, m])), [data, creativeIds]);
  const fatigueMap = useMemo(() => fatigueByAd(data, settings), [data, settings]);
  const campaignByIdMap = useMemo(() => new Map(data.campaigns.map((c) => [c.id, c])), [data]);

  const creativeGroups = useMemo(() => {
    const map = new Map<string, { id: string; name: string; status: string; unit: string; kind: string; rows: Creative[] }>();
    for (const row of data.creatives) {
      if (!creativeIds.has(row.campaign_id)) continue;
      if (!map.has(row.campaign_id)) {
        const c = campaignByIdMap.get(row.campaign_id);
        const label = c ? simplifyCampaignName(c) : row.campaign_name;
        map.set(row.campaign_id, { id: row.campaign_id, name: label, status: row.campaign_status, unit: row.unit, kind: row.kind, rows: [] });
      }
      map.get(row.campaign_id)!.rows.push(row);
    }
    return Array.from(map.values());
  }, [data, creativeIds, campaignByIdMap]);

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
                      <td title={c.name}>{simplifyCampaignName(c)} <Chip text={c.kind} color={KIND_COLOR[c.kind] || KIND_COLOR.Outro} /></td>
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

      <div className="panel">
        {creativeGroups.map((grp) => (
          <div className="creatives-group" key={grp.id}>
            <h3>{grp.name}</h3>
            <div className="ad-grid">
              {grp.rows.map((ad) => {
                const isVideo = ad.format === 'Vídeo';
                const proxiedThumb = imgProxy(ad.thumb);
                const m = adMetricMap.get(ad.ad_id);
                const fat = fatigueMap.get(ad.ad_id);
                const spark = sparklineForAd(data, ad.ad_id, 'ctr');
                return (
                  <div className="ad-card" key={ad.ad_id} onClick={() => setLightbox({ ad, group: { name: grp.name }, m })}>
                    <div className="thumb-wrap">
                      {proxiedThumb && <img src={proxiedThumb} alt={ad.ad_name} loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
                      {isVideo && <div className="play-badge"><Icon name="play" /></div>}
                      <StatusPill status={ad.ad_status} />
                      {fat?.fatigued && <span className="fatigue-badge" title="Frequência alta e/ou CTR em queda">⚠ Fadiga</span>}
                      <span className="amp">Ampliar</span>
                    </div>
                    <div className="ad-info">
                      <span className="ad-name">{ad.ad_name}</span>
                      {m && (
                        <div className="ad-metrics-strip">
                          <span>{fmtInt(m.leads)} leads</span>
                          <span>CPL {fmtCPL(m.cpl)}</span>
                          <span>CTR {fmtPct(m.ctr)}</span>
                          <span className={m.frequency > settings.frequencyAlert ? 'cell-warn' : ''}>Freq {fmtFreq(m.frequency)}</span>
                        </div>
                      )}
                      {spark.length > 1 && (
                        <div className="ad-spark"><Sparkline values={spark} color={fat?.fatigued ? '#ff5d6c' : '#36d1a8'} /><span className="ad-spark-label">CTR/semana</span></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {creativeGroups.length === 0 && <p style={{ color: 'var(--muted)' }}>Nenhum criativo encontrado para esse filtro.</p>}
      </div>

      {lightbox && (
        <div className="lightbox-overlay" onClick={(e) => { if (e.target === e.currentTarget) setLightbox(null); }}>
          <div className="lightbox-panel">
            <div className="lightbox-topbar mono">
              <span>{lightbox.group.name}</span>
              <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Fechar">✕</button>
            </div>
            <div className="lightbox-media">
              {lightbox.ad.format === 'Vídeo' && lightbox.ad.video_embed_url ? (
                <iframe src={lightbox.ad.video_embed_url} allow="autoplay; encrypted-media" allowFullScreen />
              ) : lightbox.ad.format === 'Vídeo' ? (
                <div className="video-fallback">
                  <p>Não foi possível carregar a prévia do vídeo aqui.</p>
                  {lightbox.ad.video_permalink && <a href={lightbox.ad.video_permalink} target="_blank" rel="noopener noreferrer">Assistir no Facebook ↗</a>}
                </div>
              ) : (
                imgProxy(lightbox.ad.full_img) && <img src={imgProxy(lightbox.ad.full_img)!} alt={lightbox.ad.ad_name} />
              )}
            </div>
            <div className="lightbox-body">
              <span className="lb-name">{lightbox.ad.ad_name}</span>
              <div className="lb-chips">
                <Chip text={lightbox.ad.unit} color="#4fa3ff" />
                <Chip text={lightbox.ad.kind} color={KIND_COLOR[lightbox.ad.kind] || KIND_COLOR.Outro} />
                <Chip text={lightbox.ad.format} color="#ff7900" />
              </div>
              {lightbox.ad.format === 'Vídeo' && lightbox.ad.video_embed_url && lightbox.ad.video_permalink && (
                <a className="lb-fb-link" href={lightbox.ad.video_permalink} target="_blank" rel="noopener noreferrer">Abrir no Facebook ↗</a>
              )}
              <div className="lb-stats">
                <div className="lb-stat"><span className="lb-stat-label">Leads</span><span className="lb-stat-value">{lightbox.m ? fmtInt(lightbox.m.leads) : '—'}</span></div>
                <div className="lb-stat"><span className="lb-stat-label">CPL</span><span className="lb-stat-value">{lightbox.m ? fmtCPL(lightbox.m.cpl) : '—'}</span></div>
                <div className="lb-stat"><span className="lb-stat-label">Investimento</span><span className="lb-stat-value">{lightbox.m ? fmtBRL(lightbox.m.spend) : '—'}</span></div>
                <div className="lb-stat"><span className="lb-stat-label">CTR</span><span className="lb-stat-value">{lightbox.m ? fmtPct(lightbox.m.ctr) : '—'}</span></div>
              </div>
              <p className="empty-note" style={{ paddingTop: 2 }}>Dados dos últimos 30 dias.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
