import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
const models = fs.readFileSync(new URL('../src/maintenance/models.ts', import.meta.url), 'utf8');



test('Fan 2021 is registered with CBS, official colors and concrete photo sources', () => {
  assert.match(models, /'2021': \['CBS'\]/);
  const block = models.match(/'2021': \{\n    CBS: options\(\[(.*?)\]\),/s)?.[1] ?? '';
  assert.match(block, /prata/);
  assert.match(block, /preta/);
  assert.match(block, /vermelha/);
  const photos = models.match(/'2021': \{\n      CBS: \{(.*?)\n      \},/s)?.[1] ?? '';
  assert.match(photos, /img\.olx\.com\.br/);
  assert.equal((photos.match(/https:\/\//g) || []).length, 3);
});

test('Fan 2022 is registered with CBS, official colors and concrete photo sources', () => {
  assert.match(models, /'2022': \['CBS'\]/);
  const block = models.match(/'2022': \{\n    CBS: options\(\[(.*?)\]\),/s)?.[1] ?? '';
  assert.match(block, /azul/);
  assert.match(block, /vermelha/);
  assert.match(block, /preta/);
  const photos = models.match(/'2022': \{\n      CBS: \{(.*?)\n      \},/s)?.[1] ?? '';
  assert.match(photos, /motonewsbrasil\.com/);
  assert.equal((photos.match(/https:\/\//g) || []).length, 3);
});


test('Fan 2022 uses the Fan maintenance rules rather than legacy NXR rules', () => {
  const data = fs.readFileSync(new URL('../src/maintenance/data.ts', import.meta.url), 'utf8');
  assert.match(data, /if \(year === '2021'\)/);
  assert.match(data, /if \(year === '2022' \|\| year === '2023'/);
  assert.match(data, /FAN_2022_REFERENCE/);
});

test('Fan 2024 is registered with CBS and the official colors', () => {
  assert.match(models, /'2024': \['CBS'\]/);
  const block = models.match(/'2024': \{\n    CBS: options\(\[(.*?)\]\),/s)?.[1] ?? '';
  assert.match(block, /cinza/);
  assert.match(block, /preta/);
  assert.match(block, /vermelha/);
});

test('Fan 2025 is registered with CBS and all three official colors', () => {
  assert.match(models, /'2025': \['CBS'\]/);
  assert.match(models, /2025 · CG 160 Fan · CBS/);
  assert.match(models, /azul/);
  assert.match(models, /preta/);
  assert.match(models, /vermelha/);
});

test('2026 Fan has the current three official colors and concrete photo sources', () => {
  const block = models.match(/'2026': \{\n    CBS: options\(\[(.*?)\]\),/s)?.[1] ?? '';
  assert.match(block, /prata/);
  assert.match(block, /preta/);
  assert.match(block, /vermelha/);
  assert.doesNotMatch(block, /azul/);
  const photos = models.match(/'2026': \{\n      CBS: \{(.*?)\n      \},/s)?.[1] ?? '';
  assert.match(photos, /honda\.com\.br/);
  assert.doesNotMatch(photos, /REMOTE:FAN-2026/);
});

test('2013 photo sources no longer use the previously failing Motos Motor URLs', () => {
  assert.doesNotMatch(models, /motos-motor\.com\.br\/fotos\/2012\/07\/nxr-150-bros2013-(preta|verde)\.jpg/);
  assert.match(models, /img\.olx\.com\.br\/images\/29\/290674496180864\.jpg/);
  assert.match(models, /catarina-prd\.s3\.sa-east-1\.amazonaws\.com\/b261837f50e9f152ff745a2abcacf5bf\.webp/);
});

test('Fan 2023 is registered with CBS and the verified three-color lineup', () => {
  assert.match(models, /'2023': \['CBS'\]/);
  const block = models.match(/'2023': \{\n    CBS: options\(\[(.*?)\]\),/s)?.[1] ?? '';
  assert.match(block, /prata/);
  assert.match(block, /preta/);
  assert.match(block, /vermelha/);
  assert.match(models, /motonewsbrasil\.com\/wp-content\/uploads\/2022\/08\/honda-cg-160-fan-2023-prata-1\.jpg/);
  assert.match(models, /motonewsbrasil\.com\/wp-content\/uploads\/2022\/08\/honda-cg-160-fan-2023-preta-3\.jpg/);
  assert.match(models, /motoragora\.com\.br\/wp-content\/uploads\/2022\/06\/cg-160-fan-2023-cor-vermelha/);
});

test('mega audit: no configured photo placeholder and no model year below 2013', () => {
  assert.doesNotMatch(models, /Foto indisponível/);
  assert.match(models, /'FAN-2017': \{[\s\S]*?REMOTE:FAN-2017-PRETA[\s\S]*?REMOTE:FAN-2017-VERMELHA/);
  const remoteAliases = [...models.matchAll(/REMOTE:FAN-[A-Z0-9-]+/g)].map(m => m[0]);
  for (const alias of remoteAliases) {
    assert.match(models, new RegExp(`aliased === '${alias}'`));
  }
  assert.doesNotMatch(models, /2\.bp\.blogspot\.com\/-luH9xuCbZWE/);
  assert.doesNotMatch(models, /2011|2012/);
});
