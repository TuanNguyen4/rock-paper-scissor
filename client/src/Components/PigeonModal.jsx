import React from 'react'
import animated_pigeon from '../images/Pigeon_Gif.gif'

const PigeonModal = ({ showPigeon, onClose }) => {
  const pigeonStyle = {
    maxHeight: '600px',
    maxWidth: '400px',
    justifyContent: 'center',
    border: '5px solid grey'
  }

  return (showPigeon && (
    <div className='modal-pigeon' onClick={onClose}>
      <div className='modal-content-pigeon' onClick={(e) => e.stopPropagation()}>

        {/* Modal Header */}
        <div className='modal-header'>Here's a Pigeon</div>

        {/* Modal Body */}
        <div className='modal-body'>
          <div>Coo Coo!</div><br/>
          <img style={pigeonStyle} src={animated_pigeon} alt='pidgeon'/>
          <div>Coo Coo!</div>
        </div>

        {/* Modal Footer */}
        <div className='modal-footer'>
          <button className='modal-button' onClick={onClose}>Close</button>
        </div>

      </div>
    </div>
    )
  )
}
export default PigeonModal