import type { ActionType, ModelYear, Reference, Service, Usage, Variant } from './types';

export const ACTIONS: Record<ActionType, { code: string; label: string; noun: string; description: string }> = {
  inspect: { code: 'A', label: 'Verificar', noun: 'Verificação', description: 'Conferir funcionamento, nível, folga ou desgaste. O manual chama isso de inspeção. Verificar não significa trocar.' },
  adjust: { code: 'B', label: 'Ajustar', noun: 'Ajuste', description: 'Corrigir a regulagem se a medição ou a orientação do manual mostrar que é necessário.' },
  clean: { code: 'C', label: 'Limpar', noun: 'Limpeza', description: 'Retirar a sujeira da forma indicada no manual. Limpar não é trocar a peça.' },
  lubricate: { code: 'D', label: 'Lubrificar', noun: 'Lubrificação', description: 'Passar o lubrificante indicado para aquela peça. Use somente o produto e os pontos de aplicação recomendados.' },
  replace: { code: 'E', label: 'Trocar', noun: 'Troca', description: 'Colocar uma peça ou produto novo no prazo do manual ou quando o desgaste exigir. No manual: substituição.' },
  repair: { code: 'F', label: 'Consertar se preciso', noun: 'Conserto por desgaste ou defeito', description: 'Consertar um problema encontrado na verificação. Não significa trocar a peça em toda revisão.' },
};

export const ref = (page: number, section?: string): Reference => ({ page: String(page), viewer: page, section });
export const CERTIFICATE: Reference = { page: 'Certificado', viewer: 7, section: 'Primeiras revisões; página 7 do arquivo' };
export const REVIEW_DATES: Reference = { page: 'Certificado', viewer: 8, section: 'Revisões do calendário; página 8 do arquivo' };
export const MANUAL_NOTE = 'Os links de referência usam diretamente o número da página impressa no manual. Por isso, p. 44 abre p=44, p. 45 abre p=45 e p. 46 abre p=46 no visualizador.';
export const FAN_SOURCE_SCOPE = 'Para a CG 150 Fan ESDi 2013/2014 e a CG 160 Fan 2015/2016/2017/2018/2019/2020/2021/2022/2023/2024/2025/2026, usamos a fonte Honda correspondente ao ano quando disponível. A CG 160 Fan 2016 é a versão ESDi, com disco dianteiro e tambor traseiro, sem CBS; as regras de cada ano são mantidas separadamente. Para 2021, o calendário de revisões e a manutenção da corrente seguem especificamente o Manual CG 160 Fan/Titan 2021 (D2203-MAN-1255). Para os demais anos, o plano usa os intervalos confirmados nas respectivas referências, sem extrapolar regra de um ano para outro.';
export const FAN_2013_REFERENCE: Reference = { page: 'Plano de manutenção 6-1 · Manual CG150 Fan ESi/ESDi · D2203-MAN-0866', viewer: 43, section: 'Manual oficial Honda' };
export const FAN_2014_REFERENCE: Reference = { page: 'Manual CG 150 Fan ESDi 2014 · D2203-MAN-0945', viewer: 45, section: 'Manual oficial Honda' };
export const FAN_2015_REFERENCE: Reference = { page: 'Honda CG 160 Fan 2015 · referência técnica da linha 2016', viewer: 1, section: 'Manual Honda 2016 + documentação de lançamento 2015' };
export const FAN_REFERENCE: Reference = { page: 'Honda CG 160 Fan 2026', viewer: 1, section: 'Página oficial Honda do modelo' };
export const FAN_2016_REFERENCE: Reference = { page: 'Manual CG 160 Fan/Titan 2016 · D2203-MAN-1025', viewer: 37, section: 'Manual oficial Honda' };
export const FAN_2017_REFERENCE: Reference = { page: 'Manual CG 160 Fan/Titan 2017 · D2203-MAN-1082', viewer: 37, section: 'Manual oficial Honda' };
export const FAN_2018_REFERENCE: Reference = { page: 'Manual CG 160 Fan/Titan 2018 · D2203-MAN-1141', viewer: 1, section: 'Manual oficial Honda' };
export const FAN_2019_REFERENCE: Reference = { page: 'Manual CG 160 Fan/Titan 2019~2020 · D2203-MAN-1185', viewer: 1, section: 'Manual oficial Honda' };
export const FAN_2020_REFERENCE: Reference = { page: 'Manual CG 160 Fan/Titan 2019~2020 · D2203-MAN-1185', viewer: 1, section: 'Manual oficial Honda' };
export const FAN_2021_REFERENCE: Reference = { page: 'Manual CG 160 Fan/Titan 2021 · D2203-MAN-1255', viewer: 1, section: 'Manual oficial Honda' };
export const FAN_2022_REFERENCE: Reference = { page: 'Manual CG 160 Fan/Titan 2022 · D2203-MAN-1260', viewer: 1, section: 'Manual oficial Honda' };
export const FAN_2023_REFERENCE: Reference = { page: 'Manual CG 160 Fan/Titan 2023~2024 · D2203-MAN-1303', viewer: 1, section: 'Manual oficial Honda' };
export const FAN_2024_REFERENCE: Reference = { page: 'Manual CG 160 Fan/Titan 2023~2024 · D2203-MAN-1303', viewer: 1, section: 'Manual oficial Honda' };
export const FAN_2025_REFERENCE: Reference = { page: 'Honda CG 160 2025', viewer: 1, section: 'Sala de Imprensa Honda · manutenção e freios' };
export const TITAN_2026_REFERENCE: Reference = { page: 'Honda CG 160 Titan 2026', viewer: 1, section: 'Página oficial Honda do modelo' };
export const CARGO_2025_REFERENCE: Reference = { page: 'Honda CG 160 2025 · CG 160 Cargo', viewer: 155, section: 'Sala de Imprensa Honda · especificações, freios e intervalo de manutenção' };
export const CARGO_2025_MAINTENANCE_REFERENCE: Reference = { page: 'Honda CG 160 2025 · intervalo de manutenção', viewer: 155, section: 'Sala de Imprensa Honda · primeira revisão em 1.000 km/6 meses e posteriores a cada 6.000 km/6 meses' };
export const CARGO_2026_REFERENCE: Reference = { page: 'Honda CG 160 Cargo 2026', viewer: 1, section: 'Página oficial Honda do modelo' };
export const CARGO_2026_MAINTENANCE_REFERENCE: Reference = { page: 'Tabela de manutenção CG 160 Cargo 2025', viewer: 43, section: 'Referência oficial Honda · tabela de manutenção mais recente localizada' };
export const START_2026_REFERENCE: Reference = { page: 'Honda CG 160 Start 2026', viewer: 1, section: 'Página oficial Honda do modelo' };
export const START_2015_REFERENCE: Reference = { page: 'Manual CG150 Start (2015) · Tabela de Manutenção', viewer: 34, section: 'Manual oficial Honda · Tabela de Manutenção (páginas impressas 34 a 37)' };
export const START_2015_SOURCE_SCOPE = 'Para a CG 150 Start 2015 (no manual, "CG150 Start"), a fonte é o Manual do Proprietário Honda desse modelo, lido pelo texto: certificado, Tabela de Manutenção (páginas impressas 34 a 37) e procedimentos de manutenção até a página 81. A Start 150 é flex, tem freios a tambor, leva piloto e passageiro (carga máxima de 161 kg) e é a geração anterior à CG 160 Start. Os intervalos em km e as notas vêm do texto da tabela. As marcações por coluna (1.000, 4.000, 8.000...) e as Especificações Técnicas (pressão e profundidade mínima dos pneus, modelo da vela; páginas 106 a 108) não foram conferidas na imagem do manual: confira no manual entregue com a sua moto, que prevalece sobre este plano. As cores (Preto e Vermelho) vêm do catálogo de cores da Honda para o modelo 2015, não do manual.';
export const START_MAINTENANCE_REFERENCE: Reference = { page: 'Manual Honda CG 160 Start 2022 · D2203-MAN-1261', viewer: 1, section: 'Manual oficial Honda · última edição específica de Start encontrada' };
export const START_2022_REFERENCE: Reference = { page: 'Manual CG 160 Start (2022) · Tabela de Manutenção', viewer: 32, section: 'Manual oficial Honda D2203-MAN-1261 · Tabela de Manutenção (páginas impressas 32 a 35)' };
const startPageRef = (page: number, label: string): Reference => ({ page: `Manual CG 160 Start (2022) · ${label}`, viewer: page, section: `Manual oficial Honda D2203-MAN-1261 · página impressa ${page}` });
export const START_2022_SOURCE_SCOPE = 'Para a CG 160 Start 2022, a fonte é o Manual do Proprietário Honda CG 160 Start (2022), D2203-MAN-1261, lido pelo texto: certificado de garantia, Tabela de Manutenção (páginas impressas 32 a 35), procedimentos e especificações. A Start 2022 usa freio a tambor nas duas rodas com CBS, é abastecida só com gasolina comum, leva piloto e passageiro (carga máxima de 161 kg) e não tem fluido de freio. A tabela traz 1.000 km, 6.000 km e depois intervalos de 6.000 km. As marcações por coluna (quais serviços caem em cada revisão) não aparecem no texto do PDF e não foram conferidas na imagem: confira no manual entregue com a sua moto, que prevalece. Pressão e profundidade mínima dos pneus (página 104) e modelo da vela (página 103) ficam nas Especificações Técnicas, que não foram copiadas aqui.';

export const TITAN_2026_MAINTENANCE_REFERENCE: Reference = { page: 'Honda CG 160 2025 · nova geração', viewer: 1, section: 'Sala de Imprensa Honda · intervalo de manutenção da 10ª geração' };
export const CARGO_2023_2024_REFERENCE: Reference = { page: 'Manual do Proprietário CG 160 Cargo (2023~2024) · D2203-MAN-1305', viewer: 47, section: 'Manual oficial Honda · tabela de manutenção da Cargo 2023/2024' };
export const CARGO_2013_REFERENCE: Reference = { page: 'Manual CG150 Fan Cargo ESDi (2014) · Plano de Manutenção Preventiva · edição mais próxima da Cargo 2013', viewer: 1, section: 'Manual oficial Honda da Cargo 2014 (capítulo 6, páginas 6-1 a 6-3), usado porque não foi encontrado manual específico da Cargo 2013' };
export const CARGO_2013_SOURCE_SCOPE = 'Não encontrei na Honda um manual específico da CG 150 Cargo ESD 2013. Por isso este plano usa o Manual do Proprietário da CG150 Fan Cargo ESDi (2014), a edição mais próxima da mesma linha Cargo 150 flex: Plano de Manutenção Preventiva (capítulo 6, páginas 6-1 a 6-3), procedimentos e especificações. A Cargo 150 tem freio dianteiro a disco e traseiro a tambor, sem CBS e sem ABS, e não leva passageiro. A cor branca vem do comunicado de lançamento da linha Cargo (cor única) e, para o modelo 2014, do catálogo de peças Honda (Branco Ross, código NH-196), não do manual. As marcações por coluna da tabela (1.000, 4.000, 8.000...) foram conferidas na imagem da tabela do manual da Cargo 2014. Como a 2013 não tem manual próprio, confira o manual entregue com a sua moto, que prevalece sobre este plano.';
export const CARGO_2014_REFERENCE: Reference = { page: 'Manual CG150 Fan Cargo ESDi (2014) · Plano de Manutenção Preventiva', viewer: 1, section: 'Manual oficial Honda · Plano de Manutenção Preventiva (capítulo 6, páginas 6-1 a 6-3)' };
export const CARGO_2015_REFERENCE: Reference = { page: 'Manual CG150 Cargo ESD (2015) · Tabela de Manutenção', viewer: 35, section: 'Manual oficial Honda · Tabela de Manutenção (páginas impressas 35 a 38)' };
export const CARGO_2014_SOURCE_SCOPE = 'Para a CG 150 Cargo 2014 (no manual, "CG150 Fan Cargo ESDi"), a fonte é o Manual do Proprietário Honda desse modelo. Foram lidos o Plano de Manutenção Preventiva (capítulo 6, páginas 6-1 a 6-3), os procedimentos de manutenção e as especificações. A CG 150 Cargo é flex, tem freio dianteiro a disco e traseiro a tambor, sem CBS e sem ABS, e não leva passageiro. A cor branca vem do comunicado de lançamento da linha Cargo 2014 (cor única) e do catálogo de peças Honda da Cargo "Modelo 2014" (Branco Ross, código NH-196), não do manual. Os intervalos em km e as marcações por coluna da tabela (1.000, 4.000, 8.000...) foram conferidos na imagem das páginas 6-2 e 6-3.';
export const CARGO_2015_SOURCE_SCOPE = 'Para a CG 150 Cargo 2015 (no manual, "CG150 Cargo ESD"), a fonte é o Manual do Proprietário Honda desse modelo. Foram lidos o certificado, a Tabela de Manutenção (páginas impressas 35 a 38, conferida na imagem, coluna por coluna), os procedimentos de manutenção até a página 87 e as Especificações Técnicas (páginas impressas 105 a 108). A CG 150 Cargo é flex, tem freio dianteiro a disco e traseiro a tambor, sem CBS e sem ABS, e não leva passageiro. A cor branca vem do comunicado de lançamento da linha Cargo (cor única), não do manual. Pressão e profundidade mínima dos pneus (página 108) e vela (página 107) vêm dessas especificações. Fusíveis e lâmpadas (páginas 109 e 110) não foram usados. O manual entregue com a sua moto prevalece.';
export const CARGO_2016_REFERENCE: Reference = { page: 'Manual CG 160 Cargo ESDi 2016 · D2203-MAN-1026', viewer: 34, section: 'Manual oficial Honda · Tabela de Manutenção (páginas impressas 34 a 37)' };
export const CARGO_2017_REFERENCE: Reference = { page: 'Manual CG 160 Cargo ESDi 2016 · D2203-MAN-1026 (edição mais próxima de 2017)', viewer: 34, section: 'Manual oficial Honda · Tabela de Manutenção (páginas impressas 34 a 37)' };
export const CARGO_2016_SOURCE_SCOPE = 'Para a CG 160 Cargo ESDi 2016, a fonte é o Manual do Proprietário Honda CG 160 Cargo ESDi (2016), D2203-MAN-1026, lido por completo; a tabela de manutenção está nas páginas impressas 34 a 37. A Cargo ESDi não tem CBS nem ABS. A cor branca vem do padrão da Cargo em todos os anos, não do manual.';
export const CARGO_2017_SOURCE_SCOPE = 'Para a CG 160 Cargo ESDi 2017, não localizamos um manual do proprietário específico desse ano. A referência é o Manual do Proprietário Honda CG 160 Cargo ESDi (2016), D2203-MAN-1026, a edição mais próxima encontrada, lido por completo (tabela nas páginas impressas 34 a 37). Os prazos de 2017 podem diferir em algum item, então confira no manual impresso da sua moto. A Cargo ESDi não tem CBS nem ABS. A cor branca vem do padrão da Cargo em todos os anos, não do manual.';
export const CARGO_2018_REFERENCE: Reference = { page: 'Manual CG 160 Cargo 2018 · D2203-MAN-1129', viewer: 35, section: 'Manual oficial Honda · Tabela de Manutenção (páginas impressas 35 a 38)' };
export const CARGO_2018_SOURCE_SCOPE = 'Para a CG 160 Cargo 2018, a fonte é o Manual do Proprietário Honda CG 160 Cargo (2018), D2203-MAN-1129, lido por completo; a tabela de manutenção está nas páginas impressas 35 a 38. A cor branca (única) vem da imprensa, não do manual.';
export const CARGO_2019_REFERENCE: Reference = { page: 'Manual CG 160 Cargo 2019 · D2203-MAN-1187', viewer: 37, section: 'Manual oficial Honda · Tabela de Manutenção (páginas impressas 37 a 40)' };
export const CARGO_2020_REFERENCE: Reference = { page: 'Manual CG 160 Cargo 2019 · D2203-MAN-1187 (edição mais próxima de 2020)', viewer: 37, section: 'Manual oficial Honda · Tabela de Manutenção (páginas impressas 37 a 40)' };
export const CARGO_2019_SOURCE_SCOPE = 'Para a CG 160 Cargo 2019, a fonte é o Manual do Proprietário Honda CG 160 Cargo (2019), D2203-MAN-1187, lido por completo; a tabela de manutenção está nas páginas impressas 37 a 40. A cor branca vem de anúncios e da imprensa, não do manual.';
export const CARGO_2020_SOURCE_SCOPE = 'Para a CG 160 Cargo 2020, não localizamos um manual do proprietário específico desse ano. A referência é o Manual do Proprietário Honda CG 160 Cargo (2019), D2203-MAN-1187, a edição mais próxima encontrada, lido por completo (tabela nas páginas impressas 37 a 40). Os prazos de 2020 podem diferir em algum item, então confira no manual impresso da sua moto. A cor branca vem de anúncios e da imprensa, não do manual.';
export const CARGO_2021_2022_REFERENCE: Reference = { page: 'Manual do Proprietário CG 160 Cargo (2019~2020) · D2203-MAN-1187', viewer: 37, section: 'Manual oficial Honda · edição específica de Cargo mais próxima localizada; tabela de manutenção nas páginas impressas 37 a 40' };
export const CARGO_2021_2022_SOURCE_SCOPE = 'Para a CG 160 Cargo 2021 e 2022, não localizamos um manual do proprietário específico desses anos. A referência é o Manual do Proprietário Honda CG 160 Cargo (2019~2020), D2203-MAN-1187, a edição específica de Cargo mais próxima encontrada; a tabela de manutenção dele (páginas impressas 37 a 40) foi lida para esta entrada. Os prazos de 2021 e 2022 podem diferir em algum item, então confira no manual impresso da sua moto.';
export const CARGO_2023_2024_SOURCE_SCOPE = 'Para a CG 160 Cargo 2023 e 2024, a fonte é o Manual do Proprietário Honda CG 160 Cargo (2023~2024), D2203-MAN-1305. Os prazos seguem a base CG 160 já usada no app; confira a tabela do PDF original, pois esta entrada ainda não foi comparada linha a linha com o manual.';
export const CARGO_2025_SOURCE_SCOPE = 'Para a CG 160 Cargo 2025, as especificações e o intervalo geral de manutenção vêm da comunicação oficial Honda da linha CG 160 2025. Não inventamos um manual PDF 2025 específico; a tabela detalhada permanece vinculada à referência técnica Honda da família Cargo quando necessário.';
export const CARGO_SOURCE_SCOPE = 'Para a CG 160 Cargo 2026, as especificações do modelo vêm da página oficial Honda 2026. Para manutenção, usamos a tabela oficial Honda mais recente localizada para CG 160 Cargo, sem inventar um manual 2026 específico.';
export const sourceScopeForYear = (year: ModelYear) => year === 'FAN-2013' || year === 'FAN-2014' || year === 'FAN-2015' || year === 'FAN-2016' || year === 'FAN-2017' || year === 'FAN-2018' || year === 'FAN-2019' || year === '2020' || year === '2021' || year === '2022' || year === '2023' || year === '2024' || year === '2025' || year === '2026' ? FAN_SOURCE_SCOPE : year === 'START-2015' ? START_2015_SOURCE_SCOPE : year === 'START-2022' ? START_2022_SOURCE_SCOPE : year === 'START-2026' ? 'Para a CG 160 Start 2026, as especificações vêm da página oficial Honda 2026; para manutenção, usamos a última edição específica de Start encontrada (2022) como referência de manutenção da família, junto da comunicação oficial da 10ª geração de 2025, sem inventar manual 2026 específico.' : year === 'CARGO-2013' ? CARGO_2013_SOURCE_SCOPE : year === 'CARGO-2014' ? CARGO_2014_SOURCE_SCOPE : year === 'CARGO-2015' ? CARGO_2015_SOURCE_SCOPE : year === 'CARGO-2016' ? CARGO_2016_SOURCE_SCOPE : year === 'CARGO-2017' ? CARGO_2017_SOURCE_SCOPE : year === 'CARGO-2018' ? CARGO_2018_SOURCE_SCOPE : year === 'CARGO-2019' ? CARGO_2019_SOURCE_SCOPE : year === 'CARGO-2020' ? CARGO_2020_SOURCE_SCOPE : year === 'CARGO-2021' || year === 'CARGO-2022' ? CARGO_2021_2022_SOURCE_SCOPE : year === 'CARGO-2023' || year === 'CARGO-2024' ? CARGO_2023_2024_SOURCE_SCOPE : year === 'CARGO-2025' ? CARGO_2025_SOURCE_SCOPE : year === 'CARGO-2026' ? CARGO_SOURCE_SCOPE : year === 'TITAN-2026' ? 'Para a CG 160 Titan 2026, as especificações do modelo vêm da página oficial Honda 2026; para o calendário de manutenção, usamos a referência oficial da 10ª geração CG 160 2025, sem inventar um manual 2026 específico.' : SOURCE_SCOPE;
export const SOURCE_SCOPE = 'As orientações técnicas do plano vêm dos manuais do proprietário correspondentes a cada ano-modelo. Quando um mesmo manual atende mais de um ano, essa relação é mantida apenas como referência interna da fonte; ela não altera nem agrupa os anos disponíveis para a motocicleta. Não usamos preços, perguntas frequentes ou dicas genéricas de sites.';
export const SOURCE_LIMIT = 'Não há serviços inventados para os modelos antigos: cada geração/ano usa seus próprios intervalos e regras de versão quando confirmados no manual. O plano continua sem transformar uma verificação em troca automática.';

const normalCondition = 'Faça a verificação antes do prazo se notar algum problema. O manual não dá um intervalo menor que sirva para todos os casos.';
const inspectNote = 'Pela nota 1, a verificação pode levar a limpeza, ajuste, lubrificação ou troca, mas somente se houver necessidade. Verificar não significa trocar uma peça que está boa.';

const FAN_SERVICE_OVERRIDES: Record<string, Partial<Service>> = {
  'break-in': { frequency: 'Durante os primeiros 500 km', refs: [FAN_REFERENCE, FAN_2018_REFERENCE, FAN_2019_REFERENCE, FAN_2020_REFERENCE, FAN_2021_REFERENCE, FAN_2022_REFERENCE], notes: 'Na primeira utilização, siga os cuidados de amaciamento indicados no manual da CG 160 Fan. Completar 500 km não cria uma troca automática.' },
  'electrical': { frequency: 'A cada 6.000 km', kmInterval: 6000, refs: [FAN_REFERENCE] },
  'oil-level': { frequency: 'Antes de pilotar', refs: [FAN_REFERENCE], notes: 'Confira o nível do óleo conforme o procedimento do manual antes de usar a moto.' },
  'drain': { frequency: 'A cada 6.000 km e quando o procedimento exigir', kmInterval: 6000, refs: [FAN_REFERENCE] },
  'oil-screen': { frequency: 'A cada 12.000 km', kmInterval: 12000, refs: [FAN_REFERENCE] },
  'centrifugal': { frequency: 'A cada 12.000 km', kmInterval: 12000, refs: [FAN_REFERENCE] },
  'idle': { frequency: 'A cada 6.000 km', kmInterval: 6000, refs: [FAN_REFERENCE] },
  'fasteners': { frequency: 'A cada 12.000 km', kmInterval: 12000, refs: [FAN_REFERENCE] },
  'exhaust': { frequency: 'A cada 6.000 km', kmInterval: 6000, refs: [FAN_REFERENCE] },
  'delivery': { frequency: '0 km, na entrega', refs: [FAN_REFERENCE], notes: 'Confira documentos, itens de entrega e o registro da revisão. A quilometragem 0 km representa a entrega, não uma troca geral de peças.' },
  'first-review': { frequency: '1.000 km ou 6 meses da entrega, o que ocorrer primeiro', kmInterval: 1000, refs: [FAN_REFERENCE, FAN_2018_REFERENCE, FAN_2019_REFERENCE, FAN_2020_REFERENCE, FAN_2021_REFERENCE, FAN_2022_REFERENCE, FAN_2023_REFERENCE, FAN_2024_REFERENCE, FAN_2025_REFERENCE], pending: false, notes: 'A Honda informa a primeira revisão em 1.000 km ou 6 meses. Depois dela, confira o calendário específico do ano no manual; em 2021, a tabela segue 6.000 km/12 meses e os marcos posteriores indicados no manual.' },
  'chain': { frequency: 'A cada 500 km; verificar condição e folga antes do uso', kmInterval: 500, refs: [FAN_REFERENCE], notes: 'Para Fan 2022+, verifique a condição e a folga antes de pilotar e cuide da corrente a cada 500 km.' },
  'tires': { frequency: 'A cada 1.000 km ou semanalmente; também antes do uso', kmInterval: 1000, refs: [FAN_REFERENCE] },
  'oil': { frequency: 'A cada 6.000 km ou uma vez por ano, o que ocorrer primeiro', kmInterval: 6000, timeMonths: 12, refs: [FAN_REFERENCE, FAN_2019_REFERENCE, FAN_2020_REFERENCE, FAN_2021_REFERENCE, FAN_2022_REFERENCE, FAN_2023_REFERENCE, FAN_2024_REFERENCE, FAN_2025_REFERENCE] },
  'air': { frequency: 'A cada 18.000 km', kmInterval: 18000, refs: [FAN_REFERENCE] },
  'spark-inspect': { frequency: 'A cada 12.000 km', kmInterval: 12000, refs: [FAN_REFERENCE] },
  'spark': { frequency: 'A cada 12.000 km', kmInterval: 12000, refs: [FAN_REFERENCE] },
  'valves': { frequency: 'A cada 6.000 km', kmInterval: 6000, refs: [FAN_REFERENCE] },
  'fuel-line': { frequency: 'A cada 6.000 km', kmInterval: 6000, refs: [FAN_REFERENCE] },
  'throttle': { frequency: 'A cada 6.000 km e antes de pilotar', kmInterval: 6000, refs: [FAN_REFERENCE] },
  'brake-level': { frequency: 'A cada 6.000 km e antes de pilotar', kmInterval: 6000, refs: [FAN_REFERENCE], notes: 'A CG 160 Fan tem disco dianteiro com circuito hidráulico e tambor traseiro. Confira o nível e o funcionamento.' },
  'brake-fluid': { frequency: 'A cada 2 anos', timeMonths: 24, refs: [FAN_REFERENCE], notes: 'Conte o prazo a partir da última troca real do fluido do circuito hidráulico.' },
  'pads': { frequency: 'A cada 6.000 km e antes de pilotar', kmInterval: 6000, refs: [FAN_REFERENCE], notes: 'As pastilhas correspondem ao freio dianteiro a disco; o freio traseiro é a tambor.' },
  'brakes': { frequency: 'A cada 6.000 km e antes de pilotar', kmInterval: 6000, refs: [FAN_REFERENCE, FAN_2019_REFERENCE, FAN_2020_REFERENCE, FAN_2021_REFERENCE, FAN_2022_REFERENCE, FAN_2023_REFERENCE, FAN_2024_REFERENCE, FAN_2025_REFERENCE], notes: 'A CG 160 Fan usa CBS, com disco dianteiro e tambor traseiro. Não é ABS.' },
  'brake-switch': { frequency: 'A cada 6.000 km', kmInterval: 6000, refs: [FAN_REFERENCE] },
  'headlight': { frequency: 'A cada 6.000 km e antes de pilotar', kmInterval: 6000, refs: [FAN_REFERENCE] },
  'clutch': { frequency: 'A cada 6.000 km', kmInterval: 6000, refs: [FAN_REFERENCE] },
  'stand': { frequency: 'A cada 6.000 km', kmInterval: 6000, refs: [FAN_REFERENCE] },
  'suspension': { frequency: 'A cada 6.000 km', kmInterval: 6000, refs: [FAN_REFERENCE] },
  'wheels': { frequency: 'A cada 6.000 km', kmInterval: 6000, refs: [FAN_REFERENCE] },
  'steering': { frequency: 'A cada 12.000 km', kmInterval: 12000, refs: [FAN_REFERENCE] },
};

