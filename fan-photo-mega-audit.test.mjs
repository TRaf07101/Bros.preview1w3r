import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const root = new URL('../', import.meta.url);
const models = fs.readFileSync(new URL('src/maintenance/models.ts', root), 'utf8');
const image = fs.readFileSync(new URL('src/ui/RemoteMotorcycleImage.tsx', root), 'utf8');
const docs = fs.readFileSync(new URL('FAN_PHOTOS_MEGA_AUDITORIA_2026-09-23.md', root), 'utf8');

const requiredIds = ['FAN-2013','FAN-2014','FAN-2015','FAN-2016','FAN-2017','FAN-2018','FAN-2019','2020','2021','2022','2023','2024','2025','2026'];
const knownBad = [
  '19313411465', '136512476491345', 'a3206b293f8573dace97c4ea37dc538b',
  '183556668400761', '461677368631676', 'WMIMAGEM09362309951',
  '949539598732452', '144686854164726', '398603722982022',
  '850642615286860',
];

test('mega Fan photo matrix covers every 2013–2026 Fan year', () => {
  for (const id of requiredIds) {
    if (/^FAN-/.test(id)) assert.match(models, new RegExp(`'${id}':`), `id ausente ${id}`);
    else assert.match(models, new RegExp(`'${id}':`), `ano ausente ${id}`);
  }
  assert.doesNotMatch(models, /FAN-20(?:0[0-9]|1[0-2])/);
  assert.doesNotMatch(models, /['"](?:2010|2011|2012)['"]\s*:/);
});

test('mega Fan audit has no known broken or rejected photo URL in active model mappings', () => {
  for (const token of knownBad) assert.doesNotMatch(models, new RegExp(token), `fonte problemática ainda presente: ${token}`);
  assert.doesNotMatch(models, /Foto indisponível/);
  assert.doesNotMatch(models, /i\.pinimg\.com/);
});

test('all Fan remote photo routes use the historical transparent-processing path', () => {
  assert.match(models, /function historicalImage\(url: string\): string/);
  assert.match(models, /if \(typeof aliased === 'string' && aliased\.startsWith\('http'\)\) return historicalImage\(aliased\);/);
  for (const year of requiredIds) {
    if (year === '2020' || year === '2021' || year === '2022' || year === '2023') {
      assert.match(models, new RegExp(`year === '${year}'[\\s\\S]{0,1200}historicalImage`, 'm'));
    }
  }
});

test('transparent pipeline uses adaptive edge segmentation and post-crop dimensions', () => {
  assert.match(image, /sampleBackgroundPalette/);
  assert.match(image, /isNearBackground/);
  assert.match(image, /removeEdgeBackground/);
  assert.match(image, /const croppedW = ctx\.canvas\.width/);
  assert.match(image, /const croppedH = ctx\.canvas\.height/);
  assert.match(image, /pixels\[\(y \* croppedW \+ x\) \* 4 \+ 3\]/);
  assert.match(image, /finalCanvas\.width = CANVAS_W/);
  assert.match(image, /finalCanvas\.height = CANVAS_H/);
});

test('mega audit document records three review parts and the user visual standard', () => {
  assert.match(docs, /Parte 1 — 2013–2016/);
  assert.match(docs, /Parte 2 — 2017–2020/);
  assert.match(docs, /Parte 3 — 2021–2026/);
  assert.match(docs, /frente apontando para a direita/);
  assert.match(docs, /fundo transparente/);
  assert.match(docs, /sem corte/);
});
