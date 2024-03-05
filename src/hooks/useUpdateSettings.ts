import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TypeUserForm } from '@/types/auth.types';
import { KEY } from '@/types/root.types';

import { userService } from '@/services/user.service';

export function useUpdateSettings() {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationKey: [KEY.UPDATE_PROFILE],
		mutationFn: (data: TypeUserForm) => userService.update(data),
		onSuccess() {
			toast.success('Profile has been updated!'),
				queryClient.invalidateQueries({ queryKey: [KEY.PROFILE] });
		}
	});

	return {
		mutate,
		isPending
	};
}