export const SERVICES: Service[] = [
  {
    id: 'delivery', component: 'Moto e documentos', service: 'Revisão de entrega', actions: ['inspect'],
    frequency: '0 km, na entrega', description: 'Confira os documentos e o registro da revisão de entrega. Anote a data em que a moto zero-quilômetro foi entregue para contar os prazos. Conheça a lista do que verificar antes de pilotar.',
    reason: 'Começar o acompanhamento com a data e a quilometragem corretas.', anticipation: 'Qualquer problema encontrado antes do primeiro uso deve ser corrigido.',
    notes: '0 km é a revisão de entrega do certificado, não uma troca geral de peças.', replacement: 'Este plano não cria trocas automáticas de peças em 0 km.', refs: [CERTIFICATE, ref(48), ref(49)], severe: [], group: 'guidance',
  },
  {
    id: 'break-in', component: 'Motor e freios', manualName: 'Cuidados para amaciar o motor', service: 'Cuidados nos primeiros 500 km', actions: ['inspect'],
    frequency: 'Durante os primeiros 500 km', description: 'É o período de amaciamento do motor. Evite acelerar de repente, acelerar tudo com o motor em baixa rotação, manter a mesma velocidade por muito tempo e usar rotações muito baixas ou altas. Freie suavemente. São cuidados ao pilotar, não serviços de oficina.',
    reason: 'Ajudar o motor a durar e os freios a funcionar bem.', anticipation: 'Siga esses cuidados desde a primeira saída. Giro excessivo pode danificar seriamente o motor.',
    notes: 'A página 18 recomenda manter os bons hábitos por toda a vida útil. Completar 500 km não é motivo para forçar a moto.', replacement: 'Completar os primeiros 500 km não cria uma troca obrigatória neste plano.', refs: [ref(18)], severe: [], group: 'guidance',
  },
  {
    id: 'first-review', component: 'Primeira revisão', service: 'Conferir os serviços de 1.000 km', actions: ['inspect'],
    frequency: '1.000 km ou 6 meses da entrega, o que ocorrer primeiro', description: 'Leve a moto à concessionária para fazer os serviços marcados na coluna de 1.000 km do manual. Confira no PDF original a marcação de troca de óleo e os ajustes. Essas marcações não apareceram na leitura do texto.',
    reason: 'Não deixar de fazer um serviço inicial nem tratar tudo como troca de peças.', anticipation: 'Se completar 1.000 km antes de 6 meses, a revisão já chegou. Problemas e uso que exige mais da moto podem pedir cuidado antes.',
    notes: 'O prazo está confirmado no certificado, mas a lista completa ainda precisa ser conferida no original. A tolerância do certificado não é uma recomendação para atrasar a revisão.', replacement: 'Confira as marcações antes de decidir quais trocas fazem parte dessa revisão.', refs: [CERTIFICATE, ref(44), ref(45), ref(46)], severe: [], group: 'scheduled', pending: true,
  },
  {
    id: 'chain', component: 'Corrente da moto', manualName: 'Corrente de transmissão', service: 'Verificar e cuidar da corrente', actions: ['inspect', 'adjust', 'clean', 'lubricate'],
    frequency: 'A cada 500 km; condição e folga antes do uso', kmInterval: 500,
    description: 'Confira o movimento livre da corrente, chamado folga, em vários pontos. Deixe o motor desligado, a marcha em ponto morto e a moto no pezinho lateral, em piso firme. A folga correta é 20–30 mm. Ajuste se necessário. Limpe, seque e passe o lubrificante seguindo o manual.',
    reason: 'Evitar desgaste da corrente e das engrenagens e manter o funcionamento seguro.',
    anticipation: 'Poeira, lama, umidade, chuva, uso fora do asfalto, piso irregular, alta velocidade e acelerações fortes ou rápidas frequentes. Barulhos estranhos, roletes danificados e pinos soltos ou presos pedem verificação.',
    notes: 'Notas 4, 5 e 8. Cuidar a cada 500 km não significa trocar a corrente. Não pilote se a folga passar de 50 mm. Use produto de limpeza próprio e escova macia; para lubrificar, o produto recomendado ou óleo de transmissão SAE 80 ou 90.',
    replacement: 'Se houver desgaste excessivo ou dano, troque corrente, coroa e pinhão juntos, na concessionária. Coroa e pinhão são as engrenagens da corrente.', refs: [ref(45), ref(46), ref(53), ref(54), ref(66)], severe: ['dust', 'mud', 'humidity', 'rain', 'acceleration', 'offroad'], group: 'routine',
  },
  {
    id: 'tires', component: 'Pneus, aros e bicos de ar', manualName: 'Pneus; aros e hastes de válvulas', service: 'Verificar pneus e ajustar a pressão', actions: ['inspect', 'adjust'],
    frequency: 'A cada 1.000 km ou semanalmente; também antes do uso', kmInterval: 1000,
    description: 'Olhe o estado dos pneus e use um medidor para conferir a pressão, sempre com os pneus frios. Dianteiro: 22 psi. Traseiro: 22 psi só com piloto; 29 psi com passageiro. Procure cortes, objetos presos, desgaste diferente do normal, danos nos aros e bicos de ar inclinados.',
    reason: 'Manter a moto estável e os pneus em boa condição, sem desgaste causado pela pressão errada.',
    anticipation: 'Confira antes de sair do asfalto e ao voltar. Verifique antes do prazo se notar danos, perda de pressão, desgaste anormal ou bico de ar inclinado.',
    notes: 'Não existe troca em um mês ou km fixo. Os sulcos dos dois pneus devem respeitar a profundidade mínima de 3,0 mm. A verificação semanal não substitui os cuidados antes de cada saída.',
    replacement: 'Troque se o indicador de desgaste estiver visível, se chegar ao mínimo de 3,0 mm ou se a lateral estiver danificada ou furada. Ao trocar o pneu, troque também a câmara de ar. Use a medida e o tipo recomendados.', refs: [ref(46), ref(49), ref(55), ref(56), ref(57), ref(58), ref(101)], severe: ['offroad'], group: 'routine',
  },
  {
    id: 'oil-level', component: 'Óleo do motor', service: 'Conferir nível e vazamentos', actions: ['inspect'],
    frequency: 'Todos os dias, antes de pilotar', description: 'Se o motor estiver frio, deixe-o ligado sem acelerar por 3–5 minutos. Desligue e espere 2–3 minutos. Com a moto em pé, na vertical e em piso plano, limpe a vareta e coloque-a de volta sem rosquear. Confira o óleo entre as marcas. Complete com o óleo recomendado se estiver perto ou abaixo da marca de baixo.',
    reason: 'É normal consumir um pouco de óleo durante o uso. Nível errado prejudica a proteção do motor.', anticipation: 'Confira vazamentos e complete o nível baixo antes de usar. Completar o óleo não substitui uma troca que já venceu.',
    notes: 'Nota 6. Não misture tipos de óleo, não passe da marca de cima e evite entrada de sujeira. Cuidado com as peças quentes.', replacement: 'Troque pelo intervalo do manual, pelo limite de um ano ou se o óleo estiver ruim. Conferir o nível não exige troca por si só.', refs: [ref(45), ref(46), ref(48), ref(52), ref(61), ref(62)], severe: [], group: 'routine',
  },
  {
    id: 'oil', component: 'Óleo do motor', service: 'Trocar óleo do motor', actions: ['replace'],
    frequency: 'Nos intervalos de 6.000 km da tabela ou uma vez por ano, o que ocorrer primeiro', kmInterval: 6000, timeMonths: 12,
    description: 'Troque o óleo nas etapas do manual e nunca deixe passar um ano entre trocas. Use SAE 10W-30, API SL ou superior; o manual recomenda Pro Honda SAE 10W-30 SL, JASO MA. Anote a data e a quilometragem em que a troca foi feita.',
    reason: 'O óleo perde qualidade com o uso e com o tempo. Sua função é proteger as peças do motor contra atrito e desgaste.',
    anticipation: 'Poeira, lama, umidade e uso que exige mais da moto, conforme nota 4. Óleo sujo ou que perdeu qualidade: trocar o mais rápido possível. Se entrar água no motor, desligue imediatamente e leve à concessionária.',
    notes: 'Notas 4, 6 e 7. O prazo máximo por tempo é 12 meses, não 6. As revisões têm seus próprios prazos. A marcação da coluna de 1.000 km ainda precisa ser conferida no PDF original.',
    replacement: 'Troque no intervalo previsto, no limite de um ano ou antes se o óleo estiver sujo, tiver perdido qualidade ou estiver contaminado. Não espere o prazo nesses casos.', refs: [ref(45), ref(46), ref(52), ref(61), ref(62), ref(12)], severe: ['dust', 'mud', 'humidity'], group: 'scheduled',
  },
  {
    id: 'electrical', component: 'Parte elétrica e eletrônica', manualName: 'Sistema elétrico e eletrônico', service: 'Verificar com o aparelho da oficina', actions: ['inspect'], frequency: 'A cada 6.000 km', kmInterval: 6000,
    description: 'Peça a verificação na concessionária com o MCS, o aparelho de diagnóstico indicado no manual. Isso é diferente de conferir as luzes e a buzina antes de sair.',
    reason: 'Encontrar falhas e manter os controles da moto funcionando bem.', anticipation: 'Luzes de aviso no painel, lâmpadas ou LEDs que não acendem e outros problemas elétricos.', notes: `Nota 3: usar o aparelho MCS. ${inspectNote}`, replacement: 'Somente peças com falha encontrada. A tabela não manda trocar sensores ou módulos em toda revisão.', refs: [ref(44), ref(46), ref(73), ref(75)], severe: [], group: 'scheduled',
  },
  {
    id: 'fuel-line', component: 'Tubos e mangueiras de combustível', manualName: 'Linha de combustível', service: 'Verificar a passagem de combustível', actions: ['inspect'], frequency: 'A cada 6.000 km', kmInterval: 6000,
    description: 'Peça a verificação do caminho por onde o combustível passa, chamado linha de combustível no manual. A tabela não determina troca periódica nem prazo de idade para as mangueiras.',
    reason: 'Encontrar problemas na chegada de combustível antes de prejudicar o funcionamento.', anticipation: normalCondition, notes: inspectNote, replacement: 'Somente se a verificação indicar necessidade. Não trocar automaticamente por quilometragem.', refs: [ref(44), ref(46)], severe: [], group: 'scheduled',
  },
  {
    id: 'throttle', component: 'Acelerador', service: 'Verificar funcionamento e folga', actions: ['inspect', 'adjust'], frequency: 'A cada 6.000 km e antes de pilotar', kmInterval: 6000,
    description: 'Com o motor desligado, confira se o punho do acelerador gira suavemente e volta a fechar em todas as posições do guidão. A folga medida na borda do punho, chamada flange da manopla, é 2–6 mm. Se houver dificuldade para mover ou cabo danificado, peça uma verificação.',
    reason: 'Manter o controle da aceleração e encontrar cabos danificados ou funcionamento incorreto.', anticipation: 'Punho pesado, retorno incorreto, folga fora do indicado ou cabo danificado.', notes: 'A tabela manda verificar. Ajuste ou conserto só se forem necessários. Continue conferindo antes de cada saída.', replacement: 'Cabo ou outra peça com defeito, após avaliação. Não há troca por tempo determinado.', refs: [ref(44), ref(48), ref(70)], severe: [], group: 'scheduled',
  },
  {
    id: 'air', component: 'Filtro de ar', service: 'Trocar o filtro de ar', actions: ['replace'], frequency: 'A cada 18.000 km', kmInterval: 18000,
    description: 'Troque na concessionária a peça que filtra o ar, também chamada elemento filtrante. Não limpe, lave ou use jato de ar nessa peça: o manual manda trocar, não recuperar o filtro.',
    reason: 'Evitar que um filtro danificado deixe a poeira entrar.', anticipation: 'Poeira, lama ou umidade, conforme nota 4. Se houver contaminação, peça avaliação; não lave o filtro.', notes: 'A página 58 determina apenas a troca do elemento. A tabela não dá um prazo de troca por ano.', replacement: 'A cada 18.000 km ou antes, conforme o estado do filtro e o uso. A concessionária deve orientar um prazo menor adequado ao seu caso.', refs: [ref(44), ref(46), ref(55), ref(58)], severe: ['dust', 'mud', 'humidity'], group: 'scheduled',
  },
  {
    id: 'drain', component: 'Tubo de drenagem do filtro de ar', manualName: 'Dreno do filtro de ar', service: 'Esvaziar e limpar o tubo', actions: ['clean'], frequency: 'A cada 6.000 km', kmInterval: 6000,
    description: 'Esvazie o tubo e retire os resíduos acumulados seguindo o manual. É a limpeza do tubo de drenagem, não da peça que filtra o ar. O filtro em si nunca deve ser lavado ou soprado.',
    reason: 'Evitar que o tubo transborde e suje o filtro com óleo, prejudicando o motor.', anticipation: 'Chuva, aceleração máxima e acelerações rápidas frequentes. Também depois de lavar a moto, de uma queda ou ao ver sujeira na parte transparente do tubo.', notes: 'Nota 5 e página 55. O manual pede cuidado mais frequente nessas situações, mas não dá um intervalo menor fixo.', replacement: 'O serviço previsto é limpeza. Trocar peças só se o estado delas exigir.', refs: [ref(44), ref(46), ref(55)], severe: ['rain', 'acceleration'], group: 'scheduled',
  },
  {
    id: 'spark', component: 'Vela do motor', manualName: 'Vela de ignição', service: 'Trocar a vela do motor', actions: ['replace'], frequency: 'Troca a cada 12.000 km', kmInterval: 12000,
    description: 'Programe a troca aos 12.000, 24.000 e 36.000 km e continue repetindo esse intervalo. A verificação da vela aparece em outra linha da tabela: verificar e trocar são serviços diferentes.',
    reason: 'Manter o cuidado previsto com a vela para o motor funcionar bem.', anticipation: 'Problema encontrado pela concessionária. O manual não dá aqui um intervalo menor fixo para uso intenso.', notes: 'A página 44 também manda VERIFICAR a cada 12.000 km. As marcações dessa linha não apareceram no texto: ainda é preciso conferir em qual revisão começa essa verificação. Não tratamos verificação e troca como a mesma coisa.', replacement: 'Trocar a cada 12.000 km. Antes disso, só se o estado da vela exigir.', refs: [ref(44), ref(46)], severe: [], group: 'scheduled',
  },
  {
    id: 'spark-inspect', component: 'Vela do motor', manualName: 'Vela de ignição', service: 'Conferir quando começa a verificação', actions: ['inspect'], frequency: 'Verificar a cada 12.000 km; primeira etapa a confirmar',
    description: 'O texto indica verificação a cada 12.000 km, mas não mostrou em quais colunas estão as marcações. Confira a linha Verificar no PDF original antes de colocá-la no calendário. Não adivinhamos a primeira etapa.', reason: 'Não confundir verificar a vela com trocar a vela.', anticipation: 'Problema encontrado na verificação. Não foi criado um intervalo menor.', notes: 'Ainda precisa ser conferido na tabela original. Por isso, não foi colocado automaticamente nas revisões.', replacement: 'Aqui o serviço é verificar. A troca aparece em um item separado.', refs: [ref(44)], severe: [], group: 'guidance', pending: true,
  },
  {
    id: 'valves', component: 'Folga das válvulas do motor', manualName: 'Folga das válvulas', service: 'Medir e ajustar se necessário', actions: ['inspect', 'adjust'], frequency: 'A cada 6.000 km', kmInterval: 6000,
    description: 'Peça à concessionária para medir o espaço de regulagem das válvulas, chamado folga. Ajuste somente se necessário. Esse serviço precisa da ferramenta de medição indicada no manual.',
    reason: 'Folga demais causa barulho. Folga de menos pode danificar as válvulas ou fazer o motor perder força.', anticipation: 'Problemas encontrados na verificação, barulho ou perda de força do motor. A oficina deve investigar; esses sinais não provam que a causa está nas válvulas.', notes: 'Não trocar válvulas em toda revisão. A necessidade de ajuste depende da medição.', replacement: 'Somente se houver defeito confirmado. Não há troca periódica de válvulas.', refs: [ref(44), ref(46), ref(70)], severe: [], group: 'scheduled',
  },
  {
    id: 'oil-screen', component: 'Tela do filtro de óleo', service: 'Limpar tela do filtro', actions: ['clean'], frequency: 'A cada 12.000 km', kmInterval: 12000,
    description: 'Peça a limpeza da tela do filtro de óleo. O serviço precisa de ferramentas especiais e o manual recomenda a concessionária.', reason: 'Manter a tela filtrando os resíduos do óleo.', anticipation: 'Antes do prazo, somente se a verificação indicar necessidade. Essa linha não dá um intervalo menor fixo para uso intenso.', notes: 'Não é um filtro de papel para trocar junto com o óleo. A tabela manda LIMPAR.', replacement: 'Trocar apenas se o estado da tela exigir. Não há troca periódica indicada.', refs: [ref(45), ref(46), ref(62)], severe: [], group: 'scheduled',
  },
  {
    id: 'centrifugal', component: 'Filtro centrífugo de óleo', service: 'Limpar filtro centrífugo', actions: ['clean'], frequency: 'A cada 12.000 km', kmInterval: 12000,
    description: 'É o filtro que usa o movimento de rotação para separar resíduos do óleo. Peça a limpeza na concessionária. Ele é diferente da tela do filtro: limpar cada um e trocar o óleo são serviços separados.', reason: 'Manter esse filtro retirando resíduos do óleo.', anticipation: 'Se a verificação mostrar necessidade. A tabela não dá um prazo menor que sirva para todos os casos.', notes: 'A tabela manda LIMPAR, não trocar o conjunto. Não existe troca obrigatória desses filtros aos 6.000 km.', replacement: 'Trocar somente se a verificação mostrar necessidade.', refs: [ref(45), ref(46)], severe: [], group: 'scheduled',
  },
  {
    id: 'idle', component: 'Marcha lenta', service: 'Verificar o motor sem acelerar', actions: ['inspect'], frequency: 'A cada 6.000 km', kmInterval: 6000,
    description: 'Marcha lenta é o motor funcionando sem você acelerar. Peça essa verificação conforme a tabela. Só faça regulagem ou conserto se a avaliação mostrar necessidade.', reason: 'Manter o motor funcionando de forma regular.', anticipation: normalCondition, notes: inspectNote, replacement: 'Não é uma peça com troca programada.', refs: [ref(45), ref(46)], severe: [], group: 'scheduled',
  },
  {
    id: 'evaporative', component: 'Controle dos vapores do combustível', manualName: 'Sistema de controle de emissões evaporativas', service: 'Verificar o controle dos vapores', actions: ['inspect'], frequency: 'A cada 18.000 km', kmInterval: 18000,
    description: 'Peça a verificação do sistema que controla os vapores do combustível. Esse é o sistema de emissões evaporativas citado no manual. A tabela não manda trocar automaticamente suas peças ou mangueiras.', reason: 'Manter o controle dos vapores funcionando corretamente.', anticipation: normalCondition, notes: inspectNote, replacement: 'Somente se for encontrada uma necessidade. A tabela não dá prazo obrigatório de troca das peças.', refs: [ref(44), ref(45), ref(46)], severe: [], group: 'scheduled',
  },
  {
    id: 'slider', component: 'Guia da corrente', manualName: 'Deslizador da corrente de transmissão', service: 'Verificar o desgaste da guia', actions: ['inspect'], frequency: 'A cada 6.000 km', kmInterval: 6000,
    description: 'Confira a peça por onde a corrente desliza, chamada deslizador no manual. Se chegar à marca de limite de uso, peça a troca na concessionária. Confira também o apoio de borracha, que tem sua própria marca de desgaste.', reason: 'Encontrar o desgaste dessas peças antes de passar do limite indicado.', anticipation: 'Uso fora do asfalto, conforme nota 8, ou sinais de desgaste e material estragado.', notes: 'A guia/deslizador da página 67 e o apoio de borracha da página 66 são peças com marcas próprias. Não trocar todo o conjunto só por chegar a 6.000 km.', replacement: 'Troque a guia ao chegar ao limite de uso. Troque o apoio de borracha quando o desgaste alcançar qualquer ponto da sua linha de referência.', refs: [ref(45), ref(46), ref(66), ref(67)], severe: ['offroad'], group: 'scheduled',
  },
  {
    id: 'brake-level', component: 'Líquido de freio', manualName: 'Fluido de freio', service: 'Conferir o nível do líquido de freio', actions: ['inspect'], frequency: 'A cada 6.000 km e antes de pilotar', kmInterval: 6000,
    description: 'Com a moto em pé, na vertical, em piso firme e com os reservatórios nivelados, confira o líquido. Na frente, deve ficar acima da marca de baixo, LWR. Atrás, entre LOWER (mínimo) e UPPER (máximo). Nível baixo ou movimento livre demais no freio pedem verificação de pastilhas e vazamentos.', reason: 'Encontrar desgaste nas pastilhas ou um possível vazamento.', anticipation: 'Líquido abaixo da marca mínima ou movimento livre demais na alavanca ou no pedal. Se as pastilhas estiverem boas, procure vazamentos.', notes: 'Não apenas complete o líquido para esconder a causa. A página 53 orienta não completar nem trocar por conta própria, salvo emergência. Nesse caso, procure a concessionária o mais rápido possível.', replacement: 'Conferir o nível não é trocar o líquido. A troca tem prazo de 2 anos ou pode ser necessária por um problema encontrado.', refs: [ref(45), ref(48), ref(53), ref(63)], severe: [], group: 'scheduled',
  },
  {
    id: 'brake-fluid', component: 'Líquido dos freios dianteiro e traseiro', manualName: 'Fluido de freio', service: 'Trocar o líquido de freio', actions: ['replace'], frequency: 'A cada 2 anos, mesmo que a moto rode pouco', timeMonths: 24,
    description: 'Troque o líquido dos dois freios na concessionária. No manual ele é chamado fluido de freio. Use Pro Honda Fluido para Freios DOT 4, novo e de embalagem lacrada. Não é óleo de motor. Anote a data em que a troca foi feita.', reason: 'Cumprir o prazo próprio do líquido e manter o cuidado com os freios.', anticipation: 'Problema, vazamento ou necessidade encontrada ao consertar os freios. O manual não dá um prazo menor fixo para cada tipo de uso.', notes: 'Nota 9: a troca exige conhecimento de mecânica. Não misture DOT 4 com DOT 3. Chegar a 18.000 km não obriga trocar se os dois anos ainda não passaram. O prazo de 24 meses vale mesmo com poucos quilômetros.', replacement: 'Troque a cada 24 meses contados da troca anterior ou antes se houver necessidade confirmada. Não espere atingir uma quilometragem específica.', refs: [ref(45), ref(46), ref(53), ref(63), ref(101)], severe: [], group: 'scheduled',
  },
  {
    id: 'pads', component: 'Pastilhas de freio', service: 'Verificar indicadores de desgaste', actions: ['inspect'], frequency: 'A cada 6.000 km e antes de pilotar', kmInterval: 6000,
    description: 'Confira as marcas que mostram o desgaste das pastilhas dianteiras e traseiras. Se uma das pastilhas de um freio chegar ao limite, troque as duas daquele freio juntas, na concessionária.', reason: 'Manter os freios funcionando bem e identificar quando as pastilhas chegam ao limite.', anticipation: 'Poeira, lama ou umidade, conforme nota 4, e marca de desgaste atingida.', notes: 'As pastilhas não têm uma quilometragem fixa para troca. A posição de observar as pastilhas dianteiras e o limite descrito diferem entre ABS e CBS.', replacement: 'Na frente, ABS: até o indicador de desgaste; CBS: até a parte inferior desse indicador. Atrás: até o indicador. Trocar as duas pastilhas do freio que chegou ao limite.',
    abs: 'Freio dianteiro ABS: olhe por baixo da pinça de freio, a peça que segura as pastilhas (cáliper no manual). Troque as duas se uma estiver gasta até o indicador.', cbs: 'Freio dianteiro CBS: olhe pela frente da pinça de freio, a peça que segura as pastilhas (cáliper no manual). Troque as duas se uma estiver gasta até a parte inferior do indicador.',
    refs: [ref(45), ref(46), ref(48), ref(64)], severe: ['dust', 'mud', 'humidity'], group: 'scheduled',
  },
  {
    id: 'brakes', component: 'Sistema de freio', service: 'Verificar funcionamento dos freios', actions: ['inspect'], frequency: 'A cada 6.000 km e antes de pilotar', kmInterval: 6000,
    description: 'Confira os freios dianteiro e traseiro e leve qualquer problema à concessionária. Mesmo com ABS ou CBS, use os dois freios corretamente.', reason: 'Verificar se a moto freia como deve antes de sair.', anticipation: 'Freio funcionando mal, nível errado do líquido, desgaste no limite ou vazamento.', notes: 'O ABS atua somente na roda dianteira. A tabela não manda trocar o módulo eletrônico do ABS periodicamente.', replacement: 'Trocar somente peças com necessidade confirmada. Discos, pinças de freio e módulos não têm prazo fixo de troca nesta tabela.', refs: [ref(19), ref(45), ref(48), ref(63), ref(64), ref(73)], severe: [], group: 'scheduled',
  },
  {
    id: 'brake-switch', component: 'Acionamento da luz de freio', manualName: 'Interruptor da luz do freio', service: 'Verificar quando a luz de freio acende', actions: ['inspect', 'adjust'], frequency: 'A cada 6.000 km', kmInterval: 6000,
    description: 'Confira quando a luz acende ao frear. Se precisar ajustar o interruptor traseiro, gire apenas a porca de ajuste, nunca o corpo do interruptor.', reason: 'Avisar os outros motoristas quando você está freando.', anticipation: 'Luz que não acende como deveria quando você usa os freios.', notes: 'Ajuste somente se a verificação mostrar necessidade. Isso não obriga a trocar o interruptor.', replacement: 'Somente se houver falha confirmada.', refs: [ref(45), ref(65)], severe: [], group: 'scheduled',
  },
  {
    id: 'headlight', component: 'Farol', service: 'Ajustar a direção da luz', actions: ['adjust'], frequency: 'A cada 6.000 km', kmInterval: 6000,
    description: 'Peça a regulagem da direção da luz do farol, chamada ajuste do facho no manual. Esse serviço não é trocar o farol.', reason: 'Manter a luz apontando para a posição correta.', anticipation: 'Necessidade encontrada na verificação. LED que não acende precisa de manutenção.', notes: 'A tabela indica a página 71 para o ajuste. Como o farol é LED, uma falha deve ser tratada na concessionária.', replacement: 'Somente se houver defeito confirmado. A tabela não determina troca por idade.', refs: [ref(45), ref(71), ref(75)], severe: [], group: 'scheduled',
  },
  {
    id: 'clutch', component: 'Embreagem e cabo', manualName: 'Sistema de embreagem', service: 'Conferir funcionamento e folga', actions: ['inspect', 'adjust', 'lubricate'], frequency: 'A cada 6.000 km; funcionamento antes do uso', kmInterval: 6000,
    description: 'A folga, ou movimento livre, da alavanca da embreagem deve ser 10–20 mm. Procure dobras e marcas de desgaste no cabo. Lubrifique com óleo de boa qualidade. Ajuste se necessário. Se não conseguir a regulagem ou o funcionamento correto, procure a concessionária.', reason: 'Evitar ferrugem no cabo e desgaste antes da hora por regulagem errada.', anticipation: 'Cabo dobrado ou gasto, funcionamento incorreto ou ajuste que não resolve o problema.', notes: 'A tabela manda verificar. Ajuste e lubrificação seguem a avaliação e as orientações da página 68. Não há troca fixa do cabo ou dos discos da embreagem.', replacement: 'Trocar o cabo se o estado dele exigir, após avaliação na concessionária.', refs: [ref(46), ref(48), ref(68), ref(69)], severe: [], group: 'scheduled',
  },
  {
    id: 'stand', component: 'Pezinho lateral da moto', manualName: 'Cavalete lateral', service: 'Verificar movimento e mola', actions: ['inspect'], frequency: 'A cada 6.000 km', kmInterval: 6000,
    description: 'Confira se o pezinho se move livremente e se a mola está danificada ou perdeu força. Se prender ou fizer barulho, limpe a parte onde ele gira e lubrifique o parafuso desse ponto com graxa.', reason: 'Manter o apoio usado para estacionar funcionando corretamente.', anticipation: 'Movimento preso ou com barulho; mola danificada ou sem força.', notes: 'Limpar e lubrificar o ponto de giro só quando necessário, como indica a página 65.', replacement: 'Somente se a verificação encontrar dano ou falha no funcionamento.', refs: [ref(46), ref(65)], severe: [], group: 'scheduled',
  },
  {
    id: 'suspension', component: 'Suspensão', service: 'Verificar a suspensão', actions: ['inspect'], frequency: 'A cada 6.000 km', kmInterval: 6000,
    description: 'Peça uma verificação da suspensão. Retire poeira, terra, barro, areia e pedras acumuladas. Depois de queda ou batida, a concessionária deve procurar peças desalinhadas e danos difíceis de enxergar.', reason: 'Areia e sujeira acumuladas podem raspar, acelerar o desgaste da suspensão dianteira e causar vazamento de óleo.', anticipation: 'Sujeira acumulada, vazamento ou queda/batida. Uso que exige mais da moto pede orientação sobre cuidados mais frequentes.', notes: 'A tabela não dá prazo para trocar amortecedores nem o óleo dos tubos da suspensão dianteira, chamados bengalas. Não criamos esse prazo.', replacement: 'Dano ou desgaste encontrado na verificação, não uma quilometragem inventada.', refs: [ref(44), ref(46), ref(48), ref(84)], severe: ['dust', 'mud', 'offroad'], group: 'scheduled',
  },
  {
    id: 'fasteners', component: 'Porcas, parafusos e peças de fixação', manualName: 'Porcas, parafusos e fixações', service: 'Conferir o aperto das peças', actions: ['inspect', 'adjust'], frequency: 'A cada 12.000 km', kmInterval: 12000,
    description: 'Peça a verificação e o ajuste do aperto, se necessário. Antes de sair do asfalto, use a ferramenta certa para conferir os parafusos, porcas e outras fixações que você consegue alcançar.', reason: 'Encontrar peças soltas e manter as partes da moto bem presas.', anticipation: 'Fora do asfalto (nota 8) e no uso para trabalho, confira e ajuste o aperto com mais frequência. Peças soltas ou algo fora do normal também pedem atenção.', notes: 'O manual não dá um intervalo menor fixo para uso comercial. Esse cuidado não muda a restrição ao transporte de carga por pagamento, indicada na página 11.', replacement: 'Trocar uma peça de fixação danificada só após avaliação. Reapertar não significa trocar.', refs: [ref(11), ref(17), ref(46), ref(49)], severe: ['offroad', 'commercial'], group: 'scheduled',
  },
  {
    id: 'wheels', component: 'Rodas, aros e raios', service: 'Verificar rodas e raios', actions: ['inspect', 'adjust'], frequency: 'A cada 6.000 km', kmInterval: 6000,
    description: 'Procure danos nos aros e raios e aperte raios soltos. Gire a roda devagar: se ela balançar para os lados ou parecer fora de alinhamento, leve à concessionária.', reason: 'Aperto e alinhamento corretos são importantes para a segurança. Raios muito soltos podem deixar a moto instável e causar perda de controle.', anticipation: 'Uso fora do asfalto (nota 8), impactos, aros danificados, raios soltos ou roda balançando ao girar.', notes: 'Não é preciso retirar as rodas para o serviço da tabela. A verificação não obriga a trocar rodas ou rolamentos.', replacement: 'Peças danificadas ou sem condição de uso, após avaliação. Faça o balanceamento das rodas depois de consertar ou trocar pneus, como orienta o manual.', refs: [ref(46), ref(49), ref(57), ref(58), ref(67)], severe: ['offroad'], group: 'scheduled',
  },
  {
    id: 'steering', component: 'Rolamentos da direção', manualName: 'Rolamentos da coluna de direção', service: 'Verificar folga e ajustar', actions: ['inspect', 'adjust'], frequency: 'A cada 12.000 km', kmInterval: 12000,
    description: 'São peças que permitem girar o guidão. Peça a verificação da folga e o ajuste, se necessário. A tabela não manda trocar os rolamentos em toda revisão.', reason: 'Encontrar folga e manter a direção funcionando corretamente.', anticipation: 'Folga encontrada ou danos e desalinhamento depois de queda ou batida. A concessionária deve avaliar.', notes: 'Não confunda com os rolamentos das rodas: a tabela não dá uma linha própria de troca para eles. Não criamos um limite de folga em milímetros.', replacement: 'Só se a verificação confirmar necessidade. Não existe prazo fixo de troca.', refs: [ref(46), ref(48)], severe: [], group: 'scheduled',
  },
];

