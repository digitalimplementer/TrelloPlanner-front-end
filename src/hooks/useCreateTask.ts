import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { KEY } from '@/types/root.types';
import { TypeTaskFormState } from '@/types/task.types';

import { taskService } from '@/services/task.service';

export function useCreateTask() {
	const queryClient = useQueryClient();

	const { mutate: createTask } = useMutation({
		mutationKey: [KEY.CREATE_TASK],
		mutationFn: (data: TypeTaskFormState) => taskService.createTask(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: [KEY.TASKS]
			});
		}
	});

	return {
		createTask
	};
}
