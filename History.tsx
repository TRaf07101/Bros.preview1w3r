import { useState } from 'react';
import { getService } from '../maintenance/data';
import { normalizeSearch, serviceSearchText } from '../maintenance/language';
import { displayDate, formatKm } from '../maintenance/planner';
import type { MaintenanceRecord, StoredState } from '../maintenance/types';
import { Icon } from './Icon';
import { SectionHeading } from './Common';

export function HistoryView({ state, onAdd, onRemove, onExport }: { state: StoredState; onAdd: () => void; onRemove: (record: MaintenanceRecord) => void; onExport: () => void }) {
  const [search, setSearch] = useState('');
  const records = state.records.filter(record => normalizeSearch(`${record.notes} ${record.document} ${record.km} ${record.serviceIds.map(id => serviceSearchText(getService(id))).join(' ')}`).includes(normalizeSearch(search))).sort((a, b) => a.date.localeCompare(b.date) || a.km - b.km);
  return <section className="full-section">
    <SectionHeading label="O CUIDADO FICA REGISTRADO" title="A história da sua Bros." description="Seus serviços, do mais antigo para o mais recente. Guarde também os comprovantes da oficina e o certificado da moto."><button className="button primary" onClick={onAdd}><Icon name="plus" size={17} />Registrar cuidado</button></SectionHeading>
    {state.records.length > 0 && <div className="table-tools"><div className="inline-search"><Icon name="search" size={17} /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Buscar serviço, observação ou quilometragem" aria-label="Buscar no histórico" /></div><button className="button secondary" title="Baixar o histórico em arquivo CSV para planilha" onClick={onExport}><Icon name="download" size={16} />Baixar histórico</button></div>}
    {state.records.length === 0 ? <div className="history-empty"><div className="history-illustration"><Icon name="file" size={58} strokeWidth={1.2} /><span><Icon name="wrench" size={25} /></span><i /><i /><i /></div><span className="eyebrow">CADA CUIDADO CONTA</span><h3>Seu primeiro registro<br />começa uma boa história.</h3><p>Anote uma revisão, lubrificação ou conserto já feito.<br />A quilometragem e a data ficam organizadas aqui.</p><button className="button primary" onClick={onAdd}><Icon name="plus" size={17} />Adicionar primeiro cuidado</button><small>Nada é marcado como feito automaticamente.</small></div> : <div className="record-list">{records.map(record => <article key={record.id}>
      <div className="record-date"><span>{displayDate(record.date)}</span><strong>{formatKm(record.km)} <small>km</small></strong></div>
      <span className="record-node"><Icon name="check" size={12} /></span>
      <div className="record-detail"><header><h3>{record.type === 'review' ? `Revisão${record.milestone ? ` de ${formatKm(record.milestone)} km` : ''}` : record.type === 'condition' ? 'Conserto por desgaste ou defeito' : record.milestone === 0 ? 'Revisão de entrega' : 'Cuidado de rotina'}</h3><button className="icon-button" onClick={() => onRemove(record)} aria-label={`Excluir registro de ${displayDate(record.date)}`}><Icon name="trash" size={16} /></button></header>
        {record.document && <span className="record-document"><Icon name="file" size={12} />{record.document}</span>}
        <ul>{record.serviceIds.map(id => <li key={id}><Icon name="check" size={12} />{getService(id).service}</li>)}</ul>
        {record.serviceIds.length === 0 && <p className="no-service-details">Os serviços específicos não foram informados. Não consideramos óleo ou líquido de freio trocados sem esse registro.</p>}
        {record.notes && <p className="record-notes">{record.notes}</p>}
        <span className="record-origin">Informado por você</span>
      </div>
    </article>)}{!records.length && <div className="empty-state"><p>Nenhum registro encontrado com essa busca.</p><button className="text-button" onClick={() => setSearch('')}>Limpar busca</button></div>}</div>}
  </section>;
}