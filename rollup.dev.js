import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { relative } from 'path';
import { name } from './package.json';

export default {
	input: 'src/index.js',
	plugins: [
		replace({
			DEBUG: JSON.stringify(true)
		}),
		babel({
			exclude: 'node_modules/**'
		})
	],
	treeshake: {
		propertyReadSideEffects: false
	},
	output:
	{
		name,
		file: 'example/scripts/secan.umd.js',
		format: 'umd',
		sourcemap: true,
		sourcemapPathTransform: path => ~path.indexOf('index') ? 'secan.js' : relative('src', path)
	}
};
