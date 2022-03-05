import React, { useEffect, createContext, useState } from "react";
import PdfRenderer from "./PdfRenderer";

export const UserDataContext = createContext(undefined);

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

  // useEffect(() => {
  //   pdfDep = fileChange;
  //   console.log("pdfdep" + pdfDep);
  // }, [fileChange]);

  const [userData, setUserData] = useState({ nme: "mane" });

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      <div>
        <PdfRenderer />
      </div>
    </UserDataContext.Provider>
  );
}

export default PdfLib;
