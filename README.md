# Bros. Seu Caminho Em Dia

Caderno interativo de manutencao preventiva para Honda NXR 160 Bros ABS / CBS, anos-modelo 2025 e 2026. Interface responsiva, sem cadastro e sem servidor de dados pessoais.

## Continuar Com Outra IA

O documento `public/mega-prompt-bros.md` descreve o aplicativo em 26 secoes: telas, visual, regras mecanicas, estrutura de dados, notificacoes, limites atuais, decisoes do usuario e testes de aceitacao.

Para transferir o projeto para outra IA, use o arquivo `public/mega-prompt-bros.md` junto com o ZIP do código-fonte. O recurso "Continuar com outra IA" dentro do app ainda não existe no código. As fotos externas e o PDF original do manual não estão incluídos como arquivos locais.

O exportador e uma ferramenta de desenvolvimento solicitada para transferencia fiel. Ele inclui os fontes textuais no build, aumentando o tamanho do aplicativo; remova essa ferramenta de uma futura distribuicao publica se nao quiser disponibilizar os fontes. Os padroes de selecao nao incluem arquivos de ambiente, chaves, node_modules ou dist. Se adicionar backend futuramente, revise a lista de arquivos antes de voltar a distribuir esse recurso.

A integridade de compressao do ZIP e conferida durante a exportacao. Isso nao equivale a teste funcional do app. A compilacao web desta entrega foi verificada; o clique de download em navegador real e os testes Android ainda precisam ser validados.

### Ultimas Decisoes Do Usuario

- Horario de saida perguntado dentro do app, com o texto "Qual horario voce costuma sair de moto?".
- Botao principal "Ativar", com a confirmacao de permissao do sistema quando exigida.
- Quilometragem a cada 3 dias, as 18h30, como padrao para novos cadastros. Preferencias anteriores sao preservadas.
- Opcoes avancadas recolhidas em "Personalizar, se quiser".
- Conta opcional, sem bloquear o uso como convidado: requisito documentado para a proxima implementacao, ainda sem autenticacao/backend conectado.
- Instalacao direta no Android e a prioridade, sem publicar na Play Store agora. APK real ainda nao foi gerado.

## Lembretes E Aplicativo

A nova tela inicial e a central "Meus lembretes". Ela reune a lista antes de sair, o convite para atualizar os quilometros e os prazos conhecidos de manutencao. Horarios, dias, antecedencia, repeticao dos avisos, descanso e pausa sao ajustaveis. As preferencias pessoais de aviso NAO mudam os intervalos do manual.

Notificacoes comecam desligadas. "Ativar" solicita permissao por acao do usuario; "Enviar um teste" pede uma notificacao real ao sistema, nao apenas um aviso dentro da pagina. O historico distingue solicitacao e abertura, sem fingir que uma mensagem aceita foi necessariamente vista.

**Na web, a pagina precisa continuar funcionando para os horarios serem verificados. Fechar ou suspender a pagina impede uma garantia de entrega.** Instalar a PWA nao muda essa limitacao. Nao ha servidor push conectado.

Para uma alternativa fora do site, "Usar minha agenda" gera arquivo ICS com eventos recorrentes de rotina e pedidos VALARM. O usuario precisa importar, conferir os alertas e manter/remover os eventos. A agenda nao sincroniza com o app automaticamente.

A integracao Capacitor de notificacoes locais esta implementada, com agendamento no sistema, verificacao de permissao, confirmacao via getPending e janela renovavel de ate 28 dias. **O projeto/pacote Android ainda nao foi gerado nem testado em aparelho fisico.** Nao ha publicacao na Play Store. O sistema pode atrasar ou bloquear avisos por permissoes, bateria e outras configuracoes.

O manifesto PWA e o service worker preparam instalacao e uso offline apos um carregamento completo da versao de producao. Links e imagens externas podem precisar de internet. Uma tela de recuperacao permite guardar os dados locais se a interface falhar.

`public/privacy.html` descreve o funcionamento atual; responsável e contato ainda precisam ser definidos antes da publicação.

## Funcionalidades

- Linha do tempo de 0 a 36.000 km, incluindo 500 km e todas as etapas de 1.000 km. Um controle mostra tambem as etapas intermediarias de 500 km.
- Continuidade ate 72.000 km, preservando os ciclos individuais de 6.000, 12.000 e 18.000 km.
- Agenda de revisoes por idade ate 120 meses, com controle independente de oleo e fluido de freio.
- Detalhamento por componente: quando, servico, acao, motivo preventivo, antecipacao, observacao e referencias do manual.
- Lista antes de pilotar com nove verificacoes e quatro cuidados extras fora do asfalto. A lista recomeca a cada dia.
- Cuidados para uso intenso, consertos por desgaste ou defeito e alertas de seguranca.
- Historico local com data, quilometragem, servicos efetivamente informados e ordem de servico.
- Acesso rapido a quilometragem no topo de todas as telas e no botao "Atualizar km" do plano.
- Cadastro da quilometragem total ou soma dos quilometros de uma viagem ja feita, com previa do valor, horario e historico separado.
- Quilometros restantes para os proximos cuidados, sem deixar de acompanhar os prazos por data.
- Exportacao do plano em Markdown, impressao/PDF, lembretes ICS, historico CSV e copia dos dados JSON.
- Consulta de referencias por pagina e abertura de um PDF local, sem envio e sem validacao automatica do arquivo.

