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
    <div className="bg-[#F8F9FA] min-h-screen pb-16">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditor}
        toolbarClassName="flex sticky top-0 z-20 !justify-center mx-auto"
        editorClassName="mt-16 bg-white shadow-md max-w-6xl mx-auto min-h-screen py-10 px-20 border cursor-text"
      />
    </div>
  );
};

export default TextEditor;
