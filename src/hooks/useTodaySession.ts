import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { KEY } from '@/types/root.types';

import { useLoadSettings } from '@/hooks/useLoadSettings';

import type { ITimerState } from '@/app/i/timer/timer.types';
import { pomodoroService } from '@/services/pomodoro.service';

export function useTodaySession({
	setActiveRound,
	setSecondsLeft
}: ITimerState) {
	const { workInterval } = useLoadSettings();
	const {
		data: sessionResponse,
		isLoading,
		refetch,
		isSuccess
	} = useQuery({
		queryKey: [KEY.GET_TODAY_SESSION],
		queryFn: () => pomodoroService.getTodaySession()
	});

	const rounds = sessionResponse?.data.rounds;

	useEffect(() => {
		if (isSuccess && rounds) {
			const activeRound = rounds.find(round => !round.isCompleted);
			setActiveRound(activeRound);

			if (activeRound && activeRound.totalSeconds !== 0) {
				setSecondsLeft(activeRound.totalSeconds);
			}
		}
	}, [isSuccess, rounds]);

	return {
		sessionResponse,
		isLoading,
		refetch,
		isSuccess,
		workInterval
	};
}