## Fonte E Limites

A fonte tecnica exclusiva e o conteudo do Manual do Proprietario NXR 160 Bros ABS / CBS. Nao havia arquivo anexado, portanto foram consultadas reproducoes identificadas como 2025 e 2026 no ManualPDF. Nao foram usadas as FAQs do hospedeiro, artigos de manutencao ou tabelas de outros modelos.

**Ainda falta conferir parte da tabela:** a leitura do texto nao mostrou todas as marcacoes da coluna de 1.000 km nem em qual revisao comeca a verificacao da vela. Nao adivinhamos essas informacoes. Os avisos no aplicativo e nos arquivos para baixar explicam por que e preciso abrir o PDF original. Esta ainda nao e uma lista completa dos servicos da primeira revisao.

Os intervalos textuais e as notas das paginas 44-46 foram comparados nas duas edicoes. Os prazos do certificado (1.000 km / 6 meses, 6.000 km / 12 meses, 12.000 km / 18 meses etc.) foram consultados. As auditorias por modelo estão nos arquivos `*_AUDIT.md` da raiz.

## Logica Da Agenda

As revisoes vencem por quilometragem OU meses desde a entrega, o que ocorrer primeiro. Passar da quilometragem nao significa que a revisao foi feita. Uma etapa sem registro continua pedindo que o proprietario confira os servicos anteriores.

O prazo maximo por tempo do oleo e um ano, alem do intervalo por km e dos servicos da revisao. O liquido de freio tem prazo de dois anos. Somente registrar as trocas `oil` e `brake-fluid` recomeca a contagem desses prazos. Marcar uma revisao nao marca nenhuma dessas trocas automaticamente.

Calendarios exportados incluem somente datas conhecidas e nao tentam converter quilometragem em data futura. Intervalos menores de uso severo nao sao calculados arbitrariamente.

## Controle De Quilometragem

Use "Informar km" ou o numero de quilometros no topo. A opcao "Informar quilometragem" recebe o total que a moto ja rodou, identificado como ODO no painel. "Somar km rodados" adiciona uma viagem que ja aconteceu e ainda nao entrou no total. Sao aceitos numeros inteiros como `5200` ou `5.200`, ate 999.999 km. O aplicativo nao se conecta ao painel da moto e nao usa GPS.

Um valor menor exige confirmacao e motivo de correcao. Nao e permitido salvar menos quilometros que os anotados em um servico: confira esse servico primeiro. Atualizar a quilometragem nao marca manutencao como feita e nao muda os prazos do oleo e do liquido de freio.

Os 250 ultimos registros de quilometragem ficam neste navegador, em ordem de cadastro, com origem, horario e valor anterior. O historico pode ser baixado como planilha CSV. Cadastros existentes sao mantidos. Quando a data de um registro antigo nao e conhecida, isso e informado.

Alterar a quilometragem no cadastro da moto ou registrar um servico com mais quilometros tambem mantem essa origem no historico. Um servico antigo nao e apresentado como leitura automatica do painel. Correcoes nao contam como quilometros rodados.

## Palavras Mais Simples

A interface, os avisos e os arquivos para baixar usam termos do dia a dia. Exemplos: quilometragem, verificacao, liquido de freio, pezinho lateral, fora do asfalto, etapa do calendario e baixar planilha.

Nomes importantes para reconhecer as pecas no manual sao mantidos no campo `manualName`, mostrado nos detalhes e nos arquivos do plano. Termos como filtro centrifugo, folga, MCS e pinca de freio recebem explicacoes curtas. "Entenda as palavras do manual" fica disponivel junto do manual e nas configuracoes.

As buscas aceitam o nome simples e o nome do manual, com ou sem acentos. A revisao de linguagem nao altera medidas, intervalos, limites de seguranca, identificadores de servicos nem dados ja registrados pelo proprietario.

Se nao houver registro do ultimo cuidado de corrente ou pneus, a distancia restante nao e apresentada como confirmada. O proprietario e orientado a completar o historico. Revisoes ja realizadas nao sao inferidas pela quilometragem, e um prazo por tempo atingido tem prioridade mesmo quando ainda faltam quilometros.

