import React, { useEffect, useState } from "react";
import "./QRCodeScanner.css";
import axios from 'axios'
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import ResultContainerPlugin from "./ResultContainerPlugin.jsx";
import {useDispatch} from "react-redux";
// import { postAnswer } from "../../api/questionAPI";
import { answer } from "../../features/questionSlice";
import { useSelector } from "react-redux";
import {alertActions} from "../../features/alertSlice"

const QRCodeScanner = (props) => {
  const dispatch = useDispatch();
  const {success,message,error} = useSelector((state)=>state.question);
  const [decodedResults, setDecodedResults] = useState([]);
  const onNewScanResult = (decodedText, decodedResult) => {
    console.log("App [result]", decodedResult);
    setDecodedResults((prev) => [...prev, decodedResult]);
    if(decodedResults !== []){
      dispatch(answer(decodedResults[0]))
    }
  };
  useEffect(()=>{
    if(success != null && message != ""){
      dispatch(alertActions.createAlert({
				message: success?message:error.message,
        status:success?"success":"error",
      }))
    }
  },[success,message])

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
        {/* <ResultContainerPlugin results={decodedResults} /> */}
      </section>
    </div>
  );
};

export default QRCodeScanner;
