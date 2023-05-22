import {useLoaderData , useNavigation, redirect, Form  } from 'react-router-dom'
import axios from '../../axios'
import BackBtn from '../components/BackBtn'
import Line from '../components/Line'
import Button from '../components/AppButton'
import AppModal from '../components/FormModal'
import DeleteModal  from '../components/DeleteModal'
import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg'
import { ReactComponent as GetFileIcon } from '../assets/icons/getFile.svg'
import { ReactComponent as SendFileIcon } from '../assets/icons/sendFile.svg'
import { useState } from 'react'
import Loading from '../components/Loading'
import './OneBook.css'

export async function bookLoader({params}){
  try{
    const { data : { Book } } = await axios.get(`/serverip/books/${params.id}/`)
    return Book
  }
  catch(e) {
    if(e?.response?.data) console.log(e.response.data)
    else console.log(e)
    return null
  }
}

export default function OneBook() {
  
  const Book = useLoaderData()
  
  const msg = Number (new URL(location.href ).searchParams.get('msg'))  

  if(msg) window.alert(msg)
  if(Book)  window.history.pushState("","",`/books/${Book.id}`)

  const navigation = useNavigation()  
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
      <span className="inline-block mt-8 ml-12 ">
        <BackBtn page="/books"/>
      </span>
       {
       !Book ? <div className='mt-10 mx-auto'>
                  <img src="../../public/bookNotFound.jpg" alt="image for a book not found" />
                </div> : 
       <>
       <section className='book-info flex space-x-9 bg-white my-6 px-2 py-4 rounded-sm'>  
          <div>
            <img 
              className='max-w-xs max-h-64'
              src={Book.cover_image ? Book.cover_image : '/noBookImg.png'} 
              alt="Book's cover image" 
            />
          </div>
          <div className='w-5/6 flex space-x-36'>
            <div className='flex flex-col space-y-2 '>
              <p>Title</p>
              <p>ISBN</p>
              <p>Author</p>
              <p>Type</p>
              <p>Language</p>
              <p>publisher</p>
              <p>Copies</p>
              <p>Added at</p>
            </div>
            <div className='flex flex-col space-y-2 text-meduim-color font-medium'>
              <h1 className='text-2xl'>{Book.title}</h1>
              <p>{Book.isbn_issn}</p>
              <p>{Book.author_name}</p>
              <p>{Book.book_type}</p>
              <p>{Book.language}</p>
              <p>{Book.publisher}</p>
              <p>{Book.copies}</p>
              <p>{Book.book_add_date} </p>
            </div>
          </div>
      </section>
      <div className="my-6">
        <Line />
      </div>
      <div className="flex justify-evenly">
        <span onClick={() => toggeleModal(0)}>
          <Button 
            icon={<SendFileIcon/>}
            text="Borrow book"
          />
        </span>
        <span onClick={() => toggeleModal(1)}>
          <Button
            icon={<GetFileIcon/>} 
            text="Return book"
            />
        </span>
        <span onClick={() => toggeleModal(2)}>
          <Button 
            icon={<DeleteIcon/>} 
            text="Delete"
            />
        </span>
      </div>
      { 
        displayModals[0] &&
        <AppModal onClose={() => toggeleModal(0)} action='borrow'/> 
      } 
      { 
        displayModals[1] &&
        <AppModal onClose={() => toggeleModal(1)} action='receive'/> } 
      {
         displayModals[2]  &&
        <DeleteModal onClose={() => toggeleModal(2)} name='book' action="destroy"/> 
      } 

      {/* { response && <MessageModal message={response.message} confirm="close"/>} */}

      { navigation.state === "submitting" && <Loading/> }
      </>}
    </>
  )
}

export async function deleteBook({ params }) {
  try{
  const {data} = await axios.delete(`/serverip/delete_book/${params.id}/`)
  if (data.success) {
    return redirect(`/books/?msg=The book with The Id : ${params.id} has been deleted!`)
    }
  }
  catch(e){
      console.log(e) 
  }
  return redirect(`/books/${params.id}/?msg=Error!the book can't be deleted.`)
}

export async function borrowBook({ request , params }) {
  
  const formData = await request.formData()
  const student_id = formData.get("student_id")
  try{
    const {data} = await axios.post("/serverip/borrow_book/", {student_id , "book_id" : params.id})  
    console.log(data)
    window.alert(data.message)
    return redirect(`/books/${params.id}`)
  }
  catch(e){
    const { response : { data } }    = e 
    if(data){
      window.alert(data.message)
      return redirect(`/books/${params.id}`)
    }
    window.alert("A server Error please try again later!")
    return  redirect(`/`)
    }
    
}


export async function receiveBook({ request , params }) {
  
  const formData = await request.formData()
  const student_id = formData.get("student_id")
  try{
    const {data} = await axios.post("/serverip/return_book/", {student_id , "book_id" : params.id})  
    window.alert(data.message)
    if(data.success){
      return redirect(`/books/${params.id}`)
    }
    return null
  }
  catch(e){
    const {response : {data } } = e 
    if(data){
      window.alert(data.message)
      return redirect(`/books/${params.id}`)
    }
    else{
      window.alert("A server Error please try again later!")
      return  redirect(`/`)
    }
  }

}
