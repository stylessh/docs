import { createContext, useContext, useState } from "react";
import draftToHtml from "draftjs-to-html";

const DocumentContext = createContext();

export function DocumentWrapper({ children }) {
  const [content, setContent] = useState("");
  const [html, setHtml] = useState("");
  const htmlToPDF = require("html2pdf.js");

  const convertContentToHTML = () => {
    if (!content) return;

    const html_doc = draftToHtml(content);

    console.log(html_doc);
    setHtml(html_doc);
  };

  const convertHTMLtoPDF = (file_name) => {
    const options = {
      margin: [1, 2],
      filename: `${file_name}.pdf`,
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    htmlToPDF().set(options).from(html).save();
  };

  const downloadPDF = (file_name) => {
    convertContentToHTML();
    convertHTMLtoPDF(file_name);
  };

  const updateContent = (doc_content) => {
    setContent(doc_content);
  };

  let state = {
    content,
    updateContent,
    downloadPDF,
  };

  return (
    <DocumentContext.Provider value={state}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocumentContext() {
  return useContext(DocumentContext);
}
