'use client';

import { Settings, DEFAULT_SETTINGS } from '../../lib/types';
import { Period, PERIOD_LABEL } from '../../lib/format';
import { SettingField, Toggle } from '../ui';

export default function SettingsTab({ settings, update, reset }: { settings: Settings; update: (p: Partial<Settings>) => void; reset: () => void }) {
  return (
    <section className="wrap main-col">
      <div className="panel">
        <div className="panel-head"><h3>Metas de CPL</h3><span className="panel-sub">usadas para o selo de saúde das campanhas e para os alertas</span></div>
        <div className="settings-grid">
          <SettingField label="CPL meta (R$)" hint="valor considerado ideal">
            <input type="number" step="0.5" className="settings-input" value={settings.cplTarget}
              onChange={(e) => update({ cplTarget: parseFloat(e.target.value) || 0 })} />
          </SettingField>
          <SettingField label="CPL máximo aceitável (R$)" hint="acima disso, alerta de severidade alta">
            <input type="number" step="0.5" className="settings-input" value={settings.cplMax}
              onChange={(e) => update({ cplMax: parseFloat(e.target.value) || 0 })} />
          </SettingField>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head"><h3>Metas de volume</h3></div>
        <div className="settings-grid">
          <SettingField label="Meta de leads por mês">
            <input type="number" step="10" className="settings-input" value={settings.leadGoalMonthly}
              onChange={(e) => update({ leadGoalMonthly: parseInt(e.target.value) || 0 })} />
          </SettingField>
          <SettingField label="Período padrão ao abrir o painel">
            <select className="settings-input" value={settings.defaultPeriod} onChange={(e) => update({ defaultPeriod: e.target.value as Period })}>
              {(['today', 'yesterday', '7d', '30d'] as Period[]).map((p) => <option key={p} value={p}>{PERIOD_LABEL[p]}</option>)}
            </select>
          </SettingField>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head"><h3>Qualidade de leads (estimativas)</h3><span className="panel-sub">sem CRM conectado — usado nas abas Qualidade de Leads e Funil</span></div>
        <div className="settings-grid">
          <SettingField label="Taxa de qualificação (%)" hint="% dos leads brutos considerados MQL/SQL">
            <input type="number" min={0} max={100} className="settings-input" value={settings.qualificationRate}
              onChange={(e) => update({ qualificationRate: parseFloat(e.target.value) || 0 })} />
          </SettingField>
          <SettingField label="Taxa de fechamento (%)" hint="% dos leads qualificados que viram venda">
            <input type="number" min={0} max={100} className="settings-input" value={settings.closeRate}
              onChange={(e) => update({ closeRate: parseFloat(e.target.value) || 0 })} />
          </SettingField>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head"><h3>Alertas</h3></div>
        <div className="settings-grid">
          <SettingField label="Frequência de alerta" hint="acima desse valor, alerta de frequência alta">
            <input type="number" step="0.1" className="settings-input" value={settings.frequencyAlert}
              onChange={(e) => update({ frequencyAlert: parseFloat(e.target.value) || 0 })} />
          </SettingField>
          <SettingField label="Queda de CTR para fadiga (%)" hint="queda desde a 1ª semana do criativo">
            <input type="number" step="1" className="settings-input" value={settings.ctrDropAlert}
              onChange={(e) => update({ ctrDropAlert: parseFloat(e.target.value) || 0 })} />
          </SettingField>
        </div>
        <div className="toggle-list">
          <div className="toggle-row"><span>CPL acima da meta</span><Toggle checked={settings.alertsEnabled.cplAbove} onChange={(v) => update({ alertsEnabled: { ...settings.alertsEnabled, cplAbove: v } })} /></div>
          <div className="toggle-row"><span>Frequência alta</span><Toggle checked={settings.alertsEnabled.highFrequency} onChange={(v) => update({ alertsEnabled: { ...settings.alertsEnabled, highFrequency: v } })} /></div>
          <div className="toggle-row"><span>Fadiga de criativo</span><Toggle checked={settings.alertsEnabled.creativeFatigue} onChange={(v) => update({ alertsEnabled: { ...settings.alertsEnabled, creativeFatigue: v } })} /></div>
          <div className="toggle-row"><span>Fase de aprendizado</span><Toggle checked={settings.alertsEnabled.learningPhase} onChange={(v) => update({ alertsEnabled: { ...settings.alertsEnabled, learningPhase: v } })} /></div>
        </div>
      </div>

      <div className="panel">
        <button className="btn-secondary" onClick={reset}>Restaurar padrões</button>
        <p className="empty-note" style={{ marginTop: '.5rem' }}>Essas preferências são salvas apenas neste navegador.</p>
      </div>
    </section>
  );
}
