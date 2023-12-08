import path from 'path';
import webpack, { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/types';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
    //Для оптимизации в разных сборках можно использовать переменные
	const isDev = options.mode === 'development';
    const isProd = options.mode === 'production';

    return [
        new HtmlWebpackPlugin({ template: options.paths.html, favicon: path.resolve(options.paths.public, 'myFav.png') }),
        isDev && new webpack.ProgressPlugin(),
        isProd && new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }),
        isProd && new BundleAnalyzerPlugin(),
        //Копирование статичных файлов в билд
        isProd && new CopyPlugin({
            patterns: [
              { from: path.resolve(options.paths.public, 'locales'), to: path.resolve(options.paths.output, 'locales') },
            ],
          }),
        new DefinePlugin({_PLATFORM_: JSON.stringify(options.platform)}),
        //Вынесение проверки типов отдельным процессом
        new ForkTsCheckerWebpackPlugin(),
        //Позволяет делать изменения в проекте без перезагрузки страницы
        isDev && new ReactRefreshWebpackPlugin()
    ].filter(Boolean)
}