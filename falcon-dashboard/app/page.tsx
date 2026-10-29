'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';

type Campaign = {
  id: string; name: string; status: string; unit: string; kind: string; format: string; daily_budget: number;
};
type DailyRow = { campaign_id: string; date: string; spend: number; leads: number };
type Creative = {
  campaign_id: string; campaign_name: string; campaign_status: string; unit: string; kind: string; format: string;
  ad_id: string; ad_name: string; ad_status: string; headline: string;
  thumb: string | null; full_img: string | null; video_embed_url: string | null;
};
type ApiData = { generated_at: string; today: string; campaigns: Campaign[]; daily: DailyRow[]; creatives: Creative[] };

type Period = 'today' | 'yesterday' | '7d' | '30d';
const PERIOD_LABEL: Record<Period, string> = { today: 'Hoje', yesterday: 'Ontem', '7d': '7 dias', '30d': '30 dias' };
const COLORS = ['#ff7900', '#002049', '#1d7a4c', '#8a3ab9'];

const fmtBRL = (v: number) => 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtInt = (v: number) => v.toLocaleString('pt-BR');
const fmtCPL = (v: number | null) => (v === null || v === undefined ? '—' : fmtBRL(v));

function addDays(iso: string, delta: number) {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + delta);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function periodRange(period: Period, today: string): [string, string] {
  if (period === 'today') return [today, today];
  if (period === 'yesterday') { const y = addDays(today, -1); return [y, y]; }
  if (period === '30d') return [addDays(today, -29), today];
  return [addDays(today, -6), today];
}

function hashColor(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return COLORS[h % COLORS.length];
}

function Chip({ text }: { text: string }) {
  const c = hashColor(text);
  return <span className="chip" style={{ color: c, background: c + '26' }}>{text}</span>;
}

function StatusPill({ status }: { status: string }) {
  const active = status === 'ACTIVE';
  return <span className={`pill ${active ? 'active' : 'paused'}`}>{active ? 'Ativa' : 'Pausada'}</span>;
}

