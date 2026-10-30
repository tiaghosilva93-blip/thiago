'use client';

import { useMemo } from 'react';
import { ApiData, Settings } from '../../lib/types';
import { fmtBRL, fmtInt, fmtCPL, fmtPct, placementLabel, DEVICE_LABEL } from '../../lib/format';
import { aggBreakdown, audienceTypeAgg, round2, cplOf, ctrOf } from '../../lib/metrics';
import { Bar, Chip } from '../ui';

const GENDER_LABEL: Record<string, string> = { male: 'Masculino', female: 'Feminino', unknown: 'Não informado' };

export default function Audience({ data, unit }: { data: ApiData; settings: Settings; unit: 'all' | 'Méier' | 'Taquara' }) {
  const campaigns = useMemo(() => {
    let rows = data.campaigns.filter((c) => c.status === 'ACTIVE');
    if (unit !== 'all') rows = rows.filter((c) => c.unit === unit);
    return rows;
  }, [data, unit]);
  const ids = useMemo(() => new Set(campaigns.map((c) => c.id)), [campaigns]);

  const ageGender = useMemo(() => aggBreakdown(data.demographics, ids, (r) => `${r.age}|${r.gender}`).sort((a, b) => b.spend - a.spend), [data, ids]);
  const regions = useMemo(() => aggBreakdown(data.regions, ids, (r) => r.region || 'Não identificado').sort((a, b) => b.spend - a.spend).slice(0, 10), [data, ids]);
  const devices = useMemo(() => aggBreakdown(data.devices, ids, (r) => r.impression_device || 'other').sort((a, b) => b.spend - a.spend), [data, ids]);
  const placements = useMemo(() => aggBreakdown(data.placements, ids, (r) => placementLabel(r.publisher_platform, r.platform_position)).sort((a, b) => b.spend - a.spend), [data, ids]);
  const audienceTypes = useMemo(() => audienceTypeAgg(data, ids), [data, ids]);

  const best = useMemo(() => {
    const withLeads = ageGender.filter((r) => r.leads > 0 && r.cpl !== null);
    if (withLeads.length === 0) return null;
    return withLeads.slice().sort((a, b) => (a.cpl as number) - (b.cpl as number))[0];
  }, [ageGender]);

  const maxSpendAge = Math.max(1, ...ageGender.map((r) => r.spend));
  const maxSpendPlacement = Math.max(1, ...placements.map((r) => r.spend));
  const maxSpendDevice = Math.max(1, ...devices.map((r) => r.spend));

  return (
    <section className="wrap main-col">
      {best && (
        <div className="panel callout">
          <Chip text="Melhor CPL por segmento" color="#36d1a8" />
          <span className="callout-text">
            {best.key.split('|')[0]} anos · {GENDER_LABEL[best.key.split('|')[1]] || best.key.split('|')[1]} — CPL {fmtCPL(best.cpl)} ({fmtInt(best.leads)} leads)
          </span>
        </div>
      )}

      <div className="panel-grid two">
        <div className="panel">
          <div className="panel-head"><h3>Idade &amp; Gênero</h3><span className="panel-sub">últimos 30 dias</span></div>
          <div className="table-scroll">
            <table className="datatable">
              <thead><tr><th>Faixa</th><th>Gênero</th><th>Gasto</th><th>Leads</th><th>CPL</th><th>CTR</th></tr></thead>
              <tbody>
                {ageGender.map((r) => {
                  const [age, gender] = r.key.split('|');
                  return (
                    <tr key={r.key}>
                      <td>{age}</td>
                      <td>{GENDER_LABEL[gender] || gender}</td>
                      <td>{fmtBRL(r.spend)}</td>
                      <td>{fmtInt(r.leads)}</td>
                      <td>{fmtCPL(r.cpl)}</td>
                      <td>{fmtPct(r.ctr)}</td>
                    </tr>
                  );
                })}
                {ageGender.length === 0 && <tr><td colSpan={6} className="empty-note">Sem dados.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head"><h3>Tipo de público</h3><span className="panel-sub">inferido pela configuração do conjunto</span></div>
          <div className="segment-bars">
            {audienceTypes.map((t) => (
              <div className="segment-bar-row" key={t.type}>
                <span className="segment-bar-label">{t.type}</span>
                <Bar pct={(t.spend / Math.max(1, ...audienceTypes.map((x) => x.spend))) * 100} color="#4fa3ff" />
                <span className="segment-bar-value">{fmtBRL(t.spend)} · {fmtInt(t.leads)} leads · CPL {fmtCPL(t.cpl)}</span>
              </div>
            ))}
            {audienceTypes.length === 0 && <p className="empty-note">Sem dados.</p>}
          </div>
        </div>
      </div>

      <div className="panel-grid two">
        <div className="panel">
          <div className="panel-head"><h3>Placement</h3><span className="panel-sub">Feed, Stories, Reels, Audience Network…</span></div>
          <div className="segment-bars">
            {placements.map((p) => (
              <div className="segment-bar-row" key={p.key}>
                <span className="segment-bar-label">{p.key}</span>
                <Bar pct={(p.spend / maxSpendPlacement) * 100} color="#ff7900" />
                <span className="segment-bar-value">{fmtBRL(p.spend)} · CPL {fmtCPL(p.cpl)}</span>
              </div>
            ))}
            {placements.length === 0 && <p className="empty-note">Sem dados.</p>}
          </div>
        </div>
        <div className="panel">
          <div className="panel-head"><h3>Dispositivo</h3></div>
          <div className="segment-bars">
            {devices.map((d) => (
              <div className="segment-bar-row" key={d.key}>
                <span className="segment-bar-label">{DEVICE_LABEL[d.key] || d.key}</span>
                <Bar pct={(d.spend / maxSpendDevice) * 100} color="#36d1a8" />
                <span className="segment-bar-value">{fmtBRL(d.spend)} · CPL {fmtCPL(d.cpl)}</span>
              </div>
            ))}
            {devices.length === 0 && <p className="empty-note">Sem dados.</p>}
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head"><h3>Região</h3><span className="panel-sub">top 10 por investimento</span></div>
        <div className="table-scroll">
          <table className="datatable">
            <thead><tr><th>Região</th><th>Gasto</th><th>Leads</th><th>CPL</th></tr></thead>
            <tbody>
              {regions.map((r) => (
                <tr key={r.key}><td>{r.key}</td><td>{fmtBRL(r.spend)}</td><td>{fmtInt(r.leads)}</td><td>{fmtCPL(r.cpl)}</td></tr>
              ))}
              {regions.length === 0 && <tr><td colSpan={4} className="empty-note">Sem dados.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
