import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
// Register one of the TF.js backends.
import '@tensorflow/tfjs-backend-webgl';
import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from '@/utilities';

export default function TensorFlow() {
    const camRef = useRef();
    const canvasRef = useRef();

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

    //     const canvas = canvasRef.current
    //     const context = canvas.getContext('2d')
    //     // context.rect(10, 10, 150, 100);
    //     // context.fill();
    //     // context.fillStyle = "green";

    //     //Our draw come here
    //     draw(context)
    //     console.log("draw use effect")
    // }, [poses[0].score])

    useEffect(() => {
        init();
    }, [])



    return (

        <div>
            <text>tensorflow page</text>

            <Webcam
                ref={camRef}
                audio={false}
                screenshotFormat="image/jpeg"
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
                }} >
                {/* {({ getScreenshot }) => (
                    // <button
                    //     onClick={() => {
                    //         const imageSrc = getScreenshot()
                    //     }}
                    // >
                    //     Capture photo
                    // </button>
                )} */}
            </ Webcam>
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

