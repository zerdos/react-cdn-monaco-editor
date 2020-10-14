import type React from "react";
declare type MonacoEditorProps = {
    width?: string;
    height?: string;
    value?: string;
    language?: "typescript" | "javascript";
    onChange: (code: string) => void;
};
export declare function getEditor({ createElement, useState, useEffect }: typeof React): React.FC<MonacoEditorProps>;
export {};
