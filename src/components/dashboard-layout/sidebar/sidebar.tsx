import { GanttChartSquare } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { MENU } from '@/components/dashboard-layout/sidebar/data';
import { LogoutButton } from '@/components/dashboard-layout/sidebar/logout-button';
import { MenuItem } from '@/components/dashboard-layout/sidebar/menu-item';

import { COLORS } from '@/constants/color.constants';
import { SITE_NAME } from '@/constants/seo.constants';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';

export const Sidebar = () => {
	return (
		<aside className='border-r border-r-border h-full bg-sidebar flex flex-col justify-between'>
			<div>
				<Link
					href={DASHBOARD_PAGES.HOME}
					draggable={false}
					className='flex items-center gap-2.5 p-layout border-b border-b-border'
				>
					<GanttChartSquare
						color={COLORS.primary}
						size={38}
					/>
					<span className='text-2xl font-bold relative'>{SITE_NAME}</span>
				</Link>
				<div className='p-3 relative'>
					<LogoutButton />
					{MENU.map(item => (
						<MenuItem
							key={item.link}
							item={item}
						/>
					))}
				</div>
			</div>
			<footer className='text-xs opacity-40 font-normal text-center p-layout'>
				2024 &copy; With love from RED Group
			</footer>
		</aside>
	);
};
