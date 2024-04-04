import * as monaco from 'monaco-editor';

const defaultModelValue = `import React from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';

export const GlobalStyle = createGlobalStyle\`
    html, body, #app {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
    }
\`;


const Container = styled.div\`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
\`;

const Navbar = styled.div\`
    display: flex;
    flex-grow: 0;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 64px;
\`;

const Content = styled.div\`
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;    
    width: 100%;
    font-size: 72px;
\`;

const StyledLink = styled(Link)\`
    margin: 8px;
\`;

const Home = () => {
    return <>Home</>;
};

const About = () => {
    return <>About</>;
};

const Profile = () => {
    return <>Profile</>;
};

const App = () => {
    return (
        <HashRouter>
            <GlobalStyle />
            <Container>
                <Navbar>
                    <StyledLink to="/">Home</StyledLink>
                    <StyledLink to="/about">About</StyledLink>
                    <StyledLink to="/profile">Profile</StyledLink>
                </Navbar>
                <Content>
                    <Routes>
                        <Route exact path='/' Component={Home} />
                        <Route path='/about' Component={About} />
                        <Route path='/profile' Component={Profile} />
                    </Routes>
                </Content>
            </Container >
        </HashRouter>
    );
}

const root = document.getElementById('app');
ReactDOM.render(<App />, root);
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