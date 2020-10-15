import React from "react";
declare type MonacoEditorProps = {
    width?: string;
    height?: string;
    value?: string;
    language?: "typescript" | "javascript";
    onChange: (code: string) => void;
};
export declare const MonacoEditor: React.FC<MonacoEditorProps>;
export {};
