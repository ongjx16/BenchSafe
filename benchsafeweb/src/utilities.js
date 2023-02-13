// // /**
// //  * @license
// //  * Copyright 2019 Google LLC. All Rights Reserved.
// //  * Licensed under the Apache License, Version 2.0 (the "License");
// //  * you may not use this file except in compliance with the License.
// //  * You may obtain a copy of the License at
// //  *
// //  * https://www.apache.org/licenses/LICENSE-2.0
// //  *
// //  * Unless required by applicable law or agreed to in writing, software
// //  * distributed under the License is distributed on an "AS IS" BASIS,
// //  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// //  * See the License for the specific language governing permissions and
// //  * limitations under the License.
// //  * =============================================================================
// //  */
// // import * as poseDetection from '@tensorflow-models/pose-detection'
// // import * as tf from "@tensorflow/tfjs-core";

// // const color = "aqua";
// // const boundingBoxColor = "red";
// // const lineWidth = 2;

// // export const tryResNetButtonName = "tryResNetButton";
// // export const tryResNetButtonText = "[New] Try ResNet50";
// // const tryResNetButtonTextCss = "width:100%;text-decoration:underline;";
// // const tryResNetButtonBackgroundCss = "background:#e61d5f;";

// // function isAndroid() {
// //   return /Android/i.test(navigator.userAgent);
// // }

// // function isiOS() {
// //   return /iPhone|iPad|iPod/i.test(navigator.userAgent);
// // }

// // export function isMobile() {
// //   return isAndroid() || isiOS();
// // }

// // function setDatGuiPropertyCss(propertyText, liCssString, spanCssString = "") {
// //   var spans = document.getElementsByClassName("property-name");
// //   for (var i = 0; i < spans.length; i++) {
// //     var text = spans[i].textContent || spans[i].innerText;
// //     if (text == propertyText) {
// //       spans[i].parentNode.parentNode.style = liCssString;
// //       if (spanCssString !== "") {
// //         spans[i].style = spanCssString;
// //       }
// //     }
// //   }
// // }

// // export function updateTryResNetButtonDatGuiCss() {
// //   setDatGuiPropertyCss(
// //     tryResNetButtonText,
// //     tryResNetButtonBackgroundCss,
// //     tryResNetButtonTextCss
// //   );
// // }

// // /**
// //  * Toggles between the loading UI and the main canvas UI.
// //  */
// // export function toggleLoadingUI(
// //   showLoadingUI,
// //   loadingDivId = "loading",
// //   mainDivId = "main"
// // ) {
// //   if (showLoadingUI) {
// //     document.getElementById(loadingDivId).style.display = "block";
// //     document.getElementById(mainDivId).style.display = "none";
// //   } else {
// //     document.getElementById(loadingDivId).style.display = "none";
// //     document.getElementById(mainDivId).style.display = "block";
// //   }
// // }

// // function toTuple({ y, x }) {
// //   return [y, x];
// // }

// // export function drawPoint(ctx, y, x, r, color) {
// //   ctx.beginPath();
// //   ctx.arc(x, y, r, 0, 2 * Math.PI);
// //   ctx.fillStyle = color;
// //   ctx.fill();
// // }

// // /**
// //  * Draws a line on a canvas, i.e. a joint
// //  */
// // export function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
// //   ctx.beginPath();
// //   ctx.moveTo(ax * scale, ay * scale);
// //   ctx.lineTo(bx * scale, by * scale);
// //   ctx.lineWidth = lineWidth;
// //   ctx.strokeStyle = color;
// //   ctx.stroke();
// // }

// // /**
// //  * Draws a pose skeleton by looking up all adjacent keypoints/joints
// //  */
// // export function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
// //   const adjacentKeyPoints = poseDetection.getAdjacentKeyPoints(
// //     keypoints,
// //     minConfidence
// //   );

// //   adjacentKeyPoints.forEach((keypoints) => {
// //     drawSegment(
// //       toTuple(keypoints[0].position),
// //       toTuple(keypoints[1].position),
// //       color,
// //       scale,
// //       ctx
// //     );
// //   });
// // }

// // /**
// //  * Draw pose keypoints onto a canvas
// //  */
// // export function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
// //   for (let i = 0; i < keypoints.length; i++) {
// //     const keypoint = keypoints[i];

// //     if (keypoint.score < minConfidence) {
// //       continue;
// //     }

// //     const y = keypoint.y;
// //     const x = keypoint.x;
// //     drawPoint(ctx, y * scale, x * scale, 3, color);
// //   }
// // }

// // /**
// //  * Draw the bounding box of a pose. For example, for a whole person standing
// //  * in an image, the bounding box will begin at the nose and extend to one of
// //  * ankles
// //  */
// // export function drawBoundingBox(keypoints, ctx) {
// //   const boundingBox = poseDetection.getBoundingBox(keypoints);