export const getService = (id: string): Service => {
  const service = SERVICES.find(item => item.id === id);
  if (!service) throw new Error(`Unknown maintenance service: ${id}`);
  return service;
};


const MODEL_2013_OVERRIDES: Record<string, Partial<Service>> = {
  'first-review': { frequency: '900–1.100 km ou a primeira revisão do certificado, o que ocorrer primeiro', kmInterval: 1000, refs: [ref(8), ref(40)], pending: false, notes: 'O manual 2013 informa a primeira revisão de 900 a 1.100 km a partir da compra e orienta seguir o Plano de Manutenção Preventiva da seção 6-1.' },
  'chain': { frequency: 'A cada 1.000 km; condição e folga antes do uso', kmInterval: 1000, refs: [ref(41), ref(54)], notes: 'A tabela oficial 2013 manda verificar, ajustar e lubrificar a corrente a cada 1.000 km; folga especificada de 20–30 mm.' },
  'tires': { frequency: 'A cada 1.000 km ou semanalmente; também antes do uso', kmInterval: 1000, refs: [ref(41), ref(63)], notes: 'A tabela 2013 manda verificar e calibrar os pneus a cada 1.000 km ou semanalmente; pressão com pneus frios.' },
  'oil-level': { refs: [ref(8), ref(45)], notes: 'O manual 2013 manda verificar o nível do óleo diariamente, antes de pilotar, e completar quando necessário.' },
  'oil': { frequency: 'A cada 4.000 km ou uma vez por ano, o que ocorrer primeiro', kmInterval: 4000, timeMonths: 12, refs: [ref(41), ref(45)], notes: 'A tabela 2013 prevê troca do óleo a cada 4.000 km; a nota de troca anual prevalece com o que ocorrer primeiro.' },
  'air': { frequency: 'A cada 16.000 km', kmInterval: 16000, refs: [ref(41), ref(44)], notes: 'Filtro de ar úmido (tipo viscoso): substituir a cada 16.000 km. Não lavar nem aplicar jato de ar.' },
  'drain': { frequency: 'A cada 4.000 km e conforme condição', kmInterval: 4000, refs: [ref(41), ref(44)], notes: 'Respiro do motor: limpar a cada 4.000 km, com frequência maior nas condições severas previstas nas notas.' },
  'spark-inspect': { frequency: 'A cada 8.000 km', kmInterval: 8000, refs: [ref(41), ref(47)] },
  'spark': { frequency: 'A cada 8.000 km', kmInterval: 8000, refs: [ref(41), ref(47)] },
  'valves': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(41), ref(48)] },
  'oil-screen': { frequency: 'A cada 12.000 km', kmInterval: 12000, refs: [ref(41)] },
  'centrifugal': { frequency: 'A cada 12.000 km', kmInterval: 12000, refs: [ref(41)] },
  'idle': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(41)] },
  'exhaust': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(41)] },
  'slider': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(41), ref(54)] },
  'brake-level': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(41), ref(56)], notes: 'Somente a ESD tem circuito hidráulico dianteiro e nível de fluido.' },
  'brake-fluid': { refs: [ref(41), ref(56)], notes: 'Na ESD 2013, o fluido é do circuito hidráulico do freio dianteiro; a troca é bienal conforme a nota do manual.' },
  'pads': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(41), ref(60)], notes: 'ESD: pastilhas dianteiras; ES: sapatas nos dois freios.' },
  'brakes': { frequency: 'A cada 4.000 km e antes de pilotar', kmInterval: 4000, refs: [ref(41), ref(56), ref(60)], notes: 'NXR150 Bros ES 2013: tambor dianteiro e traseiro. ESD 2013: disco hidráulico dianteiro e tambor traseiro.' },
  'brake-switch': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(41), ref(61)] },
  'headlight': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(41), ref(73)] },
  'clutch': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(41), ref(50)] },
  'stand': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(41), ref(54)] },
  'suspension': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(41), ref(55)] },
  'fasteners': { frequency: 'A cada 8.000 km', kmInterval: 8000, refs: [ref(41)] },
  'wheels': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(41), ref(63)] },
  'steering': { frequency: 'Verificar e lubrificar a cada 12.000 km', kmInterval: 12000, refs: [ref(41)] },
  'fuel-filter': { frequency: 'A cada 12.000 km', kmInterval: 12000, refs: [ref(41)] },
};

const MODEL_2014_OVERRIDES: Record<string, Partial<Service>> = {
  'first-review': { frequency: '1.000 km ou 6 meses da entrega, o que ocorrer primeiro', kmInterval: 1000, refs: [ref(7), ref(40)], pending: false, notes: 'O manual NXR150 Bros 2014 confirma a primeira revisão pelo certificado e inicia o Plano de Manutenção Preventiva na página 40; a tabela detalhada está nas páginas 41–42.' },
  'chain': { frequency: 'A cada 1.000 km; condição e folga antes do uso', kmInterval: 1000, refs: [ref(41), ref(51)], notes: 'Na tabela oficial de 2014, a corrente deve ser verificada, ajustada e lubrificada a cada 1.000 km; a folga especificada é 20–30 mm.' },
  'tires': { frequency: 'A cada 1.000 km ou semanalmente; também antes do uso', kmInterval: 1000, refs: [ref(42), ref(61)], notes: 'A tabela de 2014 manda verificar e calibrar os pneus a cada 1.000 km ou semanalmente. A pressão deve ser conferida com pneus frios.' },
  'oil-level': { refs: [ref(40), ref(45)], notes: 'O manual 2014 orienta verificar o nível do óleo diariamente, antes de pilotar. O procedimento está nas páginas 45–46.' },
  'oil': { frequency: 'A cada 4.000 km ou uma vez por ano, o que ocorrer primeiro', kmInterval: 4000, timeMonths: 12, refs: [ref(41), ref(45)], notes: 'A tabela de 2014 prevê troca do óleo a cada 4.000 km; a nota 5 determina uma vez por ano ou o intervalo de quilometragem, o que ocorrer primeiro.' },
  'air': { frequency: 'A cada 16.000 km', kmInterval: 16000, refs: [ref(41), ref(44)], notes: 'O filtro de ar úmido (tipo viscoso) é substituído a cada 16.000 km. O manual proíbe lavar ou soprar o elemento.' },
  'drain': { frequency: 'A cada 4.000 km e após lavagem/queda quando indicado', kmInterval: 4000, refs: [ref(41), ref(45)], notes: 'O respiro do motor é limpo a cada 4.000 km e também deve ser drenado após lavagem ou queda, ou quando houver depósito visível no tubo.' },
  'spark-inspect': { frequency: 'A cada 8.000 km', kmInterval: 8000, refs: [ref(41), ref(47)] },
  'spark': { frequency: 'A cada 8.000 km', kmInterval: 8000, refs: [ref(41), ref(47)] },
  'valves': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(41), ref(48)] },
  'oil-screen': { frequency: 'A cada 12.000 km', kmInterval: 12000, refs: [ref(41)] },
  'centrifugal': { frequency: 'A cada 12.000 km', kmInterval: 12000, refs: [ref(41)] },
  'idle': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(41)] },
  'exhaust': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(41)] },
  'slider': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(41), ref(54)] },
  'brake-level': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(41), ref(56)], notes: 'No ESD 2014 há fluido de freio e freio dianteiro a disco; na ES o dianteiro é a tambor.' },
  'brake-fluid': { refs: [ref(41), ref(56)], notes: 'O fluido de freio se aplica ao circuito hidráulico da versão NXR150 Bros ESD. O manual determina troca a cada 2 anos.' },
  'pads': { frequency: 'A cada 4.000 km e antes de pilotar', kmInterval: 4000, refs: [ref(41), ref(60)], notes: 'Na ESD, verifique o desgaste das pastilhas do freio dianteiro. Na ES, o freio dianteiro é a tambor e usa sapatas.' },
  'brakes': { frequency: 'A cada 4.000 km e antes de pilotar', kmInterval: 4000, refs: [ref(41), ref(56), ref(60)], notes: 'A NXR150 Bros ES 2014 usa tambor dianteiro e traseiro; a ESD usa disco hidráulico dianteiro e tambor traseiro.' },
  'brake-switch': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(41), ref(61)] },
  'headlight': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(41), ref(73)] },
  'clutch': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(42), ref(50)] },
  'stand': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(42), ref(54)] },
  'suspension': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(42), ref(55)] },
  'fasteners': { frequency: 'A cada 8.000 km', kmInterval: 8000, refs: [ref(42)] },
  'wheels': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(42), ref(63)] },
  'steering': { frequency: 'Verificar a cada 12.000 km; lubrificar a cada 12.000 km', kmInterval: 12000, refs: [ref(42)] },
  'fuel-filter': { frequency: 'A cada 12.000 km', kmInterval: 12000, refs: [ref(41)] },
  'crankcase-breather': { frequency: 'A cada 4.000 km; também após lavagem/queda quando necessário', kmInterval: 4000, refs: [ref(41), ref(45)] },
};

const MODEL_2015_OVERRIDES: Record<string, Partial<Service>> = {
  'first-review': { frequency: '1.000 km ou 6 meses da entrega, o que ocorrer primeiro', kmInterval: 1000, refs: [CERTIFICATE, ref(39)], pending: false, notes: 'O manual 2015 confirma 1.000 km ou 6 meses para a 1ª revisão. A tabela impressa de manutenção começa na página 39.' },
  'chain': { frequency: 'A cada 1.000 km; condição e folga antes do uso', kmInterval: 1000, refs: [ref(39), ref(64)], notes: 'Na tabela 2015, a corrente é verificada, ajustada e lubrificada a cada 1.000 km. A seção de corrente está na página 64.' },
  'tires': { frequency: 'A cada 1.000 km ou semanalmente; também antes do uso', kmInterval: 1000, refs: [ref(40), ref(48)], notes: 'A tabela 2015 manda verificar e calibrar os pneus a cada 1.000 km ou semanalmente. A inspeção antes do uso continua obrigatória.' },
  'oil': { frequency: 'A cada 4.000 km ou uma vez por ano, o que ocorrer primeiro', kmInterval: 4000, timeMonths: 12, refs: [ref(39), ref(57)], notes: 'A tabela 2015 prevê troca do óleo a cada 4.000 km; a nota 5 também determina uma vez por ano ou no intervalo, o que ocorrer primeiro.' },
  'oil-level': { refs: [ref(39), ref(55)], notes: 'Verifique o nível diariamente antes de pilotar. O procedimento está na página 55.' },
  'electrical': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(39)] },
  'fuel-line': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(39)] },
  'throttle': { frequency: 'A cada 4.000 km e antes de pilotar', kmInterval: 4000, refs: [ref(39), ref(69)] },
  'air': { frequency: 'A cada 16.000 km', kmInterval: 16000, refs: [ref(39), ref(50)], notes: 'A tabela 2015 prevê troca do filtro de ar úmido (tipo viscoso) a cada 16.000 km; não lavar nem soprar o elemento.' },
  'drain': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(39), ref(48)] },
  'spark-inspect': { frequency: 'A cada 8.000 km', kmInterval: 8000, refs: [ref(39), ref(54)], notes: 'A tabela 2015 prevê verificar e trocar a vela a cada 8.000 km.' },
  'spark': { frequency: 'A cada 8.000 km', kmInterval: 8000, refs: [ref(39), ref(54)] },
  'valves': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(39), ref(70)] },
  'oil-screen': { frequency: 'A cada 12.000 km', kmInterval: 12000, refs: [ref(39)] },
  'centrifugal': { frequency: 'A cada 12.000 km', kmInterval: 12000, refs: [ref(39)] },
  'idle': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(39)] },
  'exhaust': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(39)] },
  'slider': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(39), ref(67)] },
  'brake-level': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(39), ref(58)] },
  'brake-fluid': { refs: [ref(39), ref(46)], notes: 'A tabela 2015 determina a troca do fluido de freio a cada 2 anos.' },
  'pads': { frequency: 'A cada 4.000 km e antes de pilotar', kmInterval: 4000, refs: [ref(39), ref(59)], notes: 'Na ESDD 2015, verifique o desgaste das pastilhas a cada 4.000 km e antes do uso.' },
  'brakes': { frequency: 'A cada 4.000 km e antes de pilotar', kmInterval: 4000, refs: [ref(39), ref(58)], notes: 'A NXR160 Bros ESDD 2015 usa disco dianteiro e traseiro, sem CBS/ABS.' },
  'brake-switch': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(39), ref(62)] },
  'headlight': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(39), ref(71)] },
  'clutch': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(39), ref(67)] },
  'stand': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(39), ref(63)] },
  'suspension': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(39)] },
  'fasteners': { frequency: 'A cada 8.000 km', kmInterval: 8000, refs: [ref(39)] },
  'wheels': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(39), ref(76)] },
  'steering': { frequency: 'Verificar e ajustar a cada 4.000 km; lubrificar a cada 12.000 km', kmInterval: 4000, refs: [ref(40)] },
  'fuel-filter': { frequency: 'A cada 12.000 km', kmInterval: 12000, refs: [ref(39)] },
  'crankcase-breather': { frequency: 'A cada 4.000 km', kmInterval: 4000, refs: [ref(39), ref(48)] },
  'fork-oil': { frequency: 'A cada 16.000 km', kmInterval: 16000, refs: [ref(39)] },
  'rear-suspension-lube': { frequency: 'A cada 16.000 km', kmInterval: 16000, refs: [ref(39)] },
  'steering-lube': { frequency: 'A cada 12.000 km', kmInterval: 12000, refs: [ref(40)] },
  'lockset': { frequency: 'A cada 8.000 km; lubrificar se necessário', kmInterval: 8000, refs: [ref(40)] },
};

const MODEL_2016_2017_OVERRIDES: Record<string, Partial<Service>> = {
  'first-review': { refs: [CERTIFICATE, ref(39)], notes: 'O manual 2016/2017 confirma a primeira revisão pelo certificado e a tabela da página 39. A lista deve ser seguida pela coluna correspondente da tabela original.' },
  'chain': { refs: [ref(39), ref(62)], frequency: 'A cada 1.000 km; condição e folga antes do uso', kmInterval: 1000, notes: 'Na tabela do manual 2016/2017, corrente: verificar, ajustar e lubrificar a cada 1.000 km. A página 62 traz o procedimento e a página 47 orienta limpeza/lubrificação.' },
  'tires': { refs: [ref(39), ref(48)], frequency: 'A cada 1.000 km ou semanalmente; também antes do uso', kmInterval: 1000, notes: 'A tabela do manual 2016/2017 manda verificar e calibrar os pneus a cada 1.000 km ou semanalmente; o procedimento está na página 48.' },
  'oil-level': { refs: [ref(39), ref(55)], notes: 'O nível do óleo deve ser verificado com frequência durante o uso. O procedimento do manual começa na página 55.' },
  'oil': { refs: [ref(39), ref(56)], frequency: 'A cada 6.000 km ou uma vez por ano, o que ocorrer primeiro', kmInterval: 6000, timeMonths: 12, notes: 'Use a tabela e o procedimento do manual 2016/2017 para troca de óleo; o manual também alerta para verificar constantemente o nível.' },
  'brake-level': { refs: [ref(39), ref(58)], notes: 'A tabela 2016/2017 manda verificar o nível do fluido a cada 6.000 km; o procedimento está na página 58.' },
  'brake-fluid': { refs: [ref(39), ref(46)], notes: 'A tabela 2016/2017 determina trocar o fluido de freio a cada 2 anos; a página 46 trata do cuidado com o fluido.' },
  'pads': { refs: [ref(39), ref(59), ref(60)], cbs: undefined, abs: undefined },
  'brakes': { refs: [ref(39), ref(58)], notes: 'A tabela 2016/2017 manda verificar o sistema de freio a cada 6.000 km. Esta entrada ESDD usa dois discos e não deve ser descrita como CBS.' },
  'brake-switch': { refs: [ref(39), ref(60)] },
  'headlight': { refs: [ref(39), ref(69)] },
  'clutch': { refs: [ref(39), ref(65)] },
  'stand': { refs: [ref(39), ref(61)] },
  'suspension': { refs: [ref(39)] },
  'wheels': { refs: [ref(39), ref(74)] },
  'air': { refs: [ref(39), ref(53)] },
  'drain': { refs: [ref(48)] },
  'spark': { refs: [ref(39), ref(55)] },
  'valves': { refs: [ref(39)] },
};

const MODEL_2017_OVERRIDES: Record<string, Partial<Service>> = {
  'first-review': { refs: [CERTIFICATE, ref(38)], notes: 'O manual oficial Honda NXR160 Bros ESDD (2017) inicia a Tabela de Manutenção na página 38. A 1ª revisão é 1.000 km ou 6 meses, o que ocorrer primeiro.' },
  'chain': { refs: [ref(38), ref(47), ref(62)], notes: 'No manual 2017 ESDD, a tabela de manutenção começa na página 38; o capítulo da corrente é indicado na página 47 e o procedimento detalhado está na página 62.' },
  'tires': { refs: [ref(38), ref(48)], notes: 'A tabela do manual 2017 ESDD prevê verificar e calibrar os pneus a cada 1.000 km ou semanalmente; o capítulo de pneus começa na página 48.' },
  'oil-level': { refs: [ref(38), ref(45)], notes: 'O manual 2017 ESDD orienta verificar o nível do óleo sempre que pilotar; a seção de óleo do motor começa na página 45.' },
  'oil': { refs: [ref(38), ref(55)], notes: 'A tabela do manual 2017 ESDD prevê troca do óleo no intervalo indicado e a seção de procedimento está na página 55.' },
  'air': { refs: [ref(38), ref(50)], notes: 'A tabela do manual 2017 ESDD prevê a troca do filtro de ar úmido (tipo viscoso) a cada 18.000 km; o procedimento está na página 50.' },
  'drain': { refs: [ref(38), ref(50)], notes: 'Para o manual 2017 ESDD, a referência de manutenção do conjunto do filtro de ar está na página 50; não criar intervalo extra além da tabela.' },
  'spark-inspect': { refs: [ref(38), ref(54)], notes: 'A seção de vela de ignição do manual oficial 2017 ESDD está na página 54; a tabela de manutenção está na página 38.' },
  'spark': { refs: [ref(38), ref(54)], notes: 'A seção de vela de ignição do manual oficial 2017 ESDD está na página 54; siga a marcação da tabela da página 38 para o intervalo.' },
  'valves': { refs: [ref(38), ref(68)], notes: 'A folga das válvulas aparece no capítulo de ajustes do manual 2017 ESDD, página 68; o intervalo vem da tabela da página 38.' },
  'oil-screen': { refs: [ref(38)], notes: 'A limpeza da tela do filtro de óleo é controlada pela Tabela de Manutenção do manual 2017 ESDD, na página 38.' },
  'centrifugal': { refs: [ref(38)], notes: 'A limpeza do filtro centrífugo de óleo é controlada pela Tabela de Manutenção do manual 2017 ESDD, na página 38.' },
  'brake-level': { refs: [ref(38), ref(46), ref(58)], notes: 'A tabela do manual 2017 ESDD controla o nível do fluido; as seções de fluido e freios estão nas páginas 46 e 58.' },
  'brake-fluid': { refs: [ref(38), ref(46)], notes: 'O manual 2017 ESDD indica a troca do fluido pelo prazo da tabela; a seção de fluido de freio está na página 46.' },
  'pads': { refs: [ref(38), ref(58)], notes: 'Na versão ESDD 2017, siga a marca de desgaste e o procedimento da seção de freios da página 58.' },
  'brakes': { refs: [ref(38), ref(58)], notes: 'A NXR160 Bros ESDD 2017 usa freio a disco nas duas rodas. Não tratar essa configuração como CBS.' },
  'brake-switch': { refs: [ref(38), ref(60)] },
  'headlight': { refs: [ref(38), ref(69)] },
  'clutch': { refs: [ref(38), ref(65)] },
  'stand': { refs: [ref(38), ref(61)] },
  'suspension': { refs: [ref(38)] },
  'fasteners': { refs: [ref(38)] },
  'wheels': { refs: [ref(38), ref(74)] },
  'steering': { refs: [ref(38)] },
  'slider': { refs: [ref(38), ref(65)] },
  'idle': { refs: [ref(38)] },
  'fuel-line': { refs: [ref(38)] },
  'throttle': { refs: [ref(38), ref(67)] },
  'evaporative': { refs: [ref(38)] },
  'delivery': { refs: [CERTIFICATE, ref(38)] },
  'break-in': { refs: [ref(18)] },
};

const MODEL_2018_OVERRIDES: Record<string, Partial<Service>> = {
  'first-review': { pending: false, refs: [CERTIFICATE, ref(35), ref(36), ref(37)], notes: 'No manual 2018, o certificado confirma a 1ª revisão em 1.000 km ou 6 meses. A Tabela de Manutenção das páginas impressas 35–38 deve ser seguida conforme a coluna de 1.000 km.' },
  'chain': { refs: [ref(36), ref(61)], notes: 'Na tabela do manual 2018, a corrente é verificada, ajustada e lubrificada a cada 1.000 km; a mesma página orienta aumentar a frequência em algumas condições severas.' },
  'tires': { refs: [ref(37), ref(44)], notes: 'O manual 2018 manda verificar e calibrar os pneus a cada 1.000 km ou semanalmente; a inspeção visual continua sendo necessária antes de pilotar.' },
  'oil-level': { refs: [ref(36), ref(51)], notes: 'O nível do óleo deve ser verificado sempre que pilotar; a tabela do manual 2018 aponta a página 51 para o procedimento.' },
  'oil': { refs: [ref(36), ref(53)], notes: 'A tabela do manual 2018 prevê troca do óleo a cada 6.000 km e a nota 5 determina uma vez por ano ou no intervalo indicado, o que ocorrer primeiro.' },
  'air': { refs: [ref(35), ref(46)], notes: 'No manual 2018, o filtro de ar úmido (tipo viscoso) é trocado a cada 18.000 km; a referência da tabela é a página 46.' },
  'drain': { refs: [ref(45)], notes: 'Use somente a orientação de drenagem efetivamente presente no manual 2018; não invente frequência extra para esse cuidado.' },
  'spark-inspect': { refs: [ref(35), ref(50)], notes: 'A tabela 2018 manda verificar e trocar a vela a cada 12.000 km.' },
  'valves': { refs: [ref(35), ref(67)], notes: 'A folga das válvulas é verificada e ajustada se necessário a cada 6.000 km no manual 2018.' },
  'brake-level': { refs: [ref(36), ref(54)], notes: 'O sistema de freio do manual 2018 é CBS; consulte a página 54 para o cuidado dos freios.' },
  'brake-fluid': { refs: [ref(37), ref(54)], notes: 'Este cuidado refere-se ao fluido de freio do sistema CBS. A intervenção exige habilidade mecânica e deve seguir o manual.' },
  'pads': { refs: [ref(36), ref(58)], cbs: 'No manual 2018, verifique o desgaste do conjunto de freio e substitua os componentes conforme a marca de desgaste indicada para a configuração CBS.' },
  'brakes': { refs: [ref(36), ref(54)], cbs: 'A NXR 160 Bros 2018 usa CBS e discos nas duas rodas na versão ESDD.' },
  'brake-switch': { refs: [ref(36), ref(59)] },
  'headlight': { refs: [ref(36), ref(68)] },
  'clutch': { refs: [ref(36), ref(64)] },
  'stand': { refs: [ref(36), ref(60)] },
  'wheels': { refs: [ref(37), ref(64)] },
  'steering': { refs: [ref(37)] },
  'fork-oil': { refs: [ref(37)] },
  'rear-suspension-lube': { refs: [ref(37)] },
  'steering-lube': { refs: [ref(38)] },
  'lockset': { refs: [ref(38)] },
  'exhaust': { refs: [ref(36)] },
  'crankcase-breather': { refs: [ref(35), ref(44)] },
};

