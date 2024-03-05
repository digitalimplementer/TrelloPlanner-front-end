import { useMutation, useQueryClient } from '@tanstack/react-query';

import { KEY } from '@/types/root.types';

import { taskService } from '@/services/task.service';

export function useDeleteTask() {
	const queryClient = useQueryClient();

	const { mutate: deleteTask, isPending: isDeletePending } = useMutation({
		mutationKey: [KEY.DELETE_TASK],
		mutationFn: (id: string) => taskService.deleteTask(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: [KEY.TASKS]
			});
		}
	});

	return {
		deleteTask,
		isDeletePending
	};
}
