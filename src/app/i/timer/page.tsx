import type { Metadata } from 'next';

import { Heading } from '@/components/ui/heading';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { Pomodoro } from '@/app/i/timer/pomodoro';

export const metadata: Metadata = {
	title: 'Pomodoro',
	...NO_INDEX_PAGE
};

export default function PomodoroPage() {
	return (
		<div>
			<Heading title='Pomodoro timer' />
			<Pomodoro />
		</div>
	);
}
