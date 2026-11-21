'use strict';

const PRIORITIES = ['low', 'medium', 'high'];
const MAX_TITLE_LENGTH = 100;

/**
 * Checks the data for a new task.
 * Returns { valid: true, value } or { valid: false, error }.
 */
function validateTask(input) {
  if (input === null || typeof input !== 'object') {
    return { valid: false, error: 'Body must be an object' };
  }
  if (typeof input.title !== 'string') {
    return { valid: false, error: 'Title is required' };
  }
  const title = input.title.trim();
  if (title.length === 0) {
    return { valid: false, error: 'Title cannot be empty' };
  }
  if (title.length > MAX_TITLE_LENGTH) {
    return { valid: false, error: `Title cannot be longer than ${MAX_TITLE_LENGTH} characters` };
  }
  const priority = input.priority === undefined ? 'medium' : input.priority;
  if (!PRIORITIES.includes(priority)) {
    return { valid: false, error: `Priority must be one of: ${PRIORITIES.join(', ')}` };
  }
  return { valid: true, value: { title, priority } };
}

/** Counts total, done and pending tasks, plus the completion percentage. */
function getStats(tasks) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return { total, done, pending: total - done, percent };
}

/** Small in-memory store. Good enough for this assignment. */
function createStore() {
  let nextId = 1;
  const tasks = [];

  return {
    list() {
      return tasks.slice();
    },
    add({ title, priority }) {
      const task = { id: nextId++, title, priority, done: false };
      tasks.push(task);
      return task;
    },
    toggle(id) {
      const task = tasks.find((t) => t.id === id);
      if (!task) return null;
      task.done = !task.done;
      return task;
    },
    remove(id) {
      const index = tasks.findIndex((t) => t.id === id);
      if (index === -1) return false;
      tasks.splice(index, 1);
      return true;
    },
  };
}

module.exports = { validateTask, getStats, createStore, PRIORITIES, MAX_TITLE_LENGTH };
