import { IPomodoroRoundResponse } from '@/types/pomodoro.types';

import { useLoadSettings } from '@/hooks/useLoadSettings';
import { useUpdateRound } from '@/hooks/useUpdateRound';

import type { ITimerState } from '@/app/i/timer/timer.types';

type TypeUseTimerActions = ITimerState & {
	rounds: IPomodoroRoundResponse[] | undefined;
};

export function useTimerActions({
	activeRound,
	setIsRunning,
	secondsLeft,
	rounds,
	setActiveRound
}: TypeUseTimerActions) {
	const { isUpdateRoundPending, updateRound } = useUpdateRound();
	const { workInterval } = useLoadSettings();

	const pauseHandler = () => {
		setIsRunning(false);

		if (!activeRound?.id) return;

		if (activeRound?.id) {
			updateRound({
				id: activeRound?.id,
				data: {
					totalSeconds: secondsLeft,
					isCompleted: Math.floor(secondsLeft / 60) >= workInterval
				}
			});
		}
	};

	const playHandler = () => {
		setIsRunning(true);
	};

	const nextRoundHandler = () => {
		if (!activeRound?.id) return;

		updateRound({
			id: activeRound.id,
			data: {
				isCompleted: true,
				totalSeconds: workInterval * 60
			}
		});
	};

	const prevRoundHandler = () => {
		const lastCompletedRound = rounds?.findLast(round => round.isCompleted);

		if (!lastCompletedRound?.id) return;
		updateRound({
			id: lastCompletedRound.id,
			data: {
				isCompleted: false,
				totalSeconds: 0
			}
		});

		setActiveRound(lastCompletedRound);
	};

	return {
		isUpdateRoundPending,
		pauseHandler,
		playHandler,
		prevRoundHandler,
		nextRoundHandler
	};
}
