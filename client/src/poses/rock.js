// Import dependencies
import * as fp from 'fingerpose'
// import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const rock = new fp.GestureDescription('ROCK');

const fingers = [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]

for (let finger in fingers) {
  rock.addCurl(finger, fp.FingerCurl.HalfCurl, 1.0)
  rock.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9)
  rock.addCurl(finger, fp.FingerCurl.HalfCurl, 0.8)

  rock.addCurl(finger, fp.FingerCurl.FullCurl, 1.0)
  rock.addCurl(finger, fp.FingerCurl.FullCurl, 0.9)
  rock.addCurl(finger, fp.FingerCurl.FullCurl, 0.8)
}

export default rock;