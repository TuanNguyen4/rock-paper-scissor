import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const point = new GestureDescription('POINT');

// thumb:
point.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
point.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
point.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

// point.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
// point.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.9);

// index:
point.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
point.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
point.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
point.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);
point.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
point.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);

// middle:
point.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
point.addCurl(Finger.Middle, FingerCurl.HalfCurl, 0.9);

// ring:
point.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
point.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// pinky:
point.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
point.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);

export default point;