const LEGACY_SERVICE_OVERRIDES: Record<string, Partial<Service>> = {
  'spark-inspect': { frequency: 'Verificar a cada 12.000 km', kmInterval: 12000, pending: false, description: 'Verifique a vela de ignição a cada 12.000 km e substitua conforme a mesma etapa da tabela.', notes: 'Na família NXR160 BROS ESDD anterior à atualização de 2025, a tabela indica verificação e substituição da vela a cada 12.000 km.' },
  chain: {
    frequency: 'A cada 1.000 km; condição e folga antes do uso',
    kmInterval: 1000,
    description: 'Confira a corrente com o motor desligado, a marcha em ponto morto e a moto no cavalete lateral. A folga indicada para esses modelos é 20–30 mm. Ajuste, limpe, seque e lubrifique conforme o manual.',
    notes: 'Nos modelos 2017/2018, 2018/2019, 2019/2020, 2020/2021, 2021/2022, 2022/2023, 2023/2024 e 2024/2025, as tabelas correspondentes da família NXR160 Bros ESDD preveem a corrente a cada 1.000 km. Não pilote se a folga ultrapassar 50 mm. Cuidar mais vezes por poeira, lama, umidade, chuva ou fora do asfalto não significa criar uma troca automática.',
  },
  steering: {
    frequency: 'A cada 6.000 km',
    kmInterval: 6000,
    description: 'Peça a verificação da folga da coluna de direção e o ajuste se necessário. Se houver aspereza, travamento, folga ou dano após queda/batida, a concessionária deve avaliar.',
    notes: 'Na tabela dos modelos 2019/2020, 2020/2021, 2021/2022, 2022/2023, 2023/2024 e 2024/2025, a coluna de direção aparece para verificação/ajuste a cada 6.000 km e lubrificação a cada 12.000 km.',
  },
  headlight: {
    description: 'Peça a regulagem da direção da luz do farol, chamada ajuste do facho no manual. A versão 2024 usa farol com refletor multifocal; não trate este cuidado como troca de LED.',
    notes: 'A Honda descreve a versão 2024 com farol de refletor multifocal. A regulagem do facho é diferente de substituir uma lâmpada ou o conjunto inteiro.',
  },
  brakes: {
    description: 'Confira o funcionamento dos freios dianteiro e traseiro e leve qualquer problema à concessionária. Nos modelos 2018/2019, 2019/2020, 2020/2021, 2021/2022, 2022/2023, 2023/2024 e 2024/2025 representados pelo app, os dois freios a disco trabalham com CBS; a ESDD 2017/2018 usa dois discos sem CBS.',
    notes: 'A versão 2024 é equipada com CBS, não ABS. O CBS reparte a frenagem quando o pedal traseiro é acionado, mas não impede o travamento das rodas.',
  },
  pads: {
    cbs: 'Freio dianteiro CBS: observe a posição indicada para a marca de desgaste na pinça dianteira e troque as duas pastilhas desse freio quando o limite for atingido.',
  },
};

const LEGACY_EXTRA_SERVICES: Service[] = [
  {
    id: 'fork-oil', component: 'Óleo dos tubos da suspensão dianteira', manualName: 'Óleo da suspensão dianteira', service: 'Trocar o óleo das bengalas', actions: ['replace'], frequency: 'A cada 18.000 km', kmInterval: 18000,
    description: 'Nos modelos 2017/2018, 2018/2019, 2019/2020, 2020/2021, 2021/2022, 2022/2023, 2023/2024 e 2024/2025, a tabela de manutenção prevê a troca do óleo dos tubos da suspensão dianteira, chamados bengalas. O serviço deve ser realizado com conhecimento mecânico.',
    reason: 'Manter o funcionamento adequado da suspensão dianteira conforme o intervalo específico destes modelos.', anticipation: 'Vazamento, dano, alteração anormal do funcionamento ou serviço de suspensão que exija intervenção antes do intervalo.', notes: 'Intervalo confirmado na tabela desses modelos: 18.000 km. Não confundir com a simples verificação da suspensão.', replacement: 'Troque pelo intervalo da tabela ou antes quando a manutenção da suspensão exigir.', refs: [ref(46), ref(84)], severe: ['dust', 'mud', 'offroad'], group: 'scheduled',
  },
  {
    id: 'rear-suspension-lube', component: 'Suspensão traseira e articulações', manualName: 'Buchas/rolamentos da suspensão traseira e eixo', service: 'Lubrificar articulações da suspensão traseira', actions: ['lubricate'], frequency: 'A cada 18.000 km', kmInterval: 18000,
    description: 'Lubrifique as buchas/rolamentos da suspensão traseira e o eixo conforme previsto para os modelos 2021/2022, 2022/2023, 2023/2024 e 2024/2025. Este é um serviço de manutenção, não uma troca automática do amortecedor.',
    reason: 'Manter o movimento das articulações e reduzir desgaste das partes que recebem esse cuidado.', anticipation: 'Folga, ruído, travamento ou dano identificado antes do intervalo.', notes: 'Intervalo confirmado na tabela desses modelos: 18.000 km. A tabela não manda trocar o amortecedor inteiro por quilometragem.', replacement: 'Lubrificar no intervalo ou substituir apenas peças que a inspeção confirmar como danificadas ou sem condição de uso.', refs: [ref(46), ref(84)], severe: ['dust', 'mud', 'offroad'], group: 'scheduled',
  },
  {
    id: 'fuel-filter', component: 'Filtro de combustível', manualName: 'Filtro de combustível', service: 'Trocar o filtro de combustível', actions: ['replace'], frequency: 'A cada 12.000 km', kmInterval: 12000,
    description: 'Troque o filtro de combustível no intervalo indicado para os modelos 2021/2022, 2022/2023, 2023/2024 e 2024/2025. O serviço deve ser feito com segurança na concessionária.',
    reason: 'Manter a filtragem adequada do combustível e o funcionamento correto do sistema de alimentação.', anticipation: 'Problemas no abastecimento, funcionamento irregular ou necessidade identificada na inspeção.', notes: 'A tabela dos modelos 2019/2020, 2020/2021, 2021/2022, 2022/2023, 2023/2024 e 2024/2025 indica substituição do filtro de combustível a cada 12.000 km.', replacement: 'Troque a cada 12.000 km ou antes se houver necessidade confirmada.', refs: [ref(44), ref(45), ref(46)], severe: [], group: 'scheduled',
  },
  {
    id: 'crankcase-breather', component: 'Respiro do motor', manualName: 'Respiro do cárter', service: 'Limpar o respiro do motor', actions: ['clean'], frequency: 'A cada 6.000 km', kmInterval: 6000,
    description: 'Limpe o tubo/respiro do motor no intervalo previsto pela tabela da geração 2024/2025, retirando resíduos conforme o procedimento do manual.',
    reason: 'Evitar acúmulo de resíduos no sistema de ventilação do cárter.', anticipation: 'Sujeira acumulada, uso severo ou sinais de contaminação identificados antes do intervalo.', notes: 'A tabela pré-2025 traz a limpeza do respiro do cárter a cada 6.000 km.', replacement: 'Não é uma troca periódica: limpar no intervalo e substituir apenas se houver peça danificada.', refs: [ref(44), ref(45), ref(46)], severe: ['dust', 'mud', 'humidity'], group: 'scheduled',
  },
  {
    id: 'exhaust', component: 'Sistema de escapamento', manualName: 'Sistema de escapamento', service: 'Verificar o escapamento', actions: ['inspect'], frequency: 'A cada 6.000 km', kmInterval: 6000,
    description: 'Verifique o sistema de escapamento e procure ruídos, danos, fixações soltas ou alterações anormais.',
    reason: 'Detectar problemas no escapamento e manter o conjunto preso e em boas condições.', anticipation: 'Ruído diferente, dano por impacto ou fixação solta.', notes: 'A tabela dos modelos 2019/2020, 2020/2021, 2021/2022, 2022/2023, 2023/2024 e 2024/2025 prevê verificação do sistema de escapamento a cada 6.000 km.', replacement: 'Somente se a inspeção confirmar dano ou falha; não há troca automática por quilometragem.', refs: [ref(44), ref(45), ref(46)], severe: [], group: 'scheduled',
  },
  {
    id: 'steering-lube', component: 'Coluna de direção', manualName: 'Rolamentos da coluna de direção', service: 'Lubrificar a coluna de direção', actions: ['lubricate'], frequency: 'A cada 12.000 km', kmInterval: 12000,
    description: 'Lubrifique os rolamentos da coluna de direção no intervalo indicado para os modelos 2021/2022, 2022/2023, 2023/2024 e 2024/2025. O ajuste da folga é outro serviço, previsto a cada 6.000 km.',
    reason: 'Manter o movimento suave e a conservação dos rolamentos da direção.', anticipation: 'Movimento áspero, ruído ou folga anormal identificada antes do intervalo.', notes: 'Na tabela pré-2025, a coluna de direção é verificada/ajustada a cada 6.000 km e lubrificada a cada 12.000 km.', replacement: 'Não trocar automaticamente; substituir apenas se a inspeção indicar desgaste ou dano.', refs: [ref(44), ref(45), ref(46)], severe: [], group: 'scheduled',
  },
  {
    id: 'lockset', component: 'Conjunto de travas', manualName: 'Conjunto de travas', service: 'Verificar e lubrificar as travas', actions: ['inspect', 'lubricate'], frequency: 'A cada 12.000 km', kmInterval: 12000,
    description: 'Verifique o funcionamento das travas e lubrifique conforme necessário no intervalo da geração 2024/2025.',
    reason: 'Manter fechaduras e travas funcionando corretamente e evitar travamento ou desgaste prematuro.', anticipation: 'Chave difícil de girar, trava presa ou funcionamento irregular.', notes: 'A tabela pré-2025 inclui o conjunto de travas a cada 12.000 km.', replacement: 'Somente peças com dano ou falha confirmada.', refs: [ref(44), ref(45), ref(46)], severe: [], group: 'scheduled',
  },
];

// Cargo 2016 a 2020: o catálogo base vem do manual da NXR/Fan e traz páginas, notas e alguns valores de outro modelo.
// Tudo abaixo foi conferido nos Manuais do Proprietário CG 160 Cargo 2019 (D2203-MAN-1187), 2018 (D2203-MAN-1129) e ESDi 2016 (D2203-MAN-1026), cujas tabelas são iguais.
const cargoText = (text: string, fallback = ''): string => {
  const marked = text
    .replace(/CG 160 Fan/g, 'CG 160 Cargo')
    .replace(/,?\s*conforme (?:a )?nota \d+/gi, '')
    .replace(/\s*\((?:notas?) \d+(?:,? ?\d+)*(?: e \d+)?\)/gi, '')
    .replace(/([.!?])\s+(?=[A-ZÁÀÂÃÉÊÍÓÔÕÚÇ])/g, '$1\u0001');
  const kept = marked.split('\u0001').filter(part => !/p[áa]ginas?\s+\d+/i.test(part) && !/\bnotas?\s+\d+/i.test(part));
  return kept.join(' ').trim() || fallback;
};

const CARGO_MANUAL_OVERRIDES: Record<string, Partial<Service>> = {
  'first-review': { description: 'Leve a moto à concessionária para fazer os serviços marcados na coluna de 1.000 km do manual da Cargo. O prazo vale pelo que ocorrer primeiro: 1.000 km ou 6 meses.', notes: 'O manual da Cargo prevê a primeira revisão em 1.000 km ou 6 meses e a segunda em 6.000 km ou 12 meses, o que ocorrer primeiro. Depois, a revisão de 12.000 km vale com 18 meses, a de 18.000 km com 24 meses, e assim por diante. A lista de serviços de cada coluna segue a tabela do manual.' },
  'break-in': { notes: 'Nos primeiros 500 km, siga os cuidados de amaciamento do manual da Cargo. Completar 500 km não cria uma troca automática.' },
  chain: {
    frequency: 'A cada 1.000 km; verificar, ajustar e lubrificar', kmInterval: 1000,
    description: 'Confira o movimento livre da corrente, chamado folga, em vários pontos. Deixe o motor desligado, a marcha em ponto morto e a moto no cavalete central, em piso firme. A folga correta é 15–25 mm. Ajuste se necessário. Limpe, seque e passe o lubrificante seguindo o manual.',
    notes: 'O manual da Cargo prevê verificar, ajustar e lubrificar a corrente a cada 1.000 km, com mais frequência sob poeira, lama, umidade, chuva ou acelerações fortes. Não pilote se a folga passar de 50 mm. Cuidar da corrente não significa trocá-la. Para lubrificar, use lubrificante para correntes ou, se não houver, óleo de transmissão SAE 80 ou 90.',
    replacement: 'Se houver desgaste excessivo ou dano, troque corrente, coroa e pinhão juntos, na concessionária. Corrente de reposição indicada no manual: DID 428HX ou RK 428HSB.',
  },
  throttle: { description: 'Com o motor desligado, confira se o punho do acelerador gira suavemente e volta a fechar em todas as posições do guidão. A folga medida na borda do punho, chamada flange da manopla, é 2–5 mm. Se houver dificuldade para mover ou cabo danificado, peça uma verificação.' },
  tires: {
    description: 'Olhe o estado dos pneus e use um medidor para conferir a pressão a cada 1.000 km ou semanalmente, sempre com os pneus frios e antes de pilotar. A pressão recomendada e a profundidade mínima da banda de rodagem estão na tabela de Especificações Técnicas do manual da Cargo. Procure cortes, objetos presos, desgaste diferente do normal e danos nos aros.',
    notes: 'Não existe troca em um mês ou km fixo. Se os indicadores de desgaste (TWI) estiverem visíveis, o manual manda trocar os pneus imediatamente. Este plano não repete valores de pressão de outro modelo: confira na tabela do manual. A Cargo não leva passageiro de fábrica.',
    replacement: 'Troque se o indicador de desgaste estiver visível, se o pneu chegar à profundidade mínima do manual ou se a lateral estiver furada ou danificada. A troca é na concessionária. Não instale câmara de ar em pneu sem câmara.',
  },
  suspension: { notes: 'Além da verificação a cada 6.000 km, a tabela da Cargo manda trocar o fluido da suspensão dianteira e lubrificar a traseira a cada 24.000 km. Esses dois serviços aparecem em linhas próprias neste plano.', replacement: 'Dano ou desgaste encontrado na verificação, ou o fluido e a lubrificação nos intervalos de 24.000 km.' },
  'fork-oil': {
    frequency: 'A cada 24.000 km', kmInterval: 24000,
    description: 'A tabela da Cargo manda trocar o fluido da suspensão dianteira a cada 24.000 km, com mais frequência sob muita poeira, lama ou umidade. O serviço deve ser feito com conhecimento mecânico.',
    notes: 'Intervalo da tabela da Cargo: 24.000 km. Não confundir com a simples verificação das suspensões, a cada 6.000 km.',
    replacement: 'Troque pelo intervalo da tabela ou antes quando a manutenção da suspensão exigir.',
  },
  'rear-suspension-lube': {
    frequency: 'A cada 24.000 km', kmInterval: 24000,
    description: 'A tabela da Cargo manda lubrificar buchas, rolamentos e eixo da suspensão traseira a cada 24.000 km. É um serviço de manutenção, não uma troca automática do amortecedor.',
    notes: 'Intervalo da tabela da Cargo: 24.000 km. A tabela não manda trocar o amortecedor inteiro por quilometragem.',
    replacement: 'Lubrificar no intervalo ou substituir apenas peças que a inspeção confirmar como danificadas.',
  },
  wheels: {
    component: 'Rodas e aros', service: 'Verificar rodas e aros', frequency: 'A cada 6.000 km; alinhamento, rolamentos e cubos a cada 12.000 km',
    description: 'Procure danos e deformações nos aros. Gire a roda devagar: se ela balançar para os lados ou parecer fora de alinhamento, leve à concessionária. A cada 12.000 km, a tabela também manda verificar o alinhamento, os rolamentos e os cubos.',
    reason: 'Alinhamento e estado corretos das rodas são importantes para a segurança.', anticipation: 'Impactos, aros danificados ou roda balançando ao girar.',
    notes: 'Não é preciso retirar as rodas para o serviço da tabela. A verificação não obriga a trocar rodas ou rolamentos.',
  },
  fasteners: {
    description: 'Peça a verificação do aperto de porcas, parafusos e fixações e o ajuste, se necessário. Use a ferramenta certa para conferir o que você consegue alcançar.',
    notes: 'Para uso comercial, o manual da Cargo manda apertar porcas, parafusos e fixações com mais frequência do que a tabela indica. A cada 12.000 km a tabela também lista: parafusos do suporte do motor e pedal de apoio, amortecedores e coxins, eixos das rodas e alavancas de freio e embreagem.',
  },
  steering: {
    frequency: 'Verificar a folga a cada 6.000 km', kmInterval: 6000,
    notes: 'A tabela da Cargo manda verificar a folga da coluna de direção e ajustar, se necessário, a cada 6.000 km. A lubrificação é outra linha, a cada 18.000 km. Não criamos um limite de folga em milímetros.',
  },
  'steering-lube': {
    frequency: 'A cada 18.000 km', kmInterval: 18000,
    description: 'Lubrifique a coluna de direção no intervalo da tabela da Cargo. O ajuste da folga é outro serviço, previsto a cada 6.000 km.',
    notes: 'Intervalo da tabela da Cargo: 18.000 km.',
    replacement: 'Não trocar automaticamente; substituir apenas se a inspeção indicar desgaste ou dano.',
  },
  brakes: {
    description: 'Confira os freios dianteiro e traseiro e leve qualquer problema à concessionária. Use os dois freios corretamente: o CBS ajuda a distribuir a frenagem, mas não substitui a técnica correta.',
    notes: 'A CG 160 Cargo usa freio dianteiro a disco e traseiro a tambor com CBS (sem ABS). A tabela também manda lubrificar a articulação do manete e do pedal a cada 24.000 km; o came do painel do freio traseiro é lubrificado sempre que as sapatas são trocadas.',
    replacement: 'Trocar somente peças com necessidade confirmada. Disco, pinça e sapatas não têm prazo fixo de troca nesta tabela.',
  },
  'brake-level': {
    description: 'Com a moto na vertical, em piso plano e firme e com os reservatórios na horizontal, confira o fluido. Freio dianteiro: acima da marca inferior (LWR). Freio combinado (CBS): entre as marcas LOWER e UPPER. Nível baixo ou folga excessiva da alavanca pedem verificação das pastilhas e de vazamentos.',
    notes: 'Não apenas complete o fluido para esconder a causa. O manual orienta não adicionar nem trocar o fluido por conta própria, exceto em emergência; nesse caso, procure a concessionária o mais rápido possível.',
  },
  'brake-fluid': {
    description: 'Troque o fluido dos freios na concessionária. Use fluido de freio DOT 4 novo, de embalagem lacrada (o manual cita o Mobil Super Moto Brake Fluid DOT 4). Não misture DOT 4 com DOT 3. Anote a data da troca.',
    notes: 'A tabela da Cargo manda trocar a cada 2 anos, e a troca exige habilidade mecânica. O prazo de 24 meses vale mesmo com poucos quilômetros; chegar a 18.000 km não obriga a trocar se os dois anos ainda não passaram.',
  },
  pads: {
    description: 'Confira os indicadores de desgaste das pastilhas dianteiras, olhando sob a pinça, e o indicador de desgaste das sapatas do freio traseiro (a seta no braço do freio em direção à marca de referência). Se uma pastilha chegar ao indicador, troque as duas juntas, na concessionária.',
    notes: 'As pastilhas e sapatas não têm quilometragem fixa de troca. O freio traseiro da Cargo é a tambor, com sapatas. Se a seta do braço do freio alinhar com a marca de referência com o freio totalmente acionado, as sapatas devem ser trocadas.',
    replacement: 'Frente: troque as duas pastilhas se uma chegar ao indicador de desgaste. Atrás: troque as sapatas quando a seta alinhar com a marca de referência. Faça na concessionária.',
    abs: undefined, cbs: 'Freio dianteiro CBS: confira as pastilhas sob a pinça e troque as duas se uma estiver gasta até o indicador. O freio traseiro é a tambor.',
  },
  spark: { notes: 'A tabela da Cargo manda verificar e trocar a vela a cada 12.000 km. Folga do eletrodo: 0,80–0,90 mm. Verificar e trocar são serviços diferentes.' },
  stand: { notes: 'Limpar e lubrificar o ponto de giro só quando necessário. A Cargo também tem cavalete central.' },
  slider: {
    manualName: 'Guia da corrente de transmissão',
    description: 'Confira a guia da corrente de transmissão e o apoio de borracha, que tem linha de referência própria de desgaste. Se o desgaste chegar a qualquer ponto da linha, peça a troca na concessionária.',
    notes: 'A tabela da Cargo manda verificar o desgaste da guia a cada 6.000 km. Não trocar todo o conjunto só por chegar a 6.000 km.',
    replacement: 'Troque o apoio de borracha quando o desgaste alcançar qualquer ponto da linha de referência; a guia, se estiver gasta ou danificada.',
  },
  drain: {
    component: 'Respiro do motor', manualName: 'Respiro do motor', service: 'Limpar o respiro do motor',
    description: 'Drene os depósitos do tubo de respiro do motor num recipiente adequado, seguindo o manual. Faça com mais frequência sob chuva ou aceleração máxima, depois de lavar a moto ou após queda. Se o tubo transbordar, o filtro de ar pode ficar contaminado com óleo e prejudicar o motor.',
    notes: 'A tabela da Cargo manda limpar o respiro a cada 6.000 km, com mais frequência sob chuva, aceleração máxima ou acelerações rápidas frequentes. O manual não dá um intervalo menor fixo.',
    replacement: 'O serviço previsto é limpeza. Trocar peças só se o estado delas exigir.',
  },
  air: { notes: 'A tabela da Cargo manda trocar o filtro de ar úmido (tipo viscoso) a cada 18.000 km, com mais frequência sob poeira, lama ou umidade. Nunca limpe nem aplique jato de ar: isso danifica o filtro.' },
  headlight: { anticipation: 'Farol desregulado, luz apontando para o lugar errado ou necessidade encontrada na verificação. O peso da carga muda a regulagem.', notes: 'A tabela da Cargo manda ajustar o facho do farol a cada 6.000 km, com a moto na vertical e os pneus calibrados.', replacement: 'Somente se houver defeito confirmado. A tabela não determina troca por idade.' },
  'fuel-filter': {
    description: 'Troque o filtro de combustível (unidade) no intervalo da tabela da Cargo. O serviço deve ser feito com segurança na concessionária.',
    notes: 'A tabela da Cargo manda trocar o filtro de combustível a cada 12.000 km.', replacement: 'Troque a cada 12.000 km ou antes se houver necessidade confirmada.',
  },
  exhaust: { notes: 'A tabela da Cargo prevê verificar o sistema de escapamento a cada 6.000 km.' },
  lockset: {
    description: 'Verifique o funcionamento das travas e lubrifique, se necessário, no intervalo da tabela da Cargo.',
    notes: 'A tabela da Cargo inclui o conjunto de travas a cada 12.000 km.',
  },
};

// Diferenças lidas no manual da Cargo ESDi 2016 (D2203-MAN-1026) em relação ao manual da Cargo 2018/2019 (com CBS).
const CARGO_ESDI_OVERRIDES: Record<string, Partial<Service>> = {
  chain: { replacement: 'Se houver desgaste excessivo ou dano, troque corrente, coroa e pinhão juntos, na concessionária. Corrente de reposição indicada no manual: DID 428HX.' },
  oil: { description: 'Troque o óleo a cada 6.000 km ou uma vez por ano, o que ocorrer primeiro, e nunca deixe passar um ano entre trocas. Use SAE 10W-30 SJ ou superior, JASO MA; o manual recomenda o óleo genuíno Honda. Capacidade na troca: 1,0 litro. Anote a data e a quilometragem em que a troca foi feita.' },
  brakes: {
    description: 'Confira os freios dianteiro e traseiro e leve qualquer problema à concessionária. Para a máxima eficiência, o manual manda acionar os freios dianteiro e traseiro simultaneamente.',
    notes: 'A CG 160 Cargo ESDi usa freio dianteiro a disco e traseiro a tambor, sem CBS e sem ABS. A tabela também manda lubrificar a articulação do manete e do pedal a cada 24.000 km; o came do painel do freio traseiro é lubrificado sempre que as sapatas são trocadas.',
  },
  'brake-level': {
    description: 'Com a moto na vertical, em piso plano e firme e com o reservatório na horizontal, confira o fluido do freio dianteiro: o nível deve ficar acima da marca inferior (LWR). Nível baixo ou folga excessiva da alavanca pedem verificação das pastilhas e de vazamentos.',
  },
  'brake-fluid': {
    description: 'Troque o fluido dos freios na concessionária. Use somente fluido de freio Honda DOT 3 ou DOT 4 novo, de embalagem lacrada. Não misture tipos diferentes (por exemplo, DOT 4 com DOT 3). Anote a data da troca.',
  },
  pads: { abs: undefined, cbs: undefined },
};
const CARGO_SL_OIL: Partial<Service> = { description: 'Troque o óleo a cada 6.000 km ou uma vez por ano, o que ocorrer primeiro, e nunca deixe passar um ano entre trocas. Use SAE 10W-30 SL ou superior, JASO MA; o manual recomenda o óleo genuíno Honda. Capacidade na troca: 1,0 litro. Anote a data e a quilometragem em que a troca foi feita.' };

// CG 150 Cargo 2014 e 2015: geração anterior à CG 160 Cargo ESDi. Ciclo de revisões de 1.000 km, 4.000 km e depois a cada 4.000 km.
// Os textos abaixo foram escritos a partir dos manuais da Cargo 2014 ("CG150 Fan Cargo ESDi") e 2015 ("CG150 Cargo ESD").
// Nada do catálogo base (NXR/Fan 160) é reaproveitado: ele traz números de outro modelo (corrente 20–30 mm, revisões de 6.000 km etc.).
type Cargo150Entry = Partial<Omit<Service, 'id' | 'refs'>>;
const CARGO_150_IDS_2014 = ['delivery', 'break-in', 'first-review', 'chain', 'tires', 'oil-level', 'oil', 'fuel-line', 'throttle', 'air', 'drain', 'spark-inspect', 'spark', 'valves', 'oil-screen', 'centrifugal', 'idle', 'brake-level', 'brake-fluid', 'pads', 'brakes', 'brake-switch', 'headlight', 'clutch', 'stand', 'suspension', 'fasteners', 'wheels', 'steering', 'steering-lube', 'fuel-filter', 'exhaust'];
const CARGO_150_IDS_2015 = [...CARGO_150_IDS_2014, 'slider', 'fork-oil', 'rear-suspension-lube', 'lockset'];

