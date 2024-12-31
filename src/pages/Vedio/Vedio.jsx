import React from 'react'
import './Vedio.css'
import PlayVedio from '../../components/PlayVedio/PlayVedio'
import Recommended from '../../components/Recommended/Recommended'
import { useParams } from 'react-router-dom'
const Vedio = () => {
  const {vedioId,categoryId} = useParams();
  return (
    <div className='play-container'>
      <PlayVedio vedioId={vedioId}/>
      <Recommended categoryId={categoryId}/>
    </div>
  )
}

export default Vedio
