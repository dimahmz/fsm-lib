import {ReactComponent as  CloseIcon } from '../assets/icons/close.svg'
import Button from './AppButton'
import './AppModal.css'


export default function SuccessModal({ onClose ,toView , message}){

  const closeModal = () => { onClose() }

  const closeModalOutside = (e) => { 
    if (e.target === e.currentTarget)
        onClose() 
  }

  return(

  <div  className='modal-bg' onClick={closeModalOutside}>
    <section className='modal-content mt-40'>
      <header className='flex justify-between my-3'>
        <p>{message}</p>
        <CloseIcon  onClick={closeModal}/>
      </header>
          <div className='mt-5 flex justify-end'>
            <Button text={`view ${toView}`} type='button'/>
          </div>
    </section>
  </div>
  )
}