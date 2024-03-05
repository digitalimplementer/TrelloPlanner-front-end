'use client';

import { FormProvider, useForm } from 'react-hook-form';

import type { TypeTimeBlockFormState } from '@/types/time-block.types';

import { TimeBlockingList } from '@/app/i/time-blocking/time-blocking-list';
import { TimeBlockingForm } from '@/forms/time-blocking.form';

export function TimeBlocking() {
	const methods = useForm<TypeTimeBlockFormState>();
	return (
		<FormProvider {...methods}>
			<div className='grid grid-cols-2 gap-12'>
				<TimeBlockingList />
				<TimeBlockingForm />
			</div>
		</FormProvider>
	);
}
