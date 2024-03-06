import { DndContext, closestCenter } from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { Loader } from 'lucide-react';

import { useTimeBlockDnd } from '@/hooks/useTimeBlockDnd';
import { useTimeBlocks } from '@/hooks/useTimeBlocks';

import styles from './time-blocking.module.scss';
import { calcHoursLeft } from '@/app/i/time-blocking/calc-hours-left';
import { TimeBlock } from '@/app/i/time-blocking/time-block';

export function TimeBlockingList() {
	const { items, setItems, isLoading } = useTimeBlocks();
	const { handleDragEnd, sensors } = useTimeBlockDnd(items, setItems);

	if (isLoading) return <Loader />;

	const { hoursLeft } = calcHoursLeft(items);
	return (
		<div>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<div className={styles.list}>
					<SortableContext
						items={items || []}
						strategy={verticalListSortingStrategy}
					>
						{items?.length ? (
							items.map(item => (
								<TimeBlock
									key={item.id}
									item={item}
								/>
							))
						) : (
							<div>Add time-block</div>
						)}
					</SortableContext>
				</div>
			</DndContext>
			<div>
				{hoursLeft > 0
					? `${hoursLeft} hours out of 24 left for sleep`
					: 'No hours left for sleep'}
			</div>
		</div>
	);
}