## Organizacao

- `src/App.tsx`: navegacao, persistencia local, dialogs e fluxos de registro/exportacao.
- `src/maintenance/data.ts`: base de conteudo, criterios, notas e paginas da fonte.
- `src/maintenance/planner.ts`: marcos, calculos de datas, historico e exportacoes.
- `src/maintenance/odometer.ts`: validacao de leituras, migracao do historico, diferencas e exportacao da quilometragem.
- `src/ui/Odometer.tsx`: atualizacao rapida, controles de correcao, proximos cuidados e historico de leituras.
- `src/maintenance/types.ts`: contratos de dados.
- `src/reminders/`: preferencias, planejamento, adaptadores web/nativo, instalacao PWA e historico de avisos.
- `src/ui/ProjectHandoff.tsx`: copiar/baixar o mega prompt e o projeto para continuidade em outra IA.
- `public/mega-prompt-bros.md`: especificacao de transferencia e requisitos da proxima versao.
- `src/ui/ReminderCenter.tsx`: central de lembretes, programacao e orientacoes de plataforma.
- `public/bros-sw.js` e `public/manifest.webmanifest`: cache offline e instalacao web; sem timer permanente no service worker.
- `capacitor.config.ts`: configuracao inicial para o futuro pacote nativo.
- `src/maintenance/language.ts`: explicacoes simples e busca pelo nome comum ou pelo nome do manual.
- `src/ui/`: calendario, consultas, formularios, fontes e documento de impressao.
- `src/index.css`, `src/responsive.css` e `src/odometer.css`: identidade visual, adaptacao de tela e impressao.

## Verificacao

Compilacao de producao confirmada pela ferramenta de build do projeto. Testes de regras dos lembretes foram incluidos em `tests/reminders.test.mjs`, mas nao foram executados nesta sessao. Tambem nao foram executados testes de notificacao em navegador real ou aparelhos fisicos. A geracao do pacote Android, a verificacao de entrega com app fechado e a auditoria para publicacao continuam pendentes. As marcacoes da tabela original ainda precisam ser conferidas, conforme os avisos na interface e nos arquivos do plano.

Fotografias da moto sao carregadas da apresentacao comercial da Potiguar Honda, exclusivamente como imagem. Elas nao sao fonte dos dados de manutencao.
## Otimização de assets
As imagens das motos foram convertidas de PNG para WebP **lossless**, preservando a mesma resolução, canal alpha e pixels após decodificação. Duplicatas byte a byte entre anos/combinações agora usam um único asset canônico, sem alteração visual ou funcional.


## Atualização 2016 ES
A versão ES 2016 foi incluída separadamente da ESDD: freio dianteiro a disco hidráulico e traseiro a tambor; cores vermelha e preta. Fonte principal: MOTOO, publicação de 23/11/2015 sobre a nova versão de entrada da linha 2016.


## AUDITORIA DE CORES E IMAGENS
- 2014 NXR 150: as quatro combinações oficiais têm imagens de referência diferentes no seletor: Vermelha/Branca, Branca/Preta, Branca/Azul e Preta/Branca.
- 2015 NXR 160 ESDD: combinações confirmadas como Vermelha/Branca, Branca/Preta e Preta/Cinza.
- 2016 NXR 160 ES: freios dianteiro e traseiro a tambor; nenhuma tarefa de fluido/pastilhas hidráulicas é aplicada a essa versão.
- 2016 NXR 160 ESDD: Vermelha/Preta, Branca/Preta e Preta.
- 2017 NXR 160: ESDD Vermelha/Branca e Azul/Branca; ES Preta e Branca.
- Fotos locais da pasta `public/images/motorcycles` são mantidas com canal alfa; fotos históricas remotas usam mistura visual sobre o fundo do hero quando não há um ativo transparente local verificável.


Atualização: CG 160 Fan 2017 adicionada como geração histórica independente (CBS), separada do NXR 160 Bros 2017.


## CG Fan 2014
A entrada `FAN-2014` representa a **CG 150 Fan ESDi 2014**, separada da NXR 2014. Usa o Manual Honda D2203-MAN-0945 e imagens históricas roteadas pelo pipeline `historicalImage()` para preservar o processamento de transparência.


## Rastreador da moto (atualização automática da quilometragem)

Em Configurações e dados › Rastreador da moto, o app conecta a um rastreador GPS e soma as viagens à quilometragem sozinho. Isso exige o servidor da pasta `server/` (guarda as credenciais e sincroniza com o app fechado). Veja `server/README.md`.

- Build do app: `VITE_BROS_API_URL=https://seu-servidor npm run build`. Sem essa variável, a tela explica que o servidor não está configurado e nada é simulado.
- Testes do servidor: `cd server && npm test`.
