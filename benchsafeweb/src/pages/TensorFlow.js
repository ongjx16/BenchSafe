import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
// Register one of the TF.js backends.
import '@tensorflow/tfjs-backend-webgl';
import React from "react";
import Webcam from "react-webcam";

export default function TensorFlow() {
    let detector;
    let poses;
    let video

    async function init() {
        const detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING };
        const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
    };

    async function setup() {
        createCanvas(320, 240);
        video = createCapture(VIDEO);
        video.size(320,240)
        await init();
    }

    async function getPoses(){
        poses = await detector.estimatePoses(image);
    }

    function draw(){
        background(220);
    }
    return (
        
        <div>
            <text>tensorflow page</text>
            {/* <Webcam /> */}
        </div>
    )
}

