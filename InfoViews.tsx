import { useState } from 'react';
import { CONDITIONS, DAILY_CHECKLIST, OFFROAD_CHECKLIST, REVIEW_DATES, SAFETY_ALERTS, SEVERE_USE, getService, getServiceForModel, ref, variantNote } from '../maintenance/data';
import { addMonths, displayDate, formatKm, lastServiceDate, timeRows } from '../maintenance/planner';
import type { Milestone, Service, StoredState, Usage } from '../maintenance/types';
import { ActionLabels, Notice, References, SectionHeading } from './Common';
import { Icon } from './Icon';

export function TimeView({ state, onService, onMilestone, onConfigure }: { state: StoredState; onService: (service: Service) => void; onMilestone: (milestone: Milestone) => void; onConfigure: () => void }) {
  const [limit, setLimit] = useState(60);
  const oilDate = lastServiceDate(state, 'oil') || state.profile.purchaseDate;
  const brakeDate = lastServiceDate(state, 'brake-fluid') || state.profile.purchaseDate;
  return <section className="full-section">
    <SectionHeading label="O TEMPO TAMBÉM CONTA" title="Mesmo parada, ela precisa de cuidado." description="A data da revisão e os prazos para trocar óleo e líquido de freio precisam ser acompanhados separadamente." />
    <div className="fluid-clocks">
      <button className="fluid-clock" onClick={() => onService(getService('oil'))}><span className="clock-icon oil"><Icon name="droplet" size={27} /></span><div><span className="eyebrow">ÓLEO DO MOTOR</span><strong>12 <span>meses</span></strong><p>ou o intervalo da tabela, o que ocorrer primeiro.</p><small>{oilDate ? `Data-limite: ${displayDate(addMonths(oilDate, 12))}` : 'Informe a data da última troca para acompanhar.'}</small></div><Icon name="external" size={18} /></button>
      <button className="fluid-clock" onClick={() => onService(getService('brake-fluid'))}><span className="clock-icon brake"><Icon name="droplet" size={27} /></span><div><span className="eyebrow">LÍQUIDO DE FREIO</span><strong>24 <span>meses</span></strong><p>mesmo se a moto rodar pouco. No manual: fluido de freio.</p><small>{brakeDate ? `Data-limite: ${displayDate(addMonths(brakeDate, 24))}` : 'Informe a entrega ou a última troca.'}</small></div><Icon name="external" size={18} /></button>
    </div>
    <Notice title="Não precisa fazer o mesmo serviço duas vezes.">Se uma revisão já foi feita pela quilometragem, não é preciso refazê-la só porque chegou o mês correspondente. A revisão pode exigir troca do óleo antes de um ano. Para o líquido de freio, conte 24 meses desde a troca que realmente aconteceu. <References refs={[ref(45), ref(46), REVIEW_DATES]} year={state.profile.year} /></Notice>
    <div className="time-table-title"><h3>Sua agenda, de 6 em 6 meses</h3><button className="text-button" onClick={onConfigure}><Icon name="calendar" size={15} />Informar datas</button></div>
    <p className="table-intro">Para as revisões, conte os meses desde a entrega da moto nova. Para óleo e líquido de freio, confira a última troca. As etapas abaixo não mandam trocar novamente um produto que acabou de ser trocado.</p>
    <div className="table-scroll"><table className="time-table">
      <thead><tr><th>Quando</th><th>Revisão dessa etapa</th><th>Óleo do motor</th><th>Líquido de freio</th></tr></thead>
      <tbody>{timeRows(limit, state.profile.year).map(row => <tr key={row.months} className={row.brake ? 'biennial-row' : ''}>
        <td><strong>{row.months}<span> meses</span></strong>{state.profile.purchaseDate && <small>{displayDate(addMonths(state.profile.purchaseDate, row.months))}</small>}{row.months % 12 === 0 && <span className="year-caption">{row.months / 12} {row.months === 12 ? 'ano' : 'anos'}</span>}</td>
        <td><button onClick={() => onMilestone(row.review)}>{formatKm(row.km)} km <Icon name="external" size={13} /></button><small>ou {row.months} meses, o que ocorrer primeiro.</small><span className="time-operations">{row.km === 1000 ? 'Conferir os serviços de 1.000 km no original.' : row.km % 18000 === 0 ? 'Inclui filtro de ar e controle dos vapores do combustível.' : row.km % 12000 === 0 ? 'Inclui vela, tela e filtro centrífugo de óleo.' : 'Serviços do intervalo de 6.000 km.'}</span></td>
        <td>{row.months === 6 ? <><span className="validation-pending">Conferir primeira revisão</span><p>A troca depende da marcação na tabela original de 1.000 km.</p></> : <><span className={`inline-status ${row.oil ? 'oil' : ''}`}>{row.oil ? 'Limite de um ano' : 'Conforme a revisão'}</span><p>{row.oil ? 'Confira se passaram 12 meses da última troca e o que a revisão exige.' : 'A revisão pode exigir a troca. Não há um prazo separado que mande trocar sempre a cada 6 meses.'}</p></>}</td>
        <td><span className={`inline-status ${row.brake ? 'brake' : ''}`}>{row.brake ? 'Prazo de dois anos' : 'Verificar nível'}</span><p>{row.brake ? 'Trocar se passaram 24 meses desde a última troca, mesmo com poucos quilômetros.' : 'Não trocar automaticamente só por chegar a este mês. Confira o prazo próprio e o nível antes de sair.'}</p></td>
      </tr>)}</tbody>
    </table></div>
    {limit < 120 && <button className="load-more-button" onClick={() => setLimit(limit + 24)}>Continuar até {limit + 24} meses<Icon name="plus" size={17} /></button>}
    <div className="time-examples">
      <div><span className="eyebrow">EXEMPLO: A MOTO RODA POUCO</span><h3>A data chega primeiro.</h3><p>Se a moto ainda não chegou a 6.000 km, mas completou 12 meses desde a entrega, a segunda revisão já chegou pelo tempo. Não espere completar os quilômetros. Confira também os serviços que já foram feitos.</p></div>
      <div><span className="eyebrow">EXEMPLO: A MOTO RODA MUITO</span><h3>Os quilômetros chegam antes.</h3><p>Se a revisão de 12.000 km foi feita antes dos 18 meses, não a repita apenas por completar 18 meses. Anote a data real da troca de óleo para contar o limite de um ano.</p></div>
    </div>
    <Notice title="Moto parada por muito tempo?">O manual orienta retirar a bateria e carregá-la uma vez por mês durante o período em que a moto ficar guardada. Isso não significa trocar a bateria todo mês nem dispensa os outros cuidados para guardar a moto. <References refs={[ref(91)]} year={state.profile.year} /></Notice>
  </section>;
}

