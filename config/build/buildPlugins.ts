import path from 'path';
import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/types';

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
    //Для оптимизации в разных сборках можно использовать переменные
	const isDev = options.mode === 'development';
    const isProd = options.mode === 'production';

    return [
        new HtmlWebpackPlugin({ template: options.paths.html }),
        isDev && new webpack.ProgressPlugin(),
        isProd && new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        })
    ].filter(Boolean)
}