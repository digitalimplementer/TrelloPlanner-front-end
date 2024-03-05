import type { Metadata } from 'next';

import { Heading } from '@/components/ui/heading';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import Settings from '@/app/i/settings/settings';

export const metadata: Metadata = {
	title: 'Settings',
	...NO_INDEX_PAGE
};

export default function SettingsPage() {
	return (
		<div>
			<Heading title='Settings' />
			<Settings />
		</div>
	);
}
