import React from 'react'
import '../../App.css'
import './imagelinkform.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
  return (
    <div>
        <p className='f3'>
            {'TrackFace will detect faces in your photos. Give it a try!'}
        </p>
        <div className='center'>
            <div className='form center pa4 br3 shadow-5'>
                <input 
                  className='f4 pa2 w-70 center' 
                  type='text'
                  onChange={onInputChange}
                />
                <button 
                  onClick={onButtonSubmit} 
                  className ='w-30 grow f4 link ph3 pv2 dib'
                >
                  Detect
                </button>
            </div>
        </div>
    </div>
  )
}

export default ImageLinkForm