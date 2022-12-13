// ---------- Draw Hand Wireframe ----------
// Group the landmark points for the fingers
const fingerJoints = {
  thumb: [0,1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20]
}
const lineColor = 'white';
const dotColor = 'blue';
// Drawing function
const drawHand = (predictions, ctx) => {
  if (predictions.length > 0) {
    // loop through each prediction
    predictions.forEach(prediction => {
      const landmarks = prediction.landmarks;  // Get landmarks
      // Loop through fingers
      for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
        let finger = Object.keys(fingerJoints)[j];
        // Loop through pairs of joints
        for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
          // Get pairs of joints
          const firstJointIndex = fingerJoints[finger][k];
          const secondJointIndex = fingerJoints[finger][k + 1];
          // Draw path
          ctx.beginPath();
          ctx.moveTo(
            landmarks[firstJointIndex][0],
            landmarks[firstJointIndex][1]
          );
          ctx.lineTo(
            landmarks[secondJointIndex][0],
            landmarks[secondJointIndex][1]
          )
          ctx.strokeStyle= lineColor;
          ctx.lineWidth = 4;
          ctx.stroke();
        }
      }
      // Loop through the 20 landmarks of the hand and draw them
      for (let i = 0; i < landmarks.length; i++) {
        // Each landmark has 3 coordinates -> landmarks[i][x-coordinate, y-coordinate, z-coordinate]
        const [x, y] = [landmarks[i][0], landmarks[i][1]]
        // Draw and set circle color
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, 3 * Math.PI);
        ctx.fillStyle = dotColor;
        ctx.fill();
      }
    })
  }
}
// Helper function to set video stream
const getVideo = (webcam) => {
  // Get video properties
  const video = webcam.current.video;
  const videoWidth = webcam.current.video.videoWidth;
  const videoHeight = webcam.current.video.videoHeight;
  // Set video height and width
  webcam.current.video.width = videoWidth;
  webcam.current.video.height = videoHeight;
  return video
}
// Helper function to set the canvas size to match the video stream
const getContext = (video, canvas) => {
  canvas.current.width = video.videoWidth; // Set canvas width
  canvas.current.height = video.videoHeight; // Set canvs height
  return canvas.current.getContext('2d');
}

// ---------- Rock, Paper, Scissor Game ----------
// Helper function to return a random RPS choice
const randomChoice = () => {
  const choices = ['ROCK', 'PAPER', 'SCISSOR']
  let randomIndex = Math.floor(Math.random() * 3)
  return choices[randomIndex]
}
// Helper function to color code the score display when someone wins the round
const scoreColors = (score) => {
  const playerScore = document.getElementById('player-score')
  const AIScore = document.getElementById('ai-score')
  if (score.player === score.AI) {
    playerScore.style.backgroundColor = '#EFEFEF';
    AIScore.style.backgroundColor = '#EFEFEF';
  } else if (score.player === 1) {
    playerScore.style.backgroundColor = 'green';
    AIScore.style.backgroundColor = 'red';
  } else if (score.AI === 1) {
    playerScore.style.backgroundColor = 'red';
    AIScore.style.backgroundColor = 'green';
  }
}
// Helper function to validate each choice for scoring
const checkChoice = (player, AI) => {
  const score = {player: 0, AI: 0, total: 1}
  if (player === AI) { // If tie, no points
    scoreColors(score)
    return score;
  } else if (player === 'ROCK') { // Player chooses rock
    AI === 'PAPER' ? score.AI = 1 : score.player = 1
  } else if (player === 'PAPER') { // Player chooses paper
    AI === 'SCISSOR' ? score.AI = 1 : score.player = 1
  } else if (player === 'SCISSOR') { // Player chooses scissor
    AI === 'ROCK' ? score.AI = 1 : score.player = 1
  }
  scoreColors(score)
  return score
}

// ---------- Detect Motion ----------
const getWristAndIndexLocation = (hand) => {
  // landmarks is an array from 0 to 20 for each point on the hand
  // Each index is an array of x, y, and z values so slice(0, 2) gets the x, y coordinates
  let { landmarks } = hand
  let wristPoint = landmarks[0].slice(0, 2) // Get x and y coordinates
  let indexPoint = landmarks[8].slice(0,2) // Get x and y coordinates
  return {wristPoint: wristPoint, indexPoint: indexPoint}
}
// Helper function to get the wrist point and determine if it's on the LEFT half of screen
// If the difference the wrist's y-coordinate is positive, then the user is swiping down
const swipeDownFromLeftSide = (array) => {
  let [firstPose, lastPose] = [array[0], array.pop()]
  let [firstPoint, lastPoint] = [firstPose.wristPoint[1], lastPose.wristPoint[1]]
  if (lastPoint - firstPoint > 150 && lastPose.wristPoint[0] < 240) {
    console.log('Swipe DOWN from LEFT detected')
    return true;
  }
  return false
}
// Helper function to get the wrist point and determine if it's on the RIGHT half of screen
// If the difference the wrist's y-coordinate is positive, then the user is swiping down
const swipeDownFromRightSide = (array) => {
  let [firstPose, lastPose] = [array[0], array.pop()]
  let [firstPoint, lastPoint] = [firstPose.wristPoint[1], lastPose.wristPoint[1]]
  if (lastPoint - firstPoint > 150 && lastPose.wristPoint[0] > 240) {
    console.log('Swipe DOWN from RIGHT detected')
    return true;
  }
  return false
}
// If the difference the wrist's y-coordinate is negative, then the user is swiping up
const swipeUp = (array) => {
  let [firstPose, lastPose] = [array[0], array.pop()]
  let [firstPoint, lastPoint] = [firstPose.wristPoint[1], lastPose.wristPoint[1]]
  if (lastPoint - firstPoint < -100) {
    console.log('Swipe UP detected')
    return true;
  }
  return false;
}
// Helper function to create square buttons on canvas
const onScreenSquareButton = (ctx, x, y, color) => {
  ctx.beginPath();
  ctx.rect(x, y, 50, 50) // Each button is 50px X 50px
  ctx.strokeStyle = color
  ctx.lineWidth = 2;
  ctx.stroke()
}
// Helper function that takes in a hand object containing the coordinates of the index finger and the left starting position of a button (each button has a width and height of 50px on-screen)
const buttonPress = (index, x) => {
  // First value in index array is x-position and second value is y-position
  return (index[0] >= x && index[0] < (x + 50) && index[1] < 50) ? true : false
}
// Helper function to display a flashing marker on-screen so the user knows when to start the hand motion
const marker = (ctx, toggle) => {
  ctx.beginPath()
  ctx.arc(75, 25, 10, 0, 3 * Math.PI);
  ctx.fillStyle = toggle ? 'green' : 'red'
  ctx.fill();
}

export {
  drawHand,
  getVideo,
  getContext,
  randomChoice,
  checkChoice,
  getWristAndIndexLocation,
  swipeDownFromLeftSide,
  swipeDownFromRightSide,
  swipeUp,
  onScreenSquareButton,
  buttonPress,
  marker
}
