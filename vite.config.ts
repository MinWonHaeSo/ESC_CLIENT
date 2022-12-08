import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            kakaoMapKey: env.VITE_KAKAO_KEY,
            fontAwesomeKey: env.VITE_FONTAWESOME_KEY,
          },
        },
      }),
      svgr(),
    ],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve('src') }],
    },
  };
};