const CARGO_150_COMMON: Record<string, Cargo150Entry> = {
  delivery: {
    frequency: '0 km, na entrega',
    description: 'Confira os documentos e o registro da revisão de entrega no Certificado de Garantia. Anote a data em que a moto zero-quilômetro foi entregue, porque os prazos de 6 e 12 meses das duas primeiras revisões contam a partir dela.',
    reason: 'Começar o acompanhamento com a data e a quilometragem corretas.', anticipation: 'Qualquer problema encontrado antes do primeiro uso deve ser corrigido.',
    notes: '0 km é a revisão de entrega do certificado, não uma troca geral de peças.', replacement: 'Este plano não cria trocas automáticas de peças em 0 km.',
  },
  'break-in': {
    frequency: 'Durante os primeiros 500 km',
    description: 'É o período de amaciamento do motor. Evite acelerações bruscas, acelerar tudo com o motor em baixa rotação, manter a mesma velocidade por muito tempo e usar rotações muito baixas ou altas. Freie suavemente. São cuidados ao pilotar, não uma troca ou revisão.',
    reason: 'Ajudar o motor a durar e os freios a funcionar bem.', anticipation: 'Siga esses cuidados desde a primeira saída. Giro excessivo pode danificar seriamente o motor.',
    notes: 'O manual da Cargo diz que essas recomendações valem para toda a vida útil do motor, não só para os primeiros 500 km. Completar 500 km não cria uma troca automática.', replacement: 'Completar os primeiros 500 km não cria uma troca obrigatória neste plano.',
  },
  'first-review': {
    frequency: '1.000 km ou 6 meses da entrega, o que ocorrer primeiro; a segunda revisão é em 4.000 km ou 12 meses', kmInterval: 1000, pending: false,
    description: 'Leve a moto à concessionária para fazer os serviços marcados na coluna de 1.000 km do manual da Cargo. A primeira revisão vale em 1.000 km ou 6 meses, o que ocorrer primeiro. Segundo o manual, a mão de obra das duas primeiras revisões (1.000 km e 4.000 km) é gratuita nas concessionárias Honda.',
    reason: 'Não deixar de fazer um serviço inicial nem tratar tudo como troca de peças.', anticipation: 'Se completar 1.000 km antes de 6 meses, a revisão já chegou. Uso pesado ou problemas notados podem pedir cuidado antes.',
    notes: 'O certificado prevê tolerância de ±10% nas duas primeiras revisões (900 a 1.100 km e 3.600 a 4.400 km) ou o prazo de 6 e 12 meses, o que ocorrer primeiro. A tolerância não é recomendação para atrasar. As marcações da coluna de 1.000 km foram conferidas na imagem da tabela do manual.',
    replacement: 'Na coluna de 1.000 km a tabela marca a troca do óleo do motor e a verificação de válvulas, marcha lenta, sistema de freio, embreagem, porcas, parafusos e fixações, rodas e coluna de direção. Corrente e pneus têm rotina própria a cada 1.000 km.',
  },
  chain: {
    frequency: 'A cada 1.000 km; verificar, ajustar e lubrificar; condição e folga antes do uso', kmInterval: 1000,
    description: 'Confira o movimento livre da corrente, chamado folga, na parte central inferior, entre a coroa e o pinhão. Deixe o motor desligado, a marcha em ponto morto e a moto no cavalete central, em piso plano e firme. A folga correta é 15–25 mm. Ajuste se necessário, gire a roda para ver se a folga se mantém e limpe, seque e lubrifique.',
    reason: 'Evitar desgaste da corrente e das engrenagens e manter o funcionamento seguro.',
    anticipation: 'Poeira, lama, umidade, chuva, piso irregular, alta velocidade e acelerações fortes ou rápidas frequentes. Ruídos estranhos, roletes danificados e pinos soltos ou presos pedem verificação.',
    notes: 'O manual manda verificar, ajustar e lubrificar a cada 1.000 km, com mais frequência sob poeira, lama, umidade, chuva, aceleração máxima ou acelerações rápidas frequentes. Não pilote se a folga chegar a 50 mm. Cuidar da corrente não significa trocá-la. O ajuste exige torquímetro (porca do eixo traseiro: 88 N·m); sem ele, procure a concessionária.',
  },
  tires: {
    frequency: 'A cada 1.000 km ou semanalmente; também antes do uso', kmInterval: 1000,
    reason: 'Manter a moto estável e os pneus em boa condição, sem desgaste causado pela pressão errada.',
    anticipation: 'Confira antes de sair do asfalto e ao voltar. Verifique antes do prazo se notar danos, perda de pressão ou desgaste anormal.',
  },
  'oil-level': {
    frequency: 'Todos os dias, antes de pilotar',
    description: 'Se o motor estiver frio, ligue-o e deixe em marcha lenta por 3–5 minutos. Desligue e espere 2–3 minutos. Com a moto no cavalete central, em piso plano e firme, retire a tampa/vareta, limpe-a com um pano seco, coloque-a de volta sem rosquear e confira se o óleo está entre as marcas inferior e superior. Complete até a marca superior, se precisar, sem encher demais.',
    reason: 'É normal consumir um pouco de óleo durante o uso. Nível errado prejudica a proteção do motor.', anticipation: 'Confira vazamentos e complete o nível baixo antes de usar. Completar o óleo não substitui uma troca que já venceu.',
    notes: 'Não misture tipos de óleo, não adicione aditivos e evite entrada de sujeira. Cuidado com as peças quentes.',
    replacement: 'Troque pelo intervalo do manual, pelo limite de um ano ou se o óleo estiver ruim. Conferir o nível não exige troca por si só.',
  },
  oil: {
    frequency: 'A cada 4.000 km ou uma vez por ano, o que ocorrer primeiro', kmInterval: 4000, timeMonths: 12,
    description: 'Troque o óleo a cada 4.000 km ou uma vez por ano, o que ocorrer primeiro. Use SAE 10W-30 SJ ou superior, JASO MA; o manual recomenda o óleo genuíno Honda. Capacidade na troca: 1,0 litro. Anote a data e a quilometragem em que a troca foi feita.',
    reason: 'O óleo é o que mais afeta o desempenho e a vida útil do motor.',
    anticipation: 'Poeira, lama, umidade, uso pesado ou óleo sujo e deteriorado. Se entrar água no motor (alagamento), desligue e troque o óleo na concessionária.',
    notes: 'A tabela manda trocar com mais frequência sob poeira, lama ou umidade. O parafuso de drenagem leva torque de 30 N·m (3,1 kgf·m), e a troca pede torquímetro; sem ele, procure a concessionária. Não use óleo reciclado, não detergente, vegetal ou específico para competição.',
    replacement: 'Troque pelo intervalo do manual, pelo limite de um ano ou se o óleo estiver sujo ou deteriorado. Descarte o óleo usado em local apropriado.',
  },
  'fuel-line': {
    frequency: 'A cada 4.000 km', kmInterval: 4000,
    description: 'Peça a verificação da linha de combustível, que leva o combustível do tanque ao motor. Vazamento, ressecamento ou dano devem ser corrigidos na concessionária.',
    reason: 'Evitar vazamento de combustível e falhas na alimentação do motor.', anticipation: 'Cheiro de combustível, vazamento ou falha de funcionamento notados antes do prazo.',
    notes: 'A tabela da Cargo manda verificar a linha de combustível a cada 4.000 km. Verificar não significa trocar.', replacement: 'Somente se a verificação confirmar dano; não há troca automática por quilometragem.',
  },
  'fuel-filter': {
    frequency: 'A cada 12.000 km', kmInterval: 12000,
    description: 'Troque o filtro de combustível (unidade) no intervalo da tabela. O serviço deve ser feito com segurança na concessionária.',
    reason: 'Manter a filtragem do combustível e o funcionamento correto da injeção eletrônica.', anticipation: 'Falhas no abastecimento, funcionamento irregular ou necessidade encontrada na revisão.',
    notes: 'A tabela da Cargo manda trocar o filtro de combustível a cada 12.000 km.', replacement: 'Troque a cada 12.000 km ou antes se houver necessidade confirmada.',
  },
  air: {
    frequency: 'A cada 16.000 km', kmInterval: 16000,
    description: 'Troque o filtro de ar úmido (tipo viscoso) na concessionária, no intervalo da tabela, ou antes sob muita poeira, lama ou umidade. Use somente o filtro genuíno Honda.',
    reason: 'Proteger o motor contra poeira e desgaste precoce.', anticipation: 'Poeira, lama ou umidade intensas, ou queda de desempenho.',
    notes: 'A tabela da Cargo manda trocar o filtro de ar a cada 16.000 km, com mais frequência sob poeira, lama ou umidade. Nunca limpe o filtro nem aplique jato de ar: isso o danifica e deixa entrar poeira. Não pilote sem o filtro de ar.',
    replacement: 'Troque a cada 16.000 km, ou antes sob uso severo. O filtro não é limpo para reutilizar.',
  },
  drain: {
    frequency: 'A cada 4.000 km; com mais frequência sob chuva ou aceleração máxima', kmInterval: 4000,
    description: 'Drene os depósitos do respiro do motor. Com a tampa lateral esquerda removida, solte o tubo de drenagem sobre um recipiente, recolha os resíduos e recoloque o tubo.',
    reason: 'Evitar acúmulo de resíduos no sistema de ventilação do motor.', anticipation: 'Chuva, aceleração máxima, lavagem da moto, queda ou depósitos visíveis na parte transparente do tubo.',
    notes: 'A tabela da Cargo manda limpar o respiro a cada 4.000 km e com mais frequência sob chuva, aceleração máxima ou acelerações rápidas frequentes. O manual também manda drenar após lavar a moto ou depois de uma queda.',
    replacement: 'Não é uma troca periódica: drene e limpe no intervalo.',
  },
  'spark-inspect': {
    group: 'scheduled', pending: false,
    service: 'Verificar a vela de ignição', actions: ['inspect'],
    reason: 'Encontrar depósitos ou desgaste antes que afetem o funcionamento do motor.', anticipation: 'Falhas na partida, perda de potência ou consumo elevado.',
    replacement: 'Se os depósitos, a erosão ou a carbonização forem excessivos, troque a vela. Vela carbonizada pode ser limpa com limpador de velas ou escova de aço.',
  },
  spark: {
    kmInterval: 8000, frequency: 'A cada 8.000 km',
    reason: 'Manter a ignição e o funcionamento do motor em boa condição.', anticipation: 'Falhas na partida, perda de potência ou consumo elevado.',
    replacement: 'Troque a cada 8.000 km ou antes se a verificação mostrar desgaste ou depósitos excessivos.',
  },
  valves: {
    frequency: 'A cada 4.000 km', kmInterval: 4000,
    description: 'Peça a medição e, se necessário, o ajuste da folga das válvulas, com o motor frio. O serviço exige ferramenta de medição e deve ser feito na concessionária.',
    reason: 'Evitar ruído, perda de potência e danos às válvulas.', anticipation: 'Ruído anormal no motor ou perda de potência.',
    notes: 'A tabela da Cargo manda verificar a folga das válvulas a cada 4.000 km. Válvulas com folga excessiva fazem ruído; sem folga, podem ser danificadas ou perder potência.',
    replacement: 'Ajuste somente se a medição mostrar necessidade; não há troca automática.',
  },
  'oil-screen': {
    frequency: 'A cada 12.000 km', kmInterval: 12000,
    description: 'Peça a limpeza da tela do filtro de óleo na concessionária.',
    reason: 'Remover resíduos que podem prejudicar a lubrificação.', anticipation: 'Óleo muito sujo ou serviço no motor que exija a limpeza antes do prazo.',
    notes: 'A tabela da Cargo manda limpar a tela do filtro de óleo a cada 12.000 km.', replacement: 'É limpeza, não troca.',
  },
  centrifugal: {
    frequency: 'A cada 12.000 km', kmInterval: 12000,
    description: 'Peça a limpeza do filtro centrífugo de óleo na concessionária.',
    reason: 'Remover resíduos que podem prejudicar a lubrificação.', anticipation: 'Óleo muito sujo ou serviço no motor que exija a limpeza antes do prazo.',
    notes: 'A tabela da Cargo manda limpar o filtro centrífugo de óleo a cada 12.000 km. Filtro centrífugo é a peça que separa a sujeira do óleo.', replacement: 'É limpeza, não troca.',
  },
  idle: {
    frequency: 'A cada 4.000 km', kmInterval: 4000,
    description: 'Peça a verificação da marcha lenta, que é o funcionamento do motor sem acelerar. Ela deve ficar estável.',
    reason: 'Manter o motor funcionando de forma estável e dentro das emissões.', anticipation: 'Motor morrendo, oscilando ou acelerado sem você acelerar.',
    notes: 'A tabela da Cargo manda verificar a marcha lenta a cada 4.000 km. A Cargo 150 tem injeção eletrônica com controle automático da marcha lenta.',
    replacement: 'Somente se a verificação indicar necessidade; não há troca automática.',
  },
  'brake-level': {
    frequency: 'A cada 4.000 km e antes de pilotar', kmInterval: 4000,
    description: 'Com a moto na vertical, em piso plano e firme, e com o reservatório na horizontal, confira se o fluido do freio dianteiro está acima da marca inferior. Nível baixo ou folga excessiva da alavanca pedem verificação das pastilhas e de vazamentos.',
    reason: 'Garantir que o freio dianteiro tenha fluido suficiente.', anticipation: 'Nível baixo, alavanca mole ou sinais de vazamento.',
    notes: 'A CG 150 Cargo tem circuito hidráulico só no freio dianteiro; o traseiro é a tambor. O manual manda não adicionar nem trocar o fluido, exceto em emergência; use somente fluido novo de embalagem lacrada e procure a concessionária.',
    replacement: 'Completar o nível não substitui a troca do fluido, que tem prazo de 2 anos.',
  },
  'brake-fluid': {
    frequency: 'A cada 2 anos', timeMonths: 24,
    description: 'Troque o fluido do freio na concessionária, a cada 2 anos. Use somente Mobil Super Moto Brake Fluid DOT 4 novo, de embalagem lacrada, e não misture tipos diferentes (por exemplo, DOT 4 com DOT 3). Anote a data da troca.',
    reason: 'Manter o fluido em boas condições para o freio dianteiro.', anticipation: 'Fluido escurecido, nível caindo ou alavanca mole.',
    notes: 'A tabela da Cargo manda verificar o nível a cada 4.000 km e trocar o fluido a cada 2 anos; a troca exige habilidade mecânica. O prazo de 24 meses vale mesmo com poucos quilômetros. Conte a partir da última troca real.',
    replacement: 'Troque a cada 2 anos, na concessionária.',
  },
  pads: {
    frequency: 'A cada 4.000 km e antes de pilotar', kmInterval: 4000,
    description: 'Verifique os indicadores de desgaste das pastilhas do freio dianteiro, sob a pinça, e das sapatas do freio traseiro. No freio traseiro a tambor, se a seta do braço do freio ficar alinhada com a marca de referência com o freio totalmente acionado, as sapatas devem ser trocadas.',
    reason: 'Encontrar o desgaste das pastilhas e sapatas antes de passar do limite.', anticipation: 'Uso pesado, poeira, lama ou umidade, alavanca ou pedal com folga excessiva ou freio perdendo eficiência.',
    notes: 'As pastilhas e sapatas não têm quilometragem fixa de troca: o desgaste depende do uso, do modo de pilotar e da pista. Troque sempre as duas pastilhas juntas, na concessionária.',
    replacement: 'Troque as duas pastilhas se uma chegar ao indicador de desgaste; troque as sapatas traseiras quando a seta alinhar com a marca de referência.',
  },
  'brake-switch': {
    frequency: 'A cada 4.000 km', kmInterval: 4000,
    description: 'Verifique se a luz de freio acende no ponto certo ao acionar o freio. Para ajustar, gire somente a porca de ajuste, nunca o corpo do interruptor: um sentido adianta o acendimento e o outro o retarda.',
    reason: 'Avisar quem vem atrás no momento certo.', anticipation: 'Luz de freio acendendo tarde, cedo demais ou não acendendo.',
    notes: 'A tabela da Cargo manda verificar o interruptor da luz de freio a cada 4.000 km.', replacement: 'Somente se houver defeito confirmado.',
  },
  headlight: {
    frequency: 'A cada 4.000 km e antes de pilotar', kmInterval: 4000,
    description: 'Peça a regulagem da direção da luz do farol, chamada ajuste do facho no manual. Faça com a moto na vertical, sem apoiá-la no cavalete, a 10 m de uma parede plana, com os pneus calibrados e a luz baixa. O facho deve alcançar no máximo 100 m.',
    reason: 'Enxergar bem à noite sem ofuscar quem vem de frente.', anticipation: 'Farol desregulado, luz apontando para o lugar errado ou necessidade encontrada na verificação. O peso da carga muda a regulagem.',
    notes: 'A tabela da Cargo manda ajustar o facho do farol a cada 4.000 km. Considere o peso da carga ao regular.', replacement: 'Somente se houver defeito confirmado. A tabela não determina troca por idade.',
  },
  clutch: {
    frequency: 'A cada 4.000 km', kmInterval: 4000,
    description: 'Confira a folga da alavanca da embreagem, que deve ser de 10–20 mm medida na ponta da alavanca. Ajuste primeiro no ajustador superior do cabo e, se faltar curso, no ajustador inferior. Verifique se o cabo tem dobras ou marcas de desgaste e lubrifique-o com lubrificante para cabos.',
    reason: 'Manter a embreagem funcionando com suavidade e evitar desgaste.', anticipation: 'Moto morrendo ao engatar a marcha, andando com a alavanca acionada ou embreagem patinando.',
    notes: 'A tabela da Cargo manda verificar a embreagem a cada 4.000 km. Se não conseguir o ajuste ou a embreagem não funcionar bem, procure a concessionária.', replacement: 'Troque o cabo se estiver dobrado ou danificado; não há troca automática por quilometragem.',
  },
  suspension: {
    frequency: 'A cada 4.000 km', kmInterval: 4000,
    description: 'Dianteira: acione o freio dianteiro e force a suspensão para cima e para baixo várias vezes; o movimento deve ser suave e sem vazamento de fluido. Traseira: force a roda para os lados para ver se há folga nas buchas do braço oscilante e confira vazamentos e folga nas articulações dos amortecedores. Verifique o aperto dos pontos de fixação.',
    reason: 'Manter a estabilidade e a segurança da moto.', anticipation: 'Poeira, lama, uso fora do asfalto, vazamentos, folgas ou movimento áspero.',
    notes: 'A tabela da Cargo manda verificar as suspensões dianteira e traseira a cada 4.000 km. O manual permite ajustar os amortecedores traseiros conforme a carga e a pista (posição 2 é a padrão; posições 3 a 5 para carga pesada ou piso irregular). Ajuste os dois na mesma posição.',
    replacement: 'Dano ou desgaste encontrado na verificação. Não há troca por quilometragem.',
  },
  stand: { frequency: 'A cada 4.000 km', kmInterval: 4000 },
  steering: {},
  'steering-lube': {
    frequency: 'A cada 12.000 km', kmInterval: 12000,
    description: 'Peça a lubrificação da coluna de direção no intervalo da tabela. O ajuste da folga é outro serviço.',
    reason: 'Manter o movimento suave e a conservação dos rolamentos da direção.', anticipation: 'Movimento áspero, ruído ou folga anormal identificada antes do intervalo.',
    notes: 'A tabela da Cargo manda lubrificar a coluna de direção a cada 12.000 km.', replacement: 'Não trocar automaticamente; substituir apenas se a inspeção indicar desgaste ou dano.',
  },
  exhaust: {
    frequency: 'A cada 4.000 km', kmInterval: 4000,
    description: 'Verifique o sistema de escapamento e procure ruídos, danos, fixações soltas ou alterações anormais.',
    reason: 'Detectar problemas no escapamento e manter o conjunto preso e em boas condições.', anticipation: 'Ruído diferente, dano por impacto ou fixação solta.',
    notes: 'A tabela da Cargo manda verificar o sistema de escapamento a cada 4.000 km. O catalisador exige motor em boas condições; falha de ignição, contra-explosão ou motor morrendo pedem inspeção.', replacement: 'Somente se a inspeção confirmar dano ou falha; não há troca automática por quilometragem.',
  },
};

const CARGO_150_2014: Record<string, Cargo150Entry> = {
  'first-review': {
    notes: 'O certificado prevê tolerância de ±10% nas duas primeiras revisões (900 a 1.100 km e 3.600 a 4.400 km) ou o prazo de 6 e 12 meses, o que ocorrer primeiro. A tolerância não é recomendação para atrasar. A coluna de 1.000 km da tabela do manual da Cargo 2014 (páginas 6-2 e 6-3) foi conferida na imagem.',
  },
  chain: {
    notes: 'O manual manda verificar, ajustar e lubrificar a cada 1.000 km, com mais frequência sob poeira, lama, umidade, chuva, aceleração máxima ou acelerações rápidas frequentes. Não pilote se a folga chegar a 50 mm. Cuidar da corrente não significa trocá-la. Lubrifique somente com óleo de transmissão SAE 80 ou 90 e não use lubrificante em spray, que pode danificar os retentores. O ajuste exige torquímetro (porca do eixo traseiro: 88 N·m); sem ele, procure a concessionária.',
    replacement: 'Se a corrente, a coroa e o pinhão estiverem muito gastos ou danificados, troque os três juntos, na concessionária. Corrente de reposição indicada no manual: DID 428MX ou RK 428SB.',
  },
  tires: {
    description: 'Olhe o estado dos pneus e use um medidor para conferir a pressão, sempre com os pneus frios, antes de pilotar. Pressão (só piloto): dianteiro 175 kPa (25 psi) e traseiro 200 kPa (29 psi). Procure cortes, objetos presos, desgaste diferente do normal, danos nos aros e raios frouxos.',
    notes: 'Profundidade mínima da banda de rodagem: 1,5 mm no pneu dianteiro e 2,0 mm no traseiro; abaixo disso o manual recomenda trocar. Nos primeiros 1.000 km os raios afrouxam com o assentamento das peças, e raios frouxos causam instabilidade. Não existe troca em mês ou km fixo.',
    replacement: 'Troque os pneus ao chegar à profundidade mínima ou se estiverem danificados. O manual manda não consertar pneus ou câmaras danificados e usar somente os pneus especificados, na concessionária.',
  },
  throttle: {
    frequency: 'A cada 4.000 km e antes de pilotar', kmInterval: 4000,
    description: 'Com o motor desligado, confira se a manopla do acelerador funciona suavemente em todas as posições do guidão e verifique a posição dos cabos e a folga da manopla.',
    reason: 'Manter o acelerador suave e seguro.', anticipation: 'Acelerador duro, irregular ou com cabo danificado.',
    notes: 'A tabela da Cargo manda verificar o acelerador a cada 4.000 km, além da inspeção antes do uso.', replacement: 'Somente se o cabo ou a manopla estiverem danificados; não há troca por quilometragem.',
  },
  'spark-inspect': {
    kmInterval: 8000, frequency: 'A cada 8.000 km',
    description: 'Peça a verificação da vela de ignição: depósitos, erosão e carbonização. Folga do eletrodo: 0,8–0,9 mm; se necessário, ajuste dobrando com cuidado o eletrodo lateral.',
    notes: 'Na tabela do manual da Cargo 2014 (página 6-2), as linhas de verificar e de trocar a vela têm as mesmas marcações (8.000, 16.000 e 24.000 km) e "a cada" 8.000 km. Na Cargo 2015 a verificação é mais frequente (4.000 km). Verificar não significa trocar.',
  },
  spark: {
    description: 'Troque a vela de ignição a cada 8.000 km. Use somente a vela especificada, NGK CPR8EA-9 (ou CPR9EA-9, opcional). Folga do eletrodo: 0,8–0,9 mm. Aperte a vela nova em duas etapas, conforme o manual.',
    notes: 'Verificar e trocar são serviços diferentes. Vela solta pode danificar o pistão e vela apertada demais pode danificar a rosca.',
  },
  valves: {
    notes: 'A tabela da Cargo manda verificar a folga das válvulas a cada 4.000 km, com o motor frio. Folga especificada (motor frio): admissão 0,08 mm e escapamento 0,12 mm. Válvulas com folga excessiva fazem ruído; sem folga, podem ser danificadas ou perder potência.',
  },
  brakes: {
    frequency: 'A cada 4.000 km e antes de pilotar', kmInterval: 4000,
    description: 'Confira os freios dianteiro e traseiro e leve qualquer problema à concessionária. Para a máxima eficiência, acione os freios dianteiro e traseiro ao mesmo tempo. A folga do pedal do freio traseiro é de 15–25 mm, medida na ponta do pedal; ajuste a porca meia volta por vez.',
    reason: 'Manter a frenagem segura e encontrar problemas cedo.', anticipation: 'Freio mole, alavanca ou pedal com folga excessiva, ruído ou desgaste anormal.',
    notes: 'A CG 150 Cargo usa freio dianteiro a disco e traseiro a tambor, sem CBS e sem ABS. O manual manda fazer todos os ajustes e serviços dos freios na concessionária, com peças genuínas Honda.',
    replacement: 'Somente se a verificação indicar desgaste ou dano; não há troca automática.',
  },
  stand: {
    description: 'Verifique se o cavalete lateral se move livremente e se a mola não está danificada nem sem tensão. Se prender, limpe e lubrifique a articulação com óleo de motor novo, sem excesso. Confira também o apoio de borracha: troque-o se o desgaste atingir a linha de referência.',
    reason: 'Evitar que a moto tombe ou que o cavalete interfira nas curvas.', anticipation: 'Cavalete prendendo, mola frouxa ou apoio de borracha gasto.',
    notes: 'A tabela da Cargo manda verificar o cavalete lateral a cada 4.000 km. A Cargo também tem cavalete central.', replacement: 'Troque o apoio de borracha se o desgaste atingir a linha de referência; a troca é feita na concessionária.',
  },
  suspension: {
    notes: 'A tabela da Cargo manda verificar as suspensões dianteira e traseira a cada 4.000 km. O manual permite ajustar os amortecedores traseiros conforme a carga e a pista (posição 1 para cargas leves, 2 padrão, 3 a 5 para cargas pesadas e piso irregular). Ajuste sempre em sequência numérica e deixe os dois na mesma posição.',
  },
  fasteners: {
    frequency: 'A cada 8.000 km', kmInterval: 8000,
    description: 'Peça a verificação do aperto de porcas, parafusos e fixações. Para uso comercial, o manual manda apertar essas peças com mais frequência do que o plano indica. Confira também o bagageiro: porcas dos amortecedores com 34 N·m e parafusos do bagageiro com 42 N·m.',
    reason: 'Evitar peças soltas por vibração, carga e piso irregular.', anticipation: 'Uso comercial, carga, pistas irregulares e vibrações podem afrouxar fixações antes do prazo.',
    notes: 'A tabela da Cargo manda verificar porcas, parafusos e fixações a cada 8.000 km. O bagageiro original suporta no máximo 20 kg, e o limite de piloto mais carga é 166 kg.',
    replacement: 'Reaperte ou substitua somente o que estiver solto, folgado ou danificado.',
  },
  wheels: {
    frequency: 'A cada 4.000 km', kmInterval: 4000,
    description: 'Verifique rodas e aros: cortes, entalhes ou deformações nos aros, raios frouxos e folgas.',
    reason: 'Manter as rodas alinhadas e seguras.', anticipation: 'Raios frouxos, aro empenado, vibração ou instabilidade.',
    notes: 'A tabela da Cargo manda verificar as rodas a cada 4.000 km. A tensão dos raios, a centragem e o alinhamento são vitais para a segurança; nos primeiros 1.000 km os raios afrouxam rapidamente.',
    replacement: 'Somente se houver dano ou desgaste confirmado.',
  },
  steering: {
    frequency: 'A cada 12.000 km', kmInterval: 12000,
    description: 'Peça a verificação da folga da coluna de direção e o ajuste, se necessário. Se houver aspereza, travamento, folga ou dano após queda ou batida, a concessionária deve avaliar.',
    reason: 'Manter a direção firme e sem folga.', anticipation: 'Direção áspera, folgada ou travando; queda ou batida.',
    notes: 'No manual 2014, a coluna de direção é verificada a cada 12.000 km e lubrificada na mesma etapa. Não criamos um limite de folga em milímetros.',
    replacement: 'Não trocar automaticamente; substituir apenas se a inspeção indicar desgaste ou dano.',
  },
};

