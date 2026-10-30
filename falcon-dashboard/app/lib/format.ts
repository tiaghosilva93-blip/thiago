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
  'Concurso': '#4fa3ff',
  'Institucional': '#ffc857',
  'Alcance': '#ff5d8f',
  'Outro': '#8c93b8',
};

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
