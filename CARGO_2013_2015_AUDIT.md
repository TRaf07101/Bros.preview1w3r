# CG 150 Cargo 2013, 2014 e 2015 — auditoria

Geração anterior à CG 160 Cargo ESDi (2016/2017). Ids novos: `CARGO-2013`, `CARGO-2014` e `CARGO-2015`, versão única ESD, cor branca, sem CBS e sem ABS.

## Fontes
- 2014: Manual do Proprietário "CG150 Fan Cargo ESDi" — Plano de Manutenção Preventiva (cap. 6, p. 6-1 a 6-3), procedimentos e especificações.
  https://www.honda.com.br/pos-venda/motos/sites/customer_service_motos/files/manuais/CG%20150%20Cargo%202014.pdf
- 2015: Manual do Proprietário "CG150 Cargo ESD" — Tabela de Manutenção (p. impressas 35–38), procedimentos e certificado.
  https://www.honda.com.br/pos-venda/sites/customer_service_motos/files/manuais/CG%20150%20Cargo%202015.pdf

## Ciclo
1.000 km / 6 meses → 4.000 km / 12 meses → a cada 4.000 km (mesmo ciclo da Fan 150). Reaproveita `usesCycle4000` em `planner.ts`.

## Valores principais
Corrente 15–25 mm (limite 50 mm) · óleo SAE 10W-30 SJ, 1,0 L, troca em 4.000 km ou 1 ano · filtro de combustível 12.000 km · filtro de ar 16.000 km · vela: troca 8.000 km · válvulas 4.000 km · fluido de freio DOT 4, 2 anos.

## Diferenças entre os dois anos
| Item | 2014 | 2015 |
|---|---|---|
| Pedal do freio traseiro | 15–25 mm | 20–30 mm |
| Verificação da vela | 8.000 km (mesmas colunas da troca) | 4.000 km |
| Coluna de direção (verificar) | 12.000 km (marcada também em 1.000) | 4.000 km |
| Suspensões na coluna de 1.000 km | não | sim |
| Corrente de reposição | DID 428MX / RK 428SB | DID 428MX-118LE / RK 428SB-118LE |
| Folga do acelerador, fluido do garfo, guia da corrente, travas, eixos | não constam na tabela | constam |
| Carga máxima (piloto + carga) | 166 kg | 150 kg |

## Resolvido (conferido na imagem dos PDFs, 02/10/2026)
- Capas conferidas: "CG150 FAN CARGO ESDi" (2014) e "CG150 Cargo ESD" (2015).
- Tabelas lidas como imagem, célula por célula: 2014 nas páginas 6-2 e 6-3; 2015 nas páginas impressas 35 a 37.
- Coluna de 1.000 km, 2014: óleo do motor (troca), folga das válvulas, marcha lenta, sistema de freio, embreagem, porcas/parafusos/fixações, rodas e coluna de direção (verificar); mais corrente e pneus, que são "a cada 1.000 km".
- Coluna de 1.000 km, 2015: as mesmas, mais suspensões dianteira e traseira. Em `planner.ts`, `cargo150Km1000Ids(year)` monta essa lista (usada também pela Cargo 2013, que segue a 2014).
- Vela 2014: o manual mostra verificar e trocar nas mesmas colunas (8.000, 16.000 e 24.000 km), a cada 8.000 km. A mudança anterior para 4.000 km estava errada e foi revertida. Vela 2015: verificar em 4.000 e 12.000 km (a cada 4.000), trocar em 8.000 e 16.000 km (a cada 8.000), como já estava.
- Demais intervalos de 2014 e 2015 (`kmInterval` e `frequency`) batem com a tabela; nenhuma outra divergência.
- Especificações da Cargo 2015: pneu dianteiro 80/100 18 M/C 47P, 175 kPa (25 psi), só piloto, mínimo 1,5 mm; traseiro 90/90 18M/C REINF 57P, 200 kPa (29 psi), só piloto, mínimo 2,0 mm (página impressa 108, igual à de 2014). Vela NGK CPR8EA-9 (ou CPR9EA-9, opcional), folga 0,80–0,90 mm (página 107); o manual não traz grau térmico à parte. Também conferidos: óleo 1,0 L e SAE 10W-30 SJ (p. 105/106), fluido DOT 4 e corrente DID 428MX-118LE ou RK 428SB-118LE (p. 108), fluido do garfo 139,0 ± 2,5 cm³ e pedal 20–30 mm. Sem divergências com o app.

## Pendências
- Cargo 2013: sem manual próprio localizado (ver abaixo).
- Páginas 109 e 110 da Cargo 2015 (fusíveis e lâmpadas) não foram usadas.
- Foto: não há imagem específica da Cargo 150; usa-se a foto da Cargo branca atual como substituta. Troque por uma foto da Cargo 150 se tiver.
- Cor: branco ross (NH-196) vem do catálogo de peças Honda da CG150 CES Cargo "Modelo 2014", informação passada pelo dono do projeto; o catálogo em si não foi reaberto nesta conferência.

## Cargo 2013
- Existe (Tabela FIPE: CG 150 Cargo ESD Flex 2013), mas não encontrei manual do proprietário específico no site da Honda (duas buscas; o endereço direto no padrão `CG%20150%20Cargo%202013.pdf` não pôde ser aberto nesta sessão).
- Possível explicação, a confirmar: a Honda lançou a CG 150 Cargo ESD na linha 2014 (comunicado de lançamento), então a "2013" pode não ter manual próprio.
- O plano usa o manual da Cargo 2014 ("CG150 Fan Cargo ESDi"), a edição mais próxima da mesma linha. Isso aparece no app (fonte, aviso do topo, nota de cada serviço) e no teste.
- Sugestão: a 2013 só deve sair do app se o dono do projeto pedir. Se aparecer o PDF, as diferenças entram em `CARGO_150_2013`.
