import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/types';

export function buildDevServer(options: BuildOptions):DevServerConfiguration {
    return {
        port: options.port ?? 3000,
        open: true,
        //Работает только в dev разработке, если используем nginx, то делаем проксирование на index.html
        historyApiFallback: true,
        //Позволяет делать изменения в проекте без перезагрузки страницы
        hot: true
    }   
}