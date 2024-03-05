export interface IBase {
	id: string;
	createdAt?: string;
	updatedAt?: string;
}

export enum KEY {
	AUTH = 'auth',
	LOGOUT = 'logout',

	PROFILE = 'profile',
	UPDATE_PROFILE = 'update profile',

	TASKS = 'tasks',
	CREATE_TASK = 'create task',
	DELETE_TASK = 'delete task',
	UPDATE_TASK = 'update task',

	CREATE_NEW_SESSION = 'create new session',
	GET_TODAY_SESSION = 'get today session',
	DELETE_SESSION = 'delete session',

	TIME_BLOCK = 'time-block',
	CREATE_TIME_BLOCK = 'create time-block',
	DELTE_TIME_BLOCK = 'delete time block',
	UPDATE_TIME_BLOCK = 'update time-block',
	UPDATE_ORDER_TIME_BLOCK = 'update order time block',

	UPDATE_ROUND = 'update round'
}
