import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const data = fs.readFileSync(new URL('../src/maintenance/data.ts', import.meta.url), 'utf8');
const planner = fs.readFileSync(new URL('../src/maintenance/planner.ts', import.meta.url), 'utf8');
test('Fan 2021 keeps its manual-specific chain and revision cadence', () => {
  assert.match(data, /if \(year === '2021'\)/);
  assert.match(data, /O manual CG 160 Fan\/Titan 2021 prevê a manutenção da corrente a cada 1\.000 km/);
  assert.match(data, /primeira revisão ocorre em 1\.000 km ou 6 meses/);
  assert.match(planner, /chainStepKm = \(year: ModelYear\): number => \{/);
  assert.match(planner, /getServiceForModel\('chain', year\)\.kmInterval === 500 \? 500 : 1000/);
});
