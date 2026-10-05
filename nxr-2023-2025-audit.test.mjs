import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(process.cwd());
const models = fs.readFileSync(path.join(root,'src/maintenance/models.ts'),'utf8');
const types = fs.readFileSync(path.join(root,'src/maintenance/types.ts'),'utf8');
const planner = fs.readFileSync(path.join(root,'src/maintenance/planner.ts'),'utf8');
const dialogs = fs.readFileSync(path.join(root,'src/ui/Dialogs.tsx'),'utf8');
const assets = new Set(fs.readdirSync(path.join(root,'public/images/motorcycles')));

function assetExists(alias) {
  if (alias.startsWith('http')) return true;
  return assets.has(`bros-${alias.replaceAll('/', '-')}.webp`);
}

test('new NXR year keys are in the type and selectable as NXR model years', () => {
  for (const y of ['NXR-2023','NXR-2024','NXR-2025']) assert.match(types, new RegExp(y));
  for (const y of ['NXR-2023','NXR-2024','NXR-2025']) assert.match(dialogs, new RegExp(`value=\\\"${y}\\\"`));
});

test('NXR 2023 and 2024 have only CBS and three documented base colors', () => {
  assert.match(models, /'NXR-2023': \['CBS'\]/);
  assert.match(models, /'NXR-2024': \['CBS'\]/);
  assert.match(models, /'NXR-2023': \{[\s\S]*?preta[\s\S]*?vermelha[\s\S]*?branca/);
  assert.match(models, /'NXR-2024': \{[\s\S]*?preta[\s\S]*?vermelha[\s\S]*?branca/);
});

test('NXR 2025 has the official CBS/ABS split and color sets', () => {
  assert.match(models, /'NXR-2025': \['CBS', 'ABS'\]/);
  assert.match(models, /'NXR-2025': \{[\s\S]*?cinza[\s\S]*?vermelha[\s\S]*?ABS:[\s\S]*?preta[\s\S]*?vermelha/);
  assert.match(planner, /NXR 160 Bros 2025/);
  assert.match(planner, /honda\/nxr-160-bros-2025\/manual/);
});

test('new NXR image aliases resolve to known local assets or official remote sources', () => {
  for (const expected of ['2023-2024/cbs-preta','2023-2024/cbs-vermelha','2023-2024/cbs-branca','2024-2025/cbs-preta','2024-2025/cbs-vermelha','2024-2025/cbs-branca','2025-2026/cbs-vermelha','2025-2026/abs-vermelha']) assert.ok(assetExists(expected), expected);
  assert.match(models, /NXR-2025[\s\S]*?honda\.com\.br/);
});
