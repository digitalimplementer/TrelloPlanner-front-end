import { DropResult } from '@hello-pangea/dnd';

import { useTasks } from '@/hooks/useTasks';
import { useUpdateTask } from '@/hooks/useUpdateTasks';

import { FILTERS } from '@/app/i/tasks/columns.data';

export function useTaskDnd() {
	const { updateTask } = useUpdateTask();

	const { items } = useTasks();

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const destinationColumnId = result.destination.droppableId;

		if (destinationColumnId === result.source.droppableId) return;

		if (destinationColumnId === 'completed') {
			updateTask({
				id: result.draggableId,
				data: {
					isCompleted: true
				}
			});

			return;
		}

		const newCreatedAt = FILTERS[destinationColumnId].format();
		const draggableItem =
			items && items.find(item => item.id === result.draggableId);

		updateTask({
			id: result.draggableId,
			data: {
				isCompleted: false,
				createdAt: newCreatedAt,
				name: draggableItem?.name,
				priority: draggableItem?.priority
			}
		});
	};

	return {
		onDragEnd
	};
}
