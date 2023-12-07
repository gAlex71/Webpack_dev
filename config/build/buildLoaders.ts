import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/types';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
	//Для оптимизации в разных сборках можно использовать переменные
	const isDev = options.mode === 'development';

	return [
		{
			test: /\.s[ac]ss$/i,
			use: [
				// Creates `style` nodes from JS strings
				isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
				// Translates CSS into CommonJS
				{
					loader: 'css-loader',
					options: {
						modules: {
							//Наименование стилей в зависимости от режима разработки
							localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
						},
					},
				},
				// Compiles Sass to CSS
				'sass-loader',
			],
		},
		{
			//ts-loader умеет работать с jsx
			test: /\.tsx?$/,
			use: 'ts-loader',
			exclude: /node_modules/,
		},
		{
			test: /\.(png|jpg|jpeg|gif)$/i,
			type: 'asset/resource',
		},
		{
			test: /\.svg$/i,
			// issuer: /\.[jt]sx?$/,
			use: [{
				loader: '@svgr/webpack', 
				options: {
					icon: true,
					svgoConfig: {
						plugins: [
							{
								name: 'convertColors',
								params: {
									currentColor: true
								}
							}
						]
					}
				}
			}],
		}
	];
}
