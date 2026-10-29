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

const KIND_COLOR: Record<string, string> = {
  'Bolsão': '#ff7900',
  'Kids': '#36d1a8',
  'Concurso': '#4fa3ff',
  'Institucional': '#ffc857',
  'Alcance': '#ff5d8f',
  'Outro': '#8c93b8',
};

const fmtBRL = (v: number) => 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtBRLShort = (v: number) => {
  if (Math.abs(v) >= 1000) return 'R$ ' + (v / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + 'k';
  return fmtBRL(v);
};
const fmtInt = (v: number) => v.toLocaleString('pt-BR');
const fmtCPL = (v: number | null) => (v === null || v === undefined ? '—' : fmtBRL(v));
const imgProxy = (u: string | null) => (u ? `/api/img?u=${encodeURIComponent(u)}` : null);

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

function previousPeriodRange(period: Period, today: string): [string, string] {
  if (period === 'today') { const d = addDays(today, -1); return [d, d]; }
  if (period === 'yesterday') { const d = addDays(today, -2); return [d, d]; }
  if (period === '30d') return [addDays(today, -59), addDays(today, -30)];
  return [addDays(today, -13), addDays(today, -7)];
}

function sumRange(daily: DailyRow[], ids: Set<string>, start: string, end: string) {
  let spend = 0, leads = 0;
  for (const r of daily) {
    if (r.date < start || r.date > end) continue;
    if (!ids.has(r.campaign_id)) continue;
    spend += r.spend; leads += r.leads;
  }
  spend = Math.round(spend * 100) / 100;
  return { spend, leads, cpl: leads ? Math.round((spend / leads) * 100) / 100 : null };
}

function Delta({ curr, prev, invert = false, suffix = '' }: { curr: number; prev: number; invert?: boolean; suffix?: string }) {
  if (!prev) {
    if (!curr) return <span className="delta flat">sem dado anterior</span>;
    return <span className="delta up">novo{suffix}</span>;
  }
  const pct = ((curr - prev) / prev) * 100;
  const up = pct >= 0;
  const good = invert ? !up : up;
  if (Math.abs(pct) < 0.05) return <span className="delta flat">estável</span>;
  return (
    <span className={`delta ${good ? 'good' : 'bad'}`}>
      {up ? '▲' : '▼'} {Math.abs(pct).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%{suffix}
    </span>
  );
}

function Icon({ name }: { name: string }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'wallet':
      return <svg {...common}><path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" /><path d="M16 12h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3a2 2 0 0 1 0-4Z" /></svg>;
    case 'users':
      return <svg {...common}><circle cx="9" cy="8" r="3" /><path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" /><circle cx="17" cy="9" r="2.5" /><path d="M16 14.3c2.9.4 5 2.5 5 5.7" /></svg>;
    case 'target':
      return <svg {...common}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>;
    case 'megaphone':
      return <svg {...common}><path d="M3 10v4a1 1 0 0 0 1 1h2l5 4V5L6 9H4a1 1 0 0 0-1 1Z" /><path d="M16 9a3 3 0 0 1 0 6" /><path d="M19 6a7 7 0 0 1 0 12" /></svg>;
    case 'image':
      return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9.5" r="1.5" /><path d="M21 16l-5.5-5.5L7 19" /></svg>;
    case 'gauge':
      return <svg {...common}><path d="M4 14a8 8 0 1 1 16 0" /><path d="M12 14l4-5" /><path d="M4 20h16" /></svg>;
    case 'refresh':
      return <svg {...common} strokeWidth={2}><path d="M4 4v5h5" /><path d="M20 20v-5h-5" /><path d="M5.5 9A7 7 0 0 1 19 9" /><path d="M18.5 15a7 7 0 0 1-13.5 0" /></svg>;
    case 'play':
      return <svg viewBox="0 0 16 16" width="14" height="14" fill="#fff"><path d="M4 2.5v11l10-5.5-10-5.5Z" /></svg>;
    default:
      return null;
  }
}

function KpiCard({ glow, icon, title, value, sub, children }: { glow: string; icon: string; title: string; value: string; sub?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="kpi-card" style={{ ['--glow' as any]: glow }}>
      <div className="kpi-top">
        <span className="kpi-title">{title}</span>
        <span className="kpi-icon"><Icon name={icon} /></span>
      </div>
      <div className="kpi-value">{value}</div>
      {sub && <div className="kpi-sub">{sub}</div>}
      {children}
    </div>
  );
}

function smoothPath(points: { x: number; y: number }[]) {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1], curr = points[i];
    const midX = (prev.x + curr.x) / 2;
    const midY = (prev.y + curr.y) / 2;
    d += ` Q ${prev.x} ${prev.y} ${midX} ${midY}`;
  }
  const last = points[points.length - 1];
  d += ` T ${last.x} ${last.y}`;
  return d;
}

