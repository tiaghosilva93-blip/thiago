'use client';

import { useEffect, useMemo, useState } from 'react';
import { ApiData, Settings, Creative } from '../../lib/types';
import { imgProxy, fmtBRL, fmtInt, fmtCPL, fmtPct, fmtFreq, KIND_COLOR } from '../../lib/format';
import { adMetrics, fatigueByAd, sparklineForAd, topBottomByCPL } from '../../lib/metrics';
import { Chip, StatusPill, Icon, Sparkline, RankList } from '../ui';

export default function Creatives({ data, settings, unit }: { data: ApiData; settings: Settings; unit: 'all' | 'Méier' | 'Taquara' }) {
  const [lightbox, setLightbox] = useState<{ ad: Creative; group: { name: string } } | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const activeCampaigns = useMemo(() => {
    let rows = data.campaigns.filter((c) => c.status === 'ACTIVE');
    if (unit !== 'all') rows = rows.filter((c) => c.unit === unit);
    return rows;
  }, [data, unit]);
  const activeIds = useMemo(() => new Set(activeCampaigns.map((c) => c.id)), [activeCampaigns]);

  const adMetricMap = useMemo(() => new Map(adMetrics(data, activeIds).map((m) => [m.ad_id, m])), [data, activeIds]);
  const fatigueMap = useMemo(() => fatigueByAd(data, settings), [data, settings]);

  const creativeGroups = useMemo(() => {
    const map = new Map<string, { name: string; status: string; unit: string; kind: string; rows: Creative[] }>();
    for (const row of data.creatives) {
      if (!activeIds.has(row.campaign_id)) continue;
      if (!map.has(row.campaign_id)) map.set(row.campaign_id, { name: row.campaign_name, status: row.campaign_status, unit: row.unit, kind: row.kind, rows: [] });
      map.get(row.campaign_id)!.rows.push(row);
    }
    return Array.from(map.values());
  }, [data, activeIds]);

  const ranking = useMemo(() => {
    const rows = data.creatives
      .filter((c) => activeIds.has(c.campaign_id))
      .map((c) => ({ name: c.ad_name, cpl: adMetricMap.get(c.ad_id)?.cpl ?? null, leads: adMetricMap.get(c.ad_id)?.leads ?? 0 }));
    return topBottomByCPL(rows, 5);
  }, [data, activeIds, adMetricMap]);

  return (
    <section className="wrap main-col">
      <div className="panel-grid two">
        <div className="panel">
          <div className="panel-head"><h3>Top 5 melhores criativos · CPL</h3><span className="panel-sub">últimos 30 dias</span></div>
          <RankList title="" rows={ranking.best.map((r) => ({ label: r.name, value: r.cpl as number }))} color="#36d1a8" valueFmt={fmtCPL as any} />
        </div>
        <div className="panel">
          <div className="panel-head"><h3>Top 5 piores criativos · CPL</h3><span className="panel-sub">últimos 30 dias</span></div>
          <RankList title="" rows={ranking.worst.map((r) => ({ label: r.name, value: r.cpl as number }))} color="#ff5d6c" valueFmt={fmtCPL as any} />
        </div>
      </div>

      <div className="panel">
        {creativeGroups.map((grp) => (
          <div className="creatives-group" key={grp.name}>
            <h3>{grp.name}</h3>
            <div className="ad-grid">
              {grp.rows.map((ad) => {
                const isVideo = ad.format === 'Vídeo';
                const proxiedThumb = imgProxy(ad.thumb);
                const m = adMetricMap.get(ad.ad_id);
                const fat = fatigueMap.get(ad.ad_id);
                const spark = sparklineForAd(data, ad.ad_id, 'ctr');
                return (
                  <div className="ad-card" key={ad.ad_id} onClick={() => setLightbox({ ad, group: { name: grp.name } })}>
                    <div className="thumb-wrap">
                      {proxiedThumb && <img src={proxiedThumb} alt={ad.ad_name} loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
                      {isVideo && <div className="play-badge"><Icon name="play" /></div>}
                      <StatusPill status={ad.ad_status} />
                      {fat?.fatigued && <span className="fatigue-badge" title="Frequência alta e/ou CTR em queda">⚠ Fadiga</span>}
                      <span className="amp">Ampliar</span>
                    </div>
                    <div className="ad-info">
                      <span className="ad-name">{ad.ad_name}</span>
                      {m && (
                        <div className="ad-metrics-strip">
                          <span>{fmtInt(m.leads)} leads</span>
                          <span>CPL {fmtCPL(m.cpl)}</span>
                          <span>CTR {fmtPct(m.ctr)}</span>
                          <span className={m.frequency > settings.frequencyAlert ? 'cell-warn' : ''}>Freq {fmtFreq(m.frequency)}</span>
                        </div>
                      )}
                      {spark.length > 1 && (
                        <div className="ad-spark"><Sparkline values={spark} color={fat?.fatigued ? '#ff5d6c' : '#36d1a8'} /><span className="ad-spark-label">CTR/semana</span></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {creativeGroups.length === 0 && <p style={{ color: 'var(--muted)' }}>Nenhum criativo encontrado para esse filtro.</p>}
      </div>

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
              ) : lightbox.ad.format === 'Vídeo' ? (
                <div className="video-fallback">
                  <p>Não foi possível carregar a prévia do vídeo aqui.</p>
                  {lightbox.ad.video_permalink && <a href={lightbox.ad.video_permalink} target="_blank" rel="noopener noreferrer">Assistir no Facebook ↗</a>}
                </div>
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
              {lightbox.ad.format === 'Vídeo' && lightbox.ad.video_embed_url && lightbox.ad.video_permalink && (
                <a className="lb-fb-link" href={lightbox.ad.video_permalink} target="_blank" rel="noopener noreferrer">Abrir no Facebook ↗</a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
