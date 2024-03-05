import { useQuery } from '@tanstack/react-query';

import { KEY } from '@/types/root.types';

import { userService } from '@/services/user.service';

export function useProfile() {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: [KEY.PROFILE],
		queryFn: () => userService.getProfile()
	});
	return {
		data,
		isLoading,
		isSuccess
	};
}
