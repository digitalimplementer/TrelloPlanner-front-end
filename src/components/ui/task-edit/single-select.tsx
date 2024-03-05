import cn from 'clsx';
import { X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import { useOutside } from '@/hooks/useOutside';

interface IOption {
	label: string;
	value: string;
}

interface ISingleSelect {
	data: IOption[];
	onChange: (value: string) => void;
	value: string;
	isColorSelect?: boolean;
}

export const SingleSelect = ({
	data,
	onChange,
	value,
	isColorSelect
}: ISingleSelect) => {
	const { isShow, setIsShow, ref } = useOutside(false);

	const getValue = () => data.find(i => i.value === value)?.value;
	return (
		<div
			className={cn('relative min-w-36', { 'w-max': isColorSelect })}
			ref={ref}
		>
			<button
				onClick={e => {
					e.preventDefault();
					setIsShow(!isShow);
				}}
			>
				{getValue() ? (
					<Badge
						variant={value}
						className='capitalize'
						style={isColorSelect ? { background: value } : {}}
					>
						{getValue()}
					</Badge>
				) : (
					<Badge>Click to select</Badge>
				)}
			</button>
			{value && (
				<button
					className='absolute -top-2 -right-4 opacity-30 hover:opacity-100 transition-opacity'
					onClick={() => onChange('')}
				>
					<X size={14} />
				</button>
			)}
			{isShow && (
				<div
					className={cn(
						'absolute w-full p-2.5 left-0 slide bg-sidebar z-10 shadow rounded-lg'
					)}
					style={{ top: 'calc(100% + .5rem)' }}
				>
					{data.map(i => (
						<button
							key={i.value}
							onClick={e => {
								e.preventDefault();
								onChange(i.value);
								setIsShow(false);
							}}
							className='block mb-4 last:mb-0 capitalize rounded-lg'
							style={isColorSelect ? { background: i.value } : {}}
						>
							<Badge variant={i.value}>{i.label}</Badge>
						</button>
					))}
				</div>
			)}
		</div>
	);
};
