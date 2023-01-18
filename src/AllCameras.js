import { useEffect, useState } from "react";
import React from "react";
import Webcam from "react-webcam";
import { Box, Button, IconButton } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { abi_controller, fit_address, controller_address } from "./Contracts";

import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { withEmotionCache } from "@emotion/react";
import Contact from "./Contact";

const AllCameras = () => {
  const videoConstraints = {
    width: 1280,
    height: 600,
    facingMode: "user",
  };
  const stopCam = () => {
    let stream = webcamRef.current.stream;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    setsc(false);
  };
  const [url, seturl] = useState(null);
  const [sc, setsc] = useState(false);
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    seturl(imageSrc);
    stopCam();

    console.log(url);
  });

  if (url) {
    return <Contact url={url}></Contact>;
  }
  const f = () => {
    setsc(true);
  };
  return (
    <>
    <Box display={"flext"} justifyContent="center" ml={'600px'} mb={'100px'}>
        <ConnectButton></ConnectButton>
      </Box>
      
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "50px",
        }}
      >
        {!sc && (
          <>
            <Button variant="contained" component="label" onClick={f}>
              Open camera
            </Button>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <PhotoCamera />
            </IconButton>
          </>
        )}
      </div>

      {sc && (
        <>
        
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}
              />
            </div>
            <div>
              <Button
                style={{ width: "1280px", bottom: "50px" }}
                variant="contained"
                component="label"
                onClick={capture}
              >
                capture image
              </Button>
            </div>

            <div>
              <Button
                style={{ width: "1280px", bottom: "50px", margin: "25px" }}
                variant="contained"
                component="label"
                onClick={stopCam}
              >
                Close
              </Button>
            </div>
          </div>
        </>
      )}
      
    </>
  );
};
export default AllCameras;
