import cn from 'clsx';
import { GripVertical, Loader, Trash } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { TransparentField } from '@/components/ui/fields/transparent-field';
import { DatePicker } from '@/components/ui/task-edit/date-picker/date-picker';
import { SingleSelect } from '@/components/ui/task-edit/single-select';

import {
	EnumTaskPriority,
	type ITaskResponse,
	type TypeTaskFormState
} from '@/types/task.types';

import { useDeleteTask } from '@/hooks/useDeleteTask';
import { useTaskDebounce } from '@/hooks/useTaskDebounce';

import styles from './list-view.module.scss';

interface IListRow {
	item: ITaskResponse;
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
}

export function ListRow({ item, setItems }: IListRow) {
	const { register, control, watch } = useForm<TypeTaskFormState>({
		defaultValues: {
			name: item.name,
			isCompleted: item.isCompleted,
			createdAt: item.createdAt,
			priority: item.priority || EnumTaskPriority.low
		}
	});

	const { deleteTask, isDeletePending } = useDeleteTask();

	useTaskDebounce({ watch, itemId: item.id });
	return (
		<div
			className={cn(
				styles.row,
				watch('isCompleted') ? styles.completed : '',
				'animation-opacity'
			)}
		>
			<div>
				<span className='inline-flex items-center gap-2.5 w-full'>
					<button
						aria-describedby='todo-item'
						className='flex items-end gap-2'
					>
						<GripVertical className={styles.grip} />

						<Controller
							control={control}
							name='isCompleted'
							render={({ field: { value, onChange } }) => (
								<Checkbox
									checked={value}
									onChange={onChange}
								/>
							)}
						/>
					</button>

					<TransparentField {...register('name')} />
				</span>
			</div>
			<div>
				<Controller
					control={control}
					name='createdAt'
					render={({ field: { value, onChange } }) => (
						<DatePicker
							onChange={onChange}
							value={value || ''}
						/>
					)}
				/>
			</div>
			<div className='capitalize'>
				<Controller
					control={control}
					name='priority'
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							onChange={onChange}
							value={value || ''}
							data={['high', 'medium', 'low'].map(i => ({
								value: i,
								label: i
							}))}
						/>
					)}
				/>
			</div>
			<div>
				<button
					onClick={() =>
						item.id
							? deleteTask(item.id)
							: setItems(prev => prev?.slice(0, -1))
					}
					className='opacity-50 transition-opacity hover:opacity-100'
				>
					{isDeletePending ? <Loader /> : <Trash size={15} />}
				</button>
			</div>
		</div>
	);
}
