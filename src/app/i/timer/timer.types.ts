import { Dispatch, SetStateAction } from 'react';

import type { IPomodoroRoundResponse } from '@/types/pomodoro.types';

export interface ITimerState {
	secondsLeft: number;
	isRunning: boolean;
	activeRound: IPomodoroRoundResponse | undefined;
	setIsRunning: Dispatch<SetStateAction<boolean>>;
	setSecondsLeft: Dispatch<SetStateAction<number>>;
	setActiveRound: Dispatch<SetStateAction<IPomodoroRoundResponse | undefined>>;
}
