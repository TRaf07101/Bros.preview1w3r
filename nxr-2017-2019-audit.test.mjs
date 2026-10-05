import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const models = fs.readFileSync(new URL('../src/maintenance/models.ts', import.meta.url), 'utf8');
const types = fs.readFileSync(new URL('../src/maintenance/types.ts', import.meta.url), 'utf8');

test('NXR exact years 2017-2019 exist with documented brake/color combinations', () => {
  assert.match(types, /'2017'.*'2018'.*'2019'/s);
  assert.match(models, /'2017': \['ESDD', 'ES'\]/);
  assert.match(models, /'2018': \['CBS', 'ES'\]/);
  assert.match(models, /'2019': \['CBS'\]/);
  for (const text of [
    '2017 · ESDD', 'Vermelha/Branca', 'Azul/Branca', '2017 · ES',
    '2018 · ESDD/CBS', 'Laranja/Branca', 'Vermelha/Preta', 'Azul/Preta', '2018 · versão de entrada',
    '2019 · ESDD/CBS', 'Branca/Vermelha', 'Laranja/Cinza'
  ]) assert.match(models, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});

test('exact-year photo aliases cover the combinations', () => {
  const aliases = [
    'REMOTE:2017-VERMELHA', 'REMOTE:2017-AZUL', 'REMOTE:2017-ES-PRETA', 'REMOTE:2017-ES-BRANCA',
    '2018-2019/cbs-laranja', '2018-2019/cbs-vermelha', '2018-2019/cbs-azul',
    '2019-2020/cbs-branca', 'REMOTE:2019-VERMELHA-PRETA', 'REMOTE:2019-LARANJA-CINZA', 'REMOTE:2019-AZUL-PRETA'
  ];
  for (const alias of aliases) assert.ok(models.includes(alias), `missing photo alias ${alias}`);
});

test('no pre-2013 years or explicit unavailable placeholder was added', () => {
  assert.doesNotMatch(models, /2011|2012/);
  assert.doesNotMatch(models, /Foto indisponível/);
  const exact2018Start = models.indexOf("'2018': {");
  const exact2018End = models.indexOf("'2019': {", exact2018Start);
  assert.ok(exact2018Start >= 0 && exact2018End > exact2018Start, 'missing exact 2018 color/photo block');
  assert.doesNotMatch(models.slice(exact2018Start, exact2018End), /REMOTE:2017-ES/);
});

test('exact 2018 and 2019 manuals are wired to their own year', () => {
  const planner = fs.readFileSync(new URL('../src/maintenance/planner.ts', import.meta.url), 'utf8');
  assert.match(planner, /year === '2018' \|\| year === '2018\/2019'/);
  assert.match(planner, /year === '2019' \|\| year === '2019\/2020'/);
});
