import { useMutation, useQueryClient } from '@tanstack/react-query';

import { KEY } from '@/types/root.types';

import { pomodoroService } from '@/services/pomodoro.service';

export function useCreateSession() {
	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationKey: [KEY.CREATE_NEW_SESSION],
		mutationFn: () => pomodoroService.createSession(),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: [KEY.GET_TODAY_SESSION]
			});
		}
	});

	return {
		mutate,
		isPending
	};
}
