import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

type Mode = 'production' | 'development';

interface EnvVariable {
  mode: Mode;
  port: number;
}

export default (env: EnvVariable) => {
	//Для оптимизации в разных сборках можно использовать переменные
	const isDev = env.mode === 'development';

	const config: webpack.Configuration = {
		mode: env.mode ?? 'development',
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: '[name].[contenthash].js',
			clean: true,
		},
		plugins: [
			new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
			new webpack.ProgressPlugin(),
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash:8].css',
				chunkFilename: 'css/[name].[contenthash:8].css'
			})
		],
		module: {
			rules: [
				{
					test: /\.s[ac]ss$/i,
					use: [
					  // Creates `style` nodes from JS strings
					  MiniCssExtractPlugin.loader,
					  // Translates CSS into CommonJS
					  "css-loader",
					  // Compiles Sass to CSS
					  "sass-loader",
					],
				},
				{
					//ts-loader умеет работать с jsx
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		//Исходная карта кода
		//Запуск с указанием порта
		// npm run start -- --env port=5000
		devtool: isDev ? 'inline-source-map' : false,
		devServer: isDev ? {
			port: env.port ?? 3000,
			open: true
		} : undefined
	};
  return config;
};
