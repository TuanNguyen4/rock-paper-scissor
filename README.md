# Rock, Paper, Scissor with Hand :hand: Recognition

## Table of Contents
- [Description](https://github.com/TuanNguyen4/rock-paper-scissor#description)
- [Background](https://github.com/TuanNguyen4/rock-paper-scissor#background)
- [Recognizing Rock, Paper, and Scissor](https://github.com/TuanNguyen4/rock-paper-scissor#recognizing-rock-paper-and-scissor)
- [Interacting with Buttons](https://github.com/TuanNguyen4/rock-paper-scissor#interacting-with-buttons)
- [Detecting Hand Swipes](https://github.com/TuanNguyen4/rock-paper-scissor#detecting-hand-motion)
- [Installation](https://github.com/TuanNguyen4/rock-paper-scissor#installation)
- [Usage](https://github.com/TuanNguyen4/rock-paper-scissor#usage)
- [Credits](https://github.com/TuanNguyen4/rock-paper-scissor#credits)

## Description
This is a rock, paper, scissor game where the user can play by posing with their hand as if they were playing in real life. The webcam will detect the user's hand gestures and motion using AI. The application can detect :fist:, :hand:, :v: and :point_up_2:.

The user can point at the on-screen buttons to activate them and can swipe with their hand to control the modals. Swiping with the left hand will activate the graduation modal and swiping with the right hand will activate the pigeon modal (an inside joke of our cohort). Swiping up with either hand will close both modals.

## Background
This is one of the projects I worked on during my time at Hack Reactor. I was tasked with creating a minimum viable product or MVP in two days. Given my interest in machine learning, I wanted to work with TensorFlow.js and utilized one of the available pre-trained models. I used [the handpose model](https://github.com/tensorflow/tfjs-models/tree/master/handpose) with [this library](https://github.com/andypotato/fingerpose).

I originally intended to just build a simple app to detect the three poses. However, I wanted to experiment and see if I could also control UI elements with my hand which I was mostly successful. Overall, I had a lot fun working on this project and I was happy to see this be well-received among my peers.

## Recognizing Rock, Paper, and Scissor

I define several descriptions using the [fingerpose library](https://github.com/andypotato/fingerpose). The library can estimate the direction and curl of each fingers and compare these traits with the descriptions. I can then extract the pose with the highest confidence and used that within the application.

<p align="center">
  <img src="https://user-images.githubusercontent.com/107650573/207224793-f9a83209-7980-4870-a4b5-6f5382b6b00f.gif" width="50%">
</p>

## Interacting with Buttons

The on-screen buttons will only activate if the pointer :point_up_2: pose is used and the location of the index finger enters the boundary of the buttons. This means the user can pass over the buttons when making hand motion without activating them. The five buttons perform the following action below:
- Button 1 : Show the graduation modal, congratulating my cohort for completing the program.
- Button 2 : Close graduation modal
- Button 3 : Close the webcam feed
- Button 4 : Close pigeon modal
- Button 5 : Show the pigeon modal (one of many inside jokes of our cohort)

<p align="center">
  <img src="https://user-images.githubusercontent.com/107650573/207224968-fcda8c71-1f0c-4235-b19e-4fefbb74dc2c.gif" width="50%">
</p>

## Detecting Hand Swipes

For detecting hand swipes, I stored the x and y-coordinate of the user's wrists in an array which serves as a recording of the motion. After I stored enough, I can take the difference of the first and last wrist points. Since the top-left is (0, 0) and the bottom-right is (480, 320), if the y difference is positive, then the wrist started at the top and moved downward. Conversely, if the y difference is negative, then the wrist started at the bottom and moved up.

One problem with this implementation is the timing of when to execute the motion. Since I'm "recording" the motion at set intervals, the user needs to begin the motion at the start to effectively detect it. I used a temporary solution (console.logging '-->') to notify when to begin the hand motion.  Otherwise, the application could not detect it properly.

<p align="center">
  <img src="https://user-images.githubusercontent.com/107650573/207225046-9d6d75af-7a94-4525-9280-03679418f3bf.gif" width="48%">
    <img src="https://user-images.githubusercontent.com/107650573/207225077-99286d87-8015-4e6f-a08b-9e3b9e2dbcad.gif" width="48%">
</p>

## Usage
- Click the "Join Game" button to render the webcam feed
- Perform one of the gestures and then click "Start" to play a round
- If no or incorrect gesture is detected, the round will not count
- Open the Chrome Developer tools to see if the gestures and motion are being detected
- Point at one of the buttons to activate them
- Swipe down with the left or right hand to activate modal 1 or 2
- Swipe up to close all modals

## Installation
- Clone this repo locally to your machine
- Inside the root directory of this project, run `npm install`
- In one terminal, run `npm run server-dev` to start the server
- In another terminal, run `npm run react-dev` to start the application
- Go to [http://localhost:3001](http://localhost:3001)

## Credits
- [Real Time AI HAND POSE Estimation with Javascript, Tensorflow.JS and React.JS](https://www.youtube.com/watch?v=f7uBsb-0sGQ)
- [Real Time AI GESTURE RECOGNITION with Tensorflow.JS + React.JS + Fingerpose](https://www.youtube.com/watch?v=9MTiQMxTXPE)
