import webpack from 'webpack';
import { buildWebpack } from '@packages/build_config';
import { BuildMode, BuildPaths, BuildPlatform } from '@packages/build_config';
import path from 'path';
import packageJson from './package.json';

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
		port: env.port ?? 3002,
		mode: env.mode ?? 'development',
		paths,
		platform: env.platform ?? 'desktop'
	});

	config.plugins.push(new webpack.container.ModuleFederationPlugin({
		name: 'admin',
		filename: 'remoteEntry.js',
		exposes: {
			'./Router': './src/router/Router.tsx',
		},
		shared: {
			...packageJson.dependencies,
			react: {
				//Подгружаем сразу
				eager: true,
				requiredVersion: packageJson.dependencies['react'],
			},
			'react-router-dom': {
				eager: true,
				requiredVersion: packageJson.dependencies['react-router-dom'],
			},
			'react-dom': {
				eager: true,
				requiredVersion: packageJson.dependencies['react-dom'],
			}
		}
	}))

	return config;
};
