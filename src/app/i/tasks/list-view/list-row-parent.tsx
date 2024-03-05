import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Dispatch, SetStateAction } from 'react';

import { ITaskResponse } from '@/types/task.types';

import styles from './list-view.module.scss';
import { FILTERS } from '@/app/i/tasks/columns.data';
import { filterTasks } from '@/app/i/tasks/list-view/filter-tasks.logic';
import { ListAddRowInput } from '@/app/i/tasks/list-view/list-add-row-input';
import { ListRow } from '@/app/i/tasks/list-view/list-row';

interface IListRowParent {
	value: string;
	label: string;
	items?: ITaskResponse[] | undefined;
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
}

export function ListRowParent({
	value,
	label,
	items,
	setItems
}: IListRowParent) {
	return (
		<Droppable droppableId={value}>
			{provided => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className={styles.colHeading}>
						<div className='w-full'>{label}</div>
					</div>

					{filterTasks(items, value)?.map((item, index) => {
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
										<ListRow
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
						<ListAddRowInput
							setItems={setItems}
							filterDate={
								FILTERS[value] ? FILTERS[value].format() : undefined
							}
						/>
					)}
				</div>
			)}
		</Droppable>
	);
}
