import React from "react";
declare type MonacoEditorProps = {
    width?: string;
    height?: string;
    value?: string;
    language?: "typescript" | "javascript";
    onChange: (code: string) => void;
};
declare type ReactType = typeof React;
export declare function getEditor(React: ReactType): React.FC<MonacoEditorProps>;
export {};
