import type React from "react";
declare type MonacoEditorProps = {
    width?: string;
    height?: string;
    value?: string;
    language?: "typescript" | "javascript";
    onChange: (code: string) => void;
};
export declare function getEditor(react: {
    useState: <T>(state: T) => [T, (state: T) => void];
    createElement: (el: string, props: unknown, children?: unknown) => unknown;
    useEffect: (fn: () => unknown, depts: unknown[]) => unknown;
}): React.FC<MonacoEditorProps>;
export {};
