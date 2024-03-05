'use client';

import { useMutation } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { KEY } from '@/types/root.types';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';

import { authService } from '@/services/auth.service';

export const LogoutButton = () => {
	const router = useRouter();
	const { mutate } = useMutation({
		mutationKey: [KEY.LOGOUT],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push(DASHBOARD_PAGES.AUTH)
	});
	return (
		<div className='absolute top-1 right-1'>
			<button
				className='opacity-20 hover:opacity-100 transition-opacity duration-300'
				onClick={() => mutate()}
			>
				<LogOut size={20} />
			</button>
		</div>
	);
};
