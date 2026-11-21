'use strict';

const path = require('path');
const express = require('express');
const { validateTask, getStats, createStore } = require('./tasks');

function createApp(store = createStore()) {
  const app = express();
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // Used by the deploy platform and by the "verify" step of the deployment process
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', version: process.env.APP_VERSION || 'dev' });
  });

  app.get('/api/tasks', (req, res) => {
    res.json(store.list());
  });

  app.get('/api/stats', (req, res) => {
    res.json(getStats(store.list()));
  });

  app.post('/api/tasks', (req, res) => {
    const result = validateTask(req.body);
    if (!result.valid) {
      return res.status(400).json({ error: result.error });
    }
    res.status(201).json(store.add(result.value));
  });

  app.patch('/api/tasks/:id/toggle', (req, res) => {
    const task = store.toggle(Number(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  });

  app.delete('/api/tasks/:id', (req, res) => {
    const removed = store.remove(Number(req.params.id));
    if (!removed) return res.status(404).json({ error: 'Task not found' });
    res.status(204).end();
  });

  // Bad JSON in the body
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
      return res.status(400).json({ error: 'Invalid JSON' });
    }
    res.status(500).json({ error: 'Server error' });
  });

  return app;
}

module.exports = { createApp };
