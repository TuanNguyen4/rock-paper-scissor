import * as fp from 'fingerpose'
// Define gesture description
const paper = new fp.GestureDescription('PAPER');

const fingers = [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]

for (let finger in fingers) {
  paper.addCurl(finger, fp.FingerCurl.NoCurl, 0.9)

  paper.addDirection(finger, fp.FingerDirection.VerticalUp, 0.8)
  paper.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 0.8)
  paper.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 0.8)
}

export default paper;