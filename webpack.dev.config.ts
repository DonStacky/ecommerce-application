import path from 'path';
import { Configuration } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const devConfig: Configuration & WebpackDevServer.Configuration = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
    compress: true,
    port: 9000,
    historyApiFallback: true,
  },
};

export default devConfig;
