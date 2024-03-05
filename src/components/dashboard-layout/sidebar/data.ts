import { KanbanSquare, LayoutDashboard, Settings, Timer } from 'lucide-react';

import { IMenuItem } from '@/components/dashboard-layout/sidebar/types';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';

export const MENU: IMenuItem[] = [
	{
		icon: LayoutDashboard,
		link: DASHBOARD_PAGES.HOME,
		name: 'Dashboard'
	},
	{
		icon: KanbanSquare,
		link: DASHBOARD_PAGES.TASKS,
		name: 'Tasks'
	},
	{
		icon: Timer,
		link: DASHBOARD_PAGES.TIMER,
		name: 'Pomodoro'
	},
	{
		icon: LayoutDashboard,
		link: DASHBOARD_PAGES.TIME_BLOCKING,
		name: 'Time Blocking'
	},
	{
		icon: Settings,
		link: DASHBOARD_PAGES.SETTINGS,
		name: 'Settings'
	}
];
