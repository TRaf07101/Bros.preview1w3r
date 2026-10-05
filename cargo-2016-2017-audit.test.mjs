import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const [types, models, data, planner, dialogs, shell] = ['src/maintenance/types.ts','src/maintenance/models.ts','src/maintenance/data.ts','src/maintenance/planner.ts','src/ui/Dialogs.tsx','src/ui/Shell.tsx'].map(read);

for (const y of ['2016', '2017']) {
  test(`CG 160 Cargo ESDi ${y} is a distinct ESD (no CBS) model with its own id, color, photo and screens`, () => {
    assert.match(types, new RegExp(`'CARGO-${y}'`));
    assert.match(models, new RegExp(`'CARGO-${y}': \\['ESD'\\]`));
    assert.doesNotMatch(models, new RegExp(`'CARGO-${y}': \\['CBS'\\]`));
    assert.match(models, new RegExp(`'CARGO-${y}': \\{\\s*ESD: options`));
    assert.match(models, new RegExp(`'CARGO-${y}': \\{\\s*ESD: \\{\\s*branca:`));
    assert.match(planner, new RegExp(`CG 160 Cargo ${y}`));
    assert.match(dialogs, new RegExp(`<option value="CARGO-${y}">${y}</option>`));
    assert.match(shell, new RegExp(`CARGO-${y}`));
  });
}

test('Cargo ESDi cites the official manual D2203-MAN-1026 (tables on printed pages 34 to 37) and never invents a 2017 manual', () => {
  assert.match(data, /CARGO_2016_REFERENCE/);
  assert.match(data, /CARGO_2017_REFERENCE/);
  assert.match(data, /D2203-MAN-1026/);
  assert.match(data, /páginas impressas 34 a 37/);
  assert.match(planner, /Cargo%20ESDi%20%282016%29%20D2203-MAN-1026%20Completo\.pdf/);
  assert.match(data, /não localizamos um manual do proprietário específico desse ano/);
});

test('Cargo ESDi differs from the CBS Cargo: DID 428HX only, SAE 10W-30 SJ, DOT 3 or DOT 4, front brake only, no CBS text', () => {
  const block = data.match(/const CARGO_ESDI_OVERRIDES[\s\S]*?\n\};\n/)[0];
  assert.match(block, /Corrente de reposição indicada no manual: DID 428HX\./);
  assert.doesNotMatch(block, /RK 428HSB/);
  assert.match(block, /SAE 10W-30 SJ/);
  assert.match(block, /DOT 3 ou DOT 4/);
  assert.match(block, /sem CBS e sem ABS/);
  assert.match(block, /pads: \{ abs: undefined, cbs: undefined \}/);
  assert.doesNotMatch(block, /LOWER|UPPER|Mobil/);
});

test('Cargo 2018-2020 oil text follows the SL grade of the Cargo manuals and no longer cites the Fan "Pro Honda" product', () => {
  assert.match(data, /const CARGO_SL_OIL/);
  assert.match(data, /SAE 10W-30 SL ou superior, JASO MA; o manual recomenda o óleo genuíno Honda/);
});

test('Cargo 2016/2017 share the Cargo manual overrides and the 1.000 km chain cadence', () => {
  assert.match(data, /year === 'CARGO-2016' \|\| year === 'CARGO-2017' \|\| year === 'CARGO-2018' \|\| year === 'CARGO-2019' \|\| year === 'CARGO-2020'\) \{\n    const shared/);
  assert.match(planner, /getServiceForModel\('chain', year\)\.kmInterval === 500 \? 500 : 1000/);
});
