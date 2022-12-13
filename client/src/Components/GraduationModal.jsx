import React from 'react'
import graduation from '../images/graduation.jpeg'

const GraduationModal = ({ showGraduation, onClose }) => {
  const gradStyle = {
    maxHeight: '600px',
    maxWidth: '400px',
    justifyContent: 'center',
    border: '5px solid grey'
  }

  return (showGraduation && (
    <div className='modal-graduation' onClick={onClose}>
      <div className='modal-content-graduation' onClick={(e) => e.stopPropagation()}>

        {/* Modal Header */}
        <div className='modal-header'>Congratulations RFCE 2209!</div>

        {/* Modal Body */}
        <div className='modal-body'>
          <img style={gradStyle} src={graduation} alt='graduation'/>
          <div>May all your code be bug-free and merges be conflict-free!</div>
        </div>

        {/* Modal Footer */}
        <div className='modal-footer'>
          <button className='modal-button' onClick={onClose} >Close</button>
        </div>

      </div>
    </div>
    )
  )

}
export default GraduationModal