import React from "react";
import { startMonaco } from "react-cdn-monaco-editor";

export const MonacoEditor: React.FC<
  { code: string; onChange: (code: string) => void }
> = ({ code, onChange }) => {
  React.useEffect(() => {
    startMonaco({ language: "typescript",code, onChange });
  });

  return <div style={{ height: "100vh", width: "50%" }} id="container" />;
};