// //   ctx.rect(
// //     boundingBox.minX,
// //     boundingBox.minY,
// //     boundingBox.maxX - boundingBox.minX,
// //     boundingBox.maxY - boundingBox.minY
// //   );

// //   ctx.strokeStyle = boundingBoxColor;
// //   ctx.stroke();
// // }

// // /**
// //  * Converts an arary of pixel data into an ImageData object
// //  */
// // export async function renderToCanvas(a, ctx) {
// //   const [height, width] = a.shape;
// //   const imageData = new ImageData(width, height);

// //   const data = await a.data();

// //   for (let i = 0; i < height * width; ++i) {
// //     const j = i * 4;
// //     const k = i * 3;

// //     imageData.data[j + 0] = data[k + 0];
// //     imageData.data[j + 1] = data[k + 1];
// //     imageData.data[j + 2] = data[k + 2];
// //     imageData.data[j + 3] = 255;
// //   }

// //   ctx.putImageData(imageData, 0, 0);
// // }

// // /**
// //  * Draw an image on a canvas
// //  */
// // export function renderImageToCanvas(image, size, canvas) {
// //   canvas.width = size[0];
// //   canvas.height = size[1];
// //   const ctx = canvas.getContext("2d");

// //   ctx.drawImage(image, 0, 0);
// // }

// // /**
// //  * Draw heatmap values, one of the model outputs, on to the canvas
// //  * Read our blog post for a description of PoseNet's heatmap outputs
// //  * https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5
// //  */
// // export function drawHeatMapValues(heatMapValues, outputStride, canvas) {
// //   const ctx = canvas.getContext("2d");
// //   const radius = 5;
// //   const scaledValues = heatMapValues.mul(tf.scalar(outputStride, "int32"));

// //   drawPoints(ctx, scaledValues, radius, color);
// // }

// // /**
// //  * Used by the drawHeatMapValues method to draw heatmap points on to
// //  * the canvas
// //  */
// // function drawPoints(ctx, points, radius, color) {
// //   const data = points.buffer().values;

// //   for (let i = 0; i < data.length; i += 2) {
// //     const pointY = data[i];
// //     const pointX = data[i + 1];

// //     if (pointX !== 0 && pointY !== 0) {
// //       ctx.beginPath();
// //       ctx.arc(pointX, pointY, radius, 0, 2 * Math.PI);
// //       ctx.fillStyle = color;
// //       ctx.fill();
// //     }
// //   }
// // }

// /**
//  * @license
//  * Copyright 2021 Google LLC. All Rights Reserved.
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  * https://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  * =============================================================================
//  */
// import * as posedetection from '@tensorflow-models/pose-detection';
// import * as scatter from 'scatter-gl';

// import * as params from './params';
// import {isMobile} from './util';

// // These anchor points allow the pose pointcloud to resize according to its
// // position in the input.
// const ANCHOR_POINTS = [[0, 0, 0], [0, 1, 0], [-1, 0, 0], [-1, -1, 0]];

// // #ffffff - White
// // #800000 - Maroon
// // #469990 - Malachite
// // #e6194b - Crimson
// // #42d4f4 - Picton Blue
// // #fabed4 - Cupid
// // #aaffc3 - Mint Green
// // #9a6324 - Kumera
// // #000075 - Navy Blue
// // #f58231 - Jaffa
// // #4363d8 - Royal Blue
// // #ffd8b1 - Caramel
// // #dcbeff - Mauve
// // #808000 - Olive
// // #ffe119 - Candlelight
// // #911eb4 - Seance
// // #bfef45 - Inchworm
// // #f032e6 - Razzle Dazzle Rose
// // #3cb44b - Chateau Green
// // #a9a9a9 - Silver Chalice
// const COLOR_PALETTE = [
//   '#ffffff', '#800000', '#469990', '#e6194b', '#42d4f4', '#fabed4', '#aaffc3',
//   '#9a6324', '#000075', '#f58231', '#4363d8', '#ffd8b1', '#dcbeff', '#808000',
//   '#ffe119', '#911eb4', '#bfef45', '#f032e6', '#3cb44b', '#a9a9a9'
// ];
// export class Camera {
  
//   drawCtx() {
//     this.ctx.drawImage(
//         this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
//   }

//   clearCtx() {
//     this.ctx.clearRect(0, 0, this.video.videoWidth, this.video.videoHeight);
//   }

//   /**
//    * Draw the keypoints and skeleton on the video.
//    * @param poses A list of poses to render.
//    */
//   drawResults(poses) {
//     for (const pose of poses) {
//       this.drawResult(pose);
//     }
//   }

