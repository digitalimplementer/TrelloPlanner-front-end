import cn from 'clsx';
import { GripVertical, Loader, Trash } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { TransparentField } from '@/components/ui/fields/transparent-field';
import { DatePicker } from '@/components/ui/task-edit/date-picker/date-picker';
import { SingleSelect } from '@/components/ui/task-edit/single-select';

import type { ITaskResponse, TypeTaskFormState } from '@/types/task.types';

import { useDeleteTask } from '@/hooks/useDeleteTask';
import { useTaskDebounce } from '@/hooks/useTaskDebounce';

import styles from './kanban-view.module.scss';

interface IKanbanCard {
	item: ITaskResponse;
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
}

export function KanbanCard({ item, setItems }: IKanbanCard) {
	const { register, control, watch } = useForm<TypeTaskFormState>({
		defaultValues: {
			name: item.name,
			isCompleted: item.isCompleted,
			createdAt: item.createdAt,
			priority: item.priority
		}
	});

	const { deleteTask, isDeletePending } = useDeleteTask();

	useTaskDebounce({ watch, itemId: item.id });
	return (
		<div
			className={cn(
				styles.card,
				{ [styles.completed]: watch('isCompleted') },
				'animation-opacity'
			)}
		>
			<div className={styles.cardHeader}>
				<button aria-describedby='todo-item'>
					<GripVertical className={styles.grip} />
				</button>
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
				<TransparentField {...register('name')} />
			</div>

			<div className={styles.cardBody}>
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
			<div className={styles.cardActions}>
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
