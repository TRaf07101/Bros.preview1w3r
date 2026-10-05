import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
const models = fs.readFileSync(new URL('../src/maintenance/models.ts', import.meta.url), 'utf8');
const planner = fs.readFileSync(new URL('../src/maintenance/planner.ts', import.meta.url), 'utf8');
const dialogs = fs.readFileSync(new URL('../src/ui/Dialogs.tsx', import.meta.url), 'utf8');
const data = fs.readFileSync(new URL('../src/maintenance/data.ts', import.meta.url), 'utf8');

test('Fan sequence now starts at 2013 and keeps 2020 as the numeric Fan model', () => {
  assert.match(models, /'FAN-2013': \['ESD'\]/);
  assert.match(models, /'FAN-2014': \['ESD'\]/);
  assert.match(models, /'FAN-2015': \['ESD'\]/);
  assert.match(models, /'FAN-2016': \['ESD'\]/);
  assert.match(models, /'FAN-2017': \['CBS'\]/);
  assert.match(models, /'FAN-2018': \['CBS'\]/);
  assert.match(models, /'FAN-2019': \['CBS'\]/);
  assert.match(models, /'2020': \['CBS'\]/);
  assert.match(dialogs, /<option value="FAN-2013">2013<\/option>/);
  assert.match(dialogs, /<option value="FAN-2014">2014<\/option>/);
  assert.match(dialogs, /<option value="FAN-2015">2015<\/option>/);
  assert.match(dialogs, /<option value="FAN-2016">2016<\/option>/);
  assert.match(dialogs, /<option value="FAN-2017">2017<\/option>/);
  assert.match(dialogs, /<option value="FAN-2018">2018<\/option>/);
  assert.match(dialogs, /<option value="2020">2020<\/option>/);
  assert.match(planner, /year === '2020' \? 'CG 160 Fan 2020'/);
});

test('Fan 2021 has all three color ids and no configured placeholder', () => {
  assert.match(models, /'2021': \{[\s\S]*?prata[\s\S]*?preta[\s\S]*?vermelha/);
  assert.match(models, /'2021': \{\n      CBS: \{[\s\S]*?motonewsbrasil\.com[\s\S]*?olx\.com\.br/);
  assert.doesNotMatch(models, /Foto indisponível/);
  assert.doesNotMatch(models, /'2021': \{[\s\S]*?Foto indisponível/);
  assert.match(models, /'2021': \{[\s\S]*?prata[\s\S]*?preta[\s\S]*?vermelha/);
});

test('Fan 2021 uses its Honda manual and is kept in Fan maintenance scope', () => {
  assert.match(planner, /D2203-MAN-1255/);
  assert.match(data, /FAN_2021_REFERENCE/);
  assert.match(data, /year === '2021' \|\| year === '2022'/);
});
