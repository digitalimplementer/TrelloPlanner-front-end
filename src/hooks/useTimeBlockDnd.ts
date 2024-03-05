import {
	DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

import { KEY } from '@/types/root.types';
import type { ITimeBlockResponse } from '@/types/time-block.types';

import { timeBlockService } from '@/services/time-block.service';

export function useTimeBlockDnd(
	items: ITimeBlockResponse[] | undefined,
	setItems: Dispatch<SetStateAction<ITimeBlockResponse[] | undefined>>
) {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor)
	);

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationKey: [KEY.UPDATE_ORDER_TIME_BLOCK],
		mutationFn: (ids: string[]) => timeBlockService.updateOrderTimeBlock(ids),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: [KEY.TIME_BLOCK] });
		}
	});

	const handleDragEnd = (e: DragEndEvent) => {
		const { active, over } = e;

		if (active.id !== over?.id && items) {
			const oldIndex = items.findIndex(i => i.id === active.id);
			const newIndex = items.findIndex(i => i.id === (over?.id || ''));

			if (oldIndex !== -1 && newIndex !== -1) {
				const newItems = arrayMove(items, oldIndex, newIndex);
				setItems(newItems);
				mutate(newItems.map(i => i.id));
			}
		}
	};

	return {
		handleDragEnd,
		sensors
	};
}
