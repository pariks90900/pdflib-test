import React, { useEffect } from "react";
import PdfRenderer from "./PdfRenderer";

function PdfLib() {
  let fileChange = null;
  let pdfDep = null;
  const hanfleFileInput = (e) => {
    // let file = e.target.files[0];
    // console.log(e.target);
    // console.log(e.target.file);
    // console.log(e.target[0]);
    // console.log(e.target.files);
    fileChange = e;
    return e.target.files[0];
  };

  useEffect(() => {
    pdfDep = fileChange;
    console.log("pdfdep" + pdfDep);
  }, [fileChange]);

  return (
    <div>
      <PdfRenderer />
    </div>
  );
}

export default PdfLib;
