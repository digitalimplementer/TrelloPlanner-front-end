import cn from 'clsx';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
	children,
	className,
	...rest
}: PropsWithChildren<TypeButton>) => {
	return (
		<button
			className={cn(
				'linear rounded-lg bg-transparent border border-primary py-2 px-7 text-base font-mediun text-white transition hover:bg-primary active:bg-brand-700',
				className
			)}
			{...rest}
		>
			{children}
		</button>
	);
};
