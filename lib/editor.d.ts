import type monaco from "monaco-editor";
export declare function startMonaco({ onChange, code }: {
    onChange: any;
    code: any;
}): Promise<monaco.editor.IStandaloneCodeEditor>;
