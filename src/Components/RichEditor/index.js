import React, { useState,  useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./style.css";

export default function RichEditor({
  onChange = () => {},
  label = "",
  editSavedState,
}) {
  const [editorState, setEditorState] = useState();

  useEffect(() => {
    if (editSavedState) {
      setEditorState(editSavedState);
    }
  }, []);

  return (
    <div>
      <div style={{ fontSize: 13 }}>{label}</div>
      <Editor
        style={{ height: "200px" }}
        editorState={editorState}
        initialContentState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="editor-main-block"
        editorClassName="editor-container-block"
        onEditorStateChange={(event) => {
          setEditorState(event);
          onChange(event);
          //   onChange(event.getCurrentContent().getPlainText());
        }}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />
    </div>
  );
}
