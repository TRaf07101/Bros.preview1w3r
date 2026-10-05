import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const types = readFileSync(new URL('../src/maintenance/types.ts', import.meta.url), 'utf8');
const models = readFileSync(new URL('../src/maintenance/models.ts', import.meta.url), 'utf8');
const data = readFileSync(new URL('../src/maintenance/data.ts', import.meta.url), 'utf8');
const planner = readFileSync(new URL('../src/maintenance/planner.ts', import.meta.url), 'utf8');
const dialogs = readFileSync(new URL('../src/ui/Dialogs.tsx', import.meta.url), 'utf8');
const shell = readFileSync(new URL('../src/ui/Shell.tsx', import.meta.url), 'utf8');

test('Fan 2017 has its own internal id and does not collide with NXR 2017', () => {
  assert.match(types, /'FAN-2017'/);
  assert.match(models, /'FAN-2017': \['CBS'\]/);
  assert.match(models, /'FAN-2017': \{\s*CBS: options\(\[\s*\['preta'/s);
  assert.match(models, /\['vermelha', 'Vermelha'/);
  assert.match(dialogs, /<option value="FAN-2017">2017<\/option>/);
  assert.match(planner, /year === 'FAN-2017' \? 'CG 160 Fan 2017'/);
  assert.match(shell, /state\.profile\.year === 'FAN-2017'/);
});

test('Fan 2017 uses the official Honda manual D2203-MAN-1082 and 1,000 km chain interval', () => {
  assert.match(planner, /D2203-MAN-1082/);
  assert.match(data, /FAN_2017_REFERENCE/);
  assert.match(data, /year === 'FAN-2017'/);
  assert.match(data, /A cada 1\.000 km; verificar condição e folga antes do uso/);
});

test('Fan 2017 photos use concrete historical sources through the background-removal pipeline', () => {
  assert.match(models, /REMOTE:FAN-2017-PRETA/);
  assert.match(models, /REMOTE:FAN-2017-VERMELHA/);
  assert.match(models, /3\.bp\.blogspot\.com\/-4F8exIsnndc\/V6UfInmF3kI\/AAAAAAACbZs\/RBn_-iTcWCsLPswczBl8tVyZa7MBhSQSQCLcB\/s1600\/Honda-CG-160-fan-2017-preta\.jpg/);
  assert.match(models, /encontracarros\.com\.br\/upload\/honda-motos\/honda-cg-160-fan_2017_02\.jpg/);
  assert.match(models, /historicalImage\('https:\/\/3\.bp\.blogspot\.com\/-4F8exIsnndc\/V6UfInmF3kI\/AAAAAAACbZs\/RBn_-iTcWCsLPswczBl8tVyZa7MBhSQSQCLcB\/s1600\/Honda-CG-160-fan-2017-preta\.jpg'\)/);
});

test('Fan range remains within the 2013+ cutoff', () => {
  assert.match(types, /FAN-2016/);
  assert.match(types, /FAN-2015/);
  assert.match(types, /FAN-2014/);
  assert.match(types, /'FAN-2013'/);
  assert.doesNotMatch(types, /FAN-20(?:0[0-9]|1[0-2])/);
});
