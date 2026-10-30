'use client';

import { useState } from 'react';
import { fmtBRL, fmtInt, fmtBRLShort } from '../lib/format';

export function Delta({ curr, prev, invert = false, suffix = '' }: { curr: number; prev: number; invert?: boolean; suffix?: string }) {
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

export function Icon({ name }: { name: string }) {
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
    case 'filter':
      return <svg {...common}><path d="M4 5h16M7 12h10M10 19h4" /></svg>;
    case 'chevron':
      return <svg {...common} strokeWidth={2.2}><path d="M9 6l6 6-6 6" /></svg>;
    case 'alert':
      return <svg {...common}><path d="M12 9v4" /><path d="M12 17h.01" /><path d="M10.3 3.9 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /></svg>;
    case 'check':
      return <svg {...common} strokeWidth={2.4}><path d="M4 12.5l5 5L20 6" /></svg>;
    case 'funnel':
      return <svg {...common}><path d="M4 5h16l-6 8v5l-4 2v-7L4 5Z" /></svg>;
    case 'layers':
      return <svg {...common}><path d="M12 3 3 8l9 5 9-5-9-5Z" /><path d="M3 13l9 5 9-5" /><path d="M3 18l9 5 9-5" /></svg>;
    case 'star':
      return <svg {...common}><path d="M12 3.5l2.6 5.4 5.9.6-4.4 4 1.3 5.8L12 16.5 6.6 19.3l1.3-5.8-4.4-4 5.9-.6L12 3.5Z" /></svg>;
    case 'clock':
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>;
    case 'settings':
      return <svg {...common}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" /></svg>;
    case 'crm':
      return <svg {...common}><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18" /><path d="M8 14h3" /></svg>;
    case 'trend':
      return <svg {...common}><path d="M3 17l5-5 4 4 8-9" /><path d="M14 7h6v6" /></svg>;
    default:
      return null;
  }
}

