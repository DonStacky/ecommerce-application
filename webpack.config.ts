import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import EslingPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import devConfig from './webpack.dev.config';
import prodConfig from './webpack.prod.config';

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
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
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
        test: /\.(png|jpg|svg)$/,
        type: 'asset/resource',
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
  },
  plugins: [
    new EslingPlugin({ extensions: ['ts'] }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './public/fonts/'),
          to: path.resolve(__dirname, './dist/fonts/'),
        },
        {
          from: path.resolve(__dirname, './public/image/'),
          to: path.resolve(__dirname, './dist/image/'),
        },
        {
          from: path.resolve(__dirname, './public/svg/'),
          to: path.resolve(__dirname, './dist/svg/'),
        },
      ],
    }),
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
