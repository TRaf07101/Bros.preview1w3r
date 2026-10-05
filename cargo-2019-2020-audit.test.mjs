import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const [types, models, data, planner, dialogs, shell] = ['src/maintenance/types.ts','src/maintenance/models.ts','src/maintenance/data.ts','src/maintenance/planner.ts','src/ui/Dialogs.tsx','src/ui/Shell.tsx'].map(read);

for (const y of ['2019', '2020']) {
  test(`CG 160 Cargo ${y} is a distinct CBS model with its own id, color, photo and screens`, () => {
    assert.match(types, new RegExp(`'CARGO-${y}'`));
    assert.match(models, new RegExp(`'CARGO-${y}': \\['CBS'\\]`));
    assert.match(models, new RegExp(`'CARGO-${y}': \\{\\s*CBS: options`));
    assert.match(models, new RegExp(`'CARGO-${y}': \\{\\s*CBS: \\{\\s*branca:`));
    assert.match(planner, new RegExp(`CG 160 Cargo ${y}`));
    assert.match(dialogs, new RegExp(`<option value="CARGO-${y}">${y}</option>`));
    assert.match(shell, new RegExp(`CARGO-${y}`));
  });
}

test('Cargo 2019/2020 cite the official Cargo manual D2203-MAN-1187 and never invent a 2020 manual', () => {
  assert.match(data, /CARGO_2019_REFERENCE/);
  assert.match(data, /CARGO_2020_REFERENCE/);
  assert.match(planner, /CARGO%20\(2019\)%20D2203-MAN-1187_WEB\.pdf/);
  assert.match(data, /não localizamos um manual do proprietário específico desse ano/);
});

test('Cargo 2019/2020 use the Cargo manual values, not the NXR/Fan ones', () => {
  const block = data.match(/const CARGO_MANUAL_OVERRIDES[\s\S]*?\n\};\n/)[0];
  assert.match(block, /kmInterval: 1000/);          // corrente a cada 1.000 km
  assert.match(block, /15–25 mm/);                  // folga da corrente
  assert.match(block, /2–5 mm/);                    // folga do acelerador
  assert.match(block, /kmInterval: 24000/);         // fluido do garfo / suspensão traseira
  assert.doesNotMatch(block, /\bpsi\b/);            // nenhuma pressão de outro modelo
  assert.doesNotMatch(block, /20–30 mm/);
});

test('Cargo 2019/2020 use the 1.000 km chain cadence in the planner', () => {
  assert.match(planner, /getServiceForModel\('chain', year\)\.kmInterval === 500 \? 500 : 1000/);
  assert.match(data, /year === 'CARGO-2018' \|\| year === 'CARGO-2019' \|\| year === 'CARGO-2020'\) \{\n    const cargoExtras/);
});
