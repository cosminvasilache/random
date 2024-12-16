import { viteSingleFile } from 'vite-plugin-singlefile';
import { createHtmlPlugin } from 'vite-plugin-html';
import { UserConfig } from 'vite';

const config = {
	root: './src',

	build: {
		outDir: '../dist',
		emptyOutDir: true,
		minify: true,
		cssMinify: true,
		modulePreload: {
			polyfill: false,
		},
	},

	server: {
		open: true,
	},
	plugins: [
		createHtmlPlugin({
			minify: true,
		}),
		viteSingleFile({}),
	],

} satisfies UserConfig;

export default config;
