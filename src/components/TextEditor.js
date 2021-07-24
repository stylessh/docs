import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { useSession } from "next-auth/client";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { useDocumentContext } from "../context/document";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  { ssr: false }
);

const TextEditor = ({ doc_id }) => {
  const [session] = useSession();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  //  getting the document data
  const [snapshot] = useDocumentOnce(
    db
      .collection("user_docs")
      .doc(session.user.email)
      .collection("docs")
      .doc(doc_id)
  );

  const { updateContent } = useDocumentContext();

  useEffect(() => {
    if (snapshot?.data()?.editorState) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(snapshot?.data()?.editorState)
        )
      );

      updateContent(snapshot?.data()?.editorState);
    }
  }, [snapshot]);

  const handleEditor = (state) => {
    setEditorState(state);

    // saving document content
    db.collection("user_docs")
      .doc(session.user.email)
      .collection("docs")
      .doc(doc_id)
      .set(
        {
          // saving all doc content as a json serializable string
          editorState: convertToRaw(editorState.getCurrentContent()),
        },
        {
          merge: true,
        }
      );

    // saving local
    updateContent(convertToRaw(editorState.getCurrentContent()));
  };

  return (
    <div style={{ minHeight: "100vh", paddingBottom: "2em" }}>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditor}
        toolbarStyle={{
          display: "flex",
          position: "sticky",
          top: 0,
          zIndex: 20,
          justifyContent: 'center'
        }}
        editorStyle={{
          minHeight: "100vh",
          width: "85%",
          margin: "0 auto",
          marginTop: "2em",
          border: "1px solid #ccc",
          padding: "2em 2.5em",
          cursor: 'text'
        }}
      />
    </div>
  );
};

export default TextEditor;
