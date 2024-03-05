import { useMutation, useQueryClient } from '@tanstack/react-query';

import { KEY } from '@/types/root.types';

import { pomodoroService } from '@/services/pomodoro.service';

export function useDeleteSession(onDeleteSuccess: () => void) {
	const queryClient = useQueryClient();

	const { mutate: deleteSession, isPending: isDeletePending } = useMutation({
		mutationKey: [KEY.DELETE_SESSION],
		mutationFn: (id: string) => pomodoroService.deleteSession(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: [KEY.GET_TODAY_SESSION]
			});
			onDeleteSuccess();
		}
	});

	return {
		deleteSession,
		isDeletePending
	};
}
