import * as React from "react";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const CertificateDocument = ({certificateText,certificateName}) => {
  const pdfExportComponent = React.useRef(null);
  const [text,setText]=React.useState(certificateText)
  const [name,setName]=React.useState(certificateName)

  const exportPDFWithMethod = () => {
    let element = document.querySelector(".k-grid") || document.body;
    savePDF(element, {
      paperSize: "A4",
    });
  };

  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  return (
    <div>
      <div className="example-config">
        <div className="flex w-full items-center justify-end">
        <button
          className="submit-button-black"
          onClick={exportPDFWithComponent}
        >
          Export Certificate
        </button>
        </div>

        {/* <button
          className="submit-button-black"
          onClick={exportPDFWithMethod}
        >
          Export Certificate
        </button> */}
      </div>

      <PDFExport ref={pdfExportComponent} paperSize="A4" scale={0.8} margin={{ top: 50, left: 20, right: 20, bottom: 40 }}>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <p>No. A3/884/2022/ECH</p>
            <div>
              <p>Hostel Office</p>
              <p>College of Engineering Trivandrum</p>
              <p>Date:26/06/22</p>
            </div>
          </div>
          <hr/>
          <h1 className="font-bold text-lg text-center pb-3 mt-5 uppercase underline">{name}</h1>
          <p>{text}</p>
          <div className="mt-5">
            {/* <p>To,</p>
            <p>Akshay K.B</p> */}
          </div>
          <div className="text-center mt-5">This digitally signed document is legally valid as per the Information Technology(IT) Act,2008</div>
        </div>
      </PDFExport>
    </div>
  );
};

export default CertificateDocument