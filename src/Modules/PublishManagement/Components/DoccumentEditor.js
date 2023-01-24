import React, { useState, useEffect } from "react";
import RichEditor from "../../../Components/RichEditor";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";

import Button from "../../../Components/Button";

export default function DoccumentEditor({ saveNotes, savedData }) {
  const [editState, setEditState] = useState();
  const [editorState, setEditorState] = useState();

  const onChange = (data) => {
    const rawState = JSON.stringify(convertToRaw(data.getCurrentContent()));
    setEditState(rawState);
  };
  useEffect(() => {
    if (savedData) {
      let rawData = EditorState.createWithContent(
        convertFromRaw(JSON.parse(savedData))
      );
      setEditorState(rawData);
    }
  }, [savedData]);
  return (
    <div>
      <div style={{ display: "flex", width: "100%", fontSize: 13 }}>
        <h4 style={{ margin: 0, flesx: 3 }}>Add Notes</h4>
        <div style={{ flex: 1, textAlign: "right" }}>
          <Button
            label="Add"
            type="submit"
            loading={false}
            onClick={() => saveNotes(editState)}
          />
        </div>
      </div>
      <div style={{ marginTop: 10 }}>
        <RichEditor
          onChange={(data) => onChange(data)}
          editSavedState={editorState}
        />
      </div>
    </div>
  );
}
