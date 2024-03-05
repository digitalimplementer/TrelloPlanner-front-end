import type { Config } from 'tailwindcss';

import { COLORS } from './src/constants/color.constants';

const config: Config = {
	darkMode: 'class',
	mode: 'jit',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: COLORS,
			spacing: {
				0.5: '0.12rem',
				layout: '1.4rem',
				'big-layout': '2.3rem'
			},
			fontSize: {
				xs: '0.9rem',
				xm: '1.07rem',
				base: '1.18rem',
				lg: '1.24rem',
				xl: '1.38rem',
				'1.5xl': '1.5rem',
				'2xl': '1.82rem',
				'3xl': '2.22rem',
				'4xl': '2.66rem',
				'5xl': '3.56rem',
				'6xl': '4.44rem',
				'7xl': '5.33rem',
				'8xl': '7.1rem',
				'9xl': '9.5rem'
			},
			transitionDuration: {
				DEFAULT: '266ms'
			},
			width: {
				'1p': '1%',
				'2p': '2%',
				'3p': '3%',
				'4p': '4%',
				'5p': '5%',
				'6p': '6%',
				'7p': '7%',
				'8p': '8%',
				'9p': '9%',
				'10p': '10%',
				'11p': '11%',
				'12p': '12%',
				'13p': '13%',
				'14p': '14%',
				'15p': '15%',
				'16p': '16%',
				'17p': '17%',
				'18p': '18%',
				'19p': '19%',
				'20p': '20%',
				'21p': '21%'
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				dm: ['DM Sans', 'sans-serif']
			},
			boxShadow: {
				'3xl': '14px 17px 40px 4px',
				inset: 'inset 0px 18px 22px',
				darkinset: '0px 4px 4px inset'
			}
		},
		screens: {
			sm: '576px',
			'sm-max': { max: '576px' },
			md: '768px',
			'md-max': { max: '768px' },
			lg: '992px',
			'lg-max': { max: '992px' },
			xl: '1200px',
			'xl-max': { max: '1200px' },
			'2xl': '1320px',
			'2xl-max': { max: '1320px' },
			'3xl': '1600px',
			'3xl-max': { max: '1600px' },
			'4xl': '1850px',
			'4xl-max': { max: '1850px' }
		}
	},
	plugins: []
};
export default config;