function BarChart({ rows, field, color, money }: { rows: { date: string; spend: number; leads: number }[]; field: 'spend' | 'leads'; color: string; money: boolean }) {
  const [hover, setHover] = useState<{ x: number; y: number; row: any } | null>(null);
  const width = 600, height = 184, margin = { top: 10, right: 8, bottom: 22, left: 46 };
  const maxV = Math.max(1, ...rows.map((r) => r[field])) * 1.15;
  const bw = (width - margin.left - margin.right) / rows.length;
  const y = (v: number) => height - margin.bottom - (v / maxV) * (height - margin.top - margin.bottom);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(maxV * f));

  return (
    <div className="chart-box">
      <svg viewBox={`0 0 ${width} ${height}`}>
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={margin.left} x2={width - margin.right} y1={y(t)} y2={y(t)} className="gridline" />
            <text x={margin.left - 8} y={y(t) + 3} textAnchor="end" className="axis-text">
              {money ? 'R$' + t.toLocaleString('pt-BR') : t.toLocaleString('pt-BR')}
            </text>
          </g>
        ))}
        {rows.map((r, i) => {
          const x = margin.left + i * bw + bw * 0.15;
          const barW = bw * 0.7;
          const barY = y(r[field]);
          const barH = height - margin.bottom - barY;
          const showLabel = rows.length <= 10 || i % Math.ceil(rows.length / 10) === 0;
          return (
            <g key={r.date}>
              <rect
                x={x} y={barY} width={barW} height={Math.max(barH, 0)} rx={Math.min(4, barW / 2)} fill={color}
                onMouseMove={(e) => setHover({ x: e.clientX, y: e.clientY, row: r })}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: 'pointer' }}
              />
              {showLabel && (
                <text x={x + barW / 2} y={height - 6} textAnchor="middle" className="axis-text">
                  {r.date.slice(8, 10)}/{r.date.slice(5, 7)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {hover && (
        <div className="tooltip" style={{ opacity: 1, position: 'fixed', left: hover.x + 12, top: hover.y - 36 }}>
          <div className="t-date">{hover.row.date.slice(8, 10)}/{hover.row.date.slice(5, 7)}</div>
          <div className="t-row"><span className="sw" style={{ background: color }} /> {field === 'spend' ? fmtBRL(hover.row.spend) : fmtInt(hover.row.leads) + ' leads'}</div>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  const [data, setData] = useState<ApiData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tab, setTab] = useState<'overview' | 'creatives'>('overview');
  const [period, setPeriod] = useState<Period>('7d');
  const [unit, setUnit] = useState<'all' | 'Méier' | 'Taquara'>('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<{ field: string; dir: 'asc' | 'desc' }>({ field: 'spend', dir: 'desc' });
  const [lightbox, setLightbox] = useState<{ ad: Creative; group: { name: string } } | null>(null);

  const load = useCallback(async () => {
    try {
      setRefreshing(true);
      const res = await fetch('/api/data', { cache: 'no-store' });
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setData(json);
      setError(null);
    } catch (e: any) {
      setError(e?.message || 'Falha ao carregar dados.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const activeCampaigns = useMemo(() => {
    if (!data) return [];
    let rows = data.campaigns.filter((c) => c.status === 'ACTIVE');
    if (unit !== 'all') rows = rows.filter((c) => c.unit === unit);
    return rows;
  }, [data, unit]);

  const periodRows = useMemo(() => {
    if (!data) return [];
    const [start, end] = periodRange(period, data.today);
    const byCampaign = new Map<string, { spend: number; leads: number }>();
    for (const r of data.daily) {
      if (r.date < start || r.date > end) continue;
      const cur = byCampaign.get(r.campaign_id) || { spend: 0, leads: 0 };
      cur.spend += r.spend; cur.leads += r.leads;
      byCampaign.set(r.campaign_id, cur);
    }
    return activeCampaigns.map((c) => {
      const agg = byCampaign.get(c.id) || { spend: 0, leads: 0 };
      const spend = Math.round(agg.spend * 100) / 100;
      return { ...c, spend, leads: agg.leads, cpl: agg.leads ? Math.round((spend / agg.leads) * 100) / 100 : null };
    });
  }, [data, activeCampaigns, period]);

  const kpis = useMemo(() => {
    const spend = periodRows.reduce((s, c) => s + c.spend, 0);
    const leads = periodRows.reduce((s, c) => s + c.leads, 0);
    return { spend: Math.round(spend * 100) / 100, leads, cpl: leads ? Math.round((spend / leads) * 100) / 100 : null, n: periodRows.length };
  }, [periodRows]);

  const byUnit = useMemo(() => {
    if (!data) return [];
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
      spend = Math.round(spend * 100) / 100;
      return { unit: u, spend, leads, cpl: leads ? Math.round((spend / leads) * 100) / 100 : null };
    });
  }, [data, period]);

  const trendRows = useMemo(() => {
    if (!data) return [];
    const days = period === '30d' ? 30 : 7;
    const end = data.today;
    const start = addDays(end, -(days - 1));
    const ids = new Set(activeCampaigns.map((c) => c.id));
    const byDate = new Map<string, { spend: number; leads: number }>();
    for (const r of data.daily) {
      if (r.date < start || r.date > end) continue;
      if (!ids.has(r.campaign_id)) continue;
      const cur = byDate.get(r.date) || { spend: 0, leads: 0 };
      cur.spend += r.spend; cur.leads += r.leads;
      byDate.set(r.date, cur);
    }
    const out = [];
    for (let i = 0; i < days; i++) {
      const d = addDays(start, i);
      const r = byDate.get(d) || { spend: 0, leads: 0 };
      out.push({ date: d, spend: Math.round(r.spend * 100) / 100, leads: r.leads });
    }
    return out;
  }, [data, period, activeCampaigns]);

  const sortedCampaigns = useMemo(() => {
    let rows = periodRows.slice();
    if (search) rows = rows.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));
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
  }, [periodRows, search, sort]);

  const creativeGroups = useMemo(() => {
    if (!data) return [];
    const activeIds = new Set(activeCampaigns.map((c) => c.id));
    const map = new Map<string, { name: string; status: string; unit: string; kind: string; rows: Creative[] }>();
    for (const row of data.creatives) {
      if (!activeIds.has(row.campaign_id)) continue;
      if (!map.has(row.campaign_id)) {
        map.set(row.campaign_id, { name: row.campaign_name, status: row.campaign_status, unit: row.unit, kind: row.kind, rows: [] });
      }
      map.get(row.campaign_id)!.rows.push(row);
    }
    return Array.from(map.values());
  }, [data, activeCampaigns]);

  const toggleSort = (field: string) => {
    setSort((s) => ({ field, dir: s.field === field && s.dir === 'desc' ? 'asc' : 'desc' }));
  };

  return (
    <div>
      <nav className="site-nav">
        <div className="wrap site-nav-in">
          <div className="site-brand">
            <img src="https://raw.githubusercontent.com/tiaghosilva93-blip/thiago/claude/focused-thompson-l4ro8p/falcon-dashboard/public/logo.png" alt="Falcon" style={{ width: '2rem', height: '2rem', objectFit: 'contain' }} />
            <span>Falcon 7</span>
          </div>
          <div className="site-links">
            <button className="tab-link" data-active={tab === 'overview'} onClick={() => setTab('overview')}>Visão Geral</button>
            <button className="tab-link" data-active={tab === 'creatives'} onClick={() => setTab('creatives')}>Criativos</button>
          </div>
          <div className="nav-actions">
            <button className="btn-ghost" onClick={load} disabled={refreshing}>
              <svg className={refreshing ? 'spin' : ''} viewBox="0 0 16 16" width="13" height="13"><path d="M13.65 2.35A7 7 0 1 0 15 8h-1.5a5.5 5.5 0 1 1-1.6-4.4L10 5.5h5V.5l-1.35 1.85Z" fill="currentColor" /></svg>
              Atualizar
            </button>
          </div>
        </div>
      </nav>

      <div className="hero">
        <div className="wrap hero-in">
          <div>
            <span className="eyebrow mono">— Painel de campanhas</span>
            <h1>Como estão as campanhas ativas da Falcon 7</h1>
            <p className="lede">
              {loading ? <span className="skeleton">carregando…</span> : error ? 'Não foi possível carregar os dados agora.' :
                `${kpis.n} campanhas ativas${unit !== 'all' ? ` em ${unit}` : ''} · ${PERIOD_LABEL[period]}: ${fmtInt(kpis.leads)} leads por ${fmtBRL(kpis.spend)} investidos (CPL ${fmtCPL(kpis.cpl)}).`}
            </p>
          </div>

          <div className="period-filter mono">
            {(['today', 'yesterday', '7d', '30d'] as Period[]).map((p) => (
              <button key={p} data-active={period === p} onClick={() => setPeriod(p)}>{PERIOD_LABEL[p]}</button>
            ))}
          </div>

          <div className="hero-stats">
            <div className="hero-stat-main">
              <span className="label">Leads gerados · {PERIOD_LABEL[period]}</span>
              <span className={`value ${loading ? 'skeleton' : ''}`}>{loading ? '—' : fmtInt(kpis.leads)}</span>
            </div>
            <div className="hero-stat-row">
              <div className="hero-stat">
                <span className="label">Investimento · {PERIOD_LABEL[period]}</span>
                <span className={`value ${loading ? 'skeleton' : ''}`}>{loading ? '—' : fmtBRL(kpis.spend)}</span>
              </div>
              <div className="hero-stat">
                <span className="label">CPL médio · {PERIOD_LABEL[period]}</span>
                <span className={`value ${loading ? 'skeleton' : ''}`}>{loading ? '—' : fmtCPL(kpis.cpl)}</span>
              </div>
              <div className="hero-stat">
                <span className="label">Campanhas ativas</span>
                <span className={`value ${loading ? 'skeleton' : ''}`}>{loading ? '—' : fmtInt(kpis.n)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ marginTop: '1.5rem' }}>
        <div className="unit-filter">
          {(['all', 'Méier', 'Taquara'] as const).map((u) => (
            <button key={u} data-active={unit === u} onClick={() => setUnit(u)}>{u === 'all' ? 'Todas as unidades' : u}</button>
          ))}
        </div>
      </div>

      {error && (
        <div className="wrap" style={{ marginTop: '1.5rem' }}>
          <div className="error-banner">
            Não consegui carregar os dados da Meta agora: {error}. Clique em &quot;Atualizar&quot; para tentar de novo.
          </div>
        </div>
      )}

      {tab === 'overview' && (
        <section>
          <div className="section">
            <div className="wrap">
              <div className="section-head">
                <span className="eyebrow-dark"><span className="dot" style={{ background: COLORS[0] }} />Investimento e leads</span>
                <h2>Ritmo dia a dia</h2>
                <p>Gasto e geração de leads somados das campanhas ativas{unit !== 'all' ? ` de ${unit}` : ''}, últimos {period === '30d' ? 30 : 7} dias.</p>
              </div>
              <div className="section-grid">
                <div className="panel">
                  <h3>Investimento por dia</h3>
                  <BarChart rows={trendRows} field="spend" color={COLORS[0]} money />
                </div>
                <div className="panel">
                  <h3>Leads por dia</h3>
                  <BarChart rows={trendRows} field="leads" color={COLORS[1]} money={false} />
                </div>
              </div>
            </div>
          </div>

          <div className="section tint">
            <div className="wrap">
              <div className="section-head">
                <span className="eyebrow-dark"><span className="dot" style={{ background: COLORS[1] }} />Por unidade</span>
                <h2>Méier x Taquara</h2>
                <p>Soma das campanhas ativas de cada unidade · {PERIOD_LABEL[period]}.</p>
              </div>
              <div className="panel">
                <table className="datatable">
                  <thead><tr><th>Unidade</th><th>Investimento</th><th>Leads</th><th>CPL</th></tr></thead>
                  <tbody>
                    {byUnit.map((r) => (
                      <tr key={r.unit}><td><b>{r.unit}</b></td><td>{fmtBRL(r.spend)}</td><td>{fmtInt(r.leads)}</td><td>{fmtCPL(r.cpl)}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="wrap">
              <div className="section-head">
                <span className="eyebrow-dark"><span className="dot" style={{ background: COLORS[2] }} />Todas as campanhas</span>
                <h2>Campanhas ativas{unit !== 'all' ? ` — ${unit}` : ''}</h2>
                <p>Clique num cabeçalho para ordenar. Valores de {PERIOD_LABEL[period]}.</p>
              </div>
              <div className="panel">
                <div className="search-row">
                  <input type="search" placeholder="Buscar por nome…" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="table-scroll">
                  <table className="datatable">
                    <thead>
                      <tr>
                        <th onClick={() => toggleSort('name')}>Campanha</th>
                        <th onClick={() => toggleSort('unit')}>Unidade</th>
                        <th onClick={() => toggleSort('kind')}>Tipo</th>
                        <th onClick={() => toggleSort('format')}>Formato</th>
                        <th onClick={() => toggleSort('daily_budget')}>Orçamento/dia</th>
                        <th onClick={() => toggleSort('spend')}>Gasto</th>
                        <th onClick={() => toggleSort('leads')}>Leads</th>
                        <th onClick={() => toggleSort('cpl')}>CPL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedCampaigns.map((r) => (
                        <tr key={r.id}>
                          <td>{r.name}</td>
                          <td><Chip text={r.unit} /></td>
                          <td><Chip text={r.kind} /></td>
                          <td>{r.format}</td>
                          <td>{fmtBRL(r.daily_budget)}</td>
                          <td>{fmtBRL(r.spend)}</td>
                          <td>{fmtInt(r.leads)}</td>
                          <td>{fmtCPL(r.cpl)}</td>
                        </tr>
                      ))}
                      {!loading && sortedCampaigns.length === 0 && (
                        <tr><td colSpan={8} style={{ color: '#5b6b84' }}>Nenhuma campanha encontrada.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {tab === 'creatives' && (
        <section>
          <div className="section tint">
            <div className="wrap">
              <div className="panel" style={{ gap: '1.5rem' }}>
                {creativeGroups.map((grp) => {
                  return (
                    <div className="creatives-group" key={grp.name}>
                      <h3>{grp.name}</h3>
                      <div className="ad-grid">
                        {grp.rows.map((ad) => {
                          const isVideo = ad.format === 'Vídeo';
                          return (
                            <div className="ad-card" key={ad.ad_id} onClick={() => setLightbox({ ad, group: { name: grp.name } })}>
                              <div className="thumb-wrap">
                                {ad.thumb && <img src={ad.thumb} alt={ad.ad_name} loading="lazy" />}
                                {isVideo && (
                                  <div className="play-badge">
                                    <svg viewBox="0 0 16 16" fill="#fff"><path d="M4 2.5v11l10-5.5-10-5.5Z" /></svg>
                                  </div>
                                )}
                                <StatusPill status={ad.ad_status} />
                                <span className="amp">Ampliar</span>
                              </div>
                              <div className="ad-info"><span className="ad-name">{ad.ad_name}</span></div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                {!loading && creativeGroups.length === 0 && <p style={{ color: '#5b6b84' }}>Nenhum criativo encontrado para esse filtro.</p>}
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="site-footer">
        <div className="wrap footer-in">
          <div className="footer-brand">
            <img src="https://raw.githubusercontent.com/tiaghosilva93-blip/thiago/claude/focused-thompson-l4ro8p/falcon-dashboard/public/logo.png" alt="Falcon" style={{ width: '1.7rem', height: '1.7rem', objectFit: 'contain' }} />
            <span>Falcon Colégio & Curso</span>
          </div>
          <span className="note mono">
            Painel interno · dados do Gerenciador de Anúncios Meta · atualizado {data ? new Date(data.generated_at).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) : '—'}
          </span>
        </div>
      </footer>

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
              ) : (
                lightbox.ad.full_img && <img src={lightbox.ad.full_img} alt={lightbox.ad.ad_name} />
              )}
            </div>
            <div className="lightbox-body">
              <span className="lb-name">{lightbox.ad.ad_name}</span>
              <div className="lb-chips">
                <Chip text={lightbox.ad.unit} />
                <Chip text={lightbox.ad.kind} />
                <Chip text={lightbox.ad.format} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
