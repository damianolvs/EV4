'use strict';

const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('../src/app');
const { createStore } = require('../src/tasks');

let server;
let base;

before(async () => {
  server = createApp(createStore()).listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

const post = (body, raw) =>
  fetch(`${base}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: raw ?? JSON.stringify(body),
  });

test('GET /health returns ok', async () => {
  const res = await fetch(`${base}/health`);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).status, 'ok');
});

test('POST /api/tasks creates a task (201) and it shows up in the list', async () => {
  const res = await post({ title: 'Write report', priority: 'high' });
  assert.equal(res.status, 201);
  const created = await res.json();
  assert.equal(created.title, 'Write report');
  const list = await (await fetch(`${base}/api/tasks`)).json();
  assert.ok(list.some((t) => t.id === created.id));
});

test('POST /api/tasks with an empty title returns 400', async () => {
  const res = await post({ title: '' });
  assert.equal(res.status, 400);
  assert.ok((await res.json()).error);
});

test('POST /api/tasks with broken JSON returns 400', async () => {
  const res = await post(null, '{not json');
  assert.equal(res.status, 400);
});

test('PATCH toggle on a missing task returns 404', async () => {
  const res = await fetch(`${base}/api/tasks/9999/toggle`, { method: 'PATCH' });
  assert.equal(res.status, 404);
});

test('DELETE removes a task, and a second delete returns 404', async () => {
  const created = await (await post({ title: 'Temp' })).json();
  const first = await fetch(`${base}/api/tasks/${created.id}`, { method: 'DELETE' });
  assert.equal(first.status, 204);
  const second = await fetch(`${base}/api/tasks/${created.id}`, { method: 'DELETE' });
  assert.equal(second.status, 404);
});

test('GET /api/stats reflects completed tasks', async () => {
  const created = await (await post({ title: 'Stats task' })).json();
  await fetch(`${base}/api/tasks/${created.id}/toggle`, { method: 'PATCH' });
  const stats = await (await fetch(`${base}/api/stats`)).json();
  assert.ok(stats.done >= 1);
  assert.equal(stats.total, stats.done + stats.pending);
});
