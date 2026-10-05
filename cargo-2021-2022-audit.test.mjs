import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const [types, models, data, planner, dialogs, shell] = ['src/maintenance/types.ts','src/maintenance/models.ts','src/maintenance/data.ts','src/maintenance/planner.ts','src/ui/Dialogs.tsx','src/ui/Shell.tsx'].map(read);

for (const y of ['2021', '2022']) {
  test(`CG 160 Cargo ${y} is a distinct CBS model with its own id, color, photo and screens`, () => {
    assert.match(types, new RegExp(`'CARGO-${y}'`));
    assert.match(models, new RegExp(`'CARGO-${y}': \\['CBS'\\]`));
    assert.match(models, new RegExp(`'CARGO-${y}': \\{\\s*CBS: options`));
    assert.match(models, new RegExp(`'CARGO-${y}': \\{\\s*CBS: \\{\\s*branca:`));
    assert.match(planner, new RegExp(`CG 160 Cargo ${y}`));
    assert.match(planner, new RegExp(`'CARGO-${y}'`));
    assert.match(dialogs, new RegExp(`<option value="CARGO-${y}">${y}</option>`));
    assert.match(shell, new RegExp(`CARGO-${y}`));
  });
}

test('Cargo 2021/2022 use the Cargo 2019~2020 manual (D2203-MAN-1187) and never invent a 2021/2022 manual', () => {
  assert.match(data, /CARGO_2021_2022_REFERENCE/);
  assert.match(data, /D2203-MAN-1187/);
  assert.match(planner, /D2203-MAN-1187/);
  assert.match(data, /não localizamos um manual do proprietário específico/);
});

test('Cargo 2021/2022 keep the 1.000 km chain interval and do not borrow the 500 km interval', () => {
  const block = data.match(/year === 'CARGO-2021' \|\| year === 'CARGO-2022'\) \{[\s\S]*?\n  \}\n/)[0];
  assert.match(block, /kmInterval: 1000/);
  assert.doesNotMatch(block, /kmInterval: 500/);
  assert.match(planner, /getServiceForModel\('chain', year\)\.kmInterval === 500 \? 500 : 1000/);
});

test('planner imports every models helper it calls (getVariantOptions) so saved profiles load', () => {
  assert.match(planner, /import \{[^}]*getVariantOptions[^}]*\} from '\.\/models'/);
});
