import { Form, redirect } from 'react-router-dom'
import axios from '../../axios'
import Line from '../components/Line'
import Button from '../components/AppButton'
import BackBtn from '../components/BackBtn'
import './AddBook.css'

export async function addAbookAction({ request  }) {
  const formData = await request.formData(),
    title = formData.get("title"),
    author_name = formData.get("author_name"),
    book_type = formData.get("book_type"),
    publisher =  formData.get("publisher"),
    language =  formData.get("language"),
    isbn_issn =  formData.get("isbn_issn"),
    format =  formData.get("format")

    try{
      const { data }  = await  axios.post('/serverip/add_book/', 
      [{title,author_name,book_type,publisher,language,isbn_issn,format}])
      if(data.success)
        return redirect(`/books/${data.book[0].id}`)
      else {
        console.log(data.error)
        window.alert("Author & Title must be unique!")
        return data
      }
    }
    catch(e){
      console.log(e)
      window.alert("server error! please try again later.")
      return null
    }
  }


export default function AddBook(){

  
  return(
    <>
      <div className='my-5 flex ml-20 space-x-32'>
        <BackBtn />
        <h1 className=' font-semibold text-xl'>Add  a book </h1>
      </div>
      <Line/>
      <Form className="inline-block pb-10" method="post">
        <div className='add-book-form grid grid-cols-2 gap-x-24 ml-28 mt-5 text-sm'>
          <div>
            <label htmlFor="title"> Title</label>
            <input className="app-input" type='text' required defaultValue="test1" name='title' />
          </div>
          <div>
            <label htmlFor="author_name"> Author name</label>
            <input className="app-input" type='text' required defaultValue="test1" name='author_name' />
          </div>
          <div>
            <label htmlFor="book_type"> Type </label>
            <input className="app-input" type='text' required defaultValue="test1" name='book_type' />
          </div>
          <div>
            <label htmlFor="publisher"> Publisher </label>
            <input className="app-input" type='text' required defaultValue="test1" name='publisher' />
          </div>
          <div>
            <label htmlFor="language"> Language</label>
            <input className="app-input" type='text' required defaultValue="test1" name='language' />
          </div>
          <div>
            <label htmlFor="isbn_issn"> ISBN </label>
            <input className="app-input" type='text' defaultValue="test1" name='isbn_issn' />
          </div>
          <div>
            <label htmlFor="format"> Format </label>
            <input className="app-input" type='text' defaultValue="test" name='format' />
          </div>
        </div>
          <div className="mt-10 ml-32">
            <Button text='Add' type="submit" />
          </div>
      </Form>
    </>
  )
}