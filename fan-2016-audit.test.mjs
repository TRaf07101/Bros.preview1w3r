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

test('Fan 2016 is its own model year and uses ESDi, not CBS/ABS', () => {
  assert.match(types, /'FAN-2016'/);
  assert.match(models, /'FAN-2016': \['ESD'\]/);
  const colors = models.match(/'FAN-2016': \{\n    ESD: options\(\[(.*?)\]\),/s)?.[1] ?? '';
  assert.match(colors, /preta/);
  assert.match(colors, /vermelha/);
  assert.match(colors, /cinza/);
  assert.match(models, /'FAN-2016': \{\s*ESD: \{[\s\S]*?REMOTE:FAN-2016-PRETA/);
  assert.match(dialogs, /<option value="FAN-2016">2016<\/option>/);
  assert.match(planner, /year === 'FAN-2016' \? 'CG 160 Fan 2016'/);
  assert.match(shell, /state\.profile\.year === 'FAN-2016'/);
});

test('Fan 2016 photos use three concrete real sources through historicalImage', () => {
  const aliases = ['REMOTE:FAN-2016-PRETA', 'REMOTE:FAN-2016-VERMELHA', 'REMOTE:FAN-2016-CINZA'];
  for (const alias of aliases) assert.match(models, new RegExp(alias));
  assert.match(models, /historicalImage\('https:\/\/3\.bp\.blogspot\.com\/-4F8exIsnndc\/V6UfInmF3kI\/AAAAAAACbZs\/RBn_-iTcWCsLPswczBl8tVyZa7MBhSQSQCLcB\/s1600\/Honda-CG-160-fan-2017-preta\.jpg'/);
  assert.match(models, /historicalImage\('https:\/\/img\.olx\.com\.br\/images\/77\/772628363559448\.jpg'/);
  assert.match(models, /historicalImage\('https:\/\/3\.bp\.blogspot\.com\/[^']*Honda_CG%2B160%2BFan%2B2016%2B%2B3_4traseira\.jpg'/);
  assert.doesNotMatch(models, /'FAN-2016'\s*:\s*\{\s*ESD:\s*\{[\s\S]*https?:\/\/[^']+\n/);
});

test('Fan 2016 uses the Honda 2016 manual and historical maintenance intervals', () => {
  assert.match(planner, /D2203-MAN-1025/);
  assert.match(data, /FAN_2016_REFERENCE/);
  assert.match(data, /year === 'FAN-2016'/);
  assert.match(data, /A cada 1\.000 km; verificar condição e folga antes do uso/);
  assert.match(data, /1\.000 km ou 6 meses da entrega, o que ocorrer primeiro/);
  assert.match(data, /O CBS era exclusivo da CG 160 Titan EX/);
  assert.match(dialogs, /Manual do Proprietário Honda CG 160 Fan\/Titan 2016/);
  assert.match(dialogs, /ESDi 2016: disco dianteiro e tambor traseiro/);
});
