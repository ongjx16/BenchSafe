//import React, { useRef, useEffect, useState, useCallback } from "react";
import Webcam from "react-webcam";
import cameraIcon from "../assets/Camera.svg"
import redoIcon from "../assets/Redo.svg"
import sampleImage from "../assets/ManSample.jpg"
import "@tensorflow/tfjs-backend-webgl";



import { useState, useEffect, useRef } from "react";
import * as posenet from '@tensorflow-models/posenet';
import Image from "next/image";
//import { Image } from 'canvas';

export default function TensorFlow() {
    const canvasRef = useRef(null);
    const [poses, setPoses] = useState();

    const imageScaleFactor = 0.5;
    const outputStride = 16;
    const flipHorizontal = false;

    async function estimatePose(imageElement) {
        // load the posenet model from a checkpoint
        const net = await posenet.load();

        const pose = await net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride);

        return pose;
    }

    const imageRef = useRef(null);



    useEffect(() => {
        // ...
        async function estimatePoseOnImage() {

            // const img = { src: '../assets/ManSample.jpg', width: 100, height: 100 };
            const htmlImage = imageRef.current;
            htmlImage.width = imageRef.current.width;
            htmlImage.height = imageRef.current.height;

            htmlImage.onload = async () => {
                console.log("image loaded")
                console.log(htmlImage);

                const pose = await estimatePose(htmlImage);
                console.log(pose);
                const sPose = await setPoses(pose);

                // call the function here


            };

            htmlImage.src = sampleImage.src; // add this to trigger the image load

        }
        estimatePoseOnImage();
    }, []);


    useEffect(() => {
        console.log("checking for canvas")
        console.log(canvasRef)
        console.log(poses)
        // console.log(poses.length)
        if (canvasRef && poses) {
            console.log("canvas and poses ok")
            const canvas = canvasRef.current;
            canvasRef.width = imageRef.current.width;
            canvasRef.height = imageRef.current.height;
            const ctx = canvas.getContext("2d");
            drawKeypoints(poses.keypoints, 0.2, ctx);
            drawSkeleton(poses.keypoints, 0.2, ctx);
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

    return (
        <div className ="relative">
            <Image
                src={sampleImage}
                ref={imageRef}
                //style={{ display: "none" }}

            />
            <canvas ref={canvasRef} className = "absolute inset-0"/>
            {/* <img ref={imageRef} style={{ display: 'none' }} />
            <Image
                // ref={imageRef}
                src={sampleImage}
                
            /> */}
            
            {/* <img ref={sampleImage} src="data/runner.jpg" alt="Runner" style={{ display: "none" }} /> */}
        </div>
    )
}

// const videoConstraints = {
//     width: 400,
//     height: 400,
//     facingMode: 'user',
// }

// export default function TensorFlow() {

//     let img;
//     let poseNet;
//     let poses = [];

//     // const camRef = useRef();
//     // const imageRef = useRef();
//     // const canvasRef = useRef();
//     // const [picture, setPicture] = useState('')
//     // const capture = useCallback(() => {
//     //     const pictureSrc = camRef.current.getScreenshot()
//     //     setPicture(pictureSrc)
//     // })

//     // let detector;
//     // let poses;
//     // let video

//     // async function init() {
//     //     const detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING };
//     //     const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);


//     //     //loop the pose detection
//     //     setInterval(() => {
//     //         return detect(detector);
//     //     }, 200);

//     // };

//     // // async function detect(detector) {
//     // //     if (
//     // //         typeof camRef.current !== 'undefined' &&
//     // //         camRef.current !== null &&
//     // //         camRef.current.video.readyState === 4
//     // //     ) {
//     // //         // get video properties
//     // //         const video = camRef.current.video;
//     // //         const videoWidth = camRef.current.video.videoWidth;
//     // //         const videoHeight = camRef.current.video.videoHeight;
//     // //         console.log(videoWidth)
//     // //         console.log(videoHeight)

//     // //         // set video width
//     // //         camRef.current.video.width = videoWidth;
//     // //         camRef.current.video.height = videoHeight;

//     // //         // detection happens here
//     // //         const poses = await detector.estimatePoses(video);
//     // //         console.log(poses)
//     // //         //   draw();
//     // //         draw(poses);

//     // //     }
//     // // };

//     // //trying for static image

//     // async function detect(detector) {
//     //     if (
//     //         typeof imageRef.current !== 'undefined' &&
//     //         imageRef.current !== null 
//     //     ) {
//     //         // get video properties
//     //         const image = imageRef.current.image;
//     //         const imageWidth = imageRef.current.image.imageWidth;
//     //         const imageHeight = imageRef.current.image.imageHeight;
//     //         console.log(imageWidth)
//     //         console.log(imageHeight)

//     //         // set video width
//     //         imageRef.current.image.width = imageWidth;
//     //         imageRef.current.image.height = imageHeight;

//     //         // detection happens here
//     //         const poses = await detector.estimatePoses(image);
//     //         console.log(image)
//     //         //   draw();
//     //         draw(image);

//     //     }
//     // };



//     // // function drawCanvas(pose, video, videoWidth, videoHeight, canvas){
//     // //     const ctx = canvas.current.getContext("2d");
//     // //     canvas.current.width = videoWidth;
//     // //     canvas.current.height = videoHeight;

//     // //     drawKeypoints(pose[0].keypoints, 0.6, ctx);
//     // //     drawSkeleton(pose[0].keypoints, 0.7, ctx);
//     // // }

//     // function draw(poses) {
//     //     const canvas = canvasRef.current
//     //     const context = canvas.getContext('2d')
//     //     if (poses && poses.length > 0) {
//     //         for (let kp of poses[0].keypoints) {
//     //             const { x, y } = kp;
//     //             // const y = kp.y;
//     //             // context.clearRect(0, 0, canvas.width, canvas.height);
//     //             context.beginPath();
//     //             context.ellipse(x / 4, y / 4, 3, 3, 0, 0, 2 * Math.PI);
//     //             // context.fill();
//     //             // context.fillStyle = "green";
//     //             // context.closePath();
//     //             // context.rect(x, y, 150, 100);

//     //             context.fill();
//     //             context.fillStyle = "green";

//     //             // context.reset();

//     //         }
//     //         console.log("draw")
//     //     }
//     // }




//     // useEffect(() => {
//     //     init();
//     // }, [])



//     return (

//         <div>
//             <text>tensorflow page</text>
//             {picture == '' ? (
//                 <div className="flex flex-col items-center">
//                     {/* <Webcam
//                         ref={camRef}
//                         audio={false}
//                         screenshotFormat="image/jpeg"
//                         //style might have to change to absolute for canvas to work with tensorflow
//                         style={{
//                             position: "relative",
//                             marginLeft: "auto",
//                             marginRight: "auto",
//                             left: 0,
//                             right: 0,
//                             textAlign: "center",
//                             zindex: 9,
//                             width: 360,
//                             height: 600
//                         }} /> */}
//                     {/* <Image src={sampleImage} /> */}
//                     <button
//                         onClick={(e) => {
//                             e.preventDefault()
//                             capture()
//                         }}
//                         className="ease-linear bg-gradient-to-r from-purple-200 to-purple-300 w-20 h-20 rounded-full items-center flex justify-center mt-10"
//                     >
//                         <Image src={cameraIcon} className="h-6" />
//                     </button>

//                 </div>
//             ) : (
//                 <div className="flex flex-col items-center">
//                     <img src={picture} />

//                     <button
//                         onClick={(e) => {
//                             e.preventDefault()
//                             setPicture("")
//                         }}
//                         className="bg-red-500 w-20 h-20 rounded-full items-center flex justify-center mt-10"
//                     >
//                         <Image src={redoIcon} className="h-6" />
//                     </button>
//                 </div>
//             )}

//             <Image
//                 ref={imageRef}
//                 src={sampleImage}
//                 //style might have to change to absolute for canvas to work with tensorflow
//                 style={{
//                     position: "absolute",
//                     marginLeft: "auto",
//                     marginRight: "auto",
//                     left: 0,
//                     right: 0,
//                     textAlign: "center",
//                     zindex: 9,
//                     width: 640,
//                     height: 360
//                 }} />

//             <canvas
//                 ref={canvasRef}
//                 style={{
//                     position: "absolute",
//                     marginLeft: "auto",
//                     marginRight: "auto",
//                     left: 0,
//                     right: 0,
//                     textAlign: "center",
//                     zindex: 9,
//                     width: 640,
//                     height: 360

//                 }} />


//         </div>
//     )
// }

