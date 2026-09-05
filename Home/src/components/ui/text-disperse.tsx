'use client';
import { useState } from 'react';
import type { JSX, ComponentProps } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Transform {
	x: number;
	y: number;
	rotationZ: number;
}

const transforms: Transform[] = [
	{ x: -0.7, y: -0.5, rotationZ: -24 },
	{ x: -0.2, y: -0.35, rotationZ: -6 },
	{ x: -0.05, y: 0.1, rotationZ: 10 },
	{ x: -0.05, y: -0.1, rotationZ: -8 },
	{ x: -0.1, y: 0.45, rotationZ: 4 },
	{ x: 0.2, y: -0.1, rotationZ: 9 },
	{ x: 0.35, y: 0.15, rotationZ: -12 },
	{ x: 0.45, y: 0.25, rotationZ: -16 },
	{ x: -0.3, y: -0.55, rotationZ: 8 },
	{ x: 0.1, y: 0.35, rotationZ: 12 },
	{ x: 0.15, y: -0.15, rotationZ: -9 },
	{ x: 0.3, y: 0.15, rotationZ: 12 },
	{ x: 0.7, y: 0.5, rotationZ: 18 },
];

type TextDisperseProps = ComponentProps<'div'> & {
	/** children should be string (max 13 chars) */
	children: string;
	onHover?: (isActive: boolean) => void;
};

export function TextDisperse({
	children,
	onHover,
	className,
	...props
}: Omit<TextDisperseProps, 'onMouseEnter' | 'onMouseLeave'>) {
	const [isAnimated, setIsAnimated] = useState(false);

	const splitWord = (word: string) => {
		let chars: JSX.Element[] = [];
		word.split('').forEach((char, i) => {
			chars.push(
				<motion.span
					className="inline-block transition-colors duration-200"
					custom={i}
					variants={{
						open: (i: number) => ({
							x: transforms[i % transforms.length].x + 'em',
							y: transforms[i % transforms.length].y + 'em',
							rotateZ: transforms[i % transforms.length].rotationZ,
							transition: { duration: 0.65, ease: [0.33, 1, 0.68, 1] },
							zIndex: 1,
						}),
						closed: {
							x: 0,
							y: 0,
							rotateZ: 0,
							transition: { duration: 0.65, ease: [0.33, 1, 0.68, 1] },
							zIndex: 0,
						},
					}}
					animate={isAnimated ? 'open' : 'closed'}
					key={char + i}
				>
					{char === ' ' ? '\u00A0' : char}
				</motion.span>,
			);
		});
		return chars;
	};

	const manageMouseEnter = () => {
		onHover?.(true);
		setIsAnimated(true);
	};

	const manageMouseLeave = () => {
		onHover?.(false);
		setIsAnimated(false);
	};

	return (
		<div
			className={cn(
				"relative inline-flex items-center justify-center cursor-pointer select-none tracking-tight leading-none",
				className,
			)}
			onMouseEnter={manageMouseEnter}
			onMouseLeave={manageMouseLeave}
			{...props}
		>
			{splitWord(children)}
		</div>
	);
}
