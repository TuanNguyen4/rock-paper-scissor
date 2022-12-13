import React from 'react'

const Scores = ({join, playerScore, text, AIScore, startRound}) => {

  return ( join &&
    (<div className='scores'>
      <input type='button' id='player-score' value={`Player\n${playerScore}`}/>
      <input type='button' className='start' onClick={()=>startRound()} value={text}/>
      <input type='button' id='ai-score' value={`AI\n${AIScore}`}/>
    </div>)
  )
}
export default Scores