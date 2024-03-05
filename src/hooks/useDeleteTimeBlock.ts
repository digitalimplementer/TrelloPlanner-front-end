import { useMutation, useQueryClient } from '@tanstack/react-query';

import { KEY } from '@/types/root.types';

import { timeBlockService } from '@/services/time-block.service';

export function useDeleteTimeBlock(itemId: string) {
	const queryClient = useQueryClient();
	const { mutate: deleteTimeBlock, isPending: isDeletePending } = useMutation({
		mutationKey: [KEY.DELTE_TIME_BLOCK, itemId],
		mutationFn: () => timeBlockService.deleteTimeBlock(itemId),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: [KEY.TIME_BLOCK] });
		}
	});

	return {
		isDeletePending,
		deleteTimeBlock
	};
}
