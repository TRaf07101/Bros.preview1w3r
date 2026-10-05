import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const types = fs.readFileSync(new URL('src/maintenance/types.ts', root), 'utf8');
const models = fs.readFileSync(new URL('src/maintenance/models.ts', root), 'utf8');
const data = fs.readFileSync(new URL('src/maintenance/data.ts', root), 'utf8');
const planner = fs.readFileSync(new URL('src/maintenance/planner.ts', root), 'utf8');
const dialogs = fs.readFileSync(new URL('src/ui/Dialogs.tsx', root), 'utf8');
const shell = fs.readFileSync(new URL('src/ui/Shell.tsx', root), 'utf8');

test('Fan 2015 is an isolated model year and keeps the 2013+ cutoff', () => {
  assert.match(types, /'FAN-2015'/);
  assert.match(models, /'FAN-2015': \['ESD'\]/);
  const colorBlock = models.match(/'FAN-2015': \{\s*ESD: options\(\[(.*?)\]\),/s)?.[1] ?? '';
  assert.match(colorBlock, /vermelha/);
  assert.match(colorBlock, /cinza/);
  assert.match(colorBlock, /preta/);
  assert.match(dialogs, /<option value="FAN-2015">2015<\/option>/);
  assert.match(planner, /year === 'FAN-2015' \? 'CG 160 Fan 2015'/);
  assert.match(shell, /state\.profile\.year === 'FAN-2015'/);
  assert.doesNotMatch(dialogs, /<option value="2012">|<option value="2011">|<option value="2010">/);
});

test('Fan 2015 photos use concrete sources through historicalImage', () => {
  for (const alias of ['REMOTE:FAN-2015-VERMELHA', 'REMOTE:FAN-2015-CINZA', 'REMOTE:FAN-2015-PRETA']) assert.match(models, new RegExp(alias));
  assert.match(models, /historicalImage\('https:\/\/www\.supertopmotor\.com\.br\/wp-content\/uploads\/2015\/12\/11081509314828\.jpg'/);
  assert.match(models, /historicalImage\('https:\/\/http2\.mlstatic\.com\/D_771394-MLB81499369370_012025-C\.jpg'/);
  assert.match(models, /historicalImage\('https:\/\/img\.olx\.com\.br\/images\/47\/479687860142623\.jpg'/);
  assert.doesNotMatch(models, /'FAN-2015'\s*:\s*\{[\s\S]*?Foto indisponível/);
});

test('Fan 2015 uses the Honda 2016 technical manual as the reference for the 2015 launch line', () => {
  assert.match(planner, /D2203-MAN-1025/);
  assert.match(data, /FAN_2015_REFERENCE/);
  assert.match(data, /year === 'FAN-2015'/);
  assert.match(dialogs, /documentação de lançamento da CG 160 Fan de 2015/);
  assert.match(dialogs, /ESDi 2015: disco dianteiro e tambor traseiro/);
});
