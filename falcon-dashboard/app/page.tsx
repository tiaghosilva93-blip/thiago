'use client';

import { useCallback, useEffect, useState } from 'react';
import { ApiData, UNIT_VERTENTES } from './lib/types';
import { DateRange, rangeForPreset, DatePreset } from './lib/format';
import { useSettings } from './lib/settings';
import { Icon } from './components/ui';
import { DateRangePicker } from './components/DateRangePicker';
import Overview from './components/tabs/Overview';
import Campaigns from './components/tabs/Campaigns';
import Creatives from './components/tabs/Creatives';
import Funnel from './components/tabs/Funnel';
import Audience from './components/tabs/Audience';
import Quality from './components/tabs/Quality';
import Trends from './components/tabs/Trends';
import Alerts from './components/tabs/Alerts';
import SettingsTab from './components/tabs/SettingsTab';

type Tab = 'overview' | 'campaigns' | 'creatives' | 'funnel' | 'audience' | 'quality' | 'trends' | 'alerts' | 'settings';
type Screen = 'geral' | 'taquara' | 'meier';

const TAB_LABEL: Record<Tab, string> = {
  overview: 'Visão Geral',
  campaigns: 'Campanhas',
  creatives: 'Criativos',
  funnel: 'Funil',
  audience: 'Audiências',
  quality: 'Qualidade de Leads',
  trends: 'Tendências',
  alerts: 'Alertas & Insights',
  settings: 'Configurações',
};
const TAB_ORDER: Tab[] = ['overview', 'campaigns', 'creatives', 'funnel', 'audience', 'quality', 'trends', 'alerts', 'settings'];

const SCREEN_LABEL: Record<Screen, string> = { geral: 'Geral', taquara: 'Taquara', meier: 'Méier' };
const SCREEN_UNIT: Record<Screen, 'all' | 'Méier' | 'Taquara'> = { geral: 'all', taquara: 'Taquara', meier: 'Méier' };

export default function Page() {
  const [data, setData] = useState<ApiData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tab, setTab] = useState<Tab>('overview');
  const [screen, setScreen] = useState<Screen>('geral');
  const [vertente, setVertente] = useState<string>('all');
  const [range, setRange] = useState<DateRange | null>(null);
  const { settings, update, reset, ready } = useSettings();

  const load = useCallback(async () => {
    try {
      setRefreshing(true);
      const res = await fetch('/api/data', { cache: 'no-store' });
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setData(json);
      setError(null);
      setRange((prev) => {
        if (prev) return prev;
        const preset = (settings.defaultPeriod as DatePreset) || '7d';
        const [s, e] = rangeForPreset(preset, json.today);
        return { preset, start: s, end: e, compare: false };
      });
    } catch (e: any) {
      setError(e?.message || 'Falha ao carregar dados.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [settings.defaultPeriod]);

  useEffect(() => { load(); }, [load]);

  const unit = SCREEN_UNIT[screen];
  const vertenteOptions = screen !== 'geral' ? UNIT_VERTENTES[screen === 'taquara' ? 'Taquara' : 'Méier'] : [];

  const onScreenChange = (s: Screen) => {
    setScreen(s);
    setVertente('all');
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
          <div className="screen-tabs">
            {(['geral', 'taquara', 'meier'] as Screen[]).map((s) => (
              <button key={s} data-active={screen === s} onClick={() => onScreenChange(s)}>{SCREEN_LABEL[s]}</button>
            ))}
          </div>
          <div className="nav-actions">
            <button className="btn-ghost" onClick={load} disabled={refreshing} aria-label="Atualizar">
              <span className={refreshing ? 'spin' : ''}><Icon name="refresh" /></span>
            </button>
          </div>
        </div>
        <div className="wrap site-links-row">
          <div className="site-links">
            {TAB_ORDER.map((t) => (
              <button key={t} className="tab-link" data-active={tab === t} onClick={() => setTab(t)}>{TAB_LABEL[t]}</button>
            ))}
          </div>
        </div>
      </nav>

      <div className="wrap toolbar-row">
        {vertenteOptions.length > 0 ? (
          <div className="vertente-filter">
            <button data-active={vertente === 'all'} onClick={() => setVertente('all')}>Todas as vertentes</button>
            {vertenteOptions.map((v) => (
              <button key={v} data-active={vertente === v} onClick={() => setVertente(v)}>{v}</button>
            ))}
          </div>
        ) : <span />}
        {data && range && <DateRangePicker value={range} onChange={setRange} today={data.today} />}
      </div>

      {error && (
        <div className="wrap" style={{ marginTop: '1rem' }}>
          <div className="error-banner">
            Não consegui carregar os dados da Meta agora: {error}. Clique no ícone de atualizar para tentar de novo.
          </div>
        </div>
      )}

      {loading && !data && (
        <div className="wrap" style={{ marginTop: '2rem' }}>
          <div className="skeleton" style={{ height: '12rem', borderRadius: '18px' }} />
        </div>
      )}

      {data && range && (
        <>
          {tab === 'overview' && <Overview data={data} settings={settings} range={range} unit={unit} vertente={vertente} />}
          {tab === 'campaigns' && <Campaigns data={data} settings={settings} range={range} unit={unit} vertente={vertente} />}
          {tab === 'creatives' && <Creatives data={data} settings={settings} unit={unit} vertente={vertente} />}
          {tab === 'funnel' && <Funnel data={data} settings={settings} range={range} unit={unit} vertente={vertente} />}
          {tab === 'audience' && <Audience data={data} settings={settings} unit={unit} vertente={vertente} />}
          {tab === 'quality' && <Quality data={data} settings={settings} range={range} unit={unit} vertente={vertente} />}
          {tab === 'trends' && <Trends data={data} unit={unit} vertente={vertente} />}
          {tab === 'alerts' && <Alerts data={data} settings={settings} unit={unit} vertente={vertente} />}
          {tab === 'settings' && <SettingsTab settings={settings} update={update} reset={reset} />}
        </>
      )}

      <footer className="site-footer">
        <div className="wrap footer-in">
          <span className="note mono">
            Painel interno · dados do Gerenciador de Anúncios Meta · atualizado {data ? new Date(data.generated_at).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) : '—'}
          </span>
        </div>
      </footer>
    </div>
  );
}
