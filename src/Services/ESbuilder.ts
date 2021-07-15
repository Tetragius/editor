import { BuildOptions, Plugin } from 'esbuild';
const esbuild = require('esbuild-wasm');

interface IESService {
    init: boolean;
    build(string: string): Promise<void>;
}

const namespace = 'virtual';

export const pluginEntry = (context: any, text: string): Plugin => {
    return {
        name: 'virtual-entry',
        setup(build) {
            build.onResolve({ filter: /^<stdin>$/ }, () => {
                return {
                    path: 'index.tsx',
                    namespace: namespace,
                    pluginData: {
                        importer: '',
                    },
                };
            });

            build.onLoad({ filter: /.*/, namespace: namespace }, async (args) => {
                return {
                    contents: text,
                    pluginData: {
                        importer: 'index.tsx',
                    },
                    loader: 'tsx',
                };
            });
        },
    };
};


export const pluginGlobalExternal = (): Plugin => {
    return {
        name: 'plugin-modules',
        setup(build) {

            build.onResolve({ filter: /^([^\.\/]).*/ }, (args) => {

                const external = build.initialOptions.external?.includes(args.path);

                if (external) {
                    return {
                        path: args.path,
                        namespace: `node_modules:external`,
                        pluginData: {
                            ...args.pluginData,
                            package: args.path,
                        },
                    };
                }

            });

            build.onLoad({ filter: /.*/, namespace: `node_modules:external` }, async (args) => {

                const content = `module.exports = window['${args.path}'];`;

                return {
                    contents: content,
                    pluginData: {
                        importer: args.path,
                    },
                    loader: 'js',
                };
            });

        },
    };
};

export const esBuildConfig = (text: string): BuildOptions => ({
    entryPoints: ['<stdin>'],
    bundle: true,
    loader: { '.tsx': 'tsx' },
    external: ['react', 'react-dom', 'react-router-dom', 'styled-components'],
    plugins: [pluginEntry(this, text), pluginGlobalExternal()],
    write: false
})

const ESService: IESService = {
    init: false,
    build: async function (text: string) {
        if (!this.init) {
            await esbuild.initialize({ wasmURL: 'esbuild.wasm' });
            this.init = true;
        }
        const data = await esbuild.build(esBuildConfig(text));
        data.outputFiles?.forEach((file: any) => {
            const _file = new File([file.text], `index.js`, { type: 'text/javascript' });
            const url = URL.createObjectURL(_file);
            localStorage.setItem('script', url);
        });
    }
};

export default ESService;