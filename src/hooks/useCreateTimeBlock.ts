import { useMutation, useQueryClient } from '@tanstack/react-query';

import { KEY } from '@/types/root.types';
import { TypeTimeBlockFormState } from '@/types/time-block.types';

import { timeBlockService } from '@/services/time-block.service';

export function useCreateTimeBlock() {
	const queryClient = useQueryClient();

	const { mutate: createTimeBlock, isPending } = useMutation({
		mutationKey: [KEY.CREATE_TIME_BLOCK],
		mutationFn: (data: TypeTimeBlockFormState) =>
			timeBlockService.createTimeBlock(data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: [KEY.TIME_BLOCK] });
		}
	});

	return {
		createTimeBlock,
		isPending
	};
}
