'use client';

import { DragDropContext } from '@hello-pangea/dnd';

import { useTaskDnd } from '@/hooks/useTaskDnd';
import { useTasks } from '@/hooks/useTasks';

import styles from './list-view.module.scss';
import { COLUMNS } from '@/app/i/tasks/columns.data';
import { ListRowParent } from '@/app/i/tasks/list-view/list-row-parent';

export function ListView() {
	const { items, setItems } = useTasks();
	const { onDragEnd } = useTaskDnd();

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={styles.table}>
				<div className={styles.header}>
					<div>Task name</div>
					<div>Due date</div>
					<div>Priority</div>
					<div></div>
				</div>
				<div className={styles.parentsWrapper}>
					{COLUMNS.map(col => (
						<ListRowParent
							items={items}
							label={col.label}
							value={col.value}
							setItems={setItems}
							key={col.value}
						/>
					))}
				</div>
			</div>
		</DragDropContext>
	);
}