export function ConditionView({ state, onService, onRecord }: { state: StoredState; onService: (service: Service) => void; onRecord: (id: string) => void }) {
  const [open, setOpen] = useState('pads');
  return <section className="full-section">
    <SectionHeading label="O ESTADO DA PEÇA É QUE DECIDE" title="Desgaste não tem data marcada." description="A verificação mostra quando ajustar, limpar, consertar ou trocar. Nem toda peça tem uma quilometragem fixa para troca." />
    <div className="condition-principle"><Icon name="wrench" size={25} /><p><strong>Consertar um defeito é diferente de fazer a revisão.</strong><span>Uma peça pode precisar de cuidado antes do prazo. Outra pode estar boa na revisão e não precisar de troca.</span></p></div>
    <div className="condition-list">{CONDITIONS.map((item, index) => <article className={`condition-item ${open === item.id ? 'open' : ''}`} key={item.id}>
      <button className="condition-toggle" aria-expanded={open === item.id} onClick={() => setOpen(open === item.id ? '' : item.id)}><span className="condition-number">{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><span>Por desgaste ou defeito</span><Icon name="chevron-down" size={18} /></button>
      {open === item.id && <div className="condition-body">
        <div><span className="eyebrow">SINAL PARA CUIDAR ANTES</span><p>{item.trigger}</p></div>
        <div><span className="eyebrow">O QUE FAZER</span><p>{item.action}</p></div>
        {item.id === 'pads' && <Notice title={`Sua versão: ${state.profile.variant}`}>{variantNote(state.profile.variant, state.profile.year)}</Notice>}
        <footer><References refs={item.refs} year={state.profile.year} /><div>{item.id !== 'battery' && <button className="text-button" onClick={() => onService(getServiceForModel(item.id, state.profile.year, state.profile.variant))}>Ver orientação completa<Icon name="external" size={14} /></button>}<button className="text-button" onClick={() => onRecord(item.id)}><Icon name="plus" size={14} />Registrar</button></div></footer>
      </div>}
    </article>)}</div>
    <Notice title="Não trocar só por costume.">Esta tabela não define trocas periódicas para rolamentos, amortecedores, cabo da embreagem ou óleo das bengalas, os tubos da suspensão dianteira. O filtro de ar não deve ser lavado ou soprado. A tela e o filtro centrífugo de óleo têm limpeza prevista, não troca automática. <References refs={[ref(44), ref(45), ref(46), ref(58)]} year={state.profile.year} /></Notice>
  </section>;
}

export function ChecklistView({ state, onCheck, onOffroad, onReset }: { state: StoredState; onCheck: (id: string) => void; onOffroad: (value: boolean) => void; onReset: () => void }) {
  const items = [...DAILY_CHECKLIST, ...(state.checklist.offroad ? OFFROAD_CHECKLIST : [])];
  const count = items.filter(item => state.checklist.checked.includes(item.id)).length;
  return <section className="full-section checklist-section">
    <SectionHeading label="O QUE VERIFICAR ANTES DE PILOTAR" title="Sua próxima saída começa aqui." description="Esta lista contém só as verificações que o manual pede antes do uso, nas páginas 48 e 49." />
    <div className="checklist-summary"><div className="check-progress-ring" style={{ '--progress': `${count / items.length * 100}%` } as React.CSSProperties}><span>{count}<small>/{items.length}</small></span></div><div><h3>{count === items.length ? 'Lista preenchida.' : 'Um cuidado de cada vez.'}</h3><p>{count === items.length ? 'Antes de sair, confirme que todos os problemas encontrados foram corrigidos.' : `${count} de ${items.length} verificações marcadas nesta lista.`}</p><small>{displayDate(state.checklist.date)} · Salvo neste navegador. A lista recomeça a cada dia.</small></div><button className="text-button" onClick={onReset}><Icon name="reset" size={15} />Verificar de novo</button></div>
    <div className="checklist-options"><span><Icon name="route" size={19} /><strong>Vai sair do asfalto?</strong><small>Inclua as quatro verificações extras.</small></span><label className="switch"><input type="checkbox" aria-label="Incluir cuidados extras para andar fora do asfalto" checked={state.checklist.offroad} onChange={event => onOffroad(event.target.checked)} /><span /></label></div>
    <div className="full-checklist">{items.map((item, i) => <div className={`checklist-item ${state.checklist.checked.includes(item.id) ? 'checked' : ''}`} key={item.id}><label><input type="checkbox" checked={state.checklist.checked.includes(item.id)} onChange={() => onCheck(item.id)} /><span className="custom-check"><Icon name="check" size={13} /></span><span className="checklist-item-text"><span className="checklist-index">{String(i + 1).padStart(2, '0')}</span><strong>{item.title}</strong><span>{item.text}</span></span></label><References refs={item.refs} year={state.profile.year} compact /></div>)}</div>
    <Notice title="Marcar a lista não garante que a moto está segura." tone="warning">Só marque o que você realmente conferiu. Corrija qualquer falha antes de pilotar. Esta lista não substitui a avaliação de um profissional nem as revisões.</Notice>
    <section className="weekly-section"><div><span className="eyebrow">E UMA VEZ POR SEMANA?</span><h3>Pneus frios.<br />Pressão conferida.</h3><p>A cada 1.000 km ou uma vez por semana, olhe o estado dos pneus e confira a pressão com um medidor. Faça isso também antes de sair do asfalto e quando voltar.</p><References refs={[ref(46), ref(55), ref(101)]} year={state.profile.year} /></div><div className="pressure-table"><div><span>Dianteiro</span><strong>22<small>psi</small></strong><small>Com ou sem passageiro</small></div><div><span>Traseiro</span><strong>22<small>psi</small></strong><small>Somente piloto</small></div><div><span>Traseiro</span><strong>29<small>psi</small></strong><small>Piloto + passageiro</small></div></div></section>
  </section>;
}

export function SevereView({ state, onToggle, onService }: { state: StoredState; onToggle: (usage: Usage) => void; onService: (service: Service) => void }) {
  return <section className="full-section">
    <SectionHeading label="USO INTENSO E CUIDADOS EXTRAS" title="O caminho muda. O cuidado acompanha." description="O manual chama de uso severo as situações que exigem mais cuidado, como poeira, lama e umidade. As notas 4, 5 e 8 indicam quais serviços fazer mais vezes." />
    <Notice title="Cuidar mais vezes não é inventar um novo prazo.">A página 44 orienta procurar a concessionária para definir a frequência adequada ao seu uso. Marcar uma opção abaixo destaca os cuidados relacionados; não reduz os intervalos pela metade. <References refs={[ref(44), ref(46)]} year={state.profile.year} /></Notice>
    <div className="severe-grid">{SEVERE_USE.map(usage => <article className={`severe-item ${state.profile.usage.includes(usage.id) ? 'selected' : ''}`} key={usage.id}><div className="severe-title"><span className="severe-icon"><Icon name={usage.icon} size={24} /></span><h3>{usage.title}</h3><button className="usage-toggle" onClick={() => onToggle(usage.id)} aria-pressed={state.profile.usage.includes(usage.id)} aria-label={`${state.profile.usage.includes(usage.id) ? 'Desmarcar' : 'Marcar'} ${usage.title} no meu uso da moto`}><Icon name={state.profile.usage.includes(usage.id) ? 'check' : 'plus'} size={16} /></button></div><p className="severe-lead">{usage.text}</p><p>{usage.action}</p>{usage.services.length > 0 && <div className="related-services"><span>CUIDADOS NESSA SITUAÇÃO</span>{usage.services.map(id => <button key={id} onClick={() => onService(getServiceForModel(id, state.profile.year, state.profile.variant))}>{getServiceForModel(id, state.profile.year, state.profile.variant).component}<Icon name="external" size={11} /></button>)}</div>}<References refs={usage.refs} year={state.profile.year} compact /></article>)}</div>
  </section>;
}

export function SafetyView({ state }: { state: StoredState }) {
  return <section className="full-section">
    <SectionHeading label="ALERTAS DE SEGURANÇA" title="Alguns sinais não podem esperar." description="Em alguns casos, o manual manda interromper o uso. Em outros, manda reduzir a velocidade e procurar ajuda. Veja a diferença." />
    <div className="safety-group-heading stop"><Icon name="alert" size={21} /><h3>Não continue até corrigir ou verificar.</h3></div>
    <div className="safety-list">{SAFETY_ALERTS.filter(item => item.level === 'stop').map(item => <article key={item.id}><span className="safety-indicator stop"><Icon name="close" size={15} /></span><div><h4>{item.title}</h4><p>{item.text}</p><References refs={item.refs} year={state.profile.year} compact /></div></article>)}</div>
    <div className="safety-group-heading caution"><Icon name="info" size={21} /><h3>Reduza a velocidade e siga a orientação.</h3></div>
    <div className="safety-list">{SAFETY_ALERTS.filter(item => item.level === 'caution' && (state.profile.variant === 'ABS' || item.id !== 'abs')).map(item => <article key={item.id}><span className="safety-indicator caution"><Icon name="alert" size={15} /></span><div><h4>{item.title}{item.id === 'abs' && <span className="version-label">SOMENTE ABS</span>}</h4><p>{item.text}</p><References refs={item.refs} year={state.profile.year} compact /></div></article>)}</div>
    <Notice title="Freios são itens de segurança.">Não apenas complete o líquido baixo: verifique as pastilhas e procure vazamentos. Os serviços nos freios devem ser feitos na concessionária. Não aplique lubrificante ou spray contra ferrugem nas superfícies dos freios. <References refs={[ref(53), ref(54), ref(63), ref(64), ref(84)]} year={state.profile.year} /></Notice>
    <div className="safety-variant"><Icon name="shield" size={30} /><div><h3>{state.profile.variant === 'ABS' ? 'ABS na frente. Atenção nas duas rodas.' : state.profile.variant === 'ESDD' ? 'ESDD: dois discos, sem CBS.' : state.profile.variant === 'ESD' ? 'ESD: disco na frente e tambor atrás.' : (state.profile.variant === 'KS' || (state.profile.variant === 'ES' && state.profile.year !== '2016')) ? `${state.profile.variant}: dois tambores na geração correspondente.` : state.profile.year === '2016' && state.profile.variant === 'ES' ? 'ES 2016: dois tambores.' : 'CBS combina os freios. Não evita o travamento.'}</h3><p>{state.profile.variant === 'ABS' ? 'O ABS não atua na roda traseira nem abaixo de 10 km/h. Se a luz não apagar acima de 10 km/h ou não acender quando a ignição é ligada, o sistema precisa ser verificado.' : state.profile.variant === 'ESDD' ? 'A ESDD desta geração usa dois freios a disco e não deve ser descrita como CBS. Siga o procedimento do manual para a frenagem e manutenção.' : state.profile.variant === 'ESD' ? 'A ESDD não é essa versão: a ESD usa disco na frente e tambor atrás. Siga o procedimento específico do manual.' : (state.profile.variant === 'KS' || (state.profile.variant === 'ES' && state.profile.year !== '2016')) ? `A ${state.profile.variant} ${state.profile.year} usa freio a tambor na dianteira e na traseira. Não procure fluido hidráulico no freio dianteiro.` : state.profile.year === '2016' && state.profile.variant === 'ES' ? 'A ES 2016 usa freio a tambor na dianteira e na traseira. Não descreva esta versão como ESDD, CBS ou ABS.' : 'O CBS distribui a força entre os freios. Para frear melhor, use os freios dianteiro e traseiro ao mesmo tempo, como orienta o manual.'}</p><References refs={[ref(19), ref(73)]} year={state.profile.year} /></div></div>
  </section>;
}

export function MilestoneOverview({ milestone, state, onService }: { milestone: Milestone; state: StoredState; onService: (service: Service) => void }) {
  return <>
    <Notice title="Quilometragem ou tempo, o que ocorrer primeiro.">{milestone.subtitle} Se o serviço já foi feito pela quilometragem, não precisa repeti-lo apenas porque chegou o mês correspondente.</Notice>
    {milestone.notice && <p className="modal-context-note">{milestone.notice}</p>}
    <div className="overview-services">{milestone.services.map(service => <button key={service.id} onClick={() => onService(service)}><span><strong>{service.component}</strong><small>{service.service}</small></span><ActionLabels actions={service.actions} compact /><Icon name="chevron" size={15} /></button>)}</div>
    <References refs={[REVIEW_DATES, ref(44), ref(45), ref(46)]} year={state.profile.year} />
  </>;
}