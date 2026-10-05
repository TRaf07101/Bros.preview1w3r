import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const [types, models, data, planner, dialogs, shell] = ['src/maintenance/types.ts','src/maintenance/models.ts','src/maintenance/data.ts','src/maintenance/planner.ts','src/ui/Dialogs.tsx','src/ui/Shell.tsx'].map(read);

for (const y of ['2023', '2024']) {
  test(`CG 160 Cargo ${y} is a distinct CBS model with its own id`, () => {
    assert.match(types, new RegExp(`'CARGO-${y}'`));
    assert.match(models, new RegExp(`'CARGO-${y}': \\['CBS'\\]`));
    assert.match(models, new RegExp(`'CARGO-${y}': \\{\\s*CBS: options`));
    assert.match(models, new RegExp(`'CARGO-${y}': \\{\\s*CBS: \\{\\s*branca:`));
    assert.match(planner, new RegExp(`CG 160 Cargo ${y}`));
    assert.match(dialogs, new RegExp(`CARGO-${y}`));
    assert.match(shell, new RegExp(`CARGO-${y}`));
  });
}

test('Cargo 2023/2024 use the 2023~2024 manual and do not borrow the 2025 chain interval', () => {
  assert.match(data, /CARGO_2023_2024_REFERENCE/);
  assert.match(planner, /D2203-MAN-1305/);
  const block = data.match(/year === 'CARGO-2023' \|\| year === 'CARGO-2024'\) \{[\s\S]*?\n  \}\n/)[0];
  assert.doesNotMatch(block, /kmInterval: 500/);
});
