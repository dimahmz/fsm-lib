import {ReactComponent as  CloseIcon } from '../assets/icons/close.svg'
import { Form, useNavigation } from 'react-router-dom'
import Button from './AppButton'
import './AppModal.css'
import { useState, useEffect } from 'react'


export default function BackBtn({ onClose , action}){

  const navigation = useNavigation()

  const closeModal = () => { onClose() }

  const closeModalOutside = (e) => { 
    if (e.target === e.currentTarget)
        onClose() 
  }

  const [closeError, setCloseError] = useState(false)

  // const closeErrorModal = ({success}) => {  setCloseError(!success) }

  // useEffect(() => {
  //   if(response) closeErrorModal(response)
  // }, [response]);  



  return(
    // className=
  <div  className='modal-bg' onClick={closeModalOutside}>
      {/* {
        closeError &&
        <section className='modal-content mt-10 -mb-10'>
          <span onClick={() =>{closeErrorModal({success:true})}}>
              <CloseIcon />
          </span>
          <h1>Error Title</h1>
          <p>{response.message}</p>
        </section>
      } */}
    <section className='modal-content mt-16'>
      <header className='flex justify-between my-3'>
        <p>Enter the information of student : </p>
        <CloseIcon className='relative z-10 p-0 m-0' onClick={closeModal} />
      </header>
        <Form method='post' action={action}>
          <div className='modal-form flex flex-col space-y-3 py-5 px-2 rounded-lg bg-gray-50'> 
            <div>
              <label htmlFor='StdudentID'>ID </label>
              <input className='app-input' type='text' name='ID' />
            </div>
            <div>
              <label htmlFor='StdudentID'> first name </label>
              <input  className='app-input'  type='text' name='firstName' /> 
            </div>
            <div>
              <label htmlFor='StdudentID'>last name </label>
              <input  className='app-input'  type='text' name='lastName' /> 
            </div>
            <div>
              <label htmlFor='StdudentID'>Branch</label>
              <input  className='app-input'  type='text' name='branch' />
            </div>
          </div>
          <div className='mt-5 flex justify-end'>
            <span>
              <Button text="save" type='submit'/>
            </span>
          </div>
        </Form>
    </section>
  </div>
  )
}
