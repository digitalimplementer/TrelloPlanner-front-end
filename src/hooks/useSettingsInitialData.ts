import { useEffect } from 'react';
import { UseFormReset } from 'react-hook-form';

import { TypeUserForm } from '@/types/auth.types';

import { useProfile } from '@/hooks/useProfile';

export function useSettingsInitialData({
	reset
}: {
	reset: UseFormReset<TypeUserForm>;
}) {
	const { isSuccess, data } = useProfile();

	useEffect(() => {
		if (isSuccess && data) {
			reset({
				email: data?.user.email,
				name: data?.user.name,
				breakInterval: data?.user.breakInterval,
				intervalsCount: data?.user.intervalsCount,
				workInterval: data?.user.workInterval
			});
		}
	}, [isSuccess]);
}
