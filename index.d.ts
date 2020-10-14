/// <reference types="react" />
declare type MonacoEditorProps = {
    width?: string;
    height?: string;
    value?: string;
    language?: "typescript" | "javascript";
    onChange: (code: string) => void;
};
export declare function getEditor(_react: unknown): import("react").FC<MonacoEditorProps>;
export {};
