import type { Metadata } from 'next';

import { Heading } from '@/components/ui/heading';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { Timer } from '@/app/i/timer/timer';

export const metadata: Metadata = {
	title: 'Timer',
	...NO_INDEX_PAGE
};

export default function TimerPage() {
	return (
		<div>
			<Heading title='Timer' />
			<Timer />
		</div>
	);
}
