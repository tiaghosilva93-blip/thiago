'use client';

import { useEffect, useRef, useState } from 'react';
import {
  DatePreset, DateRange, DATE_PRESET_LABEL, DATE_PRESET_ORDER, rangeForPreset, dateRangeLabel, formatDateBR,
} from '../lib/format';
import { Icon } from './ui';

const RECENT_KEY = 'falcon7_recent_date_presets_v1';

function loadRecent(): DatePreset[] {
  if (typeof window === 'undefined') return ['today', '7d'];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    if (!raw) return ['today', '7d'];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : ['today', '7d'];
  } catch {
    return ['today', '7d'];
  }
}

function pushRecent(preset: DatePreset) {
  if (typeof window === 'undefined' || preset === 'custom') return;
  try {
    const curr = loadRecent().filter((p) => p !== preset);
    const next = [preset, ...curr].slice(0, 4);
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function DateRangePicker({ value, onChange, today }: { value: DateRange; onChange: (r: DateRange) => void; today: string }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<DateRange>(value);
  const [customStart, setCustomStart] = useState(value.start);
  const [customEnd, setCustomEnd] = useState(value.end);
  const [recent, setRecent] = useState<DatePreset[]>(['today', '7d']);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setRecent(loadRecent()); }, []);

  useEffect(() => {
    if (!open) return;
    setDraft(value);
    setCustomStart(value.start);
    setCustomEnd(value.end);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open, value]);

  const pickPreset = (preset: DatePreset) => {
    const [s, e] = preset === 'custom' ? [customStart, customEnd] : rangeForPreset(preset, today);
    setDraft((d) => ({ ...d, preset, start: s, end: e }));
  };

  const apply = () => {
    const final = draft.preset === 'custom' ? { ...draft, start: customStart, end: customEnd } : draft;
    onChange(final);
    pushRecent(final.preset);
    setRecent(loadRecent());
    setOpen(false);
  };

  return (
    <div className="date-picker-wrap" ref={ref}>
      <button type="button" className="date-picker-trigger" onClick={() => setOpen((v) => !v)}>
        <Icon name="clock" />
        {dateRangeLabel(value)}
      </button>
      {open && (
        <div className="date-picker-pop">
          <div className="date-picker-presets">
            {recent.length > 0 && (
              <>
                <div className="dp-section-label">Usados recentemente</div>
                {recent.map((p) => (
                  <button key={`recent-${p}`} data-active={draft.preset === p} onClick={() => pickPreset(p)}>
                    <span className={`dp-radio ${draft.preset === p ? 'on' : ''}`} />
                    {DATE_PRESET_LABEL[p]}
                  </button>
                ))}
                <div className="dp-section-label" />
              </>
            )}
            {DATE_PRESET_ORDER.map((p) => (
              <button key={p} data-active={draft.preset === p} onClick={() => pickPreset(p)}>
                <span className={`dp-radio ${draft.preset === p ? 'on' : ''}`} />
                {DATE_PRESET_LABEL[p]}
              </button>
            ))}
            <button data-active={draft.preset === 'custom'} onClick={() => pickPreset('custom')}>
              <span className={`dp-radio ${draft.preset === 'custom' ? 'on' : ''}`} />
              Personalizado
            </button>
          </div>
          <div className="date-picker-body">
            <div className="dp-range-label">{DATE_PRESET_LABEL[draft.preset]}</div>
            {draft.preset === 'custom' ? (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input type="date" className="settings-input" value={customStart} max={today} onChange={(e) => { setCustomStart(e.target.value); setDraft((d) => ({ ...d, start: e.target.value })); }} />
                <span className="dp-range-sub">até</span>
                <input type="date" className="settings-input" value={customEnd} max={today} onChange={(e) => { setCustomEnd(e.target.value); setDraft((d) => ({ ...d, end: e.target.value })); }} />
              </div>
            ) : (
              <div className="dp-range-sub">{formatDateBR(draft.start)} — {formatDateBR(draft.end)}</div>
            )}

            <div className="dp-compare-row">
              <span className={`dp-check ${draft.compare ? 'on' : ''}`} onClick={() => setDraft((d) => ({ ...d, compare: !d.compare }))}>
                {draft.compare && <Icon name="check" />}
              </span>
              <span>Comparar com o período anterior equivalente</span>
            </div>

            <div className="dp-actions">
              <button className="btn-secondary" onClick={() => setOpen(false)}>Cancelar</button>
              <button className="btn-secondary" style={{ background: 'linear-gradient(135deg, var(--orange), #ffb15c)', color: '#0a0d1f', border: 'none' }} onClick={apply}>Atualizar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
