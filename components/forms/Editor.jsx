"use client";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import hljs from "highlight.js";
import 'highlight.js/styles/atom-one-dark.css';

const ReactQuill = dynamic(
  () => {
    hljs.configure({
      languages: ['javascript', 'CSS', 'HTML', 'typescript', 'json', 'markdown', 'xml', 'python', 'java', 'c++']
    })
    // @ts-ignore
    window.hljs = hljs
    return import("react-quill")
  }, {
  ssr: false,
  loading: () => <p>Quill loading</p>
})
function TextEditor({ code, setFieldValue }) {
  const handleContentChange = (msg, delta, e, source, editor) => {
    setFieldValue('content', msg)
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("quill/dist/quill.snow.css");
    }
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", 'code-block'],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ "list": "ordered" }, { "list": "bullet" }, { "list": "checked" }, { "list": "unchecked" }, { "list": "star" }, { "list": "circle" }, { "list": "square" }, { "list": "dash" }, { "list": "dot" }, { "list": "number" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
      ["link", "image"],
      [{ "color": ["black", "#0179D0", "blue", "white", "gray", "red", "green", "yellow", "purple", "orange", "pink"] }],
      [{ background: ["black", "white", "gray", "red", "#0179D0", "blue", "green", "yellow", "purple", "orange", "pink"] }],
      ["clean"],
    ],
    syntax: {
      enabled: true,
    },
  };

  const formats = [
    "header",
    "clean",
    "bold",
    "italic",
    "underline",
    "strike",
    "code",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "code-block",
    "background",
    "align",
    "size",
    "font",
    "script",
  ];

  return (
    <>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={code}
        onChange={handleContentChange}
        className="scrollbar-hide h-[600px]"
      />
    </>
  );
}

export default TextEditor;
