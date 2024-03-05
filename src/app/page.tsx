import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Hello World',
	...NO_INDEX_PAGE
};

export default function HelloWorldPage() {
	return <div />;
}
