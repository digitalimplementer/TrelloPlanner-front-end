import { Controller, SubmitHandler, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/buttons/button';
import { Field } from '@/components/ui/fields/field';
import { SingleSelect } from '@/components/ui/task-edit/single-select';

import { TIME_BLOCKING_COLORS } from '@/constants/color.constants';

import type { TypeTimeBlockFormState } from '@/types/time-block.types';

import { useCreateTimeBlock } from '@/hooks/useCreateTimeBlock';
import { useUpdateTimeBlock } from '@/hooks/useUpdateTimeBlock';

export function TimeBlockingForm() {
	const { register, control, watch, reset, handleSubmit, getValues } =
		useFormContext<TypeTimeBlockFormState>();

	const existId = watch('id');

	const { updateTimeBlock } = useUpdateTimeBlock();
	const { createTimeBlock, isPending } = useCreateTimeBlock();

	const onSubmit: SubmitHandler<TypeTimeBlockFormState> = data => {
		const { color, id, ...rest } = data;

		const dto = { ...rest, color: color || undefined };

		if (id) {
			updateTimeBlock({
				id,
				data: dto
			});
		} else {
			console.log('DTO', dto);
			createTimeBlock(dto);
		}

		reset({
			color: TIME_BLOCKING_COLORS[TIME_BLOCKING_COLORS.length - 1],
			duration: 0,
			name: '',
			id: undefined,
			order: 1
		});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-3/5'
		>
			<Field
				{...register('name', { required: true })}
				id='name'
				label='Enter name'
				placeholder='Enter name:'
				extra='mb-4'
			/>
			<Field
				{...register('duration', { required: true, valueAsNumber: true })}
				id='duration'
				label='Enter duration (min.)'
				placeholder='Enter duration (min.):'
				isNumber
				extra='mb-4'
			/>

			<div>
				<span className='inline-block mb-1.5'>Color:</span>
				<Controller
					control={control}
					name='color'
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							data={TIME_BLOCKING_COLORS.map(item => ({
								value: item,
								label: item
							}))}
							onChange={onChange}
							value={
								value ||
								TIME_BLOCKING_COLORS[TIME_BLOCKING_COLORS.length - 1]
							}
							isColorSelect
						/>
					)}
				/>
			</div>
			<Button
				type='submit'
				disabled={isPending}
				className='mt-6'
			>
				{existId ? 'Update' : 'Create'}
			</Button>
		</form>
	);
}
