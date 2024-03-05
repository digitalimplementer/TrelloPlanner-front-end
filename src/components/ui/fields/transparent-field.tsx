import cn from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';

interface ITransparentField extends InputHTMLAttributes<HTMLInputElement> {}

export const TransparentField = forwardRef<HTMLInputElement, ITransparentField>(
	({ className, ...rest }, ref) => {
		return (
			<input
				className={cn(
					'border-none focus:outline-0 focus:shadow-transparent w-full bg-gray-700',
					className
				)}
				ref={ref}
				{...rest}
			/>
		);
	}
);

TransparentField.displayName = 'Transparent Field';
