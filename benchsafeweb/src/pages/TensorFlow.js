//import React, { useRef, useEffect, useState, useCallback } from "react";
import cameraIcon from "../assets/Camera.svg"
import redoIcon from "../assets/Redo.svg"
import "@tensorflow/tfjs-backend-webgl";
import { useRouter} from 'next/router'
import Router from "next/router";
import Profile from "../assets/Profile.svg";
import Home from "../assets/Home.svg";
import BackButton from "../assets/BackButton.svg";
import Submit from "../assets/Submit.svg";
import Detail from "../assets/Detail.svg";
import { useState, useEffect, useRef } from "react";
import * as posenet from '@tensorflow-models/posenet';
import Image from "next/image";
import Link from 'next/link';
//import { Image } from 'canvas';

export default function TensorFlow() {


  const [sHeight, setSHeight] = useState(null);
  const [sWidth, setSWidth] = useState(null);

  const [ankleH, setAnkleH] = useState(null); 
   const [eyesH, setEyesH] = useState(null); 
   const [hipsH, setHipsH] = useState(null); 
   const [shoulderH, setShoulderH] = useState(null); 

  const pHeight = 156;

  const router = useRouter()
  const tfcanvasRef = useRef(null);
  const canvasRef = useRef(null);
  const [poses, setPoses] = useState(null);

  const camera = useRef(null);
  const [image, setImage] = useState(null);

  const imageScaleFactor = 1;
  const outputStride = 16;
  const flipHorizontal = false;

  const [videoDem, handleVideoDem] = useState({ w: 0, h: 0 });
  const [cameraFacingMode, handleCameraFacingMode] = useState('environment');
  const [imageData, handleImageData] = useState('');

  // useEffect(() => {
  //   const handleResize = () => {
  //     //setSHeight(window.innerHeight);
  //     //setSWidth(screen.width);
  //     //setSWidth(window.innerWidth);
  //     console.log("height");
  //     console.log(sHeight);
  //   };
  //   handleResize(); // Set initial value
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);


  //average eye height-to-body height ratio of approximately 1:1.67 for males and 1:1.62 for females.
  //nipple position in males to be approximately 20 cm from the sternal notch (assume shoulder)




  //react video and image capture code
  useEffect(() => {
    console.log("useEffect")
    let video = document.getElementsByTagName('video')[0];
    let canvas = document.getElementsByTagName('canvas')[0];
    let tfcanvas = document.getElementsByTagName('canvas')[1];
    //shld i add this here???
    tfcanvasRef.current = tfcanvas;

    const setupCamera = async () => {
      try {
        const constraint = {
          video: {
            width: { ideal: 390 },
            height: { ideal: 600 },
            facingMode: cameraFacingMode,
          },
          audio: false,
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraint);
        video.setAttribute('playsinline', 'true');
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          const { clientLeft, clientTop, videoWidth, videoHeight } = video;
          handleVideoDem({ w: videoWidth, h: videoHeight });
          canvas.style.position = 'absolute';
          // canvas.style.left = clientLeft.toString();
          // canvas.style.top = clientTop.toString();
          canvas.setAttribute('width', videoWidth.toString());
          canvas.setAttribute('height', videoHeight.toString());
          video.play();
        };
      } catch (e) {
        alert('error1: ' + e);
        console.log(e);
      }
    };


    setupCamera();


    return () => {
      if (video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  const switchCameraFacingMode = () => {
    console.log("switch mode")
    handleCameraFacingMode((old) =>
      old === 'environment' ? 'user' : 'environment'
    );
  };

  const captureImage = async () => {
    console.log("captureImage")
    try {
      let video = document.getElementsByTagName('video')[0];
      let canvas = document.getElementsByTagName('canvas')[0];
      let context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, videoDem.w, videoDem.h);
      const imageData1 = canvas.toDataURL('image/webw', 1.0);
      let data = await handleImageData(canvas);
      estimatePoseOnImage(canvas);
      console.log(canvas);
      return imageData1;
    } catch (e) {
      console.log(e);
      alert('Error in Capturing Image: ' + e);
      return '';
    }
  }

  //tensorflow canvas code

  async function estimatePose(imageElement) {
    // load the posenet model from a checkpoint
    const net = await posenet.load();

    const pose = await net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride);

    return pose;
  }

  //const imageRef = useRef(null);

  // useEffect(() => {
  // ...
  async function estimatePoseOnImage(imageData) {

    // const img = { src: '../assets/ManSample.jpg', width: 100, height: 100 };
    // const htmlImage = imageRef.current;
    // htmlImage.width = imageRef.current.width;
    // htmlImage.height = imageRef.current.height;

    //htmlImage.onload = async () => {
    if (imageData != null) {
      console.log("image loaded")
      console.log(imageData);

      const pose = await estimatePose(imageData);
      console.log(pose);
      const sPose = await setPoses(pose);

    }

    // call the function here


    //};

    //htmlImage.src = sampleImage.src; // add this to trigger the image load

  }
  //     estimatePoseOnImage();
  // }, [imageData]);


  useEffect(() => {


    console.log("checking for tfcanvas")
    console.log(tfcanvasRef)
    console.log(poses)
    // console.log(poses.length)
    if (tfcanvasRef && poses) {
      console.log("tfcanvas and poses ok")
      const tfcanvas = tfcanvasRef.current;
      tfcanvas.width = canvasRef.current.width;
      tfcanvas.height = canvasRef.current.height;
      const ctx = tfcanvas.getContext("2d");
      drawKeypoints(poses.keypoints, 0.2, ctx);
      drawSkeleton(poses.keypoints, 0.2, ctx);
      console.log("calculating length");
      calcHeight(pHeight, poses);
    }



  }, [poses]);



  function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
    keypoints.forEach((keypoint) => {
      if (keypoint.score >= minConfidence) {
        const { x, y } = keypoint.position;
        ctx.beginPath();
        ctx.arc(x * scale, y * scale, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
      }
    });
  }

  function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
    const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
      keypoints,
      minConfidence
    );

    adjacentKeyPoints.forEach((keypoints) => {
      drawSegment(
        toTuple(keypoints[0].position),
        toTuple(keypoints[1].position),
        ctx,
        scale
      );
    });
  }

  function toTuple({ x, y }) {
    return [x, y];
  }

  function drawSegment([ax, ay], [bx, by], ctx, scale = 1) {
    ctx.beginPath();
    ctx.moveTo(ax * scale, ay * scale);
    ctx.lineTo(bx * scale, by * scale);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "green";
    ctx.stroke();
  }


  function calcHeight(pHeight, poses) {
    const pts = poses.keypoints;
    setAnkleH((pts[15].position.y + pts[16].position.y) / 2);
    setEyesH((pts[1].position.y + pts[2].position.y) / 2);
    setHipsH ((pts[12].position.y + pts[11].position.y) / 2);
    setShoulderH ((pts[5].position.y + pts[6].position.y) / 2);
  }

  return (
    // <div className="relative">
    //     <Image
    //         src={sampleImage}
    //         ref={imageRef}
    //     //style={{ display: "none" }}

    //     />
    //     <tfcanvas ref={tfcanvasRef} className="absolute inset-0" />


    // </div>
    <div className="flex flex-col min-h-screen">

      {/* Header design */}
      <header >
        <div className="grow-0 h-14 flex flex-row mt-auto py-5 justify-between mx-5">
          <div className="flex justify-self-start col-span-1">
            <Link href="/LandingPage">
              <Image src={BackButton} alt="BackButton" className="m-1" width={40} height={40} />
            </Link>
          </div>

          <h1 className="flex justify-center col-span-2 py-2">Bench 1</h1>

          <div className="flex justify-self-end col-span-1">
            <Image src={Detail} alt="Detail" className="m-1" width={40} height={40} />
          </div>
        </div>

        <div className="mt-5">
          <h2 className="flex justify-center mb-1">Welcome User!</h2>
          <h3 className="flex justify-center text-center mx-5">Snap a photo to calibrate your body length.</h3>
          <text className="flex justify-center text-center mt-4 mb-2 mx-5">Please ensure your body is in the frame!</text>
        </div>
      </header>

      <div className="w-screen flex flex-row justify-center">
        <video className = "absolute"></video>
        <canvas ref={canvasRef} className = "absolute"></canvas>
        <canvas ref={tfcanvasRef} className="absolute" />
      </div>




      {/* <button onClick={switchCameraFacingMode}>Switch Camera</button> */}
      {/* Bottom navigation bar design*/}
      <footer className="flex flex-row justify-center w-screen h-24 mt-auto">
        <div className=" bg-slate-100 rounded min-h-fit min-w-fit w-screen drop-shadow-md inline-block flex flex-row justify-center">

          {/* take pic */}
          <div className="flex justify-around">
            {imageData == '' ? (
              <div className="flex flex-col items-center">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    captureImage()
                  }}
                  className="ease-linear bg-gradient-to-r from-purple-200 to-purple-300 w-20 h-20 rounded-full items-center flex justify-center "
                >
                  <Image src={cameraIcon} className="h-6" />
                </button>

              </div>
            ) : (
              <div className="flex flex-row justify-between">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    router.reload()
                  }}
                  className="bg-red-500 w-20 h-20 rounded-full items-center flex justify-center mx-10"
                >
                  <Image src={redoIcon} className="h-6" />
                </button>
                {poses==null?(<div></div>) : (
                  <button
                  onClick={(e) => {
                    //submit values
                    Router.push({
                      pathname: '/EnterHeight',
                      query: { ankleH: ankleH, eyesH: eyesH, hipsH: hipsH , shoulderH: shoulderH},
                    })
                  
                  }}
                  className="ease-linear bg-gradient-to-r from-purple-200 to-purple-300 w-20 h-20 rounded-full items-center flex justify-center mx-10"
                >
                  <Image src={Submit} className="h-6" />
                </button>
                )}
                
              </div>
            )}
          </div>

          {/* Profile
          <div className="flex justify-center">
            <Image src={Profile} alt="Profile" width={40} height={40} />
          </div> */}
        </div>
      </footer>
    </div>



  )
}


