import React, { useState } from "react";
import "./QRCodeScanner.css";
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import ResultContainerPlugin from "./ResultContainerPlugin.jsx";

const QRCodeScanner = (props) => {
  const [decodedResults, setDecodedResults] = useState([]);
  const onNewScanResult = (decodedText, decodedResult) => {
    console.log("App [result]", decodedResult);
    setDecodedResults((prev) => [...prev, decodedResult]);
  };

  return (
    <div className="App">
      <section className="App-section">
        <div className="App-section-title"> Html5-qrcode React demo</div>
        <br />
        <br />
        <br />
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        />
        <ResultContainerPlugin results={decodedResults} />
      </section>
    </div>
  );
};

export default QRCodeScanner;
