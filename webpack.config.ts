import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import EslingPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import devConfig from './webpack.dev.config';
import prodConfig from './webpack.prod.config';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

const baseConfig: Configuration = {
  entry: path.resolve(__dirname, './src/app/app'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: 'ts-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                'src/app/styles/abstract/_variables.scss',
                'src/app/styles/abstract/_constants.scss',
                'src/app/styles/abstract/_mixins.scss',
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
        type: 'asset',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
    assetModuleFilename: 'assets/[hash][ext]',
  },
  plugins: [
    new EslingPlugin({ extensions: ['ts'] }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new FaviconsWebpackPlugin('./public/icon/favicon.png'),
  ],
};

type EnvironmentVar = {
  mode: Configuration['mode'];
};

export default (env: EnvironmentVar) => {
  const isProductionMode = env.mode === 'production';
  const envConfig = isProductionMode ? prodConfig : devConfig;

  return merge(baseConfig, envConfig);
};
