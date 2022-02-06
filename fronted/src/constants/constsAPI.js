export const BASE_URL = 'http://0.0.0.0:7777/api/';

export const LOGIN          = { url: `user/login`, method: 'post' };
export const REGISTRATION   = { url: `user/registration`, method: 'post' };
export const REFRESH        = { url: `user/refresh`, method: 'post' };
export const EDIT_PROPS     = { url: `user/props`, method: 'post' };

export const TASKS          = { url: `tasks/`, method: 'get' };
export const TASK_CREATE    = { url: `tasks/create`, method: 'post' }
export const TASK_EDIT      = { url: `tasks/edit`, method: 'post' }
export const TASK_DELETE    = { url: `tasks/delete`, method: 'post' }
export const TASK_MOVE      = { url: `tasks/move`, method: 'post' }