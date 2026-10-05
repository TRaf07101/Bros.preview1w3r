import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import type { ActionType, ModelYear, Reference, Service } from '../maintenance/types';
import { ACTIONS } from '../maintenance/data';
import { LANGUAGE_NOTE, MANUAL_TERMS } from '../maintenance/language';
import { manualUrl } from '../maintenance/planner';
import { Icon } from './Icon';

export function ActionLabels({ actions, compact = false }: { actions: ActionType[]; compact?: boolean }) {
  return <span className={`action-labels ${compact ? 'compact' : ''}`}>{actions.map(action => <span className={`action-label ${action}`} key={action}>{!compact && <b>{ACTIONS[action].code}</b>}{ACTIONS[action].label}</span>)}</span>;
}

export function References({ refs, year, compact = false }: { refs: Reference[]; year: ModelYear; compact?: boolean }) {
  const distinct = refs.filter((r, i) => refs.findIndex(other => other.viewer === r.viewer) === i);
  const printPage = (page: string) => page;
  return <span className={`references ${compact ? 'compact' : ''}`}>{distinct.map(reference => { const page = printPage(reference.page); return <a href={manualUrl(year, reference)} target="_blank" rel="noopener noreferrer" key={`${reference.viewer}-${reference.page}`} title={year === '2026' ? `${reference.section || page} · abrir fonte do modelo` : year !== '2025/2026' ? `${reference.section || `Manual NXR160 BROS ESDD, página impressa ${page}`} · abrir o manual de referência` : `${reference.section || `Manual, página impressa ${page}`} · abrir página ${reference.viewer} do arquivo`}>{reference.page === 'Certificado' ? `Certificado (${reference.viewer})` : /^\d+$/.test(page) ? `p. ${page}` : page}<Icon name="external" size={11} /></a>; })}</span>;
}

export function Notice({ title, children, tone = 'neutral', action }: { title?: string; children: ReactNode; tone?: 'neutral' | 'warning' | 'danger' | 'success'; action?: ReactNode }) {
  return <div className={`notice notice-${tone}`}><Icon name={tone === 'warning' || tone === 'danger' ? 'alert' : tone === 'success' ? 'check-circle' : 'info'} size={18} /><div>{title && <strong>{title}</strong>}<div>{children}</div>{action}</div></div>;
}

export function SectionHeading({ label, title, description, children }: { label?: string; title: string; description?: string; children?: ReactNode }) {
  return <div className="section-heading"><div>{label && <span className="eyebrow">{label}</span>}<h2>{title}</h2>{description && <p>{description}</p>}</div>{children}</div>;
}

export function Modal({ title, onClose, children, wide = false, drawer = false, subtitle }: { title: string; onClose: () => void; children: ReactNode; wide?: boolean; drawer?: boolean; subtitle?: string }) {
  const container = useRef<HTMLElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const getControls = () => Array.from(container.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select, textarea, a[href], [tabindex="0"]') || []).filter(item => item.getClientRects().length > 0);
    getControls()[0]?.focus({ preventScroll: true });
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
      if (event.key === 'Tab') {
        const nodes = getControls();
        if (!nodes.length) { event.preventDefault(); return; }
        if (event.shiftKey && document.activeElement === nodes[0]) { event.preventDefault(); nodes[nodes.length - 1].focus(); }
        else if (!event.shiftKey && document.activeElement === nodes[nodes.length - 1]) { event.preventDefault(); nodes[0].focus(); }
      }
    };
    document.addEventListener('keydown', key);
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener('keydown', key); if (previous?.isConnected) previous.focus({ preventScroll: true }); };
  }, [onClose]);
  return <div className={`modal-layer ${drawer ? 'drawer-layer' : ''}`}><div className="modal-scrim" onClick={onClose} /><section className={`modal ${wide ? 'wide' : ''} ${drawer ? 'drawer' : ''}`} ref={container} role="dialog" aria-modal="true" aria-labelledby="modal-heading"><header className="modal-heading"><div><span className="eyebrow">CADERNO DA SUA BROS</span><h2 id="modal-heading">{title}</h2>{subtitle && <p>{subtitle}</p>}</div><button className="icon-button" onClick={onClose} aria-label="Fechar janela"><Icon name="close" /></button></header><div className="modal-content">{children}</div></section></div>;
}

export function ServiceButton({ service, onClick, year, done = false }: { service: Service; onClick: () => void; year: ModelYear; done?: boolean }) {
  return <div className={`service-row ${done ? 'done' : ''}`}>
    <button className="service-open" onClick={onClick}><span className={`service-icon ${service.actions.includes('replace') ? 'replacement' : ''}`}><Icon name={service.id.includes('oil') || service.id === 'brake-fluid' ? 'droplet' : service.id === 'chain' ? 'chain' : service.id === 'tires' || service.id === 'wheels' ? 'circle' : service.id === 'spark' ? 'zap' : service.id === 'delivery' ? 'bike' : service.pending ? 'alert' : 'wrench'} size={17} /></span><span className="service-name"><strong>{service.component}</strong><small>{service.pending ? 'Ainda precisa ser conferido no manual' : service.service}</small></span><ActionLabels actions={service.actions} compact /><Icon name={done ? 'check' : 'chevron'} size={15} /></button>
    <span className="service-source"><References refs={service.refs.slice(0, 1)} year={year} compact /></span>
  </div>;
}

export function ManualTerms() {
  return <details className="manual-terms">
    <summary><Icon name="book" size={18} /><span>Entenda as palavras do manual</span><Icon name="chevron-down" size={15} /></summary>
    <p>{LANGUAGE_NOTE}</p>
    <dl>{MANUAL_TERMS.map(item => <div key={item.term}><dt><strong>{item.simple}</strong><span>No manual: {item.term}</span></dt><dd>{item.explanation}</dd></div>)}</dl>
  </details>;
}