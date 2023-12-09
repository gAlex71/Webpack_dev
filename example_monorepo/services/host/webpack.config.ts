import webpack from 'webpack';
import { buildWebpack } from '@packages/build_config';
import { BuildMode, BuildPaths, BuildPlatform } from '@packages/build_config';
import path from 'path';

interface EnvVariable {
	mode?: BuildMode;
	port?: number;
	platform?: BuildPlatform;
}

export default (env: EnvVariable) => {
	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		public: path.resolve(__dirname, 'public'),
		output: path.resolve(__dirname, 'build'),
		src: path.resolve(__dirname, 'src')
	};

	const config: webpack.Configuration = buildWebpack({
		port: env.port ?? 3000,
		mode: env.mode ?? 'development',
		paths,
		platform: env.platform ?? 'desktop'
	});
	return config;
};