//   /**
//    * Draw the keypoints and skeleton on the video.
//    * @param pose A pose with keypoints to render.
//    */
//   drawResult(pose) {
//     if (pose.keypoints != null) {
//       this.drawKeypoints(pose.keypoints);
//       this.drawSkeleton(pose.keypoints, pose.id);
//     }
//     if (pose.keypoints3D != null && params.STATE.modelConfig.render3D) {
//       this.drawKeypoints3D(pose.keypoints3D);
//     }
//   }

//   /**
//    * Draw the keypoints on the video.
//    * @param keypoints A list of keypoints.
//    */
//   drawKeypoints(keypoints) {
//     const keypointInd =
//         posedetection.util.getKeypointIndexBySide(params.STATE.model);
//     this.ctx.fillStyle = 'Red';
//     this.ctx.strokeStyle = 'White';
//     this.ctx.lineWidth = params.DEFAULT_LINE_WIDTH;

//     for (const i of keypointInd.middle) {
//       this.drawKeypoint(keypoints[i]);
//     }

//     this.ctx.fillStyle = 'Green';
//     for (const i of keypointInd.left) {
//       this.drawKeypoint(keypoints[i]);
//     }

//     this.ctx.fillStyle = 'Orange';
//     for (const i of keypointInd.right) {
//       this.drawKeypoint(keypoints[i]);
//     }
//   }

//   drawKeypoint(keypoint) {
//     // If score is null, just show the keypoint.
//     const score = keypoint.score != null ? keypoint.score : 1;
//     const scoreThreshold = params.STATE.modelConfig.scoreThreshold || 0;

//     if (score >= scoreThreshold) {
//       const circle = new Path2D();
//       circle.arc(keypoint.x, keypoint.y, params.DEFAULT_RADIUS, 0, 2 * Math.PI);
//       this.ctx.fill(circle);
//       this.ctx.stroke(circle);
//     }
//   }

//   /**
//    * Draw the skeleton of a body on the video.
//    * @param keypoints A list of keypoints.
//    */
//   drawSkeleton(keypoints, poseId) {
//     // Each poseId is mapped to a color in the color palette.
//     const color = params.STATE.modelConfig.enableTracking && poseId != null ?
//         COLOR_PALETTE[poseId % 20] :
//         'White';
//     this.ctx.fillStyle = color;
//     this.ctx.strokeStyle = color;
//     this.ctx.lineWidth = params.DEFAULT_LINE_WIDTH;

//     posedetection.util.getAdjacentPairs(params.STATE.model).forEach(([
//                                                                       i, j
//                                                                     ]) => {
//       const kp1 = keypoints[i];
//       const kp2 = keypoints[j];

//       // If score is null, just show the keypoint.
//       const score1 = kp1.score != null ? kp1.score : 1;
//       const score2 = kp2.score != null ? kp2.score : 1;
//       const scoreThreshold = params.STATE.modelConfig.scoreThreshold || 0;

//       if (score1 >= scoreThreshold && score2 >= scoreThreshold) {
//         this.ctx.beginPath();
//         this.ctx.moveTo(kp1.x, kp1.y);
//         this.ctx.lineTo(kp2.x, kp2.y);
//         this.ctx.stroke();
//       }
//     });
//   }

//   drawKeypoints3D(keypoints) {
//     const scoreThreshold = params.STATE.modelConfig.scoreThreshold || 0;
//     const pointsData =
//         keypoints.map(keypoint => ([-keypoint.x, -keypoint.y, -keypoint.z]));

//     const dataset =
//         new scatter.ScatterGL.Dataset([...pointsData, ...ANCHOR_POINTS]);

//     const keypointInd =
//         posedetection.util.getKeypointIndexBySide(params.STATE.model);
//     this.scatterGL.setPointColorer((i) => {
//       if (keypoints[i] == null || keypoints[i].score < scoreThreshold) {
//         // hide anchor points and low-confident points.
//         return '#ffffff';
//       }
//       if (i === 0) {
//         return '#ff0000' /* Red */;
//       }
//       if (keypointInd.left.indexOf(i) > -1) {
//         return '#00ff00' /* Green */;
//       }
//       if (keypointInd.right.indexOf(i) > -1) {
//         return '#ffa500' /* Orange */;
//       }
//     });

//     if (!this.scatterGLHasInitialized) {
//       this.scatterGL.render(dataset);
//     } else {
//       this.scatterGL.updateDataset(dataset);
//     }
//     const connections = posedetection.util.getAdjacentPairs(params.STATE.model);
//     const sequences = connections.map(pair => ({indices: pair}));
//     this.scatterGL.setSequences(sequences);
//     this.scatterGLHasInitialized = true;
//   }
// }