// Import dependencies
import * as fp from 'fingerpose'
// import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const thumbsUp = new fp.GestureDescription('thumbs_up');

// Thumb - vertical up
thumbsUp.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 0.8);
thumbsUp.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 0.9);
thumbsUp.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
thumbsUp.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 0.9);
// Thumb - diagonal up left
thumbsUp.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);
thumbsUp.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 0.9);
// Thumb - diagonal up right
thumbsUp.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);
thumbsUp.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 0.9);

// Other fingers are culr or half-curl
for(let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  thumbsUp.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  thumbsUp.addCurl(finger, fp.FingerCurl.FullCurl, 0.9);

  thumbsUp.addCurl(finger, fp.FingerCurl.HalfCurl, 1.0);
  thumbsUp.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
}

export default thumbsUp;