function TrendArea({ rows }: { rows: { date: string; spend: number; leads: number }[] }) {
  const [hover, setHover] = useState<{ i: number; x: number } | null>(null);
  const width = 680, height = 240, margin = { top: 16, right: 16, bottom: 28, left: 16 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const maxSpend = Math.max(1, ...rows.map((r) => r.spend)) * 1.15;
  const maxLeads = Math.max(1, ...rows.map((r) => r.leads)) * 1.15;
  const stepX = rows.length > 1 ? innerW / (rows.length - 1) : 0;

  const spendPts = rows.map((r, i) => ({ x: margin.left + i * stepX, y: margin.top + innerH - (r.spend / maxSpend) * innerH }));
  const leadsPts = rows.map((r, i) => ({ x: margin.left + i * stepX, y: margin.top + innerH - (r.leads / maxLeads) * innerH }));

  const spendLine = smoothPath(spendPts);
  const leadsLine = smoothPath(leadsPts);
  const bottomY = margin.top + innerH;
  const spendArea = spendPts.length ? `${spendLine} L ${spendPts[spendPts.length - 1].x} ${bottomY} L ${spendPts[0].x} ${bottomY} Z` : '';
  const leadsArea = leadsPts.length ? `${leadsLine} L ${leadsPts[leadsPts.length - 1].x} ${bottomY} L ${leadsPts[0].x} ${bottomY} Z` : '';

  const ticks = [0, 0.25, 0.5, 0.75, 1];
  const showEvery = Math.max(1, Math.ceil(rows.length / 8));

  return (
    <div className="chart-box trend-box">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradSpend" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff7900" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ff7900" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gradLeads" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#36d1a8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#36d1a8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t, i) => (
          <line key={i} x1={margin.left} x2={width - margin.right} y1={margin.top + innerH * (1 - t)} y2={margin.top + innerH * (1 - t)} className="gridline" />
        ))}
        <path d={leadsArea} fill="url(#gradLeads)" />
        <path d={spendArea} fill="url(#gradSpend)" />
        <path d={leadsLine} fill="none" stroke="#36d1a8" strokeWidth="2.5" className="trend-line" />
        <path d={spendLine} fill="none" stroke="#ff7900" strokeWidth="2.5" className="trend-line" />
        {rows.map((r, i) => (
          i % showEvery === 0 && (
            <text key={i} x={margin.left + i * stepX} y={height - 6} textAnchor="middle" className="axis-text">
              {r.date.slice(8, 10)}/{r.date.slice(5, 7)}
            </text>
          )
        ))}
        {rows.map((r, i) => (
          <rect key={i} x={margin.left + i * stepX - stepX / 2} y={margin.top} width={Math.max(stepX, 4)} height={innerH}
            fill="transparent" onMouseEnter={() => setHover({ i, x: margin.left + i * stepX })} onMouseLeave={() => setHover(null)} style={{ cursor: 'crosshair' }} />
        ))}
        {hover && <line x1={hover.x} x2={hover.x} y1={margin.top} y2={bottomY} className="crosshair" />}
        {hover && <circle cx={spendPts[hover.i]?.x} cy={spendPts[hover.i]?.y} r="4" fill="#ff7900" />}
        {hover && <circle cx={leadsPts[hover.i]?.x} cy={leadsPts[hover.i]?.y} r="4" fill="#36d1a8" />}
      </svg>
      {hover && rows[hover.i] && (
        <div className="tooltip" style={{ opacity: 1, left: `${(hover.x / width) * 100}%` }}>
          <div className="t-date">{rows[hover.i].date.slice(8, 10)}/{rows[hover.i].date.slice(5, 7)}</div>
          <div className="t-row"><span className="sw" style={{ background: '#ff7900' }} /> {fmtBRL(rows[hover.i].spend)}</div>
          <div className="t-row"><span className="sw" style={{ background: '#36d1a8' }} /> {fmtInt(rows[hover.i].leads)} leads</div>
        </div>
      )}
      <div className="trend-legend">
        <span><i style={{ background: '#ff7900' }} /> Investimento</span>
        <span><i style={{ background: '#36d1a8' }} /> Leads</span>
      </div>
    </div>
  );
}

