import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const models = fs.readFileSync(new URL('../src/maintenance/models.ts', import.meta.url), 'utf8');
const remote = fs.readFileSync(new URL('../src/ui/RemoteMotorcycleImage.tsx', import.meta.url), 'utf8');

const combinations = [
  ['2013', 'ES', 'vermelha'], ['2013', 'ES', 'preta'], ['2013', 'ES', 'verde'],
  ['2013', 'ESD', 'vermelha'], ['2013', 'ESD', 'preta'], ['2013', 'ESD', 'verde'],
  ...['ES', 'ESD'].flatMap(v => ['vermelha','branca','preta'].map(c => ['2014',v,c])),
  ...['ESD', 'ESDD'].flatMap(v => ['vermelha','branca','preta'].map(c => ['2015',v,c])),
  ...['vermelha','branca','preta'].map(c => ['2015/2016','ESDD',c]),
  ...[['2016','ES','vermelha'],['2016','ES','preta'],['2016','ESDD','vermelha'],['2016','ESDD','branca'],['2016','ESDD','preta']],
  ...[['2016/2017','ESDD','vermelha'],['2016/2017','ESDD','azul'],['2016/2017','ES','preta'],['2016/2017','ES','branca']],
  ...[['2017/2018','ESDD','vermelha'],['2017/2018','ESDD','azul'],['2017/2018','ES','preta'],['2017/2018','ES','branca']],
  ...[['2017','ESDD','vermelha'],['2017','ESDD','azul'],['2017','ES','preta'],['2017','ES','branca']],
  ...[['2018','CBS','laranja'],['2018','CBS','vermelha'],['2018','CBS','azul'],['2018','ES','preta'],['2018','ES','branca']],
  ...[['2019','CBS','branca'],['2019','CBS','vermelha'],['2019','CBS','azul'],['2019','CBS','laranja']],
];

test('historical NXR scope contains no 2011/2012 model entries', () => {
  assert.equal(/\n\s*['"]2011['"]\s*:|\n\s*['"]2012['"]\s*:/.test(models), false);
});

test('all 2013–2017 declared variants/colors exist in the source', () => {
  const yearVariants = new Set(combinations.map(([y,v]) => `${y}|${v}`));
  for (const key of yearVariants) {
    const [year, variant] = key.split('|');
    assert.ok(models.includes(`'${year}'`), `missing year ${year}`);
    assert.ok(models.includes(`${variant}:`), `missing variant label ${variant}`);
  }
});

test('critical photo sources are present', () => {
  for (const needle of [
    'Honda-NXR-150-Bros-2013.jpg',
    'Honda-NX-150-Bros-Flex-2014.jpg',
    'Pqx42',
    '2D8A4645LR.jpg',
    'Nova-Honda-NRX-160-Bros-2015-7-600x400.jpg',
    'honda_NXR_160_Bros_2016_1_18092015_204_960_720.jpg',
    'honda-nxr-160-bros-2017-chega-com-novas-cores-e-preco-inicial-de-r-9990.jpg',
  ]) assert.ok(models.includes(needle), `missing source ${needle}`);
});

test('remote photos use direct visibility plus opportunistic transparent processing', () => {
  assert.ok(remote.includes('cropUniformFraming'));
  assert.ok(remote.includes('neutralizeDarkColorCast'));
  assert.ok(remote.includes('toDataURL(\'image/webp\''));
  assert.ok(remote.includes('const displaySource = processed ?? visibleSource'));
});

test('2013 previous generation remains NXR150 with ES/ESD and official colors only', () => {
  assert.match(models, /'2013': \['ES', 'ESD'\]/);
  assert.ok(models.includes("['vermelha', 'Vermelha', '2013 · NXR 150 Bros']"));
  assert.ok(models.includes("['preta', 'Preta', '2013 · NXR 150 Bros']"));
  assert.ok(models.includes("['verde', 'Verde', '2013 · NXR 150 Bros']"));
});
