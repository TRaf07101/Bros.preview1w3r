import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const models = fs.readFileSync(path.join(root, 'src/maintenance/models.ts'), 'utf8');
const planner = fs.readFileSync(path.join(root, 'src/maintenance/planner.ts'), 'utf8');
const data = fs.readFileSync(path.join(root, 'src/maintenance/data.ts'), 'utf8');
const dialogs = fs.readFileSync(path.join(root, 'src/ui/Dialogs.tsx'), 'utf8');
const assets = fs.readdirSync(path.join(root, 'public/images/motorcycles'));

assert.match(models, /'NXR-2026': \['CBS', 'ABS'\]/);
assert.match(models, /'NXR-2026': \{[\s\S]*?CBS: options\(\[[\s\S]*?'azul'[\s\S]*?'vermelha'[\s\S]*?\]\), ABS: options\(\[[\s\S]*?'cinza'[\s\S]*?'vermelha'/);
assert.match(models, /'NXR-2026': \{[\s\S]*?'CBS':?\s*\{|CBS:\s*\{[\s\S]*?'2025-2026\/cbs-azul'[\s\S]*?'2025-2026\/cbs-vermelha'[\s\S]*?ABS:\s*\{[\s\S]*?'2025-2026\/abs-cinza'[\s\S]*?'2025-2026\/abs-vermelha'/);
for (const asset of [
  'bros-2025-2026-cbs-azul.webp',
  'bros-2025-2026-cbs-vermelha.webp',
  'bros-2025-2026-abs-cinza.webp',
  'bros-2025-2026-abs-vermelha.webp',
]) assert.ok(assets.includes(asset), `missing ${asset}`);
assert.match(planner, /NXR-2026/);
assert.match(data, /NXR-2026/);
assert.match(dialogs, /value="NXR-2026"/);
console.log('NXR-2026 audit: 7/7 passed');

// Color completeness regression checks
assert.match(models, /'2014': \{ ESD: options\(\[\[.*?'azul', 'Azul \(Edição Especial\)'/s);
assert.match(models, /'2014': \{[^}]*ESD: options\([\s\S]*?azul.*?\)[\s\S]*?ES: options\([\s\S]*?azul/s);
assert.match(models, /'NXR-2025': \{[\s\S]*?ABS: options\(\[[\s\S]*?'preta', 'Preta\/Vermelha'/);
console.log('Color completeness regression: 3/3 passed');