const CARGO_150_2015: Record<string, Cargo150Entry> = {
  'first-review': {
    notes: 'O certificado prevê tolerância de ±10% nas duas primeiras revisões (900 a 1.100 km e 3.600 a 4.400 km) ou o prazo de 6 e 12 meses, o que ocorrer primeiro. A tolerância não é recomendação para atrasar. A coluna de 1.000 km da tabela do manual da Cargo 2015 (páginas impressas 35 a 37) foi conferida na imagem.',
    replacement: 'Na coluna de 1.000 km a tabela marca a troca do óleo do motor e a verificação de válvulas, marcha lenta, sistema de freio, embreagem, suspensões, porcas, parafusos e fixações, rodas e coluna de direção. Corrente e pneus têm rotina própria a cada 1.000 km.',
  },
  chain: {
    notes: 'O manual manda verificar, ajustar e lubrificar a cada 1.000 km, com mais frequência sob poeira, lama, umidade, chuva, aceleração máxima ou acelerações rápidas frequentes. Não pilote se a folga passar de 50 mm. Cuidar da corrente não significa trocá-la. Para lubrificar, use lubrificante para correntes ou, se não houver, óleo de transmissão SAE 80 ou 90. O ajuste exige torquímetro (porca do eixo traseiro: 88 N·m); sem ele, procure a concessionária.',
    replacement: 'Se a corrente, a coroa e o pinhão estiverem muito gastos ou danificados, troque os três juntos, na concessionária. Corrente de reposição indicada no manual: DID 428MX-118LE ou RK 428SB-118LE.',
  },
  tires: {
    description: 'Olhe o estado dos pneus e use um medidor para conferir a pressão a cada 1.000 km ou semanalmente, sempre com os pneus frios e antes de pilotar. Pressão (só piloto): dianteiro 175 kPa (25 psi) e traseiro 200 kPa (29 psi). Procure cortes, objetos presos, desgaste diferente do normal e danos nos aros.',
    notes: 'Valores das Especificações Técnicas do manual da Cargo 2015 (página impressa 108): profundidade mínima da banda de rodagem de 1,5 mm no dianteiro e 2,0 mm no traseiro; o manual informa a pressão só para piloto, sem valor separado com carga. Não existe troca em mês ou km fixo. Se os indicadores de desgaste (TWI) estiverem visíveis, o manual manda trocar os pneus imediatamente. Após reparar um pneu, não passe de 80 km/h nas primeiras 24 horas.',
    replacement: 'Troque se o indicador de desgaste estiver visível, se chegar ao mínimo do manual ou se a lateral estiver danificada ou furada. Ao trocar o pneu, troque também a câmara de ar. A troca é feita na concessionária, com a medida e o tipo recomendados.',
  },
  throttle: {
    frequency: 'A cada 4.000 km e antes de pilotar', kmInterval: 4000,
    description: 'Com o motor desligado, confira se a manopla gira suavemente da posição totalmente aberta à totalmente fechada, em todas as posições do guidão. A folga no flange da manopla deve ser de 2–6 mm; se precisar, ajuste no ajustador do cabo e reaperte a contraporca.',
    reason: 'Manter o acelerador suave e seguro.', anticipation: 'Acelerador duro, irregular ou com cabo danificado.',
    notes: 'A tabela da Cargo manda verificar o acelerador a cada 4.000 km, além da inspeção antes do uso. Se o acelerador não funcionar suavemente ou o cabo estiver danificado, procure a concessionária.',
    replacement: 'Somente se o cabo ou a manopla estiverem danificados; não há troca por quilometragem.',
  },
  'spark-inspect': {
    kmInterval: 4000, frequency: 'A cada 4.000 km',
    description: 'Peça a verificação da vela de ignição: depósitos, erosão e carbonização. Folga do eletrodo: 0,80–0,90 mm; se necessário, ajuste dobrando com cuidado o eletrodo lateral.',
    notes: 'A tabela da Cargo 2015 separa a verificação da vela, a cada 4.000 km, da troca, a cada 8.000 km. Verificar não significa trocar.',
  },
  spark: {
    description: 'Troque a vela de ignição a cada 8.000 km. Use somente a vela NGK CPR8EA-9 (ou CPR9EA-9, opcional). Folga do eletrodo: 0,80–0,90 mm. Aperte a vela nova em duas etapas, conforme o manual.',
    notes: 'Modelo e folga da vela vêm das Especificações Técnicas do manual da Cargo 2015 (página impressa 107); o manual não informa o grau térmico à parte. Verificar e trocar são serviços diferentes. Vela solta pode danificar o pistão e vela apertada demais pode danificar a rosca.',
  },
  brakes: {
    frequency: 'A cada 4.000 km e antes de pilotar', kmInterval: 4000,
    description: 'Confira os freios dianteiro e traseiro e leve qualquer problema à concessionária. Para a máxima eficiência, acione os freios dianteiro e traseiro ao mesmo tempo. A folga do pedal do freio traseiro é de 20–30 mm, medida na ponta do pedal; ajuste a porca meia volta por vez.',
    reason: 'Manter a frenagem segura e encontrar problemas cedo.', anticipation: 'Freio mole, alavanca ou pedal com folga excessiva, ruído ou desgaste anormal.',
    notes: 'A CG 150 Cargo usa freio dianteiro a disco e traseiro a tambor, sem CBS e sem ABS. A tabela também manda verificar e lubrificar as alavancas de embreagem e de freio a cada 8.000 km; o excêntrico do freio traseiro é lubrificado sempre que as sapatas são trocadas.',
    replacement: 'Somente se a verificação indicar desgaste ou dano; não há troca automática.',
  },
  stand: {
    description: 'Verifique se o cavalete lateral se move livremente e se a mola não está danificada nem sem tensão. Se prender ou fizer ruído, limpe a articulação e lubrifique o parafuso com graxa. Confira também o apoio de borracha: troque-o se o desgaste atingir a linha de referência.',
    reason: 'Evitar que a moto tombe ou que o cavalete interfira nas curvas.', anticipation: 'Cavalete prendendo, mola frouxa ou apoio de borracha gasto.',
    notes: 'A tabela da Cargo manda verificar o cavalete lateral a cada 4.000 km. A Cargo também tem cavalete central.', replacement: 'Troque o apoio de borracha se o desgaste atingir a linha de referência; a troca é feita na concessionária.',
  },
  fasteners: {
    frequency: 'A cada 8.000 km', kmInterval: 8000,
    description: 'Peça a verificação do aperto de porcas, parafusos e fixações. Para uso comercial, o manual manda apertar essas peças com mais frequência do que o plano indica. Confira também o bagageiro: porcas dos amortecedores com 34 N·m e parafusos do bagageiro com 42 N·m.',
    reason: 'Evitar peças soltas por vibração, carga e piso irregular.', anticipation: 'Uso comercial, carga, pistas irregulares e vibrações podem afrouxar fixações antes do prazo.',
    notes: 'A tabela da Cargo manda verificar porcas, parafusos e fixações a cada 8.000 km. Na mesma frequência ela lista os parafusos do suporte do motor e do pedal de apoio (verificar o aperto), os amortecedores e coxins (verificar) e os eixos das rodas (verificar e lubrificar). O bagageiro original suporta no máximo 20 kg, e o limite de piloto mais carga é 150 kg.',
    replacement: 'Reaperte ou substitua somente o que estiver solto, folgado ou danificado.',
  },
  wheels: {
    frequency: 'A cada 4.000 km; alinhamento, rolamentos, cubos, raios e nipples a cada 8.000 km', kmInterval: 4000,
    description: 'Verifique rodas e aros: cortes, entalhes ou deformações nos aros, raios frouxos e folgas. A cada 8.000 km, a tabela também manda verificar o alinhamento das rodas, os rolamentos, os cubos, os raios e os nipples.',
    reason: 'Manter as rodas alinhadas e seguras.', anticipation: 'Raios frouxos, aro empenado, vibração ou instabilidade.',
    notes: 'A tabela da Cargo manda verificar as rodas a cada 4.000 km. Se não tiver ferramentas e habilidade mecânica, procure a concessionária.',
    replacement: 'Somente se houver dano ou desgaste confirmado.',
  },
  steering: {
    frequency: 'A cada 4.000 km', kmInterval: 4000,
    description: 'Peça a verificação da folga da coluna de direção e o ajuste, se necessário. Se houver aspereza, travamento, folga ou dano após queda ou batida, a concessionária deve avaliar.',
    reason: 'Manter a direção firme e sem folga.', anticipation: 'Direção áspera, folgada ou travando; queda ou batida.',
    notes: 'A tabela da Cargo manda verificar a folga da coluna de direção e ajustar, se necessário, a cada 4.000 km. A lubrificação é outra linha, a cada 12.000 km. Não criamos um limite de folga em milímetros.',
    replacement: 'Não trocar automaticamente; substituir apenas se a inspeção indicar desgaste ou dano.',
  },
  slider: {
    frequency: 'A cada 4.000 km', kmInterval: 4000,
    description: 'Peça a verificação do desgaste do deslizador e da guia da corrente de transmissão. Se for necessária a substituição, procure a concessionária.',
    reason: 'Encontrar o desgaste dessas peças antes de passar do limite.', anticipation: 'Uso fora do asfalto, ruído da corrente ou sinais de desgaste.',
    notes: 'A tabela da Cargo manda verificar o desgaste da guia da corrente a cada 4.000 km. Não trocar todo o conjunto só por chegar a 4.000 km.', replacement: 'Troque somente se a verificação mostrar desgaste além do limite.',
  },
  'fork-oil': {
    frequency: 'A cada 16.000 km', kmInterval: 16000,
    description: 'Troque o fluido da suspensão dianteira (bengalas) a cada 16.000 km, ou antes sob muita poeira, lama ou umidade. Use fluido para suspensão e peça o serviço na concessionária; o serviço deve ser feito com conhecimento mecânico. Capacidade: 139,0 ± 2,5 cm³.',
    reason: 'Manter o funcionamento adequado da suspensão dianteira.', anticipation: 'Vazamento, dano, funcionamento anormal ou muita poeira, lama ou umidade.',
    notes: 'Intervalo da tabela da Cargo 2015: 16.000 km. Não confundir com a simples verificação das suspensões, a cada 4.000 km.', replacement: 'Troque o fluido no intervalo; não há troca de peças por quilometragem.',
  },
  'rear-suspension-lube': {
    frequency: 'A cada 16.000 km', kmInterval: 16000,
    description: 'Peça a verificação e a lubrificação do eixo e das buchas do braço oscilante (garfo traseiro, no manual), no intervalo da tabela, ou antes sob muita poeira, lama ou umidade. É um serviço de manutenção, não uma troca automática do amortecedor.',
    reason: 'Manter o movimento das articulações e reduzir desgaste.', anticipation: 'Folga, ruído, travamento ou dano identificado antes do intervalo.',
    notes: 'Intervalo da tabela da Cargo 2015: 16.000 km. A tabela não manda trocar o amortecedor inteiro por quilometragem.', replacement: 'Somente peças com desgaste ou dano confirmado.',
  },
  lockset: {
    frequency: 'A cada 8.000 km', kmInterval: 8000,
    description: 'Verifique o funcionamento das travas (ignição, direção e tampa do tanque) e lubrifique, se necessário, na concessionária. A tabela manda fazer o serviço com mais frequência sob muita poeira, lama ou umidade.',
    reason: 'Manter fechaduras e travas funcionando corretamente.', anticipation: 'Chave difícil de girar, trava presa ou funcionamento irregular.',
    notes: 'A tabela da Cargo 2015 inclui o conjunto de travas a cada 8.000 km.', replacement: 'Somente peças com dano ou falha confirmado.',
  },
};

// CG 150 Start 2015: mesma família de tabela da Cargo 150 (intervalos idênticos no texto do manual), mas com freios a tambor,
// sem fluido de freio e com passageiro. Parte dos textos da Cargo 150 é reaproveitada e o que muda é reescrito abaixo.
const START_150_IDS_2015 = CARGO_150_IDS_2015.filter(id => id !== 'brake-level' && id !== 'brake-fluid');
const startWords = (text?: string): string | undefined => text === undefined ? text : text
  .replace(/A Cargo 150/g, 'A CG 150 Start').replace(/A CG 150 Cargo/g, 'A CG 150 Start').replace(/CG 150 Cargo/g, 'CG 150 Start')
  .replace(/da Cargo 2015/g, 'da Start 2015').replace(/da Cargo/g, 'da Start').replace(/A Cargo também tem cavalete central\./g, '')
  .replace(/Com a moto no cavalete central/g, 'Com a moto na vertical').replace(/no cavalete central/g, 'no cavalete lateral');
const START_150_OVERRIDES: Record<string, Cargo150Entry> = {
  'first-review': {
    notes: 'O certificado prevê tolerância de ±10% nas duas primeiras revisões (900 a 1.100 km e 3.600 a 4.400 km) ou o prazo de 6 e 12 meses, o que ocorrer primeiro. A tolerância não é recomendação para atrasar. As marcações da coluna de 1.000 km da tabela do manual da Start 2015 não foram conferidas na imagem; confira no manual da sua moto.',
    replacement: 'Confira as marcações da coluna de 1.000 km no manual da sua moto antes de decidir quais trocas fazem parte dessa revisão.',
  },
  chain: {
    replacement: 'Se a corrente, a coroa e o pinhão estiverem muito gastos ou danificados, troque os três juntos, na concessionária. Corrente de reposição indicada no manual: DID 428MX ou RK 428SB.',
  },
  tires: {
    description: 'Olhe o estado dos pneus e use um medidor para conferir a pressão a cada 1.000 km ou semanalmente, sempre com os pneus frios e antes de pilotar. A pressão recomendada e a profundidade mínima da banda de rodagem estão nas Especificações Técnicas do manual da Start 2015 (página 108). Procure cortes, objetos presos, desgaste diferente do normal e danos nos aros.',
    notes: 'Este plano não copia valores de pressão ou de profundidade mínima de outro modelo: confira na página 108 do manual da Start 2015. Não existe troca em mês ou km fixo. Se os indicadores de desgaste (TWI) estiverem visíveis, o manual manda trocar os pneus imediatamente. Após reparar um pneu, não passe de 80 km/h nas primeiras 24 horas.',
  },
  throttle: {
    description: 'Com o motor desligado, confira se a manopla gira suavemente da posição totalmente aberta à totalmente fechada, em todas as posições do guidão. A folga no flange da manopla deve ser de 2–5 mm; se precisar, ajuste no ajustador do cabo e reaperte a contraporca.',
  },
  'spark-inspect': {
    notes: 'A tabela da Start 2015 separa a verificação da vela, a cada 4.000 km, da troca, a cada 8.000 km. Verificar não significa trocar.',
  },
  spark: {
    description: 'Troque a vela de ignição a cada 8.000 km. Use somente a vela recomendada, no grau térmico correto (veja Especificações Técnicas, página 107 do manual). Folga do eletrodo: 0,80–0,90 mm. Aperte a vela nova em duas etapas, conforme o manual.',
    notes: 'A folga vem do procedimento do manual (página 56); o modelo da vela fica nas Especificações Técnicas, que não foram lidas aqui. Verificar e trocar são serviços diferentes. Vela solta pode danificar o pistão e vela apertada demais pode danificar a rosca.',
  },
  brakes: {
    frequency: 'A cada 4.000 km e antes de pilotar', kmInterval: 4000,
    description: 'Confira os freios dianteiro e traseiro e leve qualquer problema à concessionária. Para a máxima eficiência, acione os freios dianteiro e traseiro ao mesmo tempo. A folga da alavanca do freio dianteiro é de 10–20 mm e a do pedal do freio traseiro, de 20–30 mm, medida na ponta do pedal; ajuste a porca meia volta por vez.',
    reason: 'Manter a frenagem segura e encontrar problemas cedo.', anticipation: 'Freio mole, alavanca ou pedal com folga excessiva, ruído ou desgaste anormal.',
    notes: 'A CG 150 Start usa freio a tambor, com cabo na frente e vareta atrás. O manual manda fazer os serviços dos freios na concessionária, com peças genuínas Honda. A tabela também manda verificar e lubrificar as alavancas de freio e de embreagem a cada 8.000 km; o excêntrico do freio é lubrificado sempre que as sapatas são trocadas.',
    replacement: 'Somente se a verificação indicar desgaste ou dano; não há troca automática.',
  },
  pads: {
    frequency: 'A cada 4.000 km e antes de pilotar', kmInterval: 4000,
    description: 'Verifique o desgaste das sapatas dos freios dianteiro e traseiro. Com o freio totalmente acionado, se a seta do braço do freio ficar alinhada com a marca de referência no flange, procure a concessionária para trocar as sapatas.',
    reason: 'Encontrar o desgaste das sapatas antes de passar do limite.', anticipation: 'Uso pesado, poeira, lama ou umidade, alavanca ou pedal com folga excessiva ou freio perdendo eficiência.',
    notes: 'As sapatas não têm quilometragem fixa de troca: o desgaste depende do uso, do modo de pilotar e da pista. A tabela da Start 2015 manda verificar o desgaste a cada 4.000 km.',
    replacement: 'Troque as sapatas quando a seta alinhar com a marca de referência; ao trocar, peça também a lubrificação do excêntrico do freio.',
  },
  stand: {
    notes: 'A tabela da Start 2015 manda verificar o cavalete lateral a cada 4.000 km.',
  },
  fasteners: {
    description: 'Peça a verificação do aperto de porcas, parafusos e fixações. Para uso comercial, o manual manda apertar essas peças com mais frequência do que o plano indica. Se instalar bagageiro, confira também: porcas dos amortecedores com 34 N·m e parafusos das alças traseiras com 42 N·m.',
    notes: 'A tabela da Start 2015 manda verificar porcas, parafusos e fixações a cada 8.000 km. Na mesma frequência ela lista os parafusos do suporte do motor e do pedal de apoio (verificar o aperto), os amortecedores e coxins (verificar) e os eixos das rodas (verificar e lubrificar). A capacidade máxima de carga é de 161 kg (piloto, passageiro, bagagem e acessórios).',
  },
};
const START_150_2015: Record<string, Cargo150Entry> = Object.fromEntries(START_150_IDS_2015.map(id => {
  const merged: Cargo150Entry = { ...(CARGO_150_COMMON[id] ?? {}), ...(CARGO_150_2015[id] ?? {}) };
  const converted = Object.fromEntries(Object.entries(merged).map(([key, value]) => [key, typeof value === 'string' ? startWords(value) : value])) as Cargo150Entry;
  return [id, { ...converted, ...(START_150_OVERRIDES[id] ?? {}) }];
}));

// CG 160 Start 2022: tabela do manual D2203-MAN-1261 (ciclo de 6.000 km), com freios a tambor e CBS, sem fluido de freio.
const START_160_IDS_2022 = ['delivery', 'break-in', 'first-review', 'chain', 'tires', 'oil-level', 'oil', 'fuel-line', 'throttle', 'air', 'drain', 'spark-inspect', 'spark', 'valves', 'oil-screen', 'centrifugal', 'idle', 'exhaust', 'slider', 'brakes', 'pads', 'brake-switch', 'headlight', 'clutch', 'stand', 'suspension', 'fasteners', 'wheels', 'steering', 'steering-lube', 'fork-oil', 'rear-suspension-lube', 'lockset'];
const START_160_2022_PAGES: Record<string, [number, string]> = {
  oil: [52, 'Troca do óleo'], 'oil-level': [51, 'Nível do óleo'], chain: [59, 'Corrente de transmissão'], tires: [43, 'Pneus'], air: [45, 'Filtro de ar'],
  drain: [65, 'Dreno do filtro de ar'], spark: [65, 'Vela de ignição'], 'spark-inspect': [65, 'Vela de ignição'], valves: [67, 'Folga das válvulas'], throttle: [64, 'Acelerador'],
  brakes: [53, 'Freios'], pads: [57, 'Sapatas do freio'], clutch: [62, 'Embreagem'], stand: [58, 'Cavalete lateral'], 'brake-switch': [68, 'Interruptor da luz do freio'],
  headlight: [69, 'Facho do farol'], wheels: [73, 'Rodas'], suspension: [67, 'Suspensão dianteira'], 'break-in': [19, 'Amaciamento'],
};
const START_160_2022: Record<string, Partial<Service>> = {
  'first-review': {
    notes: 'O certificado prevê tolerância de ±10% nas duas primeiras revisões (900 a 1.100 km e 5.400 a 6.600 km) ou o prazo de 6 e 12 meses, o que ocorrer primeiro; a mão de obra dessas duas revisões é gratuita na concessionária Honda. A tolerância não é recomendação para atrasar. As marcações da coluna de 1.000 km da tabela não aparecem no texto do PDF e não foram conferidas na imagem: confira no manual da sua moto.',
    replacement: 'Confira as marcações da coluna de 1.000 km no manual da sua moto antes de decidir quais trocas fazem parte dessa revisão.',
  },
  chain: {
    frequency: 'A cada 1.000 km; verificar, ajustar e lubrificar', kmInterval: 1000,
    description: 'Verifique a folga da corrente em vários pontos, na parte central inferior, entre a coroa e o pinhão: o normal é 15–25 mm e, acima de 50 mm, não pilote. Limpe com pano seco e solvente não inflamável e lubrifique com o lubrificante indicado (Pro Honda SAE 90 ou óleo de transmissão SAE 80/90). Nunca lubrifique sapatas e pneus.',
    notes: 'A tabela da Start 2022 manda verificar, ajustar e lubrificar a corrente a cada 1.000 km (com mais frequência na chuva, em aceleração forte ou muita poeira). O ajuste exige ferramentas especiais: procure a concessionária. Ao ajustar, o torque da porca do eixo traseiro é 88 N·m e a folga do pedal do freio traseiro muda e precisa ser conferida de novo.',
    replacement: 'Se a corrente, a coroa e o pinhão estiverem gastos ou danificados, troque os três juntos, na concessionária. Corrente de reposição indicada no manual: DID 428DH ou RK 428HSB.',
  },
  tires: {
    frequency: 'A cada 1.000 km ou semanalmente; também antes do uso', kmInterval: 1000,
    description: 'Olhe o estado dos pneus e use um medidor para conferir a pressão a cada 1.000 km ou semanalmente, sempre com os pneus frios e antes de pilotar. A pressão recomendada e os pneus indicados estão nas Especificações Técnicas do manual da Start 2022 (página 104). Procure cortes, objetos presos, desgaste diferente do normal e danos nos aros.',
    notes: 'Este plano não copia valores de pressão ou de profundidade mínima de outro modelo: confira na página 104 do manual. Se os indicadores de desgaste (TWI) estiverem visíveis, o manual manda trocar os pneus. A Start usa câmara de ar: troque a câmara sempre que trocar o pneu. Após reparar um pneu, não passe de 80 km/h nas primeiras 24 horas.',
  },
  'oil-level': { frequency: 'Todos os dias, antes de pilotar', notes: 'O manual manda verificar o nível do óleo diariamente, antes de pilotar, com a moto na vertical, em piso plano e firme, e completar com o óleo recomendado se necessário.' },
  oil: {
    frequency: 'A cada 6.000 km ou uma vez por ano, o que ocorrer primeiro', kmInterval: 6000, timeMonths: 12,
    description: 'Troque o óleo do motor a cada 6.000 km ou uma vez por ano, o que ocorrer primeiro. Óleo recomendado: SAE 10W-30 SL ou superior, JASO MA (Pro Honda). Capacidade na troca: 1,0 litro. Use arruela de vedação nova no parafuso de drenagem, com torque de 30 N·m. O manual recomenda fazer a troca na concessionária.',
    notes: 'Nota 6 da tabela: trocar uma vez por ano ou no intervalo indicado, o que ocorrer primeiro; sob uso severo (poeira, lama, umidade), com mais frequência.',
  },
  throttle: {
    description: 'Com o motor desligado, confira se a manopla gira suavemente da posição totalmente aberta à totalmente fechada, em todas as posições do guidão. A folga no flange da manopla deve ser de 2–5 mm. Se o acelerador não funcionar suavemente, não fechar sozinho ou o cabo estiver danificado, procure a concessionária.',
  },
  air: {
    frequency: 'A cada 18.000 km', kmInterval: 18000,
    description: 'A Start usa filtro de ar úmido (tipo viscoso). Nunca limpe nem aplique jato de ar: isso danifica o filtro. A única manutenção é a troca, que o manual manda fazer na concessionária.',
    notes: 'A tabela da Start 2022 manda trocar o filtro de ar a cada 18.000 km (mais cedo sob poeira, lama ou umidade).',
  },
  drain: { frequency: 'A cada 6.000 km; antes se o tubo mostrar depósito', kmInterval: 6000, notes: 'Drene com mais frequência sob chuva ou aceleração máxima e após lavar a moto ou depois de uma queda. Se o tubo transbordar, o filtro de ar pode se contaminar com óleo.' },
  'spark-inspect': { frequency: 'Verificar a cada 12.000 km', notes: 'Na tabela da Start 2022, verificar e trocar a vela caem no mesmo intervalo, 12.000 km. Verificar é inspecionar eletrodos e porcelana (depósitos, erosão, carbonização) e medir a folga.' },
  spark: {
    frequency: 'A cada 12.000 km', kmInterval: 12000,
    description: 'Troque a vela de ignição a cada 12.000 km. Use somente a vela recomendada, no grau térmico correto (veja Especificações Técnicas, página 103 do manual). Folga do eletrodo: 0,80–0,90 mm. Vela usada em bom estado: aperte 1/8 de volta após assentar. Vela nova: 1/2 volta, solte, e depois 1/8 de volta.',
    notes: 'O modelo da vela fica nas Especificações Técnicas, que não foram copiadas aqui. Vela solta pode danificar o pistão e vela apertada demais pode danificar a rosca.',
  },
  valves: { description: 'Peça a verificação e, se necessário, o ajuste da folga das válvulas, que exige ferramenta de medição. Folga excessiva causa ruído; ausência de folga pode danificar as válvulas ou reduzir a potência.' },
  brakes: {
    frequency: 'A cada 6.000 km e antes de pilotar', kmInterval: 6000,
    description: 'A Start 2022 tem freio a tambor na frente e atrás, com CBS: quando o pedal traseiro é acionado com mais intensidade, ele também aciona o freio dianteiro, depois do traseiro; a alavanca dianteira aciona só a roda da frente. Folga da alavanca: 10–20 mm; folga na ponta do pedal: 20–30 mm. Ajuste meia volta por vez, primeiro o freio dianteiro e depois o traseiro.',
    reason: 'Manter a frenagem segura e encontrar problemas cedo.', anticipation: 'Freio mole, alavanca ou pedal com folga excessiva, ruído ou desgaste anormal.',
    notes: 'O manual manda fazer qualquer manutenção do sistema de freio na concessionária Honda. A tabela também manda lubrificar a articulação do manete e do pedal a cada 24.000 km; o excêntrico do painel do freio traseiro é lubrificado sempre que as sapatas são trocadas. Não há fluido de freio: o sistema é mecânico, por cabos e vareta.',
    replacement: 'Somente se a verificação indicar desgaste ou dano; não há troca automática.',
  },
  pads: {
    component: 'Sapatas do freio', manualName: 'Sapatas de freio', service: 'Verificar o desgaste das sapatas',
    frequency: 'A cada 6.000 km e antes de pilotar', kmInterval: 6000,
    description: 'Verifique o desgaste das sapatas dos freios dianteiro e traseiro. Com o freio totalmente acionado, se a seta do braço do freio ficar alinhada com a marca de referência, procure a concessionária para trocar as sapatas.',
    reason: 'Encontrar o desgaste das sapatas antes de passar do limite.', anticipation: 'Uso pesado, poeira, lama ou umidade, alavanca ou pedal com folga excessiva ou freio perdendo eficiência.',
    notes: 'As sapatas não têm quilometragem fixa de troca: o desgaste depende do uso e da pista. A tabela da Start 2022 manda verificar o desgaste a cada 6.000 km.',
    replacement: 'Troque as sapatas quando a seta alinhar com a marca de referência; ao trocar, peça também a lubrificação do excêntrico do freio.',
  },
  clutch: { description: 'Confira o funcionamento da embreagem e a folga da alavanca: 10–20 mm. Ajuste primeiro no ajustador superior do cabo e, se não bastar, no ajustador inferior. Procure dobras ou desgaste no cabo.', notes: 'A tabela da Start 2022 manda verificar a embreagem a cada 6.000 km e verificar/lubrificar as alavancas de freio e de embreagem a cada 12.000 km.' },
  stand: { notes: 'A tabela da Start 2022 manda verificar o cavalete lateral a cada 6.000 km. A Start tem só cavalete lateral. Verifique também o apoio de borracha: troque se o desgaste chegar à linha de referência.' },
  suspension: { notes: 'A tabela da Start 2022 manda verificar as suspensões dianteira e traseira a cada 6.000 km. Não confundir com a troca do fluido da suspensão dianteira, a cada 24.000 km.' },
  fasteners: {
    description: 'Peça a verificação do aperto de porcas, parafusos e fixações. Para uso comercial, o manual manda apertar essas peças com mais frequência do que a tabela indica. Se instalar bagageiro, confira também: porcas dos amortecedores com 34 N·m e parafusos das alças traseiras com 42 N·m.',
    notes: 'A tabela da Start 2022 manda verificar porcas, parafusos e fixações a cada 12.000 km. Na mesma frequência ela lista os parafusos do suporte do motor e do pedal de apoio, os amortecedores e coxins, os eixos das rodas (verificar e lubrificar) e o conjunto das travas. A capacidade máxima de carga é de 161 kg (piloto, passageiro, bagagem e acessórios).',
  },
  wheels: { description: 'Verifique rodas e aros: cortes, entalhes ou deformações nos aros, raios frouxos e folgas. A cada 12.000 km, a tabela também manda verificar o alinhamento, os rolamentos e os cubos das rodas.', notes: 'A tabela da Start 2022 manda verificar as rodas a cada 6.000 km (rodas de raios). Se não tiver ferramentas e habilidade mecânica, procure a concessionária.' },
  steering: { frequency: 'A cada 6.000 km', kmInterval: 6000, timeMonths: undefined, notes: 'A tabela da Start 2022 manda verificar a folga da coluna de direção e ajustar, se necessário, a cada 6.000 km. A lubrificação é outra linha, a cada 18.000 km. Não criamos um limite de folga em milímetros.' },
  'steering-lube': { frequency: 'A cada 18.000 km', kmInterval: 18000, description: 'Peça a lubrificação dos rolamentos da coluna de direção na concessionária. O ajuste da folga é outro serviço, previsto a cada 6.000 km.', notes: 'Intervalo da tabela da Start 2022: 18.000 km.' },
  'fork-oil': { frequency: 'A cada 24.000 km', kmInterval: 24000, description: 'Troque o fluido da suspensão dianteira (bengalas) a cada 24.000 km, ou antes sob muita poeira, lama ou umidade. O serviço deve ser feito na concessionária, com conhecimento mecânico.', notes: 'Intervalo da tabela da Start 2022: 24.000 km. A capacidade de fluido fica fora do que foi lido aqui: confira no manual.' },
  'rear-suspension-lube': { frequency: 'A cada 24.000 km', kmInterval: 24000, description: 'Peça a lubrificação de buchas, rolamentos e eixo da suspensão traseira. É um serviço de manutenção, não uma troca automática do amortecedor.', notes: 'Intervalo da tabela da Start 2022: 24.000 km. A tabela não manda trocar o amortecedor por quilometragem.' },
  lockset: { frequency: 'A cada 12.000 km', kmInterval: 12000, notes: 'A tabela da Start 2022 inclui o conjunto das travas a cada 12.000 km.' },
  'oil-screen': { notes: 'A tabela da Start 2022 manda limpar a tela do filtro de óleo a cada 12.000 km.' },
  centrifugal: { notes: 'A tabela da Start 2022 manda limpar o filtro centrífugo de óleo a cada 12.000 km.' },
};

