import debounce from 'lodash.debounce';
import { useCallback, useEffect } from 'react';
import { UseFormWatch } from 'react-hook-form';

import { TypeTaskFormState } from '@/types/task.types';

import { useCreateTask } from '@/hooks/useCreateTask';
import { useUpdateTask } from '@/hooks/useUpdateTasks';

function transformDateToCustomFormat(dateString: string) {
	// Parse the input date string to create a Date object
	const inputDate = new Date(dateString);

	// Get the year, month, and day from the input date
	const year = inputDate.getFullYear();
	const month = inputDate.getMonth() + 1; // Months are zero-indexed
	const day = inputDate.getDate();

	// Get the hours, minutes, and seconds from the input date
	const hours = inputDate.getHours();
	const minutes = inputDate.getMinutes();
	const seconds = inputDate.getSeconds();

	// Create a new date string in the desired format
	const customDateString = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}T${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}.000+02:00`;

	return customDateString;
}

export function useTaskDebounce({
	watch,
	itemId
}: {
	watch: UseFormWatch<TypeTaskFormState>;
	itemId: string;
}) {
	const { updateTask } = useUpdateTask();
	const { createTask } = useCreateTask();

	const debounceCreateTask = useCallback(
		debounce((formData: TypeTaskFormState) => {
			console.log('CREATE TASK', formData);
			createTask(formData);
		}, 2000),
		[]
	);

	const debounceUpdateTask = useCallback(
		debounce((formData: TypeTaskFormState) => {
			updateTask({ id: itemId, data: formData });
		}, 2000),
		[]
	);

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if (itemId) {
				debounceUpdateTask({
					...formData,
					priority: formData.priority,
					createdAt: transformDateToCustomFormat(formData.createdAt!)
				});
			} else {
				debounceCreateTask(formData);
			}
		});

		return () => {
			unsubscribe();
		};
	}, [watch, debounceUpdateTask, debounceCreateTask]);
}

//2024-03-05T00:00:00+02:00

//2024-03-04T22:00:00.000Z
