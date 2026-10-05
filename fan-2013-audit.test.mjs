import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
const types = fs.readFileSync(new URL('../src/maintenance/types.ts', import.meta.url), 'utf8');
const models = fs.readFileSync(new URL('../src/maintenance/models.ts', import.meta.url), 'utf8');
const planner = fs.readFileSync(new URL('../src/maintenance/planner.ts', import.meta.url), 'utf8');
const dialogs = fs.readFileSync(new URL('../src/ui/Dialogs.tsx', import.meta.url), 'utf8');
const data = fs.readFileSync(new URL('../src/maintenance/data.ts', import.meta.url), 'utf8');
const shell = fs.readFileSync(new URL('../src/ui/Shell.tsx', import.meta.url), 'utf8');

test('CG 150 Fan 2013 is a distinct model before the 2014 Fan', () => {
  assert.match(types, /'FAN-2013'/);
  assert.match(models, /'FAN-2013': \['ESD'\]/);
  assert.match(models, /'FAN-2013': \{[\s\S]*?preta[\s\S]*?vermelha[\s\S]*?cinza/);
  assert.match(dialogs, /<option value="FAN-2013">2013<\/option>/);
  assert.match(planner, /year === 'FAN-2013' \? 'CG 150 Fan 2013'/);
  assert.match(shell, /FAN-2013/);
  assert.doesNotMatch(planner, /FAN-2012/);
});

test('CG 150 Fan 2013 uses the official Honda manual and historical-photo aliases', () => {
  assert.match(planner, /CG%20150%20Fan%202013\.pdf/);
  assert.match(data, /FAN_2013_REFERENCE/);
  assert.match(models, /REMOTE:FAN-2013-PRETA/);
  assert.match(models, /REMOTE:FAN-2013-VERMELHA/);
  assert.match(models, /REMOTE:FAN-2013-CINZA/);
  assert.match(models, /REMOTE:FAN-2013-PRETA.*historicalImage\('https:\/\/img\.olx\.com\.br\/images\/54\/547698733530857\.jpg'\)/s);
  assert.match(models, /REMOTE:FAN-2013-VERMELHA.*historicalImage\('https:\/\/image.webmotors.com.br\/_fotos\/anunciousados\/gigante\/2026\/202601\/20260109\/hondacg_150_fan_esiwmimagem08353158122\.jpg'\)/s);
  assert.match(models, /REMOTE:FAN-2013-CINZA.*historicalImage\('https:\/\/image\.webmotors\.com\.br\/_fotos\/anunciousados\/gigante\/2026\/202602\/20260212\/hondacg_150_fan_esdiwmimagem10262305021\.jpg'\)/s);
  assert.doesNotMatch(models, /'FAN-2013':[^}]*Foto indisponível/);
});

test('CG 150 Fan 2013 has the manual maintenance intervals instead of inheriting 2025 rules', () => {
  assert.match(data, /year === 'FAN-2013'/);
  assert.match(data, /A cada 16\.000 km/);
  assert.match(data, /A cada 4\.000 km/);
  assert.match(data, /1\.000 km ou 6 meses; segunda revisão em 4\.000 km ou 12 meses/);
  const start = data.indexOf("if (year === 'FAN-2013')");
  const end = data.indexOf("if (year === 'FAN-2014')", start);
  const branch = data.slice(start, end >= 0 ? end : undefined);
  assert.ok(branch.includes("id === 'chain' ? 'A cada 1.000 km; verificar antes de pilotar'"));
  assert.ok(!branch.includes('500 km'));
});
