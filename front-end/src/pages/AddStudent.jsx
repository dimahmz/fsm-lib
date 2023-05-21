import { Form, redirect, useActionData } from 'react-router-dom'
import { useState } from 'react'
import axios from '../../axios'
import Line from '../components/Line'
import Button from '../components/AppButton'
import './AddStudent.css'
import sleep from '../sleep'
import WarningModal from '../components/WarningModal'

export async function addAstudent({ request  }) {
  const formData = await request.formData(),
    last_name = formData.get("last_name"),
    first_name = formData.get("first_name"),
    branch = formData.get("branch"),
    email =  formData.get("email")

    try{
      const { data }  = await  axios.post('/serverip/add_student/', 
      [{last_name,first_name,branch,email}])
      if(data.success)
      return redirect(`/students/${data.student[0].id}`)
      else {
        window.alert(data.error)
        return data
      }
      
    }
    catch(e){
      const {response : { data : data }} = e
      window.alert("server error! please try again later.")
      return data
    }
  }
  
  export default function AddStudent(){

  const [ displayModal , setModalDisplay ]= useState(false)

  
  let isStudentNotAdded  = useActionData()
  
  const closeIt = (v)=>{ setModalDisplay(v) }


  return(
    <>
      <h1 className='mt-7 mb-5 ml-24 font-semibold text-xl'>Add  a Student </h1>
      <Line/>
      <Form  method="post">
        
        <div className='inputs-wrapper flex flex-col space-y-6 ml-28 mt-5 '>
          <div>
            <label htmlFor="first_name"> First name</label>
            <input className="app-input" type='text' name='first_name' required/>
          </div>
          <div>
            <label htmlFor="last_name">Last name</label>
            <input className="app-input" type='text' name='last_name' required/>
          </div>
          <div>
            <label htmlFor="title"> Branch </label>
            <input className="app-input" type='text' name='branch' required/>
          </div>
          <div>
            <label htmlFor="email"> Email</label>
            <input className="app-input" type='email' name='email' required/>
          </div>
        </div>
        <div className="ml-28 mt-6">
          <Button text='Add student'  type="submit" />
        </div>
      </Form>
      {/* {displayModal && <WarningModal onClose={()=>closeIt(false)} />  } */}
    </>
  )

}