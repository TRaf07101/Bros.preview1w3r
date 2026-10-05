import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
const models = fs.readFileSync(new URL('../src/maintenance/models.ts', import.meta.url), 'utf8');
const planner = fs.readFileSync(new URL('../src/maintenance/planner.ts', import.meta.url), 'utf8');
const data = fs.readFileSync(new URL('../src/maintenance/data.ts', import.meta.url), 'utf8');
const dialogs = fs.readFileSync(new URL('../src/ui/Dialogs.tsx', import.meta.url), 'utf8');
const shell = fs.readFileSync(new URL('../src/ui/Shell.tsx', import.meta.url), 'utf8');
const types = fs.readFileSync(new URL('../src/maintenance/types.ts', import.meta.url), 'utf8');

test('CG 150 Fan ESDi 2014 is a separate 2014+ Fan generation', () => {
  assert.match(types, /'FAN-2014'/);
  assert.match(models, /'FAN-2014': \['ESD'\]/);
  assert.match(models, /'FAN-2014': \{[\s\S]*?preta[\s\S]*?vermelha[\s\S]*?azul/);
  assert.match(planner, /FAN-2014/);
  assert.match(planner, /CG 150 Fan 2014/);
  assert.match(planner, /CG%20150%20Fan%202014\.pdf/);
  assert.match(data, /FAN_2014_REFERENCE/);
  assert.match(data, /D2203-MAN-0945/);
  assert.match(dialogs, /<option value="FAN-2014">2014<\/option>/);
  assert.match(dialogs, /Honda CG 150 Fan ESDi 2014/);
  assert.match(shell, /FAN-2014/);
});

test('2014 Fan photos use concrete model-year remote sources through historicalImage', () => {
  assert.match(models, /REMOTE:FAN-2014-VERMELHA/);
  assert.match(models, /REMOTE:FAN-2014-PRETA/);
  assert.match(models, /REMOTE:FAN-2014-AZUL/);
  assert.match(models, /REMOTE:FAN-2014-VERMELHA.*historicalImage\('https:\/\/img\.olx\.com\.br\/images\/68\/687529467194262\.jpg'\)/s);
  assert.match(models, /REMOTE:FAN-2014-PRETA.*historicalImage\('https:\/\/img\.olx\.com\.br\/images\/49\/495675481515725\.jpg'\)/s);
  assert.match(models, /REMOTE:FAN-2014-AZUL.*historicalImage\('https:\/\/www\.encontracarros\.com\.br\/upload\/honda-motos\/nova-honda-cg-2014-fan-150\.jpg'\)/s);
  assert.doesNotMatch(models, /'FAN-2014':[\s\S]*Foto indisponível/);
});

test('2014 Fan keeps its older maintenance intervals', () => {
  assert.match(data, /year === 'FAN-2014'/);
  assert.match(data, /A cada 1\.000 km/);
  assert.match(data, /A cada 16\.000 km/);
  assert.match(data, /substituir a cada 2 anos/);
  assert.match(planner, /'FAN-2014'.*'FAN-2015'/s);
});
