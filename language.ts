import type { Service } from './types';

export const LANGUAGE_NOTE = 'Usamos palavras mais simples para explicar o manual, sem mudar prazos, medidas ou cuidados de segurança. Quando o nome da peça muda na tela, mostramos também o nome usado no manual.';

export const MANUAL_TERMS = [
  { term: 'Fluido de freio', simple: 'Líquido de freio', explanation: 'Líquido próprio do sistema de freios. Não é óleo de motor. Mantenha a especificação DOT 4 do manual.' },
  { term: 'Cavalete lateral', simple: 'Pezinho lateral da moto', explanation: 'Apoio que você abaixa para estacionar a moto.' },
  { term: 'Deslizador da corrente', simple: 'Guia da corrente', explanation: 'Peça por onde a corrente desliza. É diferente do apoio de borracha; cada um tem sua marca de desgaste.' },
  { term: 'Cáliper', simple: 'Pinça de freio', explanation: 'Peça que segura as pastilhas do freio. Confira a posição de observar as pastilhas conforme a versão ABS ou CBS.' },
  { term: 'Folga', simple: 'Movimento livre ou espaço de regulagem', explanation: 'É o movimento ou espaço que se mede no item indicado. Não é o mesmo que desgaste. Respeite a medida de cada peça.' },
  { term: 'Facho do farol', simple: 'Direção da luz do farol', explanation: 'Ajustar o facho é regular para onde a luz aponta, não trocar o farol.' },
  { term: 'Filtro centrífugo de óleo', simple: 'Filtro que separa resíduos pela rotação', explanation: 'É diferente da tela do filtro de óleo. A tabela manda limpar os dois nos intervalos indicados, não trocá-los automaticamente.' },
  { term: 'Emissões evaporativas', simple: 'Vapores do combustível', explanation: 'O sistema controla esses vapores. A verificação não obriga a trocar todas as suas peças.' },
  { term: 'MCS', simple: 'Aparelho de diagnóstico da oficina', explanation: 'Equipamento que o manual manda usar para verificar a parte elétrica e eletrônica.' },
  { term: 'Uso severo / off-road', simple: 'Uso que exige mais cuidado / fora do asfalto', explanation: 'Poeira, lama, umidade e outras situações podem exigir cuidados mais frequentes. O manual não dá um intervalo menor único para todos os casos.' },
];

export function normalizeSearch(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').replace(/\./g, '').trim();
}

export function serviceSearchText(service: Service): string {
  return `${service.component} ${service.manualName || ''} ${service.service}`;
}