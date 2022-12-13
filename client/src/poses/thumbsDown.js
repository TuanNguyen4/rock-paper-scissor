// Import dependencies
import * as fp from 'fingerpose'
// import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const thumbsDown = new fp.GestureDescription('thumbs_down');

// Thumb - vertical up
thumbsDown.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl);
thumbsDown.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalDown, 1.0);
thumbsDown.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalDown, 0.9);
// Thumb - diagonal up left
thumbsDown.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownLeft, 1.0);
thumbsDown.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownLeft, 0.9);
// Thumb - diagonal up right
thumbsDown.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownLeft, 1.0);
thumbsDown.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownRight, 0.9);

// Other fingers are culr or half-curl
for(let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  thumbsDown.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  thumbsDown.addCurl(finger, fp.FingerCurl.FullCurl, 0.9);

  thumbsDown.addCurl(finger, fp.FingerCurl.HalfCurl, 1.0);
  thumbsDown.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
}

export default thumbsDown;
