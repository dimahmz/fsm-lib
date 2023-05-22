import { Form, redirect, useLoaderData , NavLink,} from 'react-router-dom'
import Line from '../components/Line'
import BackBtn from '../components/BackBtn'
import Button from '../components/AppButton'
import axios from '../../axios'
import './OneStudent.css'
import sleep from '../sleep'


// Student's loader
export async function studentLoader({params , request }){
  try{
    const { data  } = await axios.get(`/serverip/students/${params.id}/`)
    const msg = new URL(request.url).searchParams.get('msg')
    // @think for a better way to do it 
    if(msg)
      window.alert(msg)
    return data
  }
  catch(e) {
    if(e?.response?.data) {
      return e.response.data
    }
    return {success:false, error: "Server error, please try again later!"}
  }
}

// Action for deleting a student 
export async function deleteStudent({params}){
  try{
    const {data} = await axios.delete(`/serverip/delete_student/${params.id}/`)
    await sleep(500)
    if(data.success)
      return redirect(`/students/?msg=Student with The Id : ${params.id} has been deleted!`)
  }
  catch(e){// console.log(e)}
  return redirect(`/students/${params.id}/?msg=Error! student with Id ${params.id} can't be deleted.`)
}
}


// Action for Editing a student 
export async function updateStudent({request , params}){
  const formData = await request.formData(),
    last_name = formData.get("last_name"),
    first_name = formData.get("first_name"),
    branch = formData.get("branch"),
    email =  formData.get("email")
  try{
    await sleep(500)
    const {data} = await axios.put(`/serverip/students/${params.id}/edit/`, {last_name,first_name,branch,email})
    if(!data.success){
      window.alert("please enter a valid infos")
    }
  }
  catch(e){
    console.log(e.response)
    window.alert("Server error, please try again later")

  }
  return redirect(`/students/${params.id}/`)
}


export default function Student(){

  const data = useLoaderData()

  const student = data?.student

  // @think for a better way to do it 
  if(student){
    window.history.pushState("","",`/students/${student.id}`);
  }


  return(
    <div className='overflow-auto'>
      <div className='ml-8 my-10'><BackBtn page="/students"/></div>
    {
      !data.success ? <p className='mt-14 text-center text-3xl text-red-500'>{data.error}</p> :
      <>
      <div className="flex items-center space-x-28 md:space-x-40 ml-16 sm:justify-center">
        <Form className="pb-10 w-full" method="post">
          <div className='flex space-x-28'>
            <h1 className='font-semibold text-xl text-center'>Student&apos;s info </h1>
            <div><Button text='save' type="submit" /></div>        
            <div className='delete-btn'>
              <NavLink to={`/students/${student.id}/destroy`}>
                  <Button text='Delete' type="button" />
              </NavLink>
            </div>
          </div>
          <div className='my-10 mx-auto'>
            <Line/>
          </div>
          <div className='student-info-form mt-18 '>
            <div>
              <label htmlFor="firstName">First name</label>
              <input className='app-input' type='text' name='first_name' required defaultValue={student.first_name} />
            </div>
            <div>
              <label htmlFor="lastName"> Last name </label>
              <input className='app-input' type='text' name='last_name' required defaultValue={student.last_name} />
            </div>
            <div>
              <label htmlFor="id"> ID </label>
              <input className='app-input cursor-not-allowed' type='text' name='id' readOnly defaultValue={student.id} />
            </div>
            <div>
              <label htmlFor="branch">branch</label>
              <input className='app-input' type='text' name='branch' defaultValue={student.branch} required />
            </div>
            <div>
              <label htmlFor="email">Email </label>
              <input className='app-input' type='text' name='email' required defaultValue={student.email} />
            </div>
          </div>
        </Form>
      </div>
    </>
      }
    </div>
  )
}