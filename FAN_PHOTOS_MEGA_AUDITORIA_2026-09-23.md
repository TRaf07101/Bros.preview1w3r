# Mega auditoria — fotos da CG Fan 2013–2026

Data: 2026-09-23
Escopo: todas as fotos configuradas para a família CG Fan, de 2013 a 2026.

## Padrão obrigatório do app

1. Foto real da motocicleta, sem pessoa/rider.
2. Motocicleta inteira visível: pneus, guidão, banco, paralamas e escape sem corte.
3. Vista lateral/3⁄4 com a frente apontando para a direita.
4. Cenário não deve aparecer no resultado final; o asset exibido pelo app usa fundo transparente.
5. Canvas e escala normalizados para o mesmo padrão visual das demais motos.
6. Fonte remota deve passar pelo caminho `historicalImage()` para permitir CORS + processamento transparente.
7. Nenhum estado/fonte textual de `Foto indisponível` pode ser usado como substituto.
8. Nenhuma entrada Fan abaixo de 2013.

## Partes da revisão

A revisão foi dividida em três blocos por quantidade de fotos problemáticas encontradas:

### Parte 1 — 2013–2016

| Ano | Cor | Ação | Observação |
|---|---|---|---|
| 2013 | Preta | SUBSTITUÍDA | Fonte anterior tinha vista/espaço externo inadequados; nova fonte é frontal/lateral direita e passa pela remoção de fundo. |
| 2013 | Vermelha | SUBSTITUÍDA | Fonte anterior era anúncio externo; nova fonte é lateral/3⁄4 direita. |
| 2013 | Cinza | MANTIDA + NORMALIZAÇÃO | Fonte real, inteira e orientada para a direita; o cenário é removido no processamento. |
| 2014 | Preta | SUBSTITUÍDA | Fonte anterior bloqueada/inadequada; nova fonte real, inteira, frente à direita. |
| 2014 | Vermelha | SUBSTITUÍDA | Fonte anterior tinha fundo de concessionária/checkerboard; nova fonte real e inteira. |
| 2014 | Azul | SUBSTITUÍDA | Fonte anterior tinha orientação/fundo inadequados; nova fonte real em fundo claro. |
| 2015 | Vermelha | MANTIDA | Fonte de imprensa limpa, inteira, frente à direita. |
| 2015 | Cinza | MANTIDA + NORMALIZAÇÃO | Fonte real; o checkerboard é removido pelo pipeline adaptativo. |
| 2015 | Preta | MANTIDA + NORMALIZAÇÃO | Fonte real; cenário externo é removido pelo pipeline adaptativo. |
| 2016 | Preta | SUBSTITUÍDA | Foi necessário usar uma imagem limpa da mesma configuração visual da transição 2016/2017, porque a fonte exata disponível estava em cenário inadequado. A entrada continua identificada como Fan 2016. |
| 2016 | Vermelha | MANTIDA + NORMALIZAÇÃO | Fonte real, frente à direita; fundo de anúncio removido. |
| 2016 | Cinza | MANTIDA + NORMALIZAÇÃO | Fonte real da Fan 160 2016, frente orientada à direita; fundo removido. |

### Parte 2 — 2017–2020

| Ano | Cor | Ação | Observação |
|---|---|---|---|
| 2017 | Preta | SUBSTITUÍDA | Fonte anterior tinha cenário externo; substituída por foto limpa da mesma configuração visual. |
| 2017 | Vermelha | MANTIDA | Fonte real limpa, inteira e orientada para a direita. |
| 2018 | Preta | MANTIDA + NORMALIZAÇÃO | Fonte exata do ano; cenário verde removido pelo pipeline. |
| 2018 | Branca | SUBSTITUÍDA | Foi a foto apontada anteriormente pelo usuário; substituída por outra fonte real mais adequada. |
| 2018 | Vermelha | SUBSTITUÍDA | Fonte anterior de garagem foi trocada por fonte real com enquadramento lateral/3⁄4 direito. |
| 2019 | Preta | MANTIDA | Fonte limpa em fundo claro, frente à direita. |
| 2019 | Vermelha | MANTIDA | Fonte limpa em fundo claro, frente à direita. |
| 2019 | Cinza | SUBSTITUÍDA | Fonte anterior externa trocada por fonte lateral em fundo claro. |
| 2020 | Prata | SUBSTITUÍDA | Fonte anterior indisponível; nova foto de estúdio real. |
| 2020 | Vermelha | SUBSTITUÍDA | Fonte anterior com cidade/cenário; nova foto de estúdio real. |
| 2020 | Preta | SUBSTITUÍDA | Fonte anterior externa; nova foto real com fundo uniforme para facilitar a transparência. |

