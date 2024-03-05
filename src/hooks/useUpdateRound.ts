import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { TypePomodoroRoundState } from '@/types/pomodoro.types';
import { KEY } from '@/types/root.types';

import { pomodoroService } from '@/services/pomodoro.service';

export function useUpdateRound() {
	const queryClient = useQueryClient();

	const { mutate: updateRound, isPending: isUpdateRoundPending } = useMutation(
		{
			mutationKey: [KEY.UPDATE_ROUND],
			mutationFn: ({
				id,
				data
			}: {
				id: string;
				data: TypePomodoroRoundState;
			}) => pomodoroService.updateRound(id, data),
			onSuccess() {
				queryClient.invalidateQueries({
					queryKey: [KEY.GET_TODAY_SESSION]
				});
			}
		}
	);

	return {
		updateRound,
		isUpdateRoundPending
	};
}
