/// <reference types="react" />
declare type MonacoEditorProps = {
    width?: string;
    height?: string;
    value?: string;
    language?: "typescript" | "javascript";
    onChange: (code: string) => void;
};
export declare function getEditor(): import("react").FC<MonacoEditorProps>;
export {};