### Parte 3 — 2021–2026

| Ano | Cor | Ação | Observação |
|---|---|---|---|
| 2021 | Prata | SUBSTITUÍDA | Fonte antiga usava uma imagem de 2020; corrigida para uma fonte identificada como Fan 2021. |
| 2021 | Preta | MANTIDA + NORMALIZAÇÃO | Fonte identificada como 2021; processamento uniforme remove o cenário. |
| 2021 | Vermelha | SUBSTITUÍDA | Fonte anterior tinha orientação para o lado errado; corrigida para uma fonte com frente à direita. |
| 2022 | Azul | SUBSTITUÍDA | Trocada por foto de estúdio real, fundo claro, frente à direita. |
| 2022 | Preta | MANTIDA | Foto de estúdio real, inteira e frente à direita. |
| 2022 | Vermelha | SUBSTITUÍDA | Trocada por foto de estúdio real, inteira e frente à direita. |
| 2023 | Prata | SUBSTITUÍDA | Fonte OLX de showroom foi trocada por foto de estúdio real. |
| 2023 | Preta | SUBSTITUÍDA | Fonte problemática foi trocada por foto de estúdio real. |
| 2023 | Vermelha | MANTIDA | Fonte real clara, inteira e frente à direita. |
| 2024 | Cinza | MANTIDA | Fonte Honda oficial, pronta para normalização. |
| 2024 | Preta | MANTIDA | Recorte de catálogo/versão, fundo uniforme/transparentizável. |
| 2024 | Vermelha | MANTIDA | Recorte de catálogo/versão, fundo uniforme/transparentizável. |
| 2025 | Azul | MANTIDA | Fonte Honda oficial; processamento transparente. |
| 2025 | Vermelha | MANTIDA | Fonte de catálogo/versão; processamento transparente. |
| 2025 | Preta | MANTIDA | Fonte de catálogo/versão; processamento transparente. |
| 2026 | Prata | MANTIDA | Fonte Honda oficial, recorte transparente. |
| 2026 | Preta | MANTIDA | Fonte Honda oficial, recorte transparente. |
| 2026 | Vermelha | MANTIDA | Fonte Honda oficial, recorte transparente. |

## Regras técnicas revisadas

O componente `RemoteMotorcycleImage` foi revisado para:

- construir uma paleta adaptativa a partir das bordas da foto, em vez de assumir fundo apenas branco;
- remover por flood-fill fundos claros, cinza, verdes, quentes e com padrões de parede/tile quando conectados às bordas;
- preservar componentes da motocicleta próximos à silhueta principal;
- manter canvas final de 1536×1024 e altura-alvo uniforme;
- usar as dimensões pós-recorte (`croppedW`/`croppedH`) ao calcular os pixels, evitando o bug que podia transformar uma foto válida em `Foto indisponível`;
- manter `historicalImage()` no fluxo de fontes remotas da Fan.

## Fontes problemáticas retiradas

Foram eliminados dos mapeamentos ativos os endereços anteriormente identificados como bloqueados, quebrados, com orientação inadequada ou excessivamente dependentes de cenário, incluindo fontes OLX/Webmotors/Pinimg que já tinham apresentado esse comportamento.

## Resultado estrutural

Todas as entradas Fan de 2013–2026 continuam cadastradas. Não foi adicionado nenhum ano 2012 ou anterior. Nenhum placeholder textual `Foto indisponível` foi adicionado.

Observação: este ambiente não possui as dependências completas do Vite nem acesso direto de navegador às imagens remotas, então a validação desta rodada é estrutural/configuracional; a renderização de pixels no navegador real continua sendo o teste definitivo do recorte transparente.
