import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState<any>(code || "");

  const handleEditorChange = (value: any) => {
    setValue(value);
    onChange("code", value);
  };

  return (
      <Editor
        height="73vh"
        width="auto"
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
  );
};
export { CodeEditorWindow};