export function KpiCard({ glow, icon, title, value, sub, children }: { glow: string; icon: string; title: string; value: string; sub?: React.ReactNode; children?: React.ReactNode }) {
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

type Series = { key: string; color: string; label: string; values: number[] };

export function TrendArea({ rows, series, dateKey = 'date' }: { rows: any[]; series: Series[]; dateKey?: string }) {
  const [hover, setHover] = useState<{ i: number; x: number } | null>(null);
  const width = 680, height = 240, margin = { top: 16, right: 16, bottom: 28, left: 16 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const stepX = rows.length > 1 ? innerW / (rows.length - 1) : 0;

  const maxes = series.map((s) => Math.max(1, ...s.values) * 1.15);
  const ptsBySeries = series.map((s, si) => s.values.map((v, i) => ({ x: margin.left + i * stepX, y: margin.top + innerH - (v / maxes[si]) * innerH })));
  const linesBySeries = ptsBySeries.map(smoothPath);
  const bottomY = margin.top + innerH;
  const areasBySeries = ptsBySeries.map((pts, si) => (pts.length ? `${linesBySeries[si]} L ${pts[pts.length - 1].x} ${bottomY} L ${pts[0].x} ${bottomY} Z` : ''));

  const ticks = [0, 0.25, 0.5, 0.75, 1];
  const showEvery = Math.max(1, Math.ceil(rows.length / 8));

  return (
    <div className="chart-box trend-box">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          {series.map((s) => (
            <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {ticks.map((t, i) => (
          <line key={i} x1={margin.left} x2={width - margin.right} y1={margin.top + innerH * (1 - t)} y2={margin.top + innerH * (1 - t)} className="gridline" />
        ))}
        {areasBySeries.map((a, si) => <path key={si} d={a} fill={`url(#grad-${series[si].key})`} />)}
        {linesBySeries.map((l, si) => <path key={si} d={l} fill="none" stroke={series[si].color} strokeWidth="2.5" className="trend-line" />)}
        {rows.map((r, i) => (
          i % showEvery === 0 && (
            <text key={i} x={margin.left + i * stepX} y={height - 6} textAnchor="middle" className="axis-text">
              {String(r[dateKey]).slice(8, 10)}/{String(r[dateKey]).slice(5, 7)}
            </text>
          )
        ))}
        {rows.map((r, i) => (
          <rect key={i} x={margin.left + i * stepX - stepX / 2} y={margin.top} width={Math.max(stepX, 4)} height={innerH}
            fill="transparent" onMouseEnter={() => setHover({ i, x: margin.left + i * stepX })} onMouseLeave={() => setHover(null)} style={{ cursor: 'crosshair' }} />
        ))}
        {hover && <line x1={hover.x} x2={hover.x} y1={margin.top} y2={bottomY} className="crosshair" />}
        {hover && ptsBySeries.map((pts, si) => pts[hover.i] && <circle key={si} cx={pts[hover.i].x} cy={pts[hover.i].y} r="4" fill={series[si].color} />)}
      </svg>
      {hover && rows[hover.i] && (
        <div className="tooltip" style={{ opacity: 1, left: `${(hover.x / width) * 100}%` }}>
          <div className="t-date">{String(rows[hover.i][dateKey]).slice(8, 10)}/{String(rows[hover.i][dateKey]).slice(5, 7)}</div>
          {series.map((s) => (
            <div className="t-row" key={s.key}><span className="sw" style={{ background: s.color }} /> {s.label}: {s.values[hover.i]?.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</div>
          ))}
        </div>
      )}
      <div className="trend-legend">
        {series.map((s) => <span key={s.key}><i style={{ background: s.color }} /> {s.label}</span>)}
      </div>
    </div>
  );
}

export function Sparkline({ values, color, height = 36, width = 120 }: { values: number[]; color: string; height?: number; width?: number }) {
  if (values.length === 0) return <svg width={width} height={height} />;
  const max = Math.max(1, ...values) * 1.1;
  const min = Math.min(0, ...values);
  const range = Math.max(1, max - min);
  const stepX = values.length > 1 ? width / (values.length - 1) : 0;
  const pts = values.map((v, i) => ({ x: i * stepX, y: height - ((v - min) / range) * height }));
  const path = smoothPath(pts);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <path d={path} fill="none" stroke={color} strokeWidth="2" />
      {pts.length > 0 && <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="2.5" fill={color} />}
    </svg>
  );
}

export function Donut({ segments, centerLabel, centerValue }: { segments: { label: string; value: number; color: string }[]; centerLabel: string; centerValue: string }) {
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

export function UnitBars({ rows }: { rows: { unit: string; spend: number }[] }) {
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

export function StatusPill({ status }: { status: string }) {
  const active = status === 'ACTIVE';
  return <span className={`pill ${active ? 'active' : 'paused'}`}>{active ? 'Ativa' : 'Pausada'}</span>;
}

export function HealthPill({ state }: { state: 'ok' | 'learning' | 'alert' }) {
  const map = { ok: { text: 'Saudável', cls: 'ok' }, learning: { text: 'Aprendizado', cls: 'learning' }, alert: { text: 'Alerta', cls: 'alert' } };
  const m = map[state];
  return <span className={`pill health-${m.cls}`}>{m.text}</span>;
}

export function Chip({ text, color }: { text: string; color?: string }) {
  const c = color || '#8c93b8';
  return <span className="chip" style={{ color: c, background: c + '26' }}>{text}</span>;
}

export function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="hbar-track">
      <div className="hbar-fill" style={{ width: `${Math.max(2, Math.min(100, pct))}%`, background: color }} />
    </div>
  );
}

export function RankList({ title, rows, color, valueFmt, worse }: { title: string; rows: { label: string; value: number; sub?: string }[]; color: string; valueFmt: (v: number) => string; worse?: boolean }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <div className="rank-list">
      <div className="rank-list-title">{title}</div>
      {rows.length === 0 && <div className="empty-note">Sem dados suficientes.</div>}
      {rows.map((r, i) => (
        <div className="rank-row" key={i}>
          <span className="rank-idx">{i + 1}</span>
          <div className="rank-main">
            <div className="rank-label" title={r.label}>{r.label}</div>
            <Bar pct={(r.value / max) * 100} color={color} />
          </div>
          <span className="rank-value">{valueFmt(r.value)}</span>
        </div>
      ))}
    </div>
  );
}

export function FunnelChart({ steps }: { steps: { label: string; value: number; color: string; sub?: string }[] }) {
  const max = Math.max(1, ...steps.map((s) => s.value));
  return (
    <div className="funnel-wrap">
      {steps.map((s, i) => {
        const pct = (s.value / max) * 100;
        const prevVal = i > 0 ? steps[i - 1].value : null;
        const convRate = prevVal ? (s.value / prevVal) * 100 : null;
        return (
          <div className="funnel-row" key={i}>
            <div className="funnel-label">{s.label}</div>
            <div className="funnel-bar-track">
              <div className="funnel-bar-fill" style={{ width: `${Math.max(3, pct)}%`, background: s.color }}>
                <span className="funnel-bar-value">{s.value.toLocaleString('pt-BR')}</span>
              </div>
            </div>
            <div className="funnel-side">
              {convRate !== null && <span className="funnel-conv">{convRate.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%</span>}
              {s.sub && <span className="funnel-sub">{s.sub}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function AlertCard({ severity, title, detail }: { severity: 'high' | 'medium' | 'low'; title: string; detail: string }) {
  return (
    <div className={`alert-card sev-${severity}`}>
      <span className="alert-dot" />
      <div className="alert-body">
        <div className="alert-title">{title}</div>
        <div className="alert-detail">{detail}</div>
      </div>
    </div>
  );
}

export function EstimateBadge({ text = 'estimativa' }: { text?: string }) {
  return <span className="estimate-badge" title="Calculado a partir de taxas configuráveis em Configurações — não há integração de CRM conectada ainda.">{text}</span>;
}

export function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" className={`toggle ${checked ? 'on' : ''}`} onClick={() => onChange(!checked)} role="switch" aria-checked={checked}>
      <span className="toggle-knob" />
    </button>
  );
}

export function SettingField({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="setting-field">
      <div className="setting-field-head">
        <span className="setting-label">{label}</span>
        {hint && <span className="setting-hint">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

export { fmtBRL, fmtInt };
