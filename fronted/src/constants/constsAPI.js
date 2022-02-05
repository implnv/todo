const BASE_URL = 'http://0.0.0.0:7777/api';
export const LOGIN          = { url: `${BASE_URL}/user/login`, method: 'post' };
export const REGISTRATION   = { url: `${BASE_URL}/user/registration`, method: 'post' };
export const REFRESH        = { url: `${BASE_URL}/user/refresh`, method: 'post' };
export const EDIT_PROPS     = { url: `${BASE_URL}/user/props`, method: 'post' };
export const TASKS          = { url: `${BASE_URL}/tasks/`, method: 'get' };
export const TASKS_CREATE   = { url: `${BASE_URL}/tasks/create`, method: 'post' }
export const TASK_MOVE      = { url: `${BASE_URL}/tasks/move`, method: 'post' }