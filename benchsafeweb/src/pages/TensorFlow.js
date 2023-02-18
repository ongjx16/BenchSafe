import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
// Register one of the TF.js backends.
import '@tensorflow/tfjs-backend-webgl';
import React, { useRef, useEffect, useState, useCallback } from "react";
import Webcam from "react-webcam";
import cameraIcon from "../assets/Camera.svg"
import redoIcon from "../assets/Redo.svg"
import Image from 'next/image'

const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: 'user',
}

export default function TensorFlow() {
    const camRef = useRef();
    const canvasRef = useRef();
    const [picture, setPicture] = useState('')
    const capture = useCallback(() => {
        const pictureSrc = camRef.current.getScreenshot()
        setPicture(pictureSrc)
    })

    let detector;
    let poses;
    let video

    async function init() {
        const detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING };
        const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);


        //loop the pose detection
        setInterval(() => {
            return detect(detector);
        }, 200);

    };

    // async function setup() {
    //     createCanvas(320, 240);
    //     image = createCapture(IMAGE);
    //     image.size(320, 240)
    //     await init();
    // }

    // async function getPoses(image) {
    //     poses = await detector.estimatePoses(image);
    //     console.log(poses);
    //     setTimeout(getPoses, 1);
    // }

    async function detect(detector) {
        if (
            typeof camRef.current !== 'undefined' &&
            camRef.current !== null &&
            camRef.current.video.readyState === 4
        ) {
            // get video properties
            const video = camRef.current.video;
            const videoWidth = camRef.current.video.videoWidth;
            const videoHeight = camRef.current.video.videoHeight;
            console.log(videoWidth)
            console.log(videoHeight)

            // set video width
            camRef.current.video.width = videoWidth;
            camRef.current.video.height = videoHeight;

            // detection happens here
            const poses = await detector.estimatePoses(video);
            console.log(poses)
            //   draw();
            draw(poses);

        }
    };

    // function drawCanvas(pose, video, videoWidth, videoHeight, canvas){
    //     const ctx = canvas.current.getContext("2d");
    //     canvas.current.width = videoWidth;
    //     canvas.current.height = videoHeight;

    //     drawKeypoints(pose[0].keypoints, 0.6, ctx);
    //     drawSkeleton(pose[0].keypoints, 0.7, ctx);
    // }

    function draw(poses) {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        if (poses && poses.length > 0) {
            for (let kp of poses[0].keypoints) {
                const { x, y } = kp;
                // const y = kp.y;
                // context.clearRect(0, 0, canvas.width, canvas.height);
                context.beginPath();
                context.ellipse(x / 4, y / 4, 3, 3, 0, 0, 2 * Math.PI);
                // context.fill();
                // context.fillStyle = "green";
                // context.closePath();
                // context.rect(x, y, 150, 100);

                context.fill();
                context.fillStyle = "green";

                // context.reset();

            }
            console.log("draw")
        }
    }




    // useEffect(() => {
    //     init();
    // }, [])



    return (

        <div>
            <text>tensorflow page</text>
            {picture == '' ? (
                <div className = "flex flex-col items-center">
                    <Webcam
                        ref={camRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        //style might have to change to absolute for canvas to work with tensorflow
                        style={{
                            position: "relative",
                            marginLeft: "auto",
                            marginRight: "auto",
                            left: 0,
                            right: 0,
                            textAlign: "center",
                            zindex: 9,
                            width: 640,
                            height: 360
                        }} />
                        <button
                        onClick={(e) => {
                            e.preventDefault()
                            capture()
                        }}
                        className="ease-linear bg-gradient-to-r from-purple-200 to-purple-300 w-20 h-20 rounded-full items-center flex justify-center mt-10"
                    >
                        <Image src={cameraIcon} className="h-6"/>
                    </button>
                    
                </div>
            ) : (
                <div className = "flex flex-col items-center">
                    <img src={picture} />
                    
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            setPicture("")
                        }}
                        className="bg-red-500 w-20 h-20 rounded-full items-center flex justify-center mt-10"
                    >
                        <Image src={redoIcon} className="h-6"/>
                    </button>
                </div>
            )}



            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 9,
                    width: 640,
                    height: 360

                }} />


        </div>
    )
}

