import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(process.cwd());
const models = fs.readFileSync(path.join(root,'src/maintenance/models.ts'),'utf8');
const planner = fs.readFileSync(path.join(root,'src/maintenance/planner.ts'),'utf8');
const data = fs.readFileSync(path.join(root,'src/maintenance/data.ts'),'utf8');

test('NXR 2023 and 2024 are distinct CBS model years with three color entries', () => {
  for (const y of ['NXR-2023','NXR-2024']) assert.match(models, new RegExp(`'${y}': \\['CBS'\\]`));
  assert.match(models, /'NXR-2023': \{[\s\S]*?preta.*?vermelha.*?branca/);
  assert.match(models, /'NXR-2024': \{[\s\S]*?preta.*?vermelha.*?branca/);
});

test('NXR 2025 exposes CBS and ABS with only the documented colors', () => {
  assert.match(models, /'NXR-2025': \['CBS', 'ABS'\]/);
  assert.match(models, /'NXR-2025': \{[\s\S]*?cinza[\s\S]*?vermelha[\s\S]*?ABS: options\(\[[\s\S]*?preta[\s\S]*?vermelha/);
});

test('NXR 2025 is treated as the new-generation maintenance branch', () => {
  assert.match(planner, /'NXR-2025'/);
  assert.match(data, /NXR-2025/);
  assert.match(planner, /NXR-2025/);
});

test('NXR next-three image mappings use existing local assets or official Honda source', () => {
  assert.match(models, /'NXR-2023':[\s\S]*?2023-2024\/cbs/);
  assert.match(models, /'NXR-2024':[\s\S]*?2024-2025\/cbs/);
  assert.match(models, /'NXR-2025':[\s\S]*?honda\.com\.br/);
});


test('Next-three entries do not contain placeholder photo labels', () => {
  assert.doesNotMatch(models, /NXR-2023[\s\S]{0,1200}Foto indisponível/);
  assert.doesNotMatch(models, /NXR-2024[\s\S]{0,1200}Foto indisponível/);
  assert.doesNotMatch(models, /NXR-2025[\s\S]{0,1400}Foto indisponível/);
});
