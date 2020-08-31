import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import dotenv from 'dotenv';
import injectEnv from 'rollup-plugin-inject-process-env';
import proxyServe from 'rollup-plugin-serve-proxy';
// import typescript from 'rollup-plugin-typescript2';

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/main.ts',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'public/build/bundle.js',
    },
    plugins: [
        svelte({
            // enable run-time checks when not in production
            dev: !production,
            // we'll extract any component CSS out into
            // a separate file - better for performance
            css: (css) => {
                css.write('public/build/bundle.css');
            },
            preprocess: sveltePreprocess(),
        }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
            dedupe: ['svelte'],
        }),
        commonjs(),
        typescript({
            sourceMap: !production,
            noEmitOnError: false,
            // include: ['src/**/*', 'common/**/*'],
        }),

        !production &&
            proxyServe({
                open: true,
                verbose: true,
                contentBase: ['public'],
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                port: 5000,
                proxy: {
                    api: 'http://localhost:8080',
                },
            }),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload('public'),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser(),

        // Inject dotenv variables
        // injectEnv({
        //     envFilePath: '.env',
        // }),
        injectEnv({
            TEST: 'some test',
            ...dotenv.config().parsed,
        }),
        // dotenv(),
    ],
    watch: {
        clearScreen: false,
    },
};
