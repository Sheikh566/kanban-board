import { writable } from 'svelte/store';

export const columns = writable([
  { id: 1, title: 'To Do', tasks: [{ id: 1, title: 'Buy Grocery', text: 'Buy peanut, eggs and chocolates' }] },
  { id: 2, title: 'In Progress', tasks: [{ id: 2, title: 'Wash Car', text: 'On Sunday' }]  },
  { id: 3, title: 'Done', tasks: [{ id: 3, title: 'Fix Sofa', text: '' }] }
]);

export const current_user = writable(null);

export const user_tasks = writable(null)