import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const types = fs.readFileSync('src/maintenance/types.ts', 'utf8');
const models = fs.readFileSync('src/maintenance/models.ts', 'utf8');
const data = fs.readFileSync('src/maintenance/data.ts', 'utf8');
const planner = fs.readFileSync('src/maintenance/planner.ts', 'utf8');
const dialogs = fs.readFileSync('src/ui/Dialogs.tsx', 'utf8');
const shell = fs.readFileSync('src/ui/Shell.tsx', 'utf8');

test('Fan 2019 is a distinct internal model id, preserving NXR 2019', () => {
  assert.match(types, /'FAN-2019'/);
  assert.match(models, /'FAN-2019': \['CBS'\]/);
  assert.match(models, /'FAN-2019': \{\s*CBS: options\(\[\s*\['preta'/s);
  assert.match(models, /\['vermelha', 'Vermelha'/);
  assert.match(models, /\['cinza', 'Cinza Metálico'/);
  assert.match(dialogs, /<option value="FAN-2019">2019<\/option>/);
  assert.match(dialogs, /setSelectedYear\('FAN-2019'\)/);
  assert.match(shell, /state\.profile\.year === 'FAN-2019'/);
  assert.match(planner, /year === 'FAN-2019' \? 'CG 160 Fan 2019'/);
});

test('Fan 2019 uses the Honda 2019~2020 manual and 1,000 km chain care', () => {
  assert.match(planner, /year === 'FAN-2019' \? 'https:\/\/www\.honda\.com\.br\/pos-venda\/motos\/sites\/customer_service_motos\/files\/manuais\/MP%20CG%20160%20FAN-CG%20160%20TITAN%20%282019~2020%29%20D2203-MAN-1185_WEB_1\.pdf'/);
  assert.match(data, /FAN_2019_REFERENCE/);
  assert.match(data, /if \(year === 'FAN-2019'\)/);
  assert.match(data, /A cada 1\.000 km; verificar condição e folga antes do uso/);
});

test('Fan 2019 photos go through the historical CORS/normalization pipeline', () => {
  assert.match(models, /'FAN-2019': \{\s*CBS: \{\s*preta: 'https:\/\/www\.autocerto\.com\/fotos\/2777\/1481347\/1\.jpg'/s);
  assert.match(models, /vermelha: 'https:\/\/motonewsbrasil\.com\/wp-content\/uploads\/2018\/09\/honda-cg-160-fan-2019-3-1024x576\.jpg'/);
  assert.match(models, /cinza: 'https:\/\/hondamotoway\.com\.br\/wp-content\/uploads\/2018\/09\/CG-Fan-Cinza-Lateral\.jpg'/);
  assert.match(models, /if \(typeof aliased === 'string' && aliased\.startsWith\('http'\)\) return historicalImage\(aliased\);/);
});
