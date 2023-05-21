import {ReactComponent as  CloseIcon } from '../assets/icons/close.svg'
import { Form } from 'react-router-dom'
import Button from './AppButton'
import './AppModal.css'


export default function DeleteModal({ onClose , name , action}){
  const closeModal = () => { onClose() }

  const closeModalOutside = (e) => { 
    if (e.target === e.currentTarget)
        onClose() 
  }

  return(

  <div  className='modal-bg' onClick={closeModalOutside}>
    <section className='modal-content mt-40'>
      <header className='flex justify-between my-3'>
        <p>Are you sure you wanna delete this {name} </p>
        <CloseIcon  onClick={closeModal}/>
      </header>
        <Form method='post' action={action}>
          <div className='mt-5 flex justify-end'>
            <Button text="Delete" type='submit'/>
          </div>
        </Form>
    </section>
  </div>
  )
}