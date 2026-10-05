import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const [types, models, data, planner, dialogs, shell] = ['src/maintenance/types.ts','src/maintenance/models.ts','src/maintenance/data.ts','src/maintenance/planner.ts','src/ui/Dialogs.tsx','src/ui/Shell.tsx'].map(read);

test('CG 160 Cargo 2018 is a distinct CBS model with its own id, color, photo and screens', () => {
  assert.match(types, /'CARGO-2018'/);
  assert.match(models, /'CARGO-2018': \['CBS'\]/);
  assert.match(models, /'CARGO-2018': \{\s*CBS: options/);
  assert.match(models, /'CARGO-2018': \{\s*CBS: \{\s*branca:/);
  assert.match(planner, /CG 160 Cargo 2018/);
  assert.match(dialogs, /<option value="CARGO-2018">2018<\/option>/);
  assert.match(shell, /CARGO-2018/);
});

test('Cargo 2018 cites its own official manual D2203-MAN-1129, tables on printed pages 35 to 38', () => {
  assert.match(data, /CARGO_2018_REFERENCE/);
  assert.match(data, /D2203-MAN-1129/);
  assert.match(data, /páginas impressas 35 a 38/);
  assert.match(planner, /CARGO%20\(2018\)%20D2203-MAN-1129_WEB\.pdf/);
});

test('Cargo 2018 shares the Cargo manual overrides and the 1.000 km chain cadence', () => {
  assert.match(data, /year === 'CARGO-2018' \|\| year === 'CARGO-2019' \|\| year === 'CARGO-2020'\) \{\n    const shared/);
  assert.match(planner, /getServiceForModel\('chain', year\)\.kmInterval === 500 \? 500 : 1000/);
});
