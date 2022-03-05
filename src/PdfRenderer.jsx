import React, { useEffect, useContext, useState } from "react";
import "./pdfRenderer.css";
import print from "./print";

import { PDFReader } from "react-read-pdf";
import { UserDataContext } from "./PdfLib";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const PDF_URL = "http://127.0.0.1:8080/regF.pdf";

function PdfRenderer1() {
  useEffect(() => {
    getPdf();
  }, []);
  const getPdf = async () => {
    let pdf = await fetch("http://127.0.0.1:8080/regF.pdf");
    // console.log(pdf);
    let pdfbuffer = await pdf.arrayBuffer();
    let u8buffer = new Uint8Array(pdfbuffer);
    setArrayBuf(u8buffer);
    // let fileed = new Blob([pdfbuffer], {
    //   type: "application/pdf",
    // });
    // setFile(fileed);
  };

  let scaleVal = 1.0;
  //states
  const [pdfUri, setPdfUri] = useState("");
  const [file, setFile] = useState(new Blob());
  const [arrayBuf, setArrayBuf] = useState(new Uint8Array());

  useEffect(() => {
    // if (file) {
    let blobbed = new Blob([arrayBuf], { type: "application/pdf" });
    print(blobbed);
    setFile(blobbed);
    // }
  }, [arrayBuf]);

  useEffect(() => {
    if (!!file) {
      let fileUri = URL.createObjectURL(file);
      print("uri" + fileUri);
      setPdfUri(fileUri);
    }
  }, [file]);

  if (!!file) {
    console.log(file);
  }

  //TODO: zoom karacha rahlay build

  const user = useContext(UserDataContext);

  print(`Here :${user}`);

  print(arrayBuf);
  //* PDFLIB
  const pdfUpdateFunction = async () => {
    const pdfDoc = await PDFDocument.load(arrayBuf);

    const timesRomen = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const pages = pdfDoc.getPages();

    const firstPage = pages[0];

    const { width, height } = firstPage.getSize();

    print(`${width} ${height} `);
    firstPage.drawText("Parikshit Dipak Thale", {
      x: width / 2,
      y: height / 2,
      font: timesRomen,
      color: rgb(1.0, 0.5, 0.5),
    });

    const pdfBytes = await pdfDoc.save();
    print(arrayBuf === pdfBytes);

    // setArrayBuf(pdfBytes);
    return pdfBytes;
  };

  return (
    <div className="FormWrapperParent">
      <h1>hello</h1>
      {arrayBuf.length !== 0 ? (
        <div className="FormWrapper" onClick={console.log("clicked")}>
          {/* <PDFReader url={pdfUri} page={1} scale={scaleVal} /> */}
          <PDFReader data={arrayBuf} page={1} scale={scaleVal} />
          {/* <PDFReader url={pdfUri} page={2} scale={scaleVal} /> */}
          <PDFReader data={arrayBuf} page={2} scale={scaleVal} />
          <button
            onClick={async () => {
              let buf = await pdfUpdateFunction();
              setArrayBuf(buf);
              // await setArrayBuf(await pdfUpdateFunction(arrayBuf));
            }}>
            {" "}
            click to update
          </button>
          <a href={pdfUri}>downlaod file</a>
        </div>
      ) : (
        <h3>loading...</h3>
      )}
    </div>
  );
}

////////////////////

function PdfRenderer() {
  useEffect(() => {
    getPdf();
  }, []);
  const getPdf = async () => {
    let pdf = await fetch("http://127.0.0.1:8080/regF.pdf");
    // console.log(pdf);
    let pdfbuffer = await pdf.arrayBuffer();
    let u8buffer = new Uint8Array(pdfbuffer);
    setArrayBuf(u8buffer);
    // let fileed = new Blob([pdfbuffer], {
    //   type: "application/pdf",
    // });
    // setFile(fileed);
  };

  let scaleVal = 1.0;
  //states
  const [pdfUri, setPdfUri] = useState("");
  const [file, setFile] = useState(new Blob());
  const [arrayBuf, setArrayBuf] = useState(new Uint8Array());

  useEffect(() => {
    // if (file) {
    let blobbed = new Blob([arrayBuf], { type: "application/pdf" });
    print(blobbed);
    setFile(blobbed);
    // }
  }, [arrayBuf]);

  useEffect(() => {
    if (!!file) {
      let fileUri = URL.createObjectURL(file);
      print("uri" + fileUri);
      setPdfUri(fileUri);
    }
  }, [file]);

  if (!!file) {
    console.log(file);
  }

  //TODO: zoom karacha rahlay build

  const user = useContext(UserDataContext);

  print(`Here :${user}`);

  print(arrayBuf);
  //* PDFLIB
  const pdfUpdateFunction = async () => {
    const pdfDoc = await PDFDocument.load(arrayBuf);

    const timesRomen = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const pages = pdfDoc.getPages();

    const firstPage = pages[0];

    const { width, height } = firstPage.getSize();

    print(`${width} ${height} `);
    firstPage.drawText("Parikshit Dipak Thale", {
      x: width / 2,
      y: height / 2,
      font: timesRomen,
      color: rgb(1.0, 0.5, 0.5),
    });

    const pdfBytes = await pdfDoc.save();
    print(arrayBuf === pdfBytes);

    // setArrayBuf(pdfBytes);
    return pdfBytes;
  };

  return (
    <div className="FormWrapperParent">
      <h1>hello</h1>
      {arrayBuf.length !== 0 ? (
        <div className="FormWrapper" onClick={console.log("clicked")}>
          {/* <PDFReader url={pdfUri} page={1} scale={scaleVal} /> */}
          <PDFReader data={arrayBuf} page={1} scale={scaleVal} />
          {/* <PDFReader url={pdfUri} page={2} scale={scaleVal} /> */}
          <PDFReader data={arrayBuf} page={2} scale={scaleVal} />
          <button
            onClick={async () => {
              let buf = await pdfUpdateFunction();
              setArrayBuf([]);
              setArrayBuf(buf);
              // await setArrayBuf(await pdfUpdateFunction(arrayBuf));
            }}>
            {" "}
            click to update
          </button>
          <a href={pdfUri}>downlaod file</a>
        </div>
      ) : (
        <h3>loading...</h3>
      )}
    </div>
  );
}

export default PdfRenderer;

// const pdfUpdateFunction = async (arrayBuf) => {
//   const pdfDoc = await PDFDocument.load(arrayBuf);

//   const timesRomen = await pdfDoc.embedFont(StandardFonts.TimesRoman);

//   const pages = pdfDoc.getPages();

//   const firstPage = pages[0];

//   const { width, height } = firstPage.getSize();

//   print(`${width} ${height} `);
//   firstPage.drawText("Parikshit Dipak Thale", {
//     x: width / 2,
//     y: height / 2,
//     font: timesRomen,
//     color: rgb(1.0, 0.5, 0.5),
//   });

//   const pdfBytes = await pdfDoc.save();
//   print("there");
//   print(arrayBuf === pdfBytes);
//   print(pdfBytes.buffer);

//   // setArrayBuf(pdfBytes);
//   return pdfBytes;
// };
