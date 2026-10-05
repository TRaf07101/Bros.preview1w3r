import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const models = fs.readFileSync(new URL('../src/maintenance/models.ts', import.meta.url), 'utf8');
const dialogs = fs.readFileSync(new URL('../src/ui/Dialogs.tsx', import.meta.url), 'utf8');
const assets = new Set(fs.readdirSync(new URL('../public/images/motorcycles', import.meta.url)));

const expected = {
  'NXR-2020': ['azul','preta','vermelha'],
  'NXR-2021': ['preta','vermelha','azul'],
  'NXR-2022': ['branca','preta','vermelha'],
};

for (const [year, colors] of Object.entries(expected)) {
  test(`${year} has explicit CBS colors and local photos`, () => {
    for (const color of colors) {
      const marker = `${year.replace('-', '\\-')}`;
      assert.match(models, new RegExp(`['\\"]${marker}['\\"][\\s\\S]{0,1500}['\\"]${color}['\\"]`));
      const assetYear = year === 'NXR-2020' ? '2020-2021' : year === 'NXR-2021' ? '2021-2022' : '2022-2023';
      assert.ok(assets.has(`bros-${assetYear}-cbs-${color}.webp`), `${year}/${color} local image missing`);
    }
  });
}

test('2020-2022 are mapped to local assets, not absent fallback paths', () => {
  assert.match(models, /'NXR-2020': \{\s*CBS:/);
  assert.match(models, /'NXR-2021': \{\s*CBS:/);
  assert.match(models, /'NXR-2022': \{\s*CBS:/);
  assert.match(models, /'NXR-2020': \{\s*CBS: \{[\s\S]*2020-2021\/cbs-/);
  assert.match(models, /'NXR-2021': \{\s*CBS: \{[\s\S]*2021-2022\/cbs-/);
  assert.match(models, /'NXR-2022': \{\s*CBS: \{[\s\S]*2022-2023\/cbs-/);
});

test('Dialogs does not incorrectly fall back to the 2023 manual for NXR 2020-2022', () => {
  assert.match(dialogs, /selectedYear === 'NXR-2020'/);
  assert.match(dialogs, /selectedYear === 'NXR-2021'/);
  assert.match(dialogs, /selectedYear === 'NXR-2022'/);
});
