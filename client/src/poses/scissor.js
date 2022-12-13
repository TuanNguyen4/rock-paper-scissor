// Import dependencies
// import * as fp from 'fingerpose'
import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const scissor = new GestureDescription('SCISSOR');

// thumb:
scissor.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
scissor.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
scissor.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

// index:
scissor.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
scissor.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
scissor.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
scissor.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);
scissor.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
scissor.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);

// middle:
scissor.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
scissor.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
scissor.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);
scissor.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);
scissor.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 1.0);
scissor.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 1.0);

// ring:
scissor.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
scissor.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// pinky:
scissor.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
scissor.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);

export default scissor;