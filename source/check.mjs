import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('compositions/cover.html', import.meta.url), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const context = vm.createContext({
  document: {getElementById: () => ({getContext: () => new Proxy({}, {
    get: () => (...args) => {
      for (const arg of args) if (typeof arg === 'number') assert(Number.isFinite(arg));
    },
  })})},
  gsap: {timeline: () => ({to() {}})}, window: {},
});
vm.runInContext(script, context);
const sample = time => vm.runInContext(`point(6, 11, ${time})`, context);
const first = sample(0);
const last = sample(Math.PI * 2);
for (const axis of ['x', 'y', 'z']) assert(Math.abs(first[axis] - last[axis]) < 1e-9, 'Loop seam');
assert(Math.abs(first.x - sample(Math.PI).x) > 1, 'Artwork must move');
for (let frame = 0; frame <= 240; frame++) {
  vm.runInContext(`phase.value=${frame / 240 * Math.PI * 2};draw()`, context);
}
console.log('Passed: finite drawing coordinates across 241 frames, motion, seamless geometry.');
