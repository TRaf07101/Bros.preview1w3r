import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const models = fs.readFileSync(path.join(root, 'src/maintenance/models.ts'), 'utf8');
const types = fs.readFileSync(path.join(root, 'src/maintenance/types.ts'), 'utf8');
const planner = fs.readFileSync(path.join(root, 'src/maintenance/planner.ts'), 'utf8');
const data = fs.readFileSync(path.join(root, 'src/maintenance/data.ts'), 'utf8');
const dialogs = fs.readFileSync(path.join(root, 'src/ui/Dialogs.tsx'), 'utf8');

test('CG 160 Cargo 2026 is a distinct family/model with CBS, color and image', () => {
  assert.match(types, /'CARGO-2026'/);
  assert.match(types, /'CARGO'/);
  assert.match(models, /'CARGO-2026': \['CBS'\]/);
  assert.match(models, /'CARGO-2026'[\s\S]*?branca: 'https:\/\/updev2\.honda\.com\.br\/motos\/sites\/hda\/files\/2025-08\/Imagem-Home-CG%20160-Cargo-Branco\.webp'/);
  assert.match(dialogs, /\['CARGO','CG 160 Cargo'\]/);
});

test('Cargo 2026 uses official-model source scope and Cargo maintenance reference', () => {
  assert.match(data, /CARGO_SOURCE_SCOPE/);
  assert.match(data, /CARGO_2026_MAINTENANCE_REFERENCE/);
  assert.match(data, /year === 'CARGO-2026'/);
  assert.match(planner, /year === 'CARGO-2026'/);
  assert.match(planner, /CG 160 Cargo 2026/);
});


test('CG 160 Cargo 2025 is a distinct previous-year model with official photo/source', () => {
  assert.match(types, /'CARGO-2025'/);
  assert.match(models, /'CARGO-2025': \['CBS'\]/);
  assert.match(models, /'CARGO-2025'[\s\S]*?lateral-nova-motocicleta-honda-cargo-2025-prata-e-preto\.webp/);
  assert.match(dialogs, /CARGO-2025/);
  assert.match(planner, /CG 160 Cargo 2025/);
  assert.match(data, /CARGO_2025_REFERENCE/);
});
