import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { KEY } from '@/types/root.types';
import type { ITimeBlockResponse } from '@/types/time-block.types';

import { timeBlockService } from '@/services/time-block.service';

export function useTimeBlocks() {
	const { data, isLoading } = useQuery({
		queryKey: [KEY.TIME_BLOCK],
		queryFn: () => timeBlockService.getTimeBlocks()
	});

	const [items, setItems] = useState<ITimeBlockResponse[] | undefined>(
		data?.data
	);

	useEffect(() => {
		setItems(data?.data);
	}, [data?.data]);

	return {
		items,
		setItems,
		isLoading
	};
}
