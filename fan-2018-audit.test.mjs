import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const types = fs.readFileSync(new URL('../src/maintenance/types.ts', import.meta.url), 'utf8');
const models = fs.readFileSync(new URL('../src/maintenance/models.ts', import.meta.url), 'utf8');
const data = fs.readFileSync(new URL('../src/maintenance/data.ts', import.meta.url), 'utf8');
const planner = fs.readFileSync(new URL('../src/maintenance/planner.ts', import.meta.url), 'utf8');
const dialogs = fs.readFileSync(new URL('../src/ui/Dialogs.tsx', import.meta.url), 'utf8');
const shell = fs.readFileSync(new URL('../src/ui/Shell.tsx', import.meta.url), 'utf8');

test('Fan 2018 has a distinct internal id so NXR 2018 remains separate', () => {
  assert.match(types, /'FAN-2018'/);
  assert.match(models, /'FAN-2018': \['CBS'\]/);
  assert.match(models, /'FAN-2018': \{\s*CBS: options\(\[/s);
  assert.match(models, /'2018': \{\s*CBS: options\(/s);
});

test('Fan 2018 exposes the three configured colors and concrete photo sources', () => {
  const colorBlock = models.match(/'FAN-2018': \{\s*CBS: options\(\[(.*?)\]\),/s)?.[1] ?? '';
  assert.match(colorBlock, /preta/);
  assert.match(colorBlock, /branca/);
  assert.match(colorBlock, /vermelha/);
  const photoBlock = models.match(/'FAN-2018': \{\s*CBS: \{(.*?)\n      \},/s)?.[1] ?? '';
  assert.match(photoBlock, /webmotors\.com\.br/);
  assert.match(photoBlock, /olx\.com\.br/);
  assert.equal((photoBlock.match(/https:\/\//g) || []).length, 3);
  assert.match(photoBlock, /17570749017/);
  assert.match(photoBlock, /726671015634672/);
  assert.doesNotMatch(photoBlock, /850642615286860/);
});

test('Fan 2018 uses the official Honda 2018 manual and Fan service scope', () => {
  assert.match(planner, /D2203-MAN-1141/);
  assert.match(data, /FAN_2018_REFERENCE/);
  assert.match(data, /if \(year === 'FAN-2018'\)/);
  assert.match(data, /A cada 1\.000 km; verificar condição e folga antes do uso/);
});

test('Fan 2018 is wired through the selector, source dialog and hero', () => {
  assert.match(dialogs, /<option value="FAN-2018">2018<\/option>/);
  assert.match(dialogs, /selectedYear === 'FAN-2018'/);
  assert.match(shell, /state\.profile\.year === 'FAN-2018'/);
  assert.match(planner, /year === 'FAN-2018' \? 'CG 160 Fan 2018'/);
});

test('No newly registered Fan id goes below 2013', () => {
  assert.doesNotMatch(models, /FAN-20(?:0[0-9]|1[0-2])/);
  assert.doesNotMatch(types, /FAN-20(?:0[0-9]|1[0-2])/);
});
