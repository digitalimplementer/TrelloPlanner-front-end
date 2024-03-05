'use client';

import { Loader, Pause, Play, RefreshCcw } from 'lucide-react';

import { Button } from '@/components/ui/buttons/button';

import { useCreateSession } from '@/hooks/useCreateSession';
import { useDeleteSession } from '@/hooks/useDeleteSession';
import { useTimer } from '@/hooks/useTimer';
import { useTimerActions } from '@/hooks/useTimerActions';
import { useTodaySession } from '@/hooks/useTodaySession';

import { formatTime } from '@/app/i/timer/format-time';
import { PomodoroRounds } from '@/app/i/timer/rounds/pomodoro-rounds';

export function Pomodoro() {
	const timerState = useTimer();
	const { isLoading, sessionResponse, workInterval } =
		useTodaySession(timerState);

	const { isPending, mutate } = useCreateSession();

	const { deleteSession, isDeletePending } = useDeleteSession(() =>
		timerState.setSecondsLeft(workInterval * 60)
	);

	const rounds = sessionResponse?.data.rounds;
	const {
		isUpdateRoundPending,
		nextRoundHandler,
		prevRoundHandler,
		pauseHandler,
		playHandler
	} = useTimerActions({
		...timerState,
		rounds
	});
	return (
		<div className='relative w-80 text-center'>
			{!isLoading && (
				<div className='text-7xl font-semibold'>
					{formatTime(timerState.secondsLeft)}
				</div>
			)}

			{isLoading ? (
				<Loader />
			) : sessionResponse?.data ? (
				<>
					<PomodoroRounds
						rounds={rounds}
						nextRoundHandler={nextRoundHandler}
						prevRoundHandler={prevRoundHandler}
						activeRound={timerState.activeRound}
					/>
					<button
						className='mt-6 opacity-80 hover:opacity-100 transition-opacity'
						disabled={isUpdateRoundPending}
						onClick={timerState.isRunning ? pauseHandler : playHandler}
					>
						{timerState.isRunning ? (
							<Pause size={30} />
						) : (
							<Play size={30} />
						)}
					</button>

					<button
						className='absolute top-0 right-0 opacity-40 hover:opacity-80'
						disabled={isDeletePending}
						onClick={() => {
							timerState.setIsRunning(false);
							deleteSession(sessionResponse.data.id);
						}}
					>
						<RefreshCcw size={19} />
					</button>
				</>
			) : (
				<Button
					onClick={() => mutate()}
					className='mt-1'
					disabled={isPending}
				>
					Create Session
				</Button>
			)}
		</div>
	);
}
