import React, { useEffect, useRef } from "react";
import ESService from "../../Services/ESbuilder";
import { Monaco } from "../../Services/Monaco";
import { Box } from "./Redactor.styled";

export const Redactor = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const editor = Monaco.createEditor(ref.current);
      editor?.onDidChangeModelContent(() => ESService.build(editor.getModel()?.getValue() ?? ''));
      ESService.build?.(editor?.getModel()?.getValue() ?? '')
    }
  }, [])

  return <Box ref={ref} />;

};
