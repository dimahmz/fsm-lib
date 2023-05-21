import {ReactComponent as  CloseIcon } from '../assets/icons/close.svg'
import Button from './AppButton'
import './AppModal.css'


export default function WarningModal({ onClose , BtnName}){

  const closeModal = () => { onClose() }

  const closeModalOutside = (e) => { 
    if (e.target === e.currentTarget)
        onClose() 
  }

  return(

  <div  className='modal-bg' onClick={closeModalOutside}>
    <section className='modal-content mt-40'>
      <header className='flex justify-between my-3'>
        <p>An server error occurred. Please try again later</p>
        <CloseIcon  onClick={closeModal}/>
      </header>
        { BtnName &&  <div className='mt-5 flex justify-end'> <Button text={BtnName} type='button'/></div>}
      </section>
  </div>
  )
}