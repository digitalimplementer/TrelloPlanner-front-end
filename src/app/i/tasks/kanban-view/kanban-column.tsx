import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Dispatch, SetStateAction } from 'react';

import { ITaskResponse } from '@/types/task.types';

import styles from './kanban-view.module.scss';
import { FILTERS } from '@/app/i/tasks/columns.data';
import { KanbanAddCard } from '@/app/i/tasks/kanban-view/kanban-add-card';
import { KanbanCard } from '@/app/i/tasks/kanban-view/kanban-card';
import { filterTasks } from '@/app/i/tasks/list-view/filter-tasks.logic';

interface IKanbanColumn {
	value: string;
	label: string;
	items?: ITaskResponse[] | undefined;
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
}

export function KanbanColumn({ value, label, items, setItems }: IKanbanColumn) {
	return (
		<Droppable droppableId={value}>
			{provided => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className={styles.column}>
						<div className={styles.columnHeading}>{label}</div>
						{filterTasks(items, value)?.map((item, index) => {
							console.log('I', item);
							return (
								<Draggable
									key={item.id}
									index={index}
									draggableId={item.id}
								>
									{provided => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<KanbanCard
												key={item.id}
												item={item}
												setItems={setItems}
											/>
										</div>
									)}
								</Draggable>
							);
						})}
						{provided.placeholder}
						{value !== 'completed' && !items?.some(item => !item.id) && (
							<KanbanAddCard
								setItems={setItems}
								filterDate={
									FILTERS[value] ? FILTERS[value].format() : undefined
								}
							/>
						)}
					</div>
				</div>
			)}
		</Droppable>
	);
}
