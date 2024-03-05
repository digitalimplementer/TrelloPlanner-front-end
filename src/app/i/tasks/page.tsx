import type { Metadata } from 'next';

import { Heading } from '@/components/ui/heading';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { TasksView } from '@/app/i/tasks/task-view';

export const metadata: Metadata = {
	title: 'Tasks',
	...NO_INDEX_PAGE
};

export default function TasksPage() {
	return (
		<div>
			<Heading title='Tasks' />
			<TasksView />
		</div>
	);
}
