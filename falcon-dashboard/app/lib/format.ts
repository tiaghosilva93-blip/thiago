export const fmtBRL = (v: number) => 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const fmtBRLShort = (v: number) => {
  if (Math.abs(v) >= 1000) return 'R$ ' + (v / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + 'k';
  return fmtBRL(v);
};
export const fmtInt = (v: number) => v.toLocaleString('pt-BR');
export const fmtCPL = (v: number | null) => (v === null || v === undefined ? '—' : fmtBRL(v));
export const fmtPct = (v: number | null, digits = 1) => (v === null || v === undefined ? '—' : v.toLocaleString('pt-BR', { maximumFractionDigits: digits }) + '%');
export const fmtFreq = (v: number | null) => (v === null || v === undefined ? '—' : v.toLocaleString('pt-BR', { maximumFractionDigits: 2 }));

export function toBase64Url(str: string): string {
  const b64 = typeof window !== 'undefined' ? window.btoa(str) : Buffer.from(str, 'utf-8').toString('base64');
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
export const imgProxy = (u: string | null) => (u ? `/api/img?u=${toBase64Url(u)}` : null);

export function addDays(iso: string, delta: number) {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + delta);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export type Period = 'today' | 'yesterday' | '7d' | '30d';
export const PERIOD_LABEL: Record<Period, string> = { today: 'Hoje', yesterday: 'Ontem', '7d': '7 dias', '30d': '30 dias' };

export function periodRange(period: Period, today: string): [string, string] {
  if (period === 'today') return [today, today];
  if (period === 'yesterday') { const y = addDays(today, -1); return [y, y]; }
  if (period === '30d') return [addDays(today, -29), today];
  return [addDays(today, -6), today];
}

export function previousPeriodRange(period: Period, today: string): [string, string] {
  if (period === 'today') { const d = addDays(today, -1); return [d, d]; }
  if (period === 'yesterday') { const d = addDays(today, -2); return [d, d]; }
  if (period === '30d') return [addDays(today, -59), addDays(today, -30)];
  return [addDays(today, -13), addDays(today, -7)];
}

export const KIND_COLOR: Record<string, string> = {
  'Bolsão': '#ff7900',
  'Kids': '#36d1a8',
  'Convivendo': '#ffc857',
  'Colégio': '#9b7dff',
  'Concurso': '#4fa3ff',
  'Institucional': '#ffc857',
  'Alcance': '#ff5d8f',
  'Outro': '#8c93b8',
};

// ---- Ads-Manager-style date range picker ----
export type DatePreset =
  | 'today' | 'yesterday' | 'today_yesterday'
  | '7d' | '14d' | '28d' | '30d'
  | 'this_week' | 'last_week' | 'this_month' | 'last_month'
  | 'custom';

export const DATE_PRESET_LABEL: Record<DatePreset, string> = {
  today: 'Hoje',
  yesterday: 'Ontem',
  today_yesterday: 'Hoje e ontem',
  '7d': 'Últimos 7 dias',
  '14d': 'Últimos 14 dias',
  '28d': 'Últimos 28 dias',
  '30d': 'Últimos 30 dias',
  this_week: 'Esta semana',
  last_week: 'Semana passada',
  this_month: 'Este mês',
  last_month: 'Mês passado',
  custom: 'Personalizado',
};

export const DATE_PRESET_ORDER: DatePreset[] = [
  'today', 'yesterday', 'today_yesterday', '7d', '14d', '28d', '30d',
  'this_week', 'last_week', 'this_month', 'last_month',
];

function startOfWeek(iso: string) {
  // Semana começando na segunda-feira, como no Gerenciador de Anúncios.
  const d = new Date(iso + 'T00:00:00');
  const dow = d.getDay(); // 0 = domingo
  const diff = dow === 0 ? -6 : 1 - dow;
  return addDays(iso, diff);
}

function startOfMonth(iso: string) {
  const d = new Date(iso + 'T00:00:00');
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-01`;
}

export type DateRange = { preset: DatePreset; start: string; end: string; compare: boolean };

export function rangeForPreset(preset: DatePreset, today: string, custom?: { start: string; end: string }): [string, string] {
  switch (preset) {
    case 'today': return [today, today];
    case 'yesterday': { const y = addDays(today, -1); return [y, y]; }
    case 'today_yesterday': return [addDays(today, -1), today];
    case '7d': return [addDays(today, -6), today];
    case '14d': return [addDays(today, -13), today];
    case '28d': return [addDays(today, -27), today];
    case '30d': return [addDays(today, -29), today];
    case 'this_week': return [startOfWeek(today), today];
    case 'last_week': { const thisWeekStart = startOfWeek(today); const lastWeekEnd = addDays(thisWeekStart, -1); return [addDays(lastWeekEnd, -6), lastWeekEnd]; }
    case 'this_month': return [startOfMonth(today), today];
    case 'last_month': { const thisMonthStart = startOfMonth(today); const lastMonthEnd = addDays(thisMonthStart, -1); return [startOfMonth(lastMonthEnd), lastMonthEnd]; }
    case 'custom': return custom ? [custom.start, custom.end] : [today, today];
  }
}

export function comparisonRangeFor(start: string, end: string): [string, string] {
  const d1 = new Date(start + 'T00:00:00'), d2 = new Date(end + 'T00:00:00');
  const spanDays = Math.round((d2.getTime() - d1.getTime()) / 86400000) + 1;
  const prevEnd = addDays(start, -1);
  const prevStart = addDays(prevEnd, -(spanDays - 1));
  return [prevStart, prevEnd];
}

export function formatDateBR(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

export function dateRangeLabel(range: DateRange): string {
  if (range.preset !== 'custom' && range.start === range.end) return `${DATE_PRESET_LABEL[range.preset]}: ${formatDateBR(range.start)}`;
  return `${DATE_PRESET_LABEL[range.preset]}: ${formatDateBR(range.start)} - ${formatDateBR(range.end)}`;
}

export const DEFAULT_DATE_RANGE_PRESET: DatePreset = '7d';

// ---- campaign name simplification (para leitura rápida pelo cliente) ----
export function simplifyCampaignName(c: { name: string; kind: string; unit: string }): string {
  const dateTokens = c.name.match(/\b(\d{1,2})[./-](\d{1,2})\b/g);
  const lastDate = dateTokens && dateTokens.length ? dateTokens[dateTokens.length - 1].replace(/\./g, '/').replace(/-/g, '/') : null;
  const unit = c.unit && c.unit !== 'Outro' ? ` ${c.unit}` : '';
  const kind = c.kind && c.kind !== 'Outro' ? c.kind : 'Campanha';
  const base = `${kind}${unit}`.trim();
  return lastDate ? `${base} · ${lastDate}` : base;
}

export const PLACEMENT_LABEL: Record<string, string> = {
  facebook_stories: 'Stories',
  instagram_stories: 'Stories',
  facebook_reels: 'Reels',
  instagram_reels: 'Reels',
  feed: 'Feed',
  facebook_profile_feed: 'Feed',
  instream_video: 'Vídeo in-stream',
  marketplace: 'Marketplace',
  right_hand_column: 'Coluna lateral',
  search: 'Busca',
  audience_network: 'Audience Network',
  instagram_explore: 'Explorar',
  instagram_explore_home: 'Explorar',
  instagram_profile_feed: 'Feed',
};

export function placementLabel(platform: string, position: string): string {
  if (/audience_network/i.test(platform)) return 'Audience Network';
  return PLACEMENT_LABEL[position] || position;
}

export const DEVICE_LABEL: Record<string, string> = {
  android_smartphone: 'Android (celular)',
  android_tablet: 'Android (tablet)',
  iphone: 'iPhone',
  ipad: 'iPad',
  ipod: 'iPod',
  desktop: 'Computador',
  other: 'Outro',
};
