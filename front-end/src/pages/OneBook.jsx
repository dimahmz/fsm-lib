import { useParams , useActionData , useNavigation, redirect } from 'react-router-dom'
import BackBtn from '../components/BackBtn'
import Line from '../components/Line'
import Button from '../components/AppButton'
import AppModal from '../components/FormModal'
import DeleteModal  from '../components/DeleteModal'
import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg'
import { ReactComponent as GetFileIcon } from '../assets/icons/getFile.svg'
import { ReactComponent as SendFileIcon } from '../assets/icons/sendFile.svg'
import { useState } from 'react'
import { getCookie } from '../hooks/AppCookies'
import { fakeBookBorrow } from '../../API'
import Loading from '../components/Loading'
import SLEEP from '../sleep.js'

// import MessageModal from '../components/MessageModel'


export default function OneBook() {

  // const response = useActionData()
  
  const navigation = useNavigation()
  
  const {id }= useParams()
  
  const [ displayModals , setModalsDisplay ]= useState([false,false,false])

  const updateValue = (index) => {
    const updatedTab = [...displayModals]
    updatedTab.forEach((ele , i ) => {
      if (i!= index) updatedTab[i] = false 
      else updatedTab[i] = ! ele
    })
    setModalsDisplay(updatedTab); 
  }

  const toggeleModal = (index) => {updateValue(index)}

  return (
    <>
      <span className="mt-3">
        <BackBtn />
      </span>
      <h1 className="my-10">book&rsquo;s id is {id}</h1>
      <Line className="my-4"/>
      <div className="flex justify-evenly">
        <span onClick={() => toggeleModal(0)}>
          <Button 
            icon={<SendFileIcon/>}
            text="Borrow to a student"
          />
        </span>
        <span onClick={() => toggeleModal(0)}>
          <Button
            icon={<GetFileIcon/>} 
            text="received"
          />
        </span>
        <span onClick={() => toggeleModal(2)}>
          <Button 
            icon={<DeleteIcon/>} 
            text="delete"
          />
        </span>
      </div>

      { 
        displayModals[0] &&
        <AppModal onClose={() => toggeleModal(0)} action='borrow'/> } 
      {
         displayModals[2]  &&
        <DeleteModal onClose={() => toggeleModal(2)} name='book' action='receive'/> 
      } 

      {/* { response && <MessageModal message={response.message} confirm="close"/>} */}

      { navigation.state === "submitting" && <Loading/> }

    </>
  )
}


export async function bookLoader(){
  await SLEEP(1000)
  return null

}

export async function deleteBook({ params }) {
  console.log(params)
  await SLEEP(2000)
  return redirect(`/books`)
}

export async function receiveBook({ params }) {
  await SLEEP(2000)
  return redirect(`/books/${params.id}`)
}

export async function borrowBook({ request , params }) {

  const formData = await request.formData()
  const ID = formData.get("email")
  const lastName = formData.get("password")
  const  firstName = formData.get("email")
  const branch = formData.get("password")
  
  // handel borrowing a book function
  const token = getCookie('token')
  const res = await fakeBookBorrow(token , {ID ,lastName , firstName , branch })
  return res
}
