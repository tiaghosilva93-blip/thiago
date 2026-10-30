'use client';

import { useCallback, useEffect, useState } from 'react';
import { ApiData } from './lib/types';
import { Period, PERIOD_LABEL } from './lib/format';
import { useSettings } from './lib/settings';
import { Icon } from './components/ui';
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

export default function Page() {
  const [data, setData] = useState<ApiData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tab, setTab] = useState<Tab>('overview');
  const [period, setPeriod] = useState<Period>('7d');
  const [unit, setUnit] = useState<'all' | 'Méier' | 'Taquara'>('all');
  const { settings, update, reset, ready } = useSettings();

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
  useEffect(() => { if (ready) setPeriod(settings.defaultPeriod); }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

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

      {loading && !data && (
        <div className="wrap" style={{ marginTop: '2rem' }}>
          <div className="skeleton" style={{ height: '12rem', borderRadius: '18px' }} />
        </div>
      )}

      {data && (
        <>
          {tab === 'overview' && <Overview data={data} settings={settings} period={period} unit={unit} />}
          {tab === 'campaigns' && <Campaigns data={data} settings={settings} period={period} unit={unit} />}
          {tab === 'creatives' && <Creatives data={data} settings={settings} unit={unit} />}
          {tab === 'funnel' && <Funnel data={data} settings={settings} period={period} unit={unit} />}
          {tab === 'audience' && <Audience data={data} settings={settings} unit={unit} />}
          {tab === 'quality' && <Quality data={data} settings={settings} period={period} unit={unit} />}
          {tab === 'trends' && <Trends data={data} unit={unit} />}
          {tab === 'alerts' && <Alerts data={data} settings={settings} unit={unit} />}
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
