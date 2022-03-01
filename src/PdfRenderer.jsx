import React, { useEffect, useRef } from "react";
import { useState } from "react/cjs/react.development";
import "./pdfRenderer.css";

// import { Document } from "pdfjs";
// import { Document, Page } from "react-pdf";

function PdfRenderer() {
  useEffect(() => {
    getPdf();
  }, []);

  const [pdfUri, setPdfUri] = useState("");
  const [file, setFile] = useState();

  useEffect(() => {
    if (!!file) {
      let fileUri = URL.createObjectURL(file);
      setPdfUri(fileUri);
    }
    // console.log(file);
    // console.log(pdfUri);
  }, [file]);

  const getPdf = async () => {
    let pdf = await fetch("http://127.0.0.1:8080/regF.pdf");
    console.log(pdf);
    let pdfbuffer = await pdf.arrayBuffer();
    let fileed = new Blob([pdfbuffer], {
      type: "application/pdf",
    });
    setFile(fileed);
  };

  if (!!file) {
    console.log(file);
  }

  return (
    <div>
      {!!pdfUri ? (
        <iframe className="pdfRenderer" src={pdfUri}></iframe>
      ) : (
        <div> no file provided </div>
      )}
    </div>
  );
}

export default PdfRenderer;
