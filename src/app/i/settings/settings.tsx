'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/buttons/button';
import { Field } from '@/components/ui/fields/field';

import { TypeUserForm } from '@/types/auth.types';

import { useSettingsInitialData } from '@/hooks/useSettingsInitialData';
import { useUpdateSettings } from '@/hooks/useUpdateSettings';

export default function Settings() {
	const { register, handleSubmit, reset } = useForm<TypeUserForm>({
		mode: 'onChange'
	});

	useSettingsInitialData({ reset });

	const { isPending, mutate } = useUpdateSettings();

	const onSubmit: SubmitHandler<TypeUserForm> = data => {
		const { password, ...rest } = data;

		mutate({
			...rest,
			password: password || undefined
		});
	};

	return (
		<div>
			<form
				className='w-2/4'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='grid grid-cols-2 gap-10'>
					<div>
						<Field
							id='email'
							label='Email'
							placeholder='Enter email:'
							type='email'
							extra='mb-4'
							{...register('email', { required: 'Email is required!' })}
						/>
						<Field
							id='name'
							label='Name'
							placeholder='Enter name:'
							extra='mb-4'
							{...register('name')}
						/>
						<Field
							id='password'
							label='Password'
							placeholder='Enter password:'
							extra='mb-10'
							{...register('password')}
						/>
					</div>

					<div>
						<Field
							id='workInterval'
							label='Work interval (min.):'
							placeholder='Enter work interval (min):'
							extra='mb-4'
							isNumber
							{...register('workInterval', { valueAsNumber: true })}
						/>
						<Field
							id='breakInterval'
							label='Break interval (min.):'
							placeholder='Enter break interval (min.):'
							extra='mb-4'
							isNumber
							{...register('breakInterval', { valueAsNumber: true })}
						/>
						<Field
							id='intervalsCount'
							label='Intervals count (max 10)'
							placeholder='Enter intervals count (max10):'
							extra='mb-6'
							isNumber
							{...register('intervalsCount', { valueAsNumber: true })}
						/>
					</div>
				</div>
				<Button
					type='submit'
					disabled={isPending}
				>
					Save
				</Button>
			</form>
		</div>
	);
}
