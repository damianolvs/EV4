'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validateTask, getStats, createStore, MAX_TITLE_LENGTH } = require('../src/tasks');

// ---- validateTask ----

test('validateTask accepts a normal task and trims the title', () => {
  const r = validateTask({ title: '  Study for exam  ', priority: 'high' });
  assert.equal(r.valid, true);
  assert.deepEqual(r.value, { title: 'Study for exam', priority: 'high' });
});

test('validateTask defaults priority to medium', () => {
  const r = validateTask({ title: 'Buy milk' });
  assert.equal(r.valid, true);
  assert.equal(r.value.priority, 'medium');
});

test('validateTask accepts a title with exactly the max length (edge case)', () => {
  const r = validateTask({ title: 'a'.repeat(MAX_TITLE_LENGTH) });
  assert.equal(r.valid, true);
});

test('validateTask rejects a title that is too long (edge case)', () => {
  const r = validateTask({ title: 'a'.repeat(MAX_TITLE_LENGTH + 1) });
  assert.equal(r.valid, false);
});

test('validateTask rejects empty or whitespace-only titles (invalid)', () => {
  assert.equal(validateTask({ title: '' }).valid, false);
  assert.equal(validateTask({ title: '     ' }).valid, false);
});

test('validateTask rejects missing, non-string and non-object input (invalid)', () => {
  assert.equal(validateTask({}).valid, false);
  assert.equal(validateTask({ title: 123 }).valid, false);
  assert.equal(validateTask(null).valid, false);
  assert.equal(validateTask('hello').valid, false);
});

test('validateTask rejects an unknown priority (invalid)', () => {
  const r = validateTask({ title: 'Task', priority: 'urgent' });
  assert.equal(r.valid, false);
  assert.match(r.error, /Priority/);
});

// ---- getStats ----

test('getStats counts done and pending tasks', () => {
  const s = getStats([{ done: true }, { done: false }, { done: false }, { done: true }]);
  assert.deepEqual(s, { total: 4, done: 2, pending: 2, percent: 50 });
});

test('getStats returns 0 percent for an empty list (edge case, no divide by zero)', () => {
  assert.deepEqual(getStats([]), { total: 0, done: 0, pending: 0, percent: 0 });
});

test('getStats rounds the percentage', () => {
  const s = getStats([{ done: true }, { done: false }, { done: false }]);
  assert.equal(s.percent, 33);
});

// ---- store ----

test('store gives each task a new id and keeps them in order', () => {
  const store = createStore();
  const a = store.add({ title: 'A', priority: 'low' });
  const b = store.add({ title: 'B', priority: 'low' });
  assert.equal(a.id, 1);
  assert.equal(b.id, 2);
  assert.equal(store.list().length, 2);
});

test('store toggle flips done and returns null for unknown id (invalid)', () => {
  const store = createStore();
  const t = store.add({ title: 'A', priority: 'low' });
  assert.equal(store.toggle(t.id).done, true);
  assert.equal(store.toggle(t.id).done, false);
  assert.equal(store.toggle(999), null);
});

test('store remove deletes a task and returns false for unknown id (invalid)', () => {
  const store = createStore();
  const t = store.add({ title: 'A', priority: 'low' });
  assert.equal(store.remove(t.id), true);
  assert.equal(store.list().length, 0);
  assert.equal(store.remove(t.id), false);
});
