import Link from 'next/link';
import React from 'react';

import { IMenuItem } from '@/components/dashboard-layout/sidebar/types';

export const MenuItem = ({ item }: { item: IMenuItem }) => {
	return (
		<div>
			<Link
				href={item.link}
				className='flex gap-2.5 items-center py-2.5 mt-2 px-layout transition-colors hover:bg-border rounded-lg'
			>
				<item.icon />
				<span>{item.name}</span>
			</Link>
		</div>
	);
};
