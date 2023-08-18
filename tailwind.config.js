const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{vue,js}'],
	theme: {
		fontFamily: {
			sans: ['Roboto Slab', 'sans-serif'],
			mono: ['Roboto Mono', 'monospace'],
		},
		extend: {
			height: {
				120: '30rem',
			},
			screens: {
				xs: '520px',
			},
			colors: {
				theme: {
					primary: '#e83438',
					secondary: '#e1612d',
				},
				slate: {
					450: '#78869c',
				},
			},
		},
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('touch', '@media (hover: none)');
			addVariant('not-touch', '@media not (hover: none)');
		}),
		require('@tailwindcss/forms'),
	],
};
