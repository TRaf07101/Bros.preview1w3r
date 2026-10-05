import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const models = fs.readFileSync(new URL('../src/maintenance/models.ts', import.meta.url), 'utf8');

test('Fan 2021-2023 use reviewed remote sources through the shared historical proxy', () => {
  assert.match(models, /year === '2021'[\s\S]{0,700}historicalImage\(fan2021/);
  assert.match(models, /year === '2022'[\s\S]{0,700}historicalImage\(fan2022/);
  assert.match(models, /year === '2023'[\s\S]{0,700}historicalImage\(fan2023/);
});

test('Fan direct image source block covers all three configured colors for 2021-2023', () => {
  for (const color of ['prata','azul','vermelha','preta']) {
    if (color === 'prata' || color === 'azul' || color === 'vermelha') assert.match(models, new RegExp('' + color + ": '"));
  }
  assert.match(models, /year === '2022'[\s\S]{0,700}preta:/);
});
