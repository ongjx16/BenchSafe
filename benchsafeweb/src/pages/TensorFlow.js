//import React, { useRef, useEffect, useState, useCallback } from "react";
import Webcam from "react-webcam";
import cameraIcon from "../assets/Camera.svg"
import redoIcon from "../assets/Redo.svg"
import sampleImage from "../assets/ManSample.jpg";
import "@tensorflow/tfjs-backend-webgl";
import adapter from 'webrtc-adapter';
import { useRouter } from 'next/router'



import { useState, useEffect, useRef } from "react";
import * as posenet from '@tensorflow-models/posenet';
import Image from "next/image";
//import { Image } from 'canvas';

export default function TensorFlow() {

  const pHeight = 156;

  const router = useRouter()
  const tfcanvasRef = useRef(null);
  const canvasRef = useRef(null);
  const [poses, setPoses] = useState();

  const camera = useRef(null);
  const [image, setImage] = useState(null);

  const imageScaleFactor = 1;
  const outputStride = 16;
  const flipHorizontal = false;

  const [videoDem, handleVideoDem] = useState({ w: 0, h: 0 });
  const [cameraFacingMode, handleCameraFacingMode] = useState('environment');
  const [imageData, handleImageData] = useState('');


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
            width: { ideal: 375 },
            height: { ideal: 750 },
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
          canvas.style.left = clientLeft.toString();
          canvas.style.top = clientTop.toString();
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
    const ankleH = (pts[15].position.y + pts[16].position.y) / 2;
    const eyesH = (pts[1].position.y + pts[2].position.y) / 2;
    const hipsH = (pts[12].position.y + pts[11].position.y) / 2;
    const shoulderH = (pts[5].position.y + pts[6].position.y) / 2;
    const n = pHeight / (ankleH - eyesH);
    const ans = (n * (hipsH - shoulderH)) - 20;
    console.log(ans);
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
    <div>
      <video></video>
      <canvas ref={canvasRef}></canvas>
      <canvas ref={tfcanvasRef} className="absolute inset-0" />

      {/* <button onClick={captureImage}>Capture Image</button> */}
      {imageData == '' ? (
        <div className="flex flex-col items-center">
          <button
            onClick={(e) => {
              e.preventDefault()
              captureImage()
            }}
            className="ease-linear bg-gradient-to-r from-purple-200 to-purple-300 w-20 h-20 rounded-full items-center flex justify-center mt-10"
          >
            <Image src={cameraIcon} className="h-6" />
          </button>

        </div>
      ) : (
        <div className="flex flex-col items-center">
          <button
            onClick={(e) => {
              e.preventDefault()
              router.reload()
            }}
            className="bg-red-500 w-20 h-20 rounded-full items-center flex justify-center mt-10"
          >
            <Image src={redoIcon} className="h-6" />
          </button>
        </div>
      )}
      <button onClick={switchCameraFacingMode}>Switch Camera</button>
    </div>

  )
}


