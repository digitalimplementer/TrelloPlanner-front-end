import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { KEY } from '@/types/root.types';
import { ITaskResponse } from '@/types/task.types';

import { taskService } from '@/services/task.service';

export function useTasks() {
	const { data } = useQuery({
		queryKey: [KEY.TASKS],
		queryFn: () => taskService.getTasks()
	});

	const [items, setItems] = useState<ITaskResponse[] | undefined>(data?.data);

	useEffect(() => {
		setItems(data?.data);
	}, [data?.data]);

	return {
		items,
		setItems
	};
}
