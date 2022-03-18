import {build, initialize} from 'esbuild-wasm'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let isInit = false;
const bundle = async (rawCode: string) => {
    try {     
        if (!isInit) {
            isInit = true;
            console.log('initialized!');
            await initialize({
                worker: true,
                wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.13/esbuild.wasm'
            });
        }

        const result = await build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window'
            },
            jsxFactory: '_React.createElement',
            jsxFragment: '_React.Fragment',
        });

        return {
            code: result.outputFiles[0].text,
            err: ''
        };
    } catch (e: any) {   
        return {
            code: '',
            err: e.message
        }
    }
};

export default bundle;