import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import type { ITaskResponse } from '@/types/task.types';

import { FILTERS } from '@/app/i/tasks/columns.data';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const filterTasks = (
	tasks: ITaskResponse[] | undefined,
	value: string
) => {
	switch (value) {
		case 'today':
			return tasks?.filter(
				i =>
					dayjs(i.createdAt).isSame(FILTERS.today, 'day') && !i.isCompleted
			);

		case 'tomorrow':
			return tasks?.filter(
				i =>
					dayjs(i.createdAt).isSame(FILTERS.tomorrow, 'day') &&
					!i.isCompleted
			);

		case 'on-this-week':
			return tasks?.filter(
				i =>
					!dayjs(i.createdAt).isSame(FILTERS.today) &&
					!dayjs(i.createdAt).isSame(FILTERS.tomorrow) &&
					dayjs(i.createdAt).isSameOrBefore(FILTERS['on-this-week']) &&
					!i.isCompleted
			);

		case 'on-next-week':
			return tasks?.filter(
				i =>
					dayjs(i.createdAt).isAfter(FILTERS['on-this-week']) &&
					dayjs(i.createdAt).isSameOrBefore(FILTERS['on-next-week']) &&
					!i.isCompleted
			);

		case 'later':
			return tasks?.filter(
				i =>
					(dayjs(i.createdAt).isAfter(FILTERS['on-next-week']) ||
						!i.createdAt) &&
					!i.isCompleted
			);

		case 'completed':
			return tasks?.filter(i => i.isCompleted);

		default:
			return [];
	}
};