// Remove chaves undefined para que o spread não apague valores do serviço base.
const definedOnly = <T extends object>(value: T): T => Object.fromEntries(Object.entries(value).filter(([, v]) => v !== undefined)) as T;

export function getServiceForModel(id: string, year: ModelYear, variant: Variant = 'ESDD'): Service {
  const base = SERVICES.find(item => item.id === id) ?? LEGACY_EXTRA_SERVICES.find(item => item.id === id);
  if (!base) throw new Error(`Unknown maintenance service: ${id}`);
  if (year === 'FAN-2013') {
    const override = { ...FAN_SERVICE_OVERRIDES[id] };
    const legacyOverrides: Partial<Service> = definedOnly({
      frequency: id === 'brake-fluid' ? 'Verificar o nível a cada 4.000 km; substituir a cada 2 anos' : id === 'chain' ? 'A cada 1.000 km; verificar antes de pilotar' : id === 'tires' ? 'A cada 1.000 km ou semanalmente; também antes do uso' : id === 'fasteners' ? 'A cada 8.000 km' : id === 'oil-screen' || id === 'centrifugal' || id === 'fuel-filter' ? 'A cada 12.000 km' : id === 'air' ? 'A cada 16.000 km' : ['fuel-line','throttle','spark-inspect','spark','valves','oil','idle','exhaust','brake-level','pads','brakes','brake-switch','headlight','clutch','stand','suspension','wheels'].includes(id) ? 'A cada 4.000 km' : id === 'steering' || id === 'steering-lube' ? 'A cada 12.000 km' : override.frequency,
      kmInterval: id === 'brake-fluid' ? 4000 : id === 'chain' || id === 'tires' ? 1000 : id === 'fasteners' ? 8000 : id === 'oil-screen' || id === 'centrifugal' || id === 'fuel-filter' ? 12000 : id === 'air' ? 16000 : ['fuel-line','throttle','spark-inspect','spark','valves','oil','idle','exhaust','brake-level','pads','brakes','brake-switch','headlight','clutch','stand','suspension','wheels'].includes(id) ? 4000 : id === 'steering' || id === 'steering-lube' ? 12000 : override.kmInterval,
    });
    if (id === 'first-review') return { ...base, ...override, frequency: '1.000 km ou 6 meses; segunda revisão em 4.000 km ou 12 meses', kmInterval: 1000, refs: [FAN_2013_REFERENCE], pending: false, notes: 'O Manual CG150 Fan ESi/ESDi 2013 traz a primeira revisão em 1.000 km ou 6 meses e a segunda em 4.000 km ou 12 meses.' };
    if (id === 'chain') return { ...base, ...override, ...legacyOverrides, refs: [FAN_2013_REFERENCE], notes: 'O manual 2013 determina verificar, ajustar e lubrificar a corrente a cada 1.000 km.' };
    if (id === 'tires') return { ...base, ...override, ...legacyOverrides, refs: [FAN_2013_REFERENCE], notes: 'O manual 2013 determina verificar e calibrar os pneus a cada 1.000 km ou semanalmente, além da verificação antes de pilotar.' };
    if (id === 'brakes') return { ...base, ...override, ...legacyOverrides, refs: [FAN_2013_REFERENCE], component: 'Sistema de freios dianteiro e traseiro', service: 'Verificar o freio dianteiro a disco e o freio traseiro a tambor', notes: 'A CG150 Fan ESDi 2013 usa freio dianteiro a disco com circuito hidráulico e freio traseiro a tambor. Não tratar como CBS ou ABS.' };
    if (id === 'brake-level') return { ...base, ...override, ...legacyOverrides, refs: [FAN_2013_REFERENCE], component: 'Fluido do freio dianteiro', service: 'Verificar o nível do fluido do freio dianteiro', notes: 'Na ESDi, o manual orienta verificar o nível do fluido do freio dianteiro; o freio traseiro é a tambor.' };
    if (id === 'brake-fluid') return { ...base, ...override, ...legacyOverrides, refs: [FAN_2013_REFERENCE], frequency: 'Verificar o nível a cada 4.000 km; substituir a cada 2 anos', kmInterval: 4000, timeMonths: 24, notes: 'O manual 2013 orienta a verificação do nível do fluido a cada 4.000 km e a substituição do fluido a cada 2 anos.' };
    if (id === 'spark') return { ...base, ...override, ...legacyOverrides, refs: [FAN_2013_REFERENCE], frequency: 'Verificar a cada 4.000 km; substituir a cada 8.000 km', kmInterval: 4000, notes: 'A tabela 2013 separa a verificação da vela em 4.000 km da substituição em 8.000 km.' };
    if (id === 'air') return { ...base, ...override, ...legacyOverrides, refs: [FAN_2013_REFERENCE], frequency: 'A cada 16.000 km', kmInterval: 16000, notes: 'A tabela 2013 prevê substituição do filtro de ar a cada 16.000 km.' };
    if (id === 'oil') return { ...base, ...override, ...legacyOverrides, refs: [FAN_2013_REFERENCE], frequency: 'A cada 4.000 km', kmInterval: 4000, timeMonths: undefined, notes: 'A tabela de manutenção 2013 prevê troca do óleo do motor a cada 4.000 km, conforme as notas do manual.' };
    if (id === 'fuel-filter' || id === 'oil-screen' || id === 'centrifugal') return { ...base, ...override, ...legacyOverrides, refs: [FAN_2013_REFERENCE] };
    return { ...base, ...override, ...legacyOverrides, refs: [FAN_2013_REFERENCE] };
  }
  if (year === 'FAN-2014') {
    const override = { ...FAN_SERVICE_OVERRIDES[id] };
    const legacyOverrides: Partial<Service> = definedOnly({
      frequency: id === 'brake-fluid' ? 'A cada 2 anos' : id === 'chain' ? 'A cada 1.000 km; verificar antes de pilotar' : id === 'tires' ? 'A cada 1.000 km ou semanalmente; também antes do uso' : id === 'fasteners' ? 'A cada 8.000 km' : id === 'oil-screen' || id === 'centrifugal' ? 'A cada 12.000 km' : id === 'air' || id === 'fuel-filter' || id === 'spark' || id === 'valves' || id === 'oil' || id === 'fuel-line' || id === 'throttle' || id === 'crankcase-breather' || id === 'idle' || id === 'exhaust' || id === 'brake-level' || id === 'pads' || id === 'brakes' || id === 'brake-switch' || id === 'headlight' || id === 'clutch' || id === 'stand' || id === 'suspension' || id === 'wheels' ? 'A cada 4.000 km' : override.frequency,
      kmInterval: id === 'brake-fluid' ? undefined : id === 'chain' || id === 'tires' ? 1000 : id === 'fasteners' ? 8000 : id === 'oil-screen' || id === 'centrifugal' || id === 'air' || id === 'fuel-filter' ? (id === 'air' ? 12000 : 12000) : ['fuel-line','throttle','crankcase-breather','spark','valves','oil','idle','exhaust','brake-level','pads','brakes','brake-switch','headlight','clutch','stand','suspension','wheels'].includes(id) ? 4000 : override.kmInterval,
    });
    if (id === 'first-review') return { ...base, ...override, frequency: '1.000 km ou 6 meses; segunda revisão em 4.000 km ou 12 meses', kmInterval: 1000, refs: [FAN_2014_REFERENCE], notes: 'O Manual CG 150 Fan ESDi 2014 prevê as primeiras revisões em 1.000 km e 4.000 km, com os prazos de 6 e 12 meses.' };
    if (id === 'chain') return { ...base, ...override, ...legacyOverrides, refs: [FAN_2014_REFERENCE], notes: 'O manual 2014 determina verificar, ajustar e lubrificar a corrente a cada 1.000 km.' };
    if (id === 'tires') return { ...base, ...override, ...legacyOverrides, refs: [FAN_2014_REFERENCE], notes: 'O manual 2014 determina verificar e calibrar os pneus a cada 1.000 km ou semanalmente, além da verificação antes de pilotar.' };
    if (id === 'brakes') return { ...base, ...override, ...legacyOverrides, refs: [FAN_2014_REFERENCE], notes: 'A CG 150 Fan ESDi 2014 usa freio dianteiro a disco e freio traseiro a tambor. Não tratar como CBS ou ABS.' };
    if (id === 'brake-fluid') return { ...base, ...override, refs: [FAN_2014_REFERENCE], frequency: 'Verificar nível a cada 4.000 km; substituir a cada 2 anos', kmInterval: 4000, timeMonths: 24, notes: 'Para a ESDi, o manual prevê verificação do nível do fluido a cada 4.000 km e substituição a cada 2 anos.' };
    if (id === 'spark') return { ...base, ...legacyOverrides, refs: [FAN_2014_REFERENCE], frequency: 'Verificar a cada 4.000 km; substituir a cada 8.000 km', kmInterval: 4000, notes: 'O manual 2014 separa a inspeção da vela (4.000 km) da substituição (8.000 km).' };
    if (id === 'air') return { ...base, ...legacyOverrides, refs: [FAN_2014_REFERENCE], frequency: 'A cada 12.000 km', kmInterval: 12000, notes: 'O manual 2014 prevê a troca do filtro de ar úmido (tipo viscoso) a cada 12.000 km.' };
    if (id === 'fuel-filter' || id === 'oil-screen' || id === 'centrifugal') return { ...base, ...legacyOverrides, refs: [FAN_2014_REFERENCE] };
    return { ...base, ...legacyOverrides, refs: [FAN_2014_REFERENCE] };
  }
  if (year === 'FAN-2015') {
    const override = { ...FAN_SERVICE_OVERRIDES[id] };
    if (id === 'chain') return { ...base, ...override, frequency: 'A cada 1.000 km; verificar condição e folga antes do uso', kmInterval: 1000, refs: [FAN_2015_REFERENCE], notes: 'A referência técnica de agosto de 2015 para a CG160 Fan ESDi prevê manutenção programada da corrente; confira condição e folga antes de pilotar.' };
    if (id === 'first-review') return { ...base, ...override, frequency: '1.000 km ou 6 meses da entrega, o que ocorrer primeiro', kmInterval: 1000, refs: [FAN_2015_REFERENCE], notes: 'A CG 160 Fan introduzida em 2015 como linha 2016 usa o calendário inicial de 1.000 km ou 6 meses; confirme os marcos seguintes no manual Honda.' };
    if (id === 'tires') return { ...base, ...override, frequency: 'A cada 1.000 km ou semanalmente; também antes do uso', kmInterval: 1000, refs: [FAN_2015_REFERENCE], notes: 'Verifique e calibre os pneus a cada 1.000 km ou semanalmente, além da verificação antes de pilotar.' };
    if (id === 'brakes') return { ...base, ...override, refs: [FAN_2015_REFERENCE], notes: 'A CG 160 Fan ESDi usa disco dianteiro com acionamento hidráulico e tambor traseiro. Não tratar como CBS/ABS.' };
    if (id === 'brake-fluid') return { ...base, ...override, refs: [FAN_2015_REFERENCE], notes: 'Há circuito hidráulico no freio dianteiro. O fluido deve ser acompanhado conforme o prazo da referência técnica.' };
    return { ...base, ...override, refs: [FAN_2015_REFERENCE] };
  }
  if (year === 'FAN-2016') {
    const override = { ...FAN_SERVICE_OVERRIDES[id] };
    if (id === 'chain') return { ...base, ...override, frequency: 'A cada 1.000 km; verificar condição e folga antes do uso', kmInterval: 1000, refs: [FAN_2016_REFERENCE], notes: 'O Manual CG 160 Fan/Titan 2016 prevê a manutenção da corrente a cada 1.000 km. Confira condição e folga antes de pilotar.' };
    if (id === 'first-review') return { ...base, ...override, frequency: '1.000 km ou 6 meses da entrega, o que ocorrer primeiro', kmInterval: 1000, refs: [FAN_2016_REFERENCE], notes: 'No Manual CG 160 Fan/Titan 2016, a 1ª revisão ocorre em 1.000 km ou 6 meses; a 2ª em 6.000 km ou 12 meses.' };
    if (id === 'tires') return { ...base, ...override, frequency: 'A cada 1.000 km ou semanalmente; também antes do uso', kmInterval: 1000, refs: [FAN_2016_REFERENCE], notes: 'O manual 2016 orienta verificar e calibrar os pneus a cada 1.000 km ou semanalmente, além da verificação antes de pilotar.' };
    if (id === 'brakes') return { ...base, ...override, refs: [FAN_2016_REFERENCE], notes: 'A CG 160 Fan ESDi 2016 usa disco dianteiro de 240 mm e tambor traseiro de 130 mm. O CBS era exclusivo da CG 160 Titan EX.' };
    return { ...base, ...override, refs: [FAN_2016_REFERENCE] };
  }
  if (year === 'FAN-2017') {
    const override = { ...FAN_SERVICE_OVERRIDES[id] };
    if (id === 'chain') return { ...base, ...override, frequency: 'A cada 1.000 km; verificar condição e folga antes do uso', kmInterval: 1000, refs: [FAN_2017_REFERENCE], notes: 'O Manual CG 160 Fan/Titan 2017 prevê a manutenção da corrente a cada 1.000 km. Confira condição e folga antes de pilotar.' };
    if (id === 'first-review') return { ...base, ...override, refs: [FAN_2017_REFERENCE], notes: 'Para 2017, a tabela do Manual CG 160 Fan/Titan D2203-MAN-1082 usa a coluna de 1.000 km para a revisão inicial; o calendário seguinte segue as marcações do manual.' };
    if (id === 'tires') return { ...base, ...override, frequency: 'A cada 1.000 km ou semanalmente; também antes do uso', kmInterval: 1000, refs: [FAN_2017_REFERENCE], notes: 'O manual 2017 determina verificar e calibrar os pneus a cada 1.000 km ou semanalmente. Confira também antes de pilotar.' };
    return { ...base, ...override, refs: [FAN_2017_REFERENCE] };
  }
  if (year === 'FAN-2018') {
    const override = { ...FAN_SERVICE_OVERRIDES[id] };
    if (id === 'chain') return { ...base, ...override, frequency: 'A cada 1.000 km; verificar condição e folga antes do uso', kmInterval: 1000, refs: [FAN_2018_REFERENCE], notes: 'O Manual CG 160 Fan/Titan 2018 prevê a manutenção da corrente a cada 1.000 km. Confira condição e folga antes de pilotar.' };
    if (id === 'first-review') return { ...base, ...override, refs: [FAN_2018_REFERENCE], notes: 'Para 2018, a primeira revisão ocorre em 1.000 km ou 6 meses; o calendário seguinte segue as marcações do Manual CG 160 Fan/Titan 2018.' };
    return { ...base, ...override, refs: [FAN_2018_REFERENCE] };
  }
  if (year === 'FAN-2019') {
    const override = { ...FAN_SERVICE_OVERRIDES[id] };
    if (id === 'chain') return { ...base, ...override, frequency: 'A cada 1.000 km; verificar condição e folga antes do uso', kmInterval: 1000, refs: [FAN_2019_REFERENCE], notes: 'O manual CG 160 Fan/Titan 2019~2020 prevê a manutenção da corrente a cada 1.000 km. Confira condição e folga antes de pilotar.' };
    if (id === 'first-review') return { ...base, ...override, refs: [FAN_2019_REFERENCE], notes: 'Para 2019, a primeira revisão ocorre em 1.000 km ou 6 meses; o calendário seguinte segue as marcações do manual CG 160 Fan/Titan 2019~2020.' };
    return { ...base, ...override, refs: [FAN_2019_REFERENCE] };
  }
  if (year === '2020') {
    const override = { ...FAN_SERVICE_OVERRIDES[id] };
    if (id === 'chain') return { ...base, ...override, frequency: 'A cada 1.000 km; verificar condição e folga antes do uso', kmInterval: 1000, refs: [FAN_2020_REFERENCE], notes: 'O Manual CG 160 Fan/Titan 2019~2020 prevê a manutenção da corrente a cada 1.000 km. Confira condição e folga antes de pilotar.' };
    if (id === 'first-review') return { ...base, ...override, refs: [FAN_2020_REFERENCE], notes: 'Para 2020, a primeira revisão ocorre em 1.000 km ou 6 meses; o calendário seguinte segue as marcações do Manual CG 160 Fan/Titan 2019~2020.' };
    return { ...base, ...override, refs: [FAN_2020_REFERENCE] };
  }
  if (year === '2021') {
    const override = { ...FAN_SERVICE_OVERRIDES[id] };
    if (id === 'chain') return { ...base, ...override, frequency: 'A cada 1.000 km; verificar condição e folga antes do uso', kmInterval: 1000, refs: [FAN_2021_REFERENCE], notes: 'O manual CG 160 Fan/Titan 2021 prevê a manutenção da corrente a cada 1.000 km. Confira condição e folga antes de pilotar.' };
    if (id === 'first-review') return { ...base, ...override, refs: [FAN_2021_REFERENCE], notes: 'Para 2021, a primeira revisão ocorre em 1.000 km ou 6 meses; a tabela seguinte passa por 6.000 km/12 meses e continua conforme o calendário do manual.' };
    return { ...base, ...override, refs: Array.from(new Set([...(override.refs || []), FAN_2021_REFERENCE])) };
  }
  if (year === 'START-2015') {
    const entry: Cargo150Entry = START_150_2015[id] ?? {};
    return { ...base, ...entry, abs: undefined, cbs: undefined, refs: [START_2015_REFERENCE] };
  }
  if (year === 'START-2022') {
    const entry = START_160_2022[id] ?? {};
    const page = START_160_2022_PAGES[id];
    return { ...base, ...entry, abs: undefined, cbs: undefined, refs: page ? [startPageRef(page[0], page[1]), START_2022_REFERENCE] : [START_2022_REFERENCE] };
  }
  if (year === 'START-2026') {
    const shared = FAN_SERVICE_OVERRIDES[id] || {};
    const refs = [START_2026_REFERENCE, START_MAINTENANCE_REFERENCE];
    if (id === 'brakes') return { ...base, ...shared, refs, notes: 'A CG 160 Start 2026 usa freio dianteiro a disco e traseiro a tambor com CBS.' };
    return { ...base, ...shared, refs };
  }
  if (year === 'CARGO-2013' || year === 'CARGO-2014' || year === 'CARGO-2015') {
    // A Cargo 2013 não tem manual próprio encontrado: usa a tabela do manual da Cargo 2014 e avisa isso nas notas.
    const yearTable = year === 'CARGO-2015' ? CARGO_150_2015 : CARGO_150_2014;
    const entry: Cargo150Entry = { ...(CARGO_150_COMMON[id] ?? {}), ...(yearTable[id] ?? {}) };
    if (year === 'CARGO-2013' && entry.notes) entry.notes = `${entry.notes} Para a Cargo 2013 não foi encontrado manual próprio: segue o manual da Cargo 2014, a edição mais próxima.`;
    const refs = [year === 'CARGO-2013' ? CARGO_2013_REFERENCE : year === 'CARGO-2014' ? CARGO_2014_REFERENCE : CARGO_2015_REFERENCE];
    return { ...base, ...entry, abs: undefined, cbs: undefined, refs };
  }
  if (year === 'CARGO-2016' || year === 'CARGO-2017' || year === 'CARGO-2018' || year === 'CARGO-2019' || year === 'CARGO-2020') {
    const shared = FAN_SERVICE_OVERRIDES[id] || {};
    const refs = [year === 'CARGO-2016' ? CARGO_2016_REFERENCE : year === 'CARGO-2017' ? CARGO_2017_REFERENCE : year === 'CARGO-2018' ? CARGO_2018_REFERENCE : year === 'CARGO-2019' ? CARGO_2019_REFERENCE : CARGO_2020_REFERENCE];
    const esdi = year === 'CARGO-2016' || year === 'CARGO-2017';
    const merged: Service = { ...base, ...shared, refs };
    const cleaned: Service = {
      ...merged,
      description: cargoText(merged.description, merged.service),
      reason: cargoText(merged.reason),
      anticipation: cargoText(merged.anticipation),
      notes: cargoText(merged.notes, 'Siga a tabela de manutenção do manual da Cargo.'),
      replacement: cargoText(merged.replacement),
      abs: undefined,
      cbs: undefined,
    };
    return { ...cleaned, ...(CARGO_MANUAL_OVERRIDES[id] ?? {}), ...(id === 'oil' && !esdi ? CARGO_SL_OIL : {}), ...(esdi ? (CARGO_ESDI_OVERRIDES[id] ?? {}) : {}), refs };
  }
  if (year === 'CARGO-2021' || year === 'CARGO-2022') {
    const shared = FAN_SERVICE_OVERRIDES[id] || {};
    const refs = [CARGO_2021_2022_REFERENCE];
    const label = year === 'CARGO-2021' ? '2021' : '2022';
    if (id === 'brakes') return { ...base, ...shared, refs, notes: `A CG 160 Cargo ${label} usa freio dianteiro a disco e traseiro a tambor com CBS. Não é ABS.` };
    if (id === 'brake-level') return { ...base, ...shared, refs, notes: 'A CG 160 Cargo tem disco dianteiro com circuito hidráulico, CBS e tambor traseiro. Confira o nível dos reservatórios e o funcionamento.' };
    if (id === 'break-in') return { ...base, ...shared, refs, notes: 'Na primeira utilização, siga os cuidados de amaciamento do manual da CG 160 Cargo (primeiros 500 km). Completar 500 km não cria uma troca automática.' };
    if (id === 'first-review') return { ...base, ...shared, refs, notes: `Para a Cargo ${label}, o manual da Cargo 2019~2020 prevê a primeira revisão em 1.000 km ou 6 meses e a segunda em 6.000 km ou 12 meses; depois, a cada 6.000 km, o calendário segue a tabela.` };
    if (id === 'chain') return { ...base, ...shared, refs, frequency: 'A cada 1.000 km; verificar, ajustar e lubrificar', kmInterval: 1000, notes: 'O manual da Cargo 2019~2020 prevê verificar, ajustar e lubrificar a corrente a cada 1.000 km. Confira condição e folga antes de pilotar. Não pilote se a folga passar de 50 mm.' };
    if (id === 'steering') return { ...base, ...shared, refs, frequency: 'Verificar a folga a cada 6.000 km; lubrificar a cada 18.000 km', kmInterval: 6000, notes: 'O manual da Cargo 2019~2020 prevê verificar a folga da coluna de direção e ajustar, se necessário, a cada 6.000 km, e lubrificar a cada 18.000 km.' };
    return { ...base, ...shared, refs };
  }
  if (year === 'CARGO-2023' || year === 'CARGO-2024') {
    const shared = FAN_SERVICE_OVERRIDES[id] || {};
    const refs = [CARGO_2023_2024_REFERENCE];
    if (id === 'brakes') return { ...base, ...shared, refs, notes: `A CG 160 Cargo ${year === 'CARGO-2023' ? '2023' : '2024'} usa freio dianteiro a disco e traseiro a tambor com CBS.` };
    return { ...base, ...shared, refs };
  }
  if (year === 'CARGO-2025') {
    const shared = FAN_SERVICE_OVERRIDES[id] || {};
    const refs = [CARGO_2025_REFERENCE, CARGO_2025_MAINTENANCE_REFERENCE, CARGO_2026_MAINTENANCE_REFERENCE];
    if (id === 'brakes') return { ...base, ...shared, refs, notes: 'A CG 160 Cargo 2025 usa freio dianteiro a disco e traseiro a tambor com CBS.' };
    if (id === 'chain') return { ...base, ...shared, refs, frequency: 'A cada 500 km; verificar, ajustar e lubrificar', kmInterval: 500, notes: 'A referência Honda da família Cargo usada no projeto indica corrente a cada 500 km; confira condição e folga antes de pilotar.' };
    return { ...base, ...shared, refs };
  }
  if (year === 'CARGO-2026') {
    const shared = FAN_SERVICE_OVERRIDES[id] || {};
    const refs = [CARGO_2026_REFERENCE, CARGO_2026_MAINTENANCE_REFERENCE];
    if (id === 'brakes') return { ...base, ...shared, refs, notes: 'A CG 160 Cargo 2026 usa freio dianteiro a disco e traseiro a tambor com CBS.' };
    if (id === 'chain') return { ...base, ...shared, refs, frequency: 'A cada 500 km; verificar, ajustar e lubrificar', kmInterval: 500, notes: 'A tabela de manutenção Honda da CG 160 Cargo 2025 indica corrente a cada 500 km; confira condição e folga antes de pilotar.' };
    return { ...base, ...shared, refs };
  }
  if (year === 'TITAN-2026') {
    const shared = FAN_SERVICE_OVERRIDES[id] || {};
    const refs = [TITAN_2026_REFERENCE, TITAN_2026_MAINTENANCE_REFERENCE];
    if (id === 'brakes') return { ...base, ...shared, refs, notes: 'A CG 160 Titan 2026 usa freios a disco nas duas rodas e ABS na roda dianteira.' };
    return { ...base, ...shared, refs };
  }
  if (year === '2022' || year === '2023' || year === '2024' || year === '2025' || year === '2026') {
    return { ...base, ...FAN_SERVICE_OVERRIDES[id] };
  }
  if (year === '2025/2026' || year === 'NXR-2025' || year === 'NXR-2026') {
    let current: Service = { ...base };
    if (id === 'brakes' && variant === 'CBS') current = { ...current, notes: 'A NXR 160 Bros CBS 2025 usa discos nas duas rodas com CBS. O sistema CBS distribui a frenagem conforme o acionamento do pedal traseiro; não confundir com ABS.' };
    if (id === 'brakes' && variant === 'ABS') current = { ...current, notes: 'A NXR 160 Bros ABS 2025 usa discos nas duas rodas e ABS na roda dianteira. O ABS não impede a necessidade de usar os dois freios corretamente.' };
    return current;
  }
  const override = LEGACY_SERVICE_OVERRIDES[id] || {};
  const modelOverride = (year === 'NXR-2020' || year === '2020/2021' || year === 'NXR-2021' || year === '2021/2022' || year === 'NXR-2022' || year === 'NXR-2023' || year === 'NXR-2024' || year === '2022/2023') ? {} : year === '2013' ? (MODEL_2013_OVERRIDES[id] || {}) : year === '2014' ? (MODEL_2014_OVERRIDES[id] || {}) : year === '2015' ? (MODEL_2015_OVERRIDES[id] || {}) : year === '2015/2016' || year === '2016' || year === '2016/2017' ? (MODEL_2016_2017_OVERRIDES[id] || {}) : year === '2017' || year === '2017/2018' ? (MODEL_2017_OVERRIDES[id] || {}) : year === '2018' || year === '2018/2019' || year === '2019' || year === '2019/2020' ? (MODEL_2018_OVERRIDES[id] || {}) : {};
  let result: Service = { ...base, ...override, ...modelOverride };

  if (year === '2013' && variant === 'ES') {
    if (id === 'brake-level' || id === 'brake-fluid' || id === 'pads') result = { ...result, component: id === 'pads' ? 'Sapatas do freio' : 'Freio dianteiro a tambor', service: id === 'pads' ? 'Verificar desgaste das sapatas dos freios' : id === 'brake-level' ? 'Verificar o freio dianteiro a tambor' : 'N/A', notes: 'A versão ES 2013 usa tambor dianteiro e traseiro; não há circuito hidráulico de freio dianteiro.', replacement: id === 'brake-fluid' ? 'Não há fluido hidráulico de freio dianteiro na versão ES.' : result.replacement };
  }
  if (year === '2013' && variant === 'ESD' && id === 'brakes') result = { ...result, notes: 'A NXR150 Bros ESD 2013 usa freio dianteiro a disco com acionamento hidráulico e freio traseiro a tambor.' };

  if (year === '2014' && variant === 'ES') {
    if (id === 'brake-level' || id === 'brake-fluid' || id === 'pads') result = { ...result, component: id === 'pads' ? 'Sapatas do freio' : 'Freio dianteiro a tambor', service: id === 'pads' ? 'Verificar desgaste das sapatas do freio dianteiro' : id === 'brake-level' ? 'Verificar o freio dianteiro a tambor' : 'N/A', notes: id === 'pads' ? 'A versão ES 2014 usa tambor no freio dianteiro e traseiro; não há fluido hidráulico de freio dianteiro.' : 'A versão ES 2014 não tem circuito hidráulico de freio dianteiro.', replacement: id === 'brake-fluid' ? 'Não há fluido hidráulico de freio dianteiro na versão ES; siga o procedimento específico das sapatas e do sistema a tambor.' : result.replacement };
    if (id === 'brakes') result = { ...result, notes: 'A NXR150 Bros ES 2014 usa freio a tambor na dianteira e na traseira, conforme as especificações do manual.' };
  }
  if (year === '2014' && variant === 'ESD' && id === 'brakes') result = { ...result, notes: 'A NXR150 Bros ESD 2014 usa freio dianteiro a disco com acionamento hidráulico e freio traseiro a tambor.' };

  if (year === '2015' && variant === 'ESD') {
    if (id === 'brakes') result = { ...result, component: 'Sistema de freios dianteiro e traseiro', service: 'Verificar o freio dianteiro a disco e o freio traseiro a tambor', notes: 'A NXR160 Bros ESD 2015 usa disco hidráulico na dianteira e tambor na traseira; não tratar esta versão como ESDD, CBS ou ABS.' };
    if (id === 'pads') result = { ...result, component: 'Pastilhas do freio dianteiro', notes: 'Na ESD 2015, as pastilhas são do freio dianteiro a disco. O freio traseiro é a tambor e usa sapatas.' };
    if (id === 'brake-level') result = { ...result, component: 'Fluido do freio dianteiro', notes: 'A ESD 2015 possui circuito hidráulico no freio dianteiro; o traseiro é a tambor.' };
    if (id === 'brake-fluid') result = { ...result, notes: 'A ESD 2015 possui circuito hidráulico de freio dianteiro. A troca segue o prazo de 2 anos da tabela.' };
  }

  if ((year === '2018' || year === '2018/2019' || year === '2019' || year === '2019/2020') && variant === 'CBS' && id === 'brakes') result = { ...result, notes: 'A NXR 160 Bros desta geração usa discos nas duas rodas com sistema CBS. O CBS não é ABS e não impede o travamento das rodas.' };
  if (year === '2016' && variant === 'ES') {
    if (id === 'brake-level' || id === 'brake-fluid' || id === 'pads') result = { ...result, component: id === 'pads' ? 'Sapatas dos freios' : 'Freios a tambor', service: id === 'pads' ? 'Verificar desgaste das sapatas dos freios' : id === 'brake-level' ? 'Verificar funcionamento dos freios a tambor' : 'N/A', notes: 'A Bros 160 ES 2016 usa freio a tambor na dianteira e na traseira; não há circuito hidráulico de freio dianteiro.', replacement: id === 'brake-fluid' ? 'Não há fluido hidráulico de freio dianteiro na versão ES.' : result.replacement };
    if (id === 'brakes') result = { ...result, component: 'Sistema de freios dianteiro e traseiro', service: 'Verificar funcionamento dos freios dianteiro e traseiro a tambor', notes: 'A Bros 160 ES 2016 é a versão de entrada com freios dianteiro e traseiro a tambor. Não tratar como ESDD, CBS ou ABS.' };
  }
  if ((year === '2016/2017' || year === '2017' || year === '2017/2018' || year === '2018') && variant === 'ES') {
    if (id === 'brake-level' || id === 'brake-fluid' || id === 'pads') result = { ...result, component: id === 'pads' ? 'Sapatas dos freios' : 'Freios a tambor', service: id === 'pads' ? 'Verificar desgaste das sapatas dos freios' : id === 'brake-level' ? 'Verificar funcionamento dos freios a tambor' : 'N/A', notes: `A Bros 160 ES ${year} usa freio a tambor na dianteira e na traseira; não há circuito hidráulico de freio dianteiro.`, replacement: id === 'brake-fluid' ? 'Não há fluido hidráulico de freio dianteiro na versão ES.' : result.replacement };
    if (id === 'brakes') result = { ...result, component: 'Sistema de freios dianteiro e traseiro', service: 'Verificar funcionamento dos freios dianteiro e traseiro a tambor', notes: `A Bros 160 ES ${year} é a versão de entrada com freios dianteiro e traseiro a tambor. Não tratar como ESDD, CBS ou ABS.` };
  }
  return result;
}

