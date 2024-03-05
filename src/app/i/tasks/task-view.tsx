'use client';

import { useState } from 'react';

import { Loader } from '@/components/ui/loader';

import { useLocalStorage } from '@/hooks/useLocalStorage';

import { KanbanView } from '@/app/i/tasks/kanban-view/kanban-view';
import { ListView } from '@/app/i/tasks/list-view/list-view';
import { SwitcherView } from '@/app/i/tasks/switcher-view';

export type TypeView = 'list' | 'kanban';

export function TasksView() {
	const [type, setType, isLoading] = useLocalStorage<TypeView>(
		'view-type',
		'list'
	);

	if (isLoading) return <Loader />;
	return (
		<div>
			<SwitcherView
				type={type}
				setType={setType}
			/>
			{type === 'list' ? <ListView /> : <KanbanView />}
		</div>
	);
}
