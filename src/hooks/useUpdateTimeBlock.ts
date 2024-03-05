import { useMutation, useQueryClient } from '@tanstack/react-query';

import { KEY } from '@/types/root.types';
import { TypeTimeBlockFormState } from '@/types/time-block.types';

import { timeBlockService } from '@/services/time-block.service';

export function useUpdateTimeBlock(key?: string) {
	const queryClient = useQueryClient();

	const { mutate: updateTimeBlock } = useMutation({
		mutationKey: [KEY.UPDATE_TIME_BLOCK, key],
		mutationFn: ({
			id,
			data
		}: {
			id: string;
			data: TypeTimeBlockFormState;
		}) => timeBlockService.updateTimeBlock(id, data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: [KEY.TIME_BLOCK] });
		}
	});

	return {
		updateTimeBlock
	};
}
