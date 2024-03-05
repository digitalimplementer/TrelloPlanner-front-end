import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { KEY } from '@/types/root.types';
import { TypeTaskFormState } from '@/types/task.types';

import { taskService } from '@/services/task.service';

export function useUpdateTask(key?: string) {
	const queryClient = useQueryClient();

	const { mutate: updateTask } = useMutation({
		mutationKey: [KEY.UPDATE_TASK, key],
		mutationFn: ({ id, data }: { id: string; data: TypeTaskFormState }) => {
			return taskService.updateTask(id, data);
		},
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: [KEY.TASKS]
			});
		}
	});

	return {
		updateTask
	};
}
