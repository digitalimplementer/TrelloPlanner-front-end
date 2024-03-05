'use client';

import { DragDropContext } from '@hello-pangea/dnd';

import { useTaskDnd } from '@/hooks/useTaskDnd';
import { useTasks } from '@/hooks/useTasks';

import styles from './kanban-view.module.scss';
import { COLUMNS } from '@/app/i/tasks/columns.data';
import { KanbanColumn } from '@/app/i/tasks/kanban-view/kanban-column';

export function KanbanView() {
	const { items, setItems } = useTasks();
	const { onDragEnd } = useTaskDnd();

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={styles.board}>
				{COLUMNS.map(col => (
					<KanbanColumn
						items={items}
						label={col.label}
						value={col.value}
						setItems={setItems}
						key={col.value}
					/>
				))}
			</div>
		</DragDropContext>
	);
}
