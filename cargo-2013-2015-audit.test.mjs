import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const [types, models, data, planner, dialogs, shell, print] = ['src/maintenance/types.ts','src/maintenance/models.ts','src/maintenance/data.ts','src/maintenance/planner.ts','src/ui/Dialogs.tsx','src/ui/Shell.tsx','src/ui/PrintPlan.tsx'].map(read);

for (const y of ['2013', '2014', '2015']) {
  test(`CG 150 Cargo ${y} é um modelo ESD próprio (sem CBS/ABS), com cor, foto, manual e telas`, () => {
    assert.match(types, new RegExp(`'CARGO-${y}'`));
    assert.match(models, new RegExp(`'CARGO-${y}': \\['ESD'\\]`));
    assert.match(models, new RegExp(`'CARGO-${y}': \\{\\s*ESD: options`));
    assert.match(models, new RegExp(`'CARGO-${y}': \\{\\s*ESD: \\{\\s*branca:`));
    assert.match(planner, new RegExp(`CG 150 Cargo ${y}`));
    assert.match(planner, new RegExp(`CG%20150%20Cargo%20${y === '2013' ? '2014' : y}\\.pdf`));
    assert.match(dialogs, new RegExp(`<option value="CARGO-${y}">${y}</option>`));
    assert.match(dialogs, new RegExp(`selectedYear === 'CARGO-${y}'`));
    assert.match(shell, new RegExp(`'CARGO-${y}'`));
    assert.match(data, new RegExp(`CARGO_${y}_REFERENCE`));
    assert.match(data, new RegExp(`CARGO_${y}_SOURCE_SCOPE`));
  });
}

test('Cargo 150 usa ciclo 1.000 / 4.000 km e não herda a tabela de 6.000 km da Cargo 160', () => {
  assert.match(planner, /usesCycle4000 = \(year: ModelYear\): boolean => \[[^\]]*'CARGO-2013', 'CARGO-2014', 'CARGO-2015'(?:, 'START-2015')?\]/);
  assert.match(print, /profile\.year === 'CARGO-2013' \|\| profile\.year === 'CARGO-2014' \|\| profile\.year === 'CARGO-2015'/);
  assert.match(data, /year === 'CARGO-2013' \|\| year === 'CARGO-2014' \|\| year === 'CARGO-2015'\) \{\s*\/\/[^\n]*\n\s*const yearTable/);
  assert.match(data, /year === 'CARGO-2013' \|\| year === 'CARGO-2014' \|\| year === 'CARGO-2015'\) \{\s*const ids/);
});

test('Cargo 150: valores do manual (corrente 15–25 mm, óleo 1,0 L, vela, intervalos)', () => {
  assert.match(data, /A folga correta é 15–25 mm/);
  assert.match(data, /SAE 10W-30 SJ/);
  assert.match(data, /Capacidade na troca: 1,0 litro/);
  assert.match(data, /'fuel-filter': \{\s*frequency: 'A cada 12\.000 km', kmInterval: 12000/);
  assert.match(data, /air: \{\s*frequency: 'A cada 16\.000 km', kmInterval: 16000/);
  assert.match(data, /'brake-fluid': \{\s*frequency: 'A cada 2 anos', timeMonths: 24/);
});

test('Cargo 2014 e 2015 diferem onde os manuais diferem', () => {
  assert.match(data, /folga do pedal do freio traseiro é de 15–25 mm/);
  assert.match(data, /folga do pedal do freio traseiro é de 20–30 mm/);
  assert.match(data, /DID 428MX ou RK 428SB\./);
  assert.match(data, /DID 428MX-118LE ou RK 428SB-118LE/);
  assert.match(data, /CARGO_150_IDS_2015 = \[\.\.\.CARGO_150_IDS_2014, 'slider', 'fork-oil', 'rear-suspension-lube', 'lockset'\]/);
});

test('Cargo 2013 usa o manual da Cargo 2014 e avisa que não há manual próprio', () => {
  assert.match(data, /Não encontrei na Honda um manual específico da CG 150 Cargo ESD 2013/);
  assert.match(data, /year === 'CARGO-2013' && entry\.notes/);
  assert.match(data, /const yearTable = year === 'CARGO-2015' \? CARGO_150_2015 : CARGO_150_2014/);
  assert.match(dialogs, /sem manual próprio: segue o manual da Cargo 2014/);
  assert.match(shell, /Cargo 2013: manual próprio não encontrado/);
});

test('Cargo 2014: verificação e troca da vela a cada 8.000 km (tabela do manual, p. 6-2)', () => {
  const block = data.slice(data.indexOf('const CARGO_150_2014'), data.indexOf('const CARGO_150_2015'));
  assert.match(block, /'spark-inspect': \{\s*kmInterval: 8000, frequency: 'A cada 8\.000 km'/);
  assert.match(block, /Troque a vela de ignição a cada 8\.000 km/);
});

test('Cargo 2015: verificação da vela a cada 4.000 km e troca a cada 8.000 km', () => {
  const block = data.slice(data.indexOf('const CARGO_150_2015'), data.indexOf('// Remove chaves undefined'));
  assert.match(block, /'spark-inspect': \{\s*kmInterval: 4000, frequency: 'A cada 4\.000 km'/);
  assert.match(block, /Troque a vela de ignição a cada 8\.000 km/);
});

test('Cargo 2015: pneus e vela com valores da página 107 e 108 do manual de 2015', () => {
  const block = data.slice(data.indexOf('const CARGO_150_2015'), data.indexOf('// Remove chaves undefined'));
  assert.match(block, /dianteiro 175 kPa \(25 psi\) e traseiro 200 kPa \(29 psi\)/);
  assert.match(block, /1,5 mm no dianteiro e 2,0 mm no traseiro/);
  assert.match(block, /NGK CPR8EA-9 \(ou CPR9EA-9, opcional\)/);
  assert.match(block, /página impressa 107/);
  assert.match(block, /página impressa 108/);
});

test('Cargo 150: etapa de 1.000 km segue a coluna marcada de cada manual', () => {
  const fn = planner.slice(planner.indexOf('const cargo150Km1000Ids'), planner.indexOf('export function milestoneAt'));
  assert.match(fn, /year === 'CARGO-2015'\s*\? \['first-review', 'chain', 'tires', 'oil', 'valves', 'idle', 'brakes', 'clutch', 'suspension', 'fasteners', 'wheels', 'steering'\]\s*: \['first-review', 'chain', 'tires', 'oil', 'valves', 'idle', 'brakes', 'clutch', 'fasteners', 'wheels', 'steering'\]/);
  assert.match(planner, /\/\^CARGO-201\[345\]\$\/\.test\(year\) \? cargo150Km1000Ids\(year\)/);
  assert.doesNotMatch(planner, /confira no PDF original a coluna de 1\.000 km/);
  assert.doesNotMatch(data, /não puderam ser conferidas na leitura do texto/);
});

test('Cargo 150: todos os ids da etapa de 1.000 km existem na lista de serviços de cada ano', () => {
  const ids2014 = data.match(/const CARGO_150_IDS_2014 = \[([^\]]*)\]/)[1];
  for (const id of ['oil', 'valves', 'idle', 'brakes', 'clutch', 'fasteners', 'wheels', 'steering', 'suspension']) assert.ok(ids2014.includes(`'${id}'`), id);
});
