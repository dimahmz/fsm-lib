import { useNavigate } from 'react-router-dom'
import {ReactComponent as  LessThan } from '../assets/icons/lessThan.svg'

export default function BackBtn(){
  const history = useNavigate()

  const navigateBack = () =>{
    history(-1)
  }
  return(
    <button 
      className='bg-primary px-3 py-1'
      onClick={navigateBack}>
      <LessThan/>
    </button>
  )
}