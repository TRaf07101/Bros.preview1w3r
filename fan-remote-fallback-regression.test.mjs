import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
const component = fs.readFileSync(new URL('../src/ui/RemoteMotorcycleImage.tsx', import.meta.url), 'utf8');

test('remote motorcycle photos keep an original-source fallback after the proxy', () => {
  assert.match(component, /searchParams\.get\('url'\)/);
  assert.match(component, /wsrv\.nl/);
  assert.match(component, /candidate !== originalSource/);
  assert.match(component, /setVisibleSource\(candidates\[next\]\)/);
  assert.match(component, /referrerPolicy="no-referrer"/);
});