function Donut({ segments, centerLabel, centerValue }: { segments: { label: string; value: number; color: string }[]; centerLabel: string; centerValue: string }) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  const r = 58, cx = 80, cy = 80, strokeWidth = 20;
  const circumference = 2 * Math.PI * r;
  let cumulative = 0;
  return (
    <div className="donut-wrap">
      <svg viewBox="0 0 160 160" width="160" height="160">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--grid-line)" strokeWidth={strokeWidth} />
        {total > 0 && (
          <g transform={`rotate(-90 ${cx} ${cy})`}>
            {segments.filter((s) => s.value > 0).map((s, i) => {
              const len = (s.value / total) * circumference;
              const dash = `${len} ${circumference - len}`;
              const el = (
                <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={strokeWidth}
                  strokeDasharray={dash} strokeDashoffset={-cumulative} className="donut-seg" />
              );
              cumulative += len;
              return el;
            })}
          </g>
        )}
        <text x={cx} y={cy - 4} textAnchor="middle" className="donut-center-value">{centerValue}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" className="donut-center-label">{centerLabel}</text>
      </svg>
      <div className="donut-legend">
        {segments.map((s, i) => (
          <div className="legend-row" key={i}>
            <span className="dot" style={{ background: s.color }} />
            <span className="legend-label">{s.label}</span>
            <span className="legend-value">{total ? Math.round((s.value / total) * 100) : 0}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function UnitBars({ rows }: { rows: { unit: string; spend: number }[] }) {
  const max = Math.max(1, ...rows.map((r) => r.spend)) * 1.2;
  const colors = ['#ff7900', '#4fa3ff'];
  return (
    <div className="unit-bars">
      {rows.map((r, i) => (
        <div className="unit-bar-col" key={r.unit}>
          <span className="unit-bar-value">{fmtBRLShort(r.spend)}</span>
          <div className="unit-bar-track">
            <div className="unit-bar-fill" style={{ height: `${Math.max(4, (r.spend / max) * 100)}%`, background: `linear-gradient(180deg, ${colors[i % 2]}, ${colors[i % 2]}66)` }} />
          </div>
          <span className="unit-bar-label">{r.unit}</span>
        </div>
      ))}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const active = status === 'ACTIVE';
  return <span className={`pill ${active ? 'active' : 'paused'}`}>{active ? 'Ativa' : 'Pausada'}</span>;
}

function Chip({ text, color }: { text: string; color?: string }) {
  const c = color || '#8c93b8';
  return <span className="chip" style={{ color: c, background: c + '26' }}>{text}</span>;
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

  const activeIds = useMemo(() => new Set(activeCampaigns.map((c) => c.id)), [activeCampaigns]);

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

  const prevKpis = useMemo(() => {
    if (!data) return { spend: 0, leads: 0, cpl: null as number | null };
    const [start, end] = previousPeriodRange(period, data.today);
    return sumRange(data.daily, activeIds, start, end);
  }, [data, activeIds, period]);

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
    const byDate = new Map<string, { spend: number; leads: number }>();
    for (const r of data.daily) {
      if (r.date < start || r.date > end) continue;
      if (!activeIds.has(r.campaign_id)) continue;
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
  }, [data, period, activeIds]);

  const todayPacing = useMemo(() => {
    if (!data) return { spent: 0, budget: 0, pct: 0 };
    let spent = 0;
    for (const r of data.daily) {
      if (r.date === data.today && activeIds.has(r.campaign_id)) spent += r.spend;
    }
    const budget = activeCampaigns.reduce((s, c) => s + c.daily_budget, 0);
    spent = Math.round(spent * 100) / 100;
    return { spent, budget, pct: budget ? Math.min(100, Math.round((spent / budget) * 100)) : 0 };
  }, [data, activeIds, activeCampaigns]);

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
    const map = new Map<string, { name: string; status: string; unit: string; kind: string; rows: Creative[] }>();
    for (const row of data.creatives) {
      if (!activeIds.has(row.campaign_id)) continue;
      if (!map.has(row.campaign_id)) {
        map.set(row.campaign_id, { name: row.campaign_name, status: row.campaign_status, unit: row.unit, kind: row.kind, rows: [] });
      }
      map.get(row.campaign_id)!.rows.push(row);
    }
    return Array.from(map.values());
  }, [data, activeIds]);

  const creativesStats = useMemo(() => {
    let total = 0, activeCount = 0, video = 0, image = 0;
    const byKind = new Map<string, number>();
    for (const grp of creativeGroups) {
      for (const ad of grp.rows) {
        total++;
        if (ad.ad_status === 'ACTIVE') activeCount++;
        if (ad.format === 'Vídeo') video++; else image++;
        byKind.set(grp.kind, (byKind.get(grp.kind) || 0) + 1);
      }
    }
    const kindSegments = Array.from(byKind.entries()).map(([label, value]) => ({ label, value, color: KIND_COLOR[label] || KIND_COLOR.Outro }));
    return { total, activeCount, video, image, kindSegments };
  }, [creativeGroups]);

  const toggleSort = (field: string) => {
    setSort((s) => ({ field, dir: s.field === field && s.dir === 'desc' ? 'asc' : 'desc' }));
  };

  return (
    <div>
      <nav className="site-nav">
        <div className="wrap site-nav-in">
          <div className="site-brand">
            <img src="https://raw.githubusercontent.com/tiaghosilva93-blip/thiago/claude/focused-thompson-l4ro8p/falcon-dashboard/public/logo.png" alt="Falcon" />
            <div className="site-brand-text">
              <span className="brand-title">FALCON 7 DASHBOARD</span>
              <span className="brand-sub mono">{data ? new Date(data.generated_at).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: 'long', year: 'numeric' }) : '—'}</span>
            </div>
          </div>
          <div className="site-links">
            <button className="tab-link" data-active={tab === 'overview'} onClick={() => setTab('overview')}>Visão Geral</button>
            <button className="tab-link" data-active={tab === 'creatives'} onClick={() => setTab('creatives')}>Criativos</button>
          </div>
          <div className="nav-actions">
            <button className="btn-ghost" onClick={load} disabled={refreshing} aria-label="Atualizar">
              <span className={refreshing ? 'spin' : ''}><Icon name="refresh" /></span>
            </button>
          </div>
        </div>
      </nav>

      <div className="wrap toolbar-row">
        <div className="period-filter mono">
          {(['today', 'yesterday', '7d', '30d'] as Period[]).map((p) => (
            <button key={p} data-active={period === p} onClick={() => setPeriod(p)}>{PERIOD_LABEL[p]}</button>
          ))}
        </div>
        <div className="unit-filter">
          {(['all', 'Méier', 'Taquara'] as const).map((u) => (
            <button key={u} data-active={unit === u} onClick={() => setUnit(u)}>{u === 'all' ? 'Todas as unidades' : u}</button>
          ))}
        </div>
      </div>

      {error && (
        <div className="wrap" style={{ marginTop: '1rem' }}>
          <div className="error-banner">
            Não consegui carregar os dados da Meta agora: {error}. Clique no ícone de atualizar para tentar de novo.
          </div>
        </div>
      )}

      {tab === 'overview' && (
        <section className="wrap main-col">
          <div className="kpi-grid">
            <KpiCard glow="#ff7900" icon="wallet" title={`Investimento · ${PERIOD_LABEL[period]}`} value={loading ? '—' : fmtBRL(kpis.spend)}>
              {!loading && <Delta curr={kpis.spend} prev={prevKpis.spend} />}
            </KpiCard>
            <KpiCard glow="#36d1a8" icon="users" title={`Leads · ${PERIOD_LABEL[period]}`} value={loading ? '—' : fmtInt(kpis.leads)}>
              {!loading && <Delta curr={kpis.leads} prev={prevKpis.leads} />}
            </KpiCard>
            <KpiCard glow="#ffc857" icon="target" title={`CPL médio · ${PERIOD_LABEL[period]}`} value={loading ? '—' : fmtCPL(kpis.cpl)}>
              {!loading && kpis.cpl !== null && prevKpis.cpl !== null && <Delta curr={kpis.cpl} prev={prevKpis.cpl} invert />}
              {!loading && (kpis.cpl === null || prevKpis.cpl === null) && <span className="delta flat">sem leads suficientes</span>}
            </KpiCard>
            <KpiCard glow="#ff5d8f" icon="megaphone" title="Campanhas ativas" value={loading ? '—' : fmtInt(kpis.n)}
              sub={!loading ? `${activeCampaigns.filter((c) => c.unit === 'Méier').length} Méier · ${activeCampaigns.filter((c) => c.unit === 'Taquara').length} Taquara` : undefined} />
            <KpiCard glow="#36d1a8" icon="image" title="Criativos no ar" value={loading ? '—' : fmtInt(creativesStats.activeCount)}
              sub={!loading ? `${creativesStats.image} imagens · ${creativesStats.video} vídeos` : undefined} />
            <KpiCard glow="#4fa3ff" icon="gauge" title="Ritmo do orçamento hoje" value={loading ? '—' : `${todayPacing.pct}%`}
              sub={!loading ? `${fmtBRL(todayPacing.spent)} de ${fmtBRL(todayPacing.budget)}` : undefined} />
          </div>

          <div className="panel-grid">
            <div className="panel wide">
              <div className="panel-head">
                <h3>Investimento &amp; Leads</h3>
                <span className="panel-sub">últimos {period === '30d' ? 30 : 7} dias{unit !== 'all' ? ` · ${unit}` : ''}</span>
              </div>
              <TrendArea rows={trendRows} />
            </div>
            <div className="panel">
              <div className="panel-head">
                <h3>Criativos por tipo</h3>
                <span className="panel-sub">campanhas ativas</span>
              </div>
              {loading ? <div className="skeleton" style={{ height: '160px' }} /> : (
                <Donut segments={creativesStats.kindSegments} centerValue={String(creativesStats.total)} centerLabel="criativos" />
              )}
            </div>
            <div className="panel">
              <div className="panel-head">
                <h3>Investimento por unidade</h3>
                <span className="panel-sub">{PERIOD_LABEL[period]}</span>
              </div>
              {loading ? <div className="skeleton" style={{ height: '160px' }} /> : <UnitBars rows={byUnit} />}
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <h3>Campanhas ativas{unit !== 'all' ? ` — ${unit}` : ''}</h3>
              <span className="panel-sub">Clique num cabeçalho para ordenar · Valores de {PERIOD_LABEL[period]}</span>
            </div>
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
                      <td><Chip text={r.unit} color="#4fa3ff" /></td>
                      <td><Chip text={r.kind} color={KIND_COLOR[r.kind] || KIND_COLOR.Outro} /></td>
                      <td>{r.format}</td>
                      <td>{fmtBRL(r.daily_budget)}</td>
                      <td>{fmtBRL(r.spend)}</td>
                      <td>{fmtInt(r.leads)}</td>
                      <td>{fmtCPL(r.cpl)}</td>
                    </tr>
                  ))}
                  {!loading && sortedCampaigns.length === 0 && (
                    <tr><td colSpan={8} style={{ color: 'var(--muted)' }}>Nenhuma campanha encontrada.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {tab === 'creatives' && (
        <section className="wrap main-col">
          <div className="panel">
            {creativeGroups.map((grp) => (
              <div className="creatives-group" key={grp.name}>
                <h3>{grp.name}</h3>
                <div className="ad-grid">
                  {grp.rows.map((ad) => {
                    const isVideo = ad.format === 'Vídeo';
                    const proxiedThumb = imgProxy(ad.thumb);
                    return (
                      <div className="ad-card" key={ad.ad_id} onClick={() => setLightbox({ ad, group: { name: grp.name } })}>
                        <div className="thumb-wrap">
                          {proxiedThumb && <img src={proxiedThumb} alt={ad.ad_name} loading="lazy" />}
                          {isVideo && <div className="play-badge"><Icon name="play" /></div>}
                          <StatusPill status={ad.ad_status} />
                          <span className="amp">Ampliar</span>
                        </div>
                        <div className="ad-info"><span className="ad-name">{ad.ad_name}</span></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            {!loading && creativeGroups.length === 0 && <p style={{ color: 'var(--muted)' }}>Nenhum criativo encontrado para esse filtro.</p>}
          </div>
        </section>
      )}

      <footer className="site-footer">
        <div className="wrap footer-in">
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