export function getModelServices(year: ModelYear, variant: Variant = 'ESDD'): Service[] {
  if (year === 'START-2015') {
    const catalog = [...SERVICES, ...LEGACY_EXTRA_SERVICES].filter(item => START_150_IDS_2015.includes(item.id));
    return catalog.map(item => getServiceForModel(item.id, year, variant));
  }
  if (year === 'START-2022') {
    const catalog = [...SERVICES, ...LEGACY_EXTRA_SERVICES].filter(item => START_160_IDS_2022.includes(item.id));
    return catalog.map(item => getServiceForModel(item.id, year, variant));
  }
  if (year === 'START-2026') return SERVICES.filter(item => item.id !== 'electrical').map(item => getServiceForModel(item.id, year, variant));
  if (year === 'CARGO-2013' || year === 'CARGO-2014' || year === 'CARGO-2015') {
    const ids = year === 'CARGO-2015' ? CARGO_150_IDS_2015 : CARGO_150_IDS_2014;
    const catalog = [...SERVICES, ...LEGACY_EXTRA_SERVICES].filter(item => ids.includes(item.id));
    return catalog.map(item => getServiceForModel(item.id, year, variant));
  }
  if (year === 'CARGO-2016' || year === 'CARGO-2017' || year === 'CARGO-2018' || year === 'CARGO-2019' || year === 'CARGO-2020') {
    const cargoExtras = ['fuel-filter', 'exhaust', 'lockset', 'fork-oil', 'rear-suspension-lube', 'steering-lube'];
    return [
      ...SERVICES.filter(item => item.id !== 'electrical' && item.id !== 'evaporative').map(item => getServiceForModel(item.id, year, variant)),
      ...LEGACY_EXTRA_SERVICES.filter(item => cargoExtras.includes(item.id)).map(item => getServiceForModel(item.id, year, variant)),
    ];
  }
  if (year === 'CARGO-2021' || year === 'CARGO-2022') return SERVICES.filter(item => item.id !== 'electrical' && item.id !== 'evaporative').map(item => getServiceForModel(item.id, year, variant));
  if (year === 'CARGO-2023' || year === 'CARGO-2024' || year === 'CARGO-2025' || year === 'CARGO-2026') return SERVICES.filter(item => item.id !== 'electrical').map(item => getServiceForModel(item.id, year, variant));
  if (year === 'TITAN-2026') return SERVICES.filter(item => item.id !== 'electrical').map(item => getServiceForModel(item.id, year, variant));
  if (year === 'FAN-2013' || year === 'FAN-2014' || year === 'FAN-2015' || year === 'FAN-2016' || year === 'FAN-2017' || year === 'FAN-2018' || year === 'FAN-2019' || year === '2020') return SERVICES.filter(item => item.id !== 'electrical').map(item => getServiceForModel(item.id, year, variant));
  if (year === '2026') return SERVICES.map(item => getServiceForModel(item.id, year, variant));
  if (year === '2025/2026' || year === 'NXR-2025' || year === 'NXR-2026') return SERVICES.filter(item => item.id !== 'electrical').map(item => getServiceForModel(item.id, year, variant));
  const extras = year === '2013' || year === '2014' ? LEGACY_EXTRA_SERVICES.filter(item => ['fuel-filter', 'crankcase-breather', 'exhaust'].includes(item.id)) : year === '2015' ? LEGACY_EXTRA_SERVICES : year === '2015/2016' || year === '2016' || year === '2016/2017' ? LEGACY_EXTRA_SERVICES.filter(item => ['crankcase-breather', 'exhaust'].includes(item.id)) : year === '2017' || year === '2017/2018' || year === '2018' || year === '2018/2019' || year === '2019' ? LEGACY_EXTRA_SERVICES.filter(item => item.id !== 'fuel-filter') : LEGACY_EXTRA_SERVICES;
  return [
    ...SERVICES.filter(item => item.id !== 'electrical').map(item => getServiceForModel(item.id, year, variant)),
    ...extras.map(item => getServiceForModel(item.id, year, variant)),
  ].filter(item => !((year === '2013' && variant === 'ES' || year === '2014' && variant === 'ES' || year === '2016' && variant === 'ES' || year === '2016/2017' && variant === 'ES' || (year === '2017' || year === '2017/2018' || year === '2018') && variant === 'ES') && item.id === 'brake-fluid'));
}


export const DAILY_CHECKLIST = [
  { id: 'fuel', title: 'Combustível', text: 'Verifique o nível e abasteça quando necessário.', refs: [ref(48)] },
  { id: 'throttle', title: 'Acelerador', text: 'Movimento suave e funcionamento em todas as posições do guidão.', refs: [ref(48), ref(70)] },
  { id: 'oil', title: 'Óleo do motor', text: 'Confira nível e vazamentos. Adicione o óleo recomendado se necessário.', refs: [ref(48), ref(61)] },
  { id: 'chain', title: 'Corrente da moto', text: 'Confira o estado e a folga da corrente. Ajuste e passe o lubrificante indicado se necessário.', refs: [ref(48), ref(66)] },
  { id: 'brakes', title: 'Freios', text: 'Confira se os freios funcionam e se há desgaste anormal. Nas versões com freio hidráulico, confira também o nível do fluido; nas versões a tambor, confira as sapatas conforme o manual.', refs: [ref(48), ref(63), ref(64)] },
  { id: 'lights', title: 'Luzes, painel e buzina', text: 'Confira todas as luzes, os indicadores do painel e a buzina.', refs: [ref(48)] },
  { id: 'clutch', title: 'Embreagem', text: 'Verifique funcionamento e ajuste a folga da alavanca se necessário.', refs: [ref(48), ref(68)] },
  { id: 'switches', title: 'Botões e interruptores', text: 'Teste o funcionamento, principalmente do interruptor que desliga o motor.', refs: [ref(49)] },
  { id: 'tires', title: 'Rodas e pneus', text: 'Confira o estado e a pressão dos pneus. Ajuste a pressão, se necessário.', refs: [ref(49), ref(55)] },
];
export const OFFROAD_CHECKLIST = [
  { id: 'offroad-spokes', title: 'Raios e aros', text: 'Certifique-se de que os raios estão apertados e procure danos nos aros.', refs: [ref(49), ref(67)] },
  { id: 'offroad-cap', title: 'Tampa do tanque', text: 'Confirme que a tampa do tanque de combustível está bem fechada.', refs: [ref(49)] },
  { id: 'offroad-cables', title: 'Cabos e peças soltas', text: 'Verifique cabos, outras peças soltas e qualquer coisa anormal.', refs: [ref(49)] },
  { id: 'offroad-fasteners', title: 'Porcas e parafusos ao alcance', text: 'Use a chave certa para verificar o aperto das porcas, parafusos e outras fixações que você consegue alcançar.', refs: [ref(49)] },
];

export const SEVERE_USE: { id: Usage; title: string; icon: string; text: string; action: string; services: string[]; refs: Reference[] }[] = [
  { id: 'dust', title: 'Muita poeira', icon: 'wind', text: 'Nota 4: óleo, filtro de ar, corrente e pastilhas precisam de cuidado mais frequente.', action: 'Troque óleo e filtro antes do prazo se necessário. Verifique as pastilhas e cuide da corrente com mais frequência. Retire a sujeira acumulada na suspensão. Nunca lave ou sopre o filtro de ar.', services: ['oil', 'air', 'chain', 'pads', 'suspension'], refs: [ref(44), ref(45), ref(46), ref(58), ref(84)] },
  { id: 'mud', title: 'Lama e barro', icon: 'mountain', text: 'A nota 4 inclui lama. A sujeira acumulada também pode desgastar a suspensão e os freios mais rápido.', action: 'Cuide mais vezes dos itens com nota 4. Retire barro, areia e pedras. Limpe sujeira nas pastilhas e nos discos como manda o manual. Não aplique spray contra ferrugem perto dos freios.', services: ['oil', 'air', 'chain', 'pads', 'suspension'], refs: [ref(46), ref(84)] },
  { id: 'rain', title: 'Chuva e lavagem', icon: 'rain', text: 'Nota 5: atenção à corrente e ao tubo de drenagem do filtro de ar. Não espere a próxima revisão para limpar a moto.', action: 'Esvazie o tubo com mais frequência, inclusive depois de lavar a moto, e cuide mais vezes da corrente. Após chuva, lave e seque como orienta a página 84. Aplique os produtos de proteção indicados somente com o motor frio.', services: ['chain', 'drain'], refs: [ref(45), ref(46), ref(55), ref(84)] },
  { id: 'humidity', title: 'Umidade', icon: 'droplet', text: 'A nota 4 inclui umidade, que também exige atenção para evitar ferrugem.', action: 'Confira se óleo, filtro de ar, corrente e pastilhas precisam de cuidados mais frequentes. Seque e conserve a moto. A umidade não cria aqui um novo prazo fixo de troca do líquido de freio.', services: ['oil', 'air', 'chain', 'pads'], refs: [ref(46), ref(48), ref(84)] },
  { id: 'acceleration', title: 'Acelerações fortes ou rápidas', icon: 'gauge', text: 'Nota 5: acelerar tudo ou acelerar rapidamente muitas vezes pede cuidados mais frequentes na corrente e no tubo de drenagem.', action: 'Verifique e lubrifique a corrente mais vezes. Esvazie o tubo de drenagem do filtro de ar com mais frequência. O manual não dá um novo intervalo fixo, como 250 ou 300 km.', services: ['chain', 'drain'], refs: [ref(46), ref(53), ref(55)] },
  { id: 'offroad', title: 'Fora do asfalto', icon: 'route', text: 'No manual, off-road. A nota 8 pede mais atenção à corrente, à guia da corrente, às fixações, às rodas e aos pneus.', action: 'Faça as verificações extras antes de sair do asfalto. Confira pneus e pressão antes da trilha e ao voltar ao asfalto; confira raios, aros e fixações. Se também houver lama ou poeira, siga os cuidados dessas situações.', services: ['chain', 'slider', 'fasteners', 'wheels', 'tires'], refs: [ref(46), ref(49), ref(55), ref(67)] },
  { id: 'coast', title: 'Perto do mar', icon: 'waves', text: 'A maresia, com sal e umidade no ar, pede mais atenção à limpeza e manutenção.', action: 'Retire os resíduos logo após usar a moto, lave e seque. Use o spray contra ferrugem recomendado somente nos pontos permitidos, com motor frio e longe dos freios. Isso não cria uma revisão mensal ou troca extra de líquido de freio.', services: [], refs: [ref(48), ref(84)] },
  { id: 'commercial', title: 'Uso para trabalho', icon: 'briefcase', text: 'Para uso comercial, a página 17 pede apertar porcas, parafusos e outras fixações com mais frequência.', action: 'Peça orientação para conferir o aperto de acordo com seu uso. Atenção: a página 11 diz que este modelo não é destinado ao transporte de carga e não recomenda levar cargas em troca de pagamento. A orientação de manutenção não autoriza esse uso.', services: ['fasteners'], refs: [ref(11), ref(17), ref(44)] },
];

export const CONDITIONS = [
  { id: 'pads', title: 'Pastilhas de freio', trigger: 'Uma pastilha chegou à marca de desgaste indicada para sua versão.', action: 'Troque as duas pastilhas daquele freio, não apenas a mais gasta. Confira a diferença entre ABS e CBS.', refs: [ref(64)] },
  { id: 'tires', title: 'Pneus e câmaras de ar', trigger: 'Marca de desgaste visível, sulcos no mínimo de 3,0 mm, lateral danificada ou furada, ou outro dano que precise de avaliação.', action: 'Troque o pneu que chegou ao limite e a câmara de ar sempre que trocar o pneu. Cortes, objetos presos, desgaste anormal e bico de ar inclinado pedem verificação. Não existe uma vida útil fixa em anos ou km neste plano.', refs: [ref(55), ref(56), ref(57), ref(58), ref(101)] },
  { id: 'chain', title: 'Corrente e engrenagens', trigger: 'Desgaste excessivo, dentes quebrados ou gastos, movimento irregular, barulho estranho, roletes danificados ou pinos soltos ou presos.', action: 'Leve à concessionária. Se precisar trocar, troque corrente, coroa e pinhão juntos. Folga diferente ao longo da corrente pode indicar elos presos. Não pilote se a folga passar de 50 mm.', refs: [ref(53), ref(66)] },
  { id: 'clutch', title: 'Embreagem e cabo', trigger: 'Cabo dobrado ou gasto, folga errada, ajuste que não resolve ou funcionamento fora do normal.', action: 'A folga da alavanca deve ser 10–20 mm. Ajuste quando possível e lubrifique conforme o manual. Peça a verificação e a troca do cabo se necessário; não troque os discos da embreagem automaticamente.', refs: [ref(68), ref(69)] },
  { id: 'suspension', title: 'Peças da suspensão', trigger: 'Areia ou sujeira que causa atrito, vazamento, dano ou peças desalinhadas após queda ou batida.', action: 'Retire a sujeira e peça a verificação. Conserte ou troque só conforme o problema encontrado. Não há prazo inventado para peças de vedação, chamadas retentores, amortecedores ou óleo da suspensão.', refs: [ref(46), ref(48), ref(84)] },
  { id: 'steering', title: 'Rolamentos da direção', trigger: 'Folga nos rolamentos da direção ou peças danificadas ou desalinhadas depois de uma batida.', action: 'Verifique e ajuste se necessário. O conserto depende da avaliação. A tabela não dá quilometragem fixa para trocar rolamentos da direção ou das rodas.', refs: [ref(46), ref(48)] },
  { id: 'fasteners', title: 'Parafusos, fixações e raios', trigger: 'Porcas, parafusos ou raios soltos; aros danificados ou roda balançando ao girar.', action: 'Confira e aperte com as ferramentas certas. Leve danos ou roda fora de alinhamento à concessionária. Confira mais vezes fora do asfalto e dê atenção às fixações no uso para trabalho.', refs: [ref(17), ref(46), ref(49), ref(67)] },
  { id: 'slider', title: 'Guia e apoio da corrente', trigger: 'Guia, chamada deslizador, no limite de uso; apoio de borracha gasto até qualquer ponto de sua linha de referência.', action: 'Peça a troca da peça que chegou ao limite. A guia e o apoio têm marcas de desgaste diferentes; não confunda uma com a outra.', refs: [ref(66), ref(67)] },
  { id: 'oil', title: 'Óleo sujo, ruim ou com água', trigger: 'Óleo que perdeu qualidade ou entrada de água no motor.', action: 'Troque óleo sujo ou ruim o mais rápido possível. Se entrou água, desligue o motor imediatamente. A concessionária deve retirar a água, trocar o óleo e fazer a manutenção necessária.', refs: [ref(12), ref(52)] },
  { id: 'drain', title: 'Tubo de drenagem do filtro de ar', trigger: 'Sujeira visível no tubo transparente, lavagem da moto ou queda.', action: 'Esvazie o tubo sem esperar o intervalo. Se transbordar, pode sujar o filtro com óleo. Não lave nem sopre o filtro de ar.', refs: [ref(55), ref(58)] },
  { id: 'stand', title: 'Pezinho lateral da moto', trigger: 'Movimento preso ou com barulho, mola danificada ou sem força.', action: 'Limpe e lubrifique o ponto onde o pezinho gira, se necessário. Confira a mola e conserte se houver problema.', refs: [ref(65)] },
  { id: 'battery', title: 'Bateria e conexões', trigger: 'Conexões sujas ou com corrosão, ou bateria que não funciona depois de ser carregada corretamente.', action: 'Limpe as conexões quando necessário e peça avaliação se a carga não resolver. A bateria é selada: não abra e não coloque água. O tempo de garantia não é um prazo de troca.', refs: [ref(49), ref(75)] },
];

export const SAFETY_ALERTS = [
  { id: 'water', title: 'Entrou água no motor', level: 'stop', text: 'Desligue o motor imediatamente. Leve à concessionária para retirar a água, trocar o óleo e fazer a manutenção. A água pode travar e danificar o motor, problema chamado calço hidráulico.', refs: [ref(12)] },
  { id: 'chain', title: 'Corrente com folga acima de 50 mm', level: 'stop', text: 'O manual proíbe pilotar assim. A folga indicada é 20–30 mm. Corrija e confira antes de usar a moto.', refs: [ref(66)] },
  { id: 'tire', title: 'Pneu no limite ou com lateral danificada', level: 'stop', text: 'Troque se a marca de desgaste estiver visível ou os sulcos chegarem ao mínimo de 3,0 mm. Lateral furada ou danificada também exige troca. Não espere a próxima revisão.', refs: [ref(56), ref(57), ref(58), ref(101)] },
  { id: 'crash', title: 'Queda ou batida com dano que impede pilotar com segurança', level: 'stop', text: 'Não pilote. A concessionária deve verificar as peças importantes para a segurança, a estrutura da moto (chassi), a suspensão e a direção, inclusive danos difíceis de enxergar.', refs: [ref(48)] },
  { id: 'failure', title: 'Problema encontrado antes de sair', level: 'stop', text: 'Corrija qualquer falha antes de pilotar. Não ignore freios que funcionam mal, acelerador irregular ou outros comandos com defeito até a próxima revisão.', refs: [ref(48), ref(49), ref(63), ref(70)] },
  { id: 'abs', title: 'Luz de aviso do ABS acesa ao pilotar', level: 'caution', text: 'Somente ABS: reduza a velocidade e procure a concessionária o mais rápido possível. Com a luz acesa, os freios ainda funcionam, mas sem a ajuda que evita o travamento da roda dianteira. O manual não manda parar imediatamente só por essa luz.', refs: [ref(73)] },
  { id: 'pgm', title: 'Luz da injeção eletrônica acesa (PGM-FI)', level: 'caution', text: 'Reduza a velocidade e procure a concessionária o mais rápido possível. Essa é a orientação do manual; ela não é uma proibição absoluta de continuar só por essa luz.', refs: [ref(73)] },
  { id: 'temporary', title: 'Pneu com conserto de emergência', level: 'caution', text: 'O manual alerta que é perigoso. Se precisar pilotar com um conserto temporário, vá com cuidado e não ultrapasse 50 km/h até a troca. Uma câmara de ar consertada deve ser trocada antes da próxima saída.', refs: [ref(74), ref(75)] },
];

export function variantNote(variant: Variant, year?: ModelYear): string {
  if (variant === 'KS') return `A KS ${year ?? ''} usa freio a tambor na dianteira e na traseira.`;
  if (variant === 'ES') return `A ES ${year ?? ''} usa freio a tambor na dianteira e na traseira. Não é ESDD, CBS nem ABS.`;
  if (variant === 'ESD') return 'A ESD usa freio dianteiro a disco hidráulico e freio traseiro a tambor. Não confundir com ESDD ou CBS.';
  if (variant === 'ESDD') return 'A ESDD desta geração tem freio a disco nas duas rodas. Nas entradas anteriores a 2018, não trate ESDD como CBS ou ABS.';
  return variant === 'ABS' ? 'O ABS atua só na roda dianteira. Confira as pastilhas da frente por baixo da pinça de freio (cáliper no manual). Troque as duas se uma chegar à marca de desgaste.' : 'O CBS combina os freios, mas não evita o travamento como o ABS. Confira as pastilhas da frente pela frente da pinça de freio (cáliper no manual). Troque as duas se uma chegar à parte de baixo da marca de desgaste.';
}