import * as monaco from 'monaco-editor';

const defaultModelValue = `export default exersizes = {
    username: '',
    ex1: () => 12321,
    ex2: () => 12321,
    ex3: () => 12321,
}
`

export const Monaco = new class {

    editor?: monaco.editor.IStandaloneCodeEditor;
    model?: monaco.editor.ITextModel;

    constructor() {
        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: false
        });

        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            jsx: monaco.languages.typescript.JsxEmit.React,
            allowNonTsExtensions: true,
            moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            module: monaco.languages.typescript.ModuleKind.CommonJS,
            noEmit: true,
            esModuleInterop: true,
        });

        ['react', 'react-dom', 'styled-components', 'history', 'react-router', 'react-router-dom'].forEach(this.loaStaticdDTS);
    }

    loaStaticdDTS = async (libName: string) => {
        const response = await fetch(`/${libName}.d.ts`)
        const dts = await response.text();
        monaco.editor.createModel(dts, 'typescript', monaco.Uri.parse(`file:///node_modules/@types/${libName}/index.d.ts`));
        monaco.languages.typescript.typescriptDefaults.addExtraLib(dts, `file:///node_modules/@types/${libName}/index.d.ts`);
    }

    createEditor = (ref: HTMLDivElement): monaco.editor.IStandaloneCodeEditor | null => {
        if (ref) {
            this.createModel();
            this.editor = monaco.editor.create(ref, {
                theme: "vs-dark",
                automaticLayout: true,
                model: this.model
            }) as monaco.editor.IStandaloneCodeEditor;
            return this.editor;
        }
        return null;
    }

    createModel = () => {
        this.model = this.model ?? monaco.editor.createModel(defaultModelValue, 'typescript', monaco.Uri.parse(`file:///index.tsx`));
        monaco.editor.setModelLanguage(this.model, 'typescript');
    }

    updateModel = (data: string) => {
        this.model?.setValue(data ?? '');
    }

}