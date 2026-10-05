import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
const models = fs.readFileSync(new URL('../src/maintenance/models.ts', import.meta.url), 'utf8');

test('Fan 2020 has direct concrete sources for all three official colors', () => {
  const block = models.match(/if \(year === '2020' && variant === 'CBS'\) \{([\s\S]*?)\n  \}/)?.[1] ?? '';
  assert.match(block, /prata:/);
  assert.match(block, /vermelha:/);
  assert.match(block, /preta:/);
  assert.match(block, /motonewsbrasil\.com/);
  assert.match(block, /motonewsbrasil\.com/);
  assert.match(block, /integradordeanuncios\.com\.br/);
});

test('Fan 2020 no longer falls through to a missing default asset path', () => {
  assert.match(models, /year === '2020' && variant === 'CBS'/);
  assert.doesNotMatch(models, /REMOTE:FAN-2020/);
});
