import React, { useRef, useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import * as tf from '@tensorflow/tfjs'
import * as handpose from '@tensorflow-models/handpose'
import * as fp from 'fingerpose'
import axios from 'axios'
import { drawHand, getVideo, getContext, randomChoice, checkChoice, getWristAndIndexLocation, swipeDownFromLeftSide, swipeDownFromRightSide, swipeUp, onScreenSquareButton, buttonPress } from './utilities.js'
import { rps_images, animated_robot } from '../images/index.js'
import { paper, rock, scissor, point } from '../poses/index.js'
import { Scores, GraduationModal, PigeonModal } from './index.js'

const App = () => {
  // State to trigger the camera and canvas
  const [join, setJoin] = useState(false);
  const webcamRef = useRef(null); // For webcam
  const canvasRef = useRef(null); // For hand wireframe
  // Scores
  const [playerScore, setPlayerScore] = useState(0)
  const [AIScore, setAIScore] = useState(0)
  // Player and AI emoji
  const [AI, setAI] = useState('')
  const [emoji, setEmoji] = useState('');
  // Modals
  const [showGraduation, setGraduation] = useState(false)
  const [showPigeon, setPigeon] = useState(false)

  const rps_emoji = rps_images
  const detectionInterval = 200 // Time interval in ms between each hand detection
  let recordMotion = []; // Store timelapse of poses to determine hand motion
  const allGestures = [rock, paper, scissor, point]
  const detectGestures = new fp.GestureEstimator(allGestures)
  let AICurrentChoice = AI === 'PAPER' || AI === 'ROCK' || AI === 'SCISSOR' // Bool for setting the AI emoji

  // The main function to detect the hand and its motion through webcam
  const detect = async (net) => {
    // Check input stream is avalibale
    if (typeof webcamRef.current !== 'undefined' && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
      const video = getVideo(webcamRef)
      const ctx = getContext(video, canvasRef)
      // Draw five buttons on the canvas
      const colorButton = ['yellow', 'blue', 'red', 'blue', 'yellow'];
      for (let i = 0; i < 5; i++) {
        onScreenSquareButton(ctx, 105 * i + 4, 0, colorButton[i])
      }
      // ------- Pre-Trained Model To Detect Hands -------
      const hand = await net.estimateHands(video);
      drawHand(hand, ctx) // Draw hand wireframe on canvas
      if (hand.length > 0) {
        // ------- Motion Detection -------
        let wristAndIndexLocation = getWristAndIndexLocation(hand[0])
        recordMotion.push(wristAndIndexLocation)
        if (recordMotion.length >= 7) {
          if (swipeDownFromLeftSide(recordMotion)) {
            setGraduation(true)
          } else if (swipeDownFromRightSide(recordMotion)) {
            setPigeon(true)
          } else if (swipeUp(recordMotion)) {
            setGraduation(false)
            setPigeon(false)
          }
          recordMotion = [] // Clear recorded motion
          console.log('-->') // Marker to know when to initiate hand motion
        }

        // ------- Pose Recognition -------
        const predictedGestures = await detectGestures.estimate(hand[0].landmarks, 8);
        if (predictedGestures.gestures !== undefined && predictedGestures.gestures.length > 0) {
          // Store confidences of all poses in estimator
          const confidences = predictedGestures.gestures.map((prediction) => prediction.score);
          // Get index of highest pose confidence in estimator
          const maxConfidenceIndex = confidences.indexOf(Math.max.apply(null, confidences))
          const pose = predictedGestures.gestures[maxConfidenceIndex]
          setEmoji(pose.name); // i.e. 'ROCK', 'PAPER', 'SCISSOR', 'POINT'

          // ------- Detect Button Presses -------
          if (pose.name === 'POINT') {
            let indexLocation = getWristAndIndexLocation(hand[0]).indexPoint
            if (buttonPress(indexLocation, 4)) { // Button 1
              console.log('Pressed button 1')
              setGraduation(true)
            } else if (buttonPress(indexLocation, 109)) { // Button 2
              console.log('Pressed button 2')
              setGraduation(false)
            } else if (buttonPress(indexLocation, 214)) { // Button 3
              console.log('Pressed button 3\nLeaving game')
              joinGame(false)
            } else if (buttonPress(indexLocation, 319)) { // Button 4
              console.log('Pressed button 4')
              setPigeon(false)
            } else if (buttonPress(indexLocation, 424)) { // Button 5
              console.log('Pressed button 5')
              setPigeon(true)
            }
          }
        }
      }
    }
  }
  // Helper function to run the hand detection continuously
  const runHandPose = async () => {
    const net = await handpose.load()
    console.log('Handpose model loaded')
    setInterval(() => { // Loop and detect hands
      detect(net)
    }, detectionInterval)
  }
  // On click function to activate webcam and reset emojis
  const joinGame = (boolean) => {
    setEmoji('')
    setAI('')
    setJoin(boolean)
  }
  // On click function to start a round of RPS and update scores
  const startRound = () => {
    let AIChoice = randomChoice();
    setAI(AIChoice)
    console.log(`Player:${emoji} vs AI:${AIChoice}`)
    const score = checkChoice(emoji, AIChoice)
    setPlayerScore(playerScore + score.player)
    setAIScore(AIScore + score.AI)
  }

  useEffect(() => {
    runHandPose()
  }, [])

  return (
    <div className="App" >
      <h1>Rock Paper Scissor w/ Hand Recognition</h1>
      <div className='players'>
        {/* AI opponent and emoji */}
        <img className='AI-gif' src={animated_robot} alt='robot_gif' />
        {AICurrentChoice && <img className='ai-emoji' src={rps_emoji[AI]} alt='emoji' />}

        {/* Scores and start round button */}
        <Scores join={join} playerScore={playerScore} text='Start!' AIScore={AIScore} startRound={startRound} />

        {/* Join button to activate webcam */}
        {!join && <button className='join' onClick={() => joinGame(true)}>Join Game</button>}

        {/* Player's emoji */}
        {emoji && <img className='player-emoji' src={rps_emoji[emoji]} alt='emoji' />}
        {/* Player's webcam */}
        {join && <Webcam className='webcam' videoConstraints={{ width: 480, height: 320 }} ref={webcamRef} />}
        {/* Player's canvas for hand wireframe and on-screen buttons */}
        {join && <canvas className='canvas' ref={canvasRef} onClick={() => joinGame(false)} />}
      </div>

      <GraduationModal showGraduation={showGraduation} onClose={() => setGraduation(false)} />
      <PigeonModal showPigeon={showPigeon} onClose={() => setPigeon(false)} />
    </div>
  );
}
export default App;
