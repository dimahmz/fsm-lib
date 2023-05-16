import { useLoaderData , useSearchParams , useParams, Form, NavLink} from "react-router-dom"
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg"
import { fakeBooks } from "../../API"
import { getCookie } from "../hooks/AppCookies" 
import Button from "../components/AppButton"
import Pagination from "../components/Pagination"
import Line from "../components/Line"

import  { ReactComponent as PlusIcon }  from '../assets/icons/plus.svg'
import './Books.css'

export async function booksLoader({request , params}){

  // const page = new URL(request.url).searchParams.get('page') 
  // const {title , type } = params
  // console.log(params, page, type , title)
  // console.log(params)
  

  // try{
  //   const response = await fakeBooks(getCookie('token'))
  //   return response
  // }
  // catch(e) {
  //   return e
  // }
  return [null]
}

export function Books() {

  const page = Number (new URL(location.href ).searchParams.get('page'))
  
  const data =  useLoaderData()

  return (
    <>
      <Form method='post' >
        <div className="flex items-center justify-around mt-6">
          <div className="select-menu">
            <select className="py-2 px-3 " name="type">
              <option value="a">aaaaaa</option>
              <option value="b">bbbbbb</option>
              <option value="b">cccccc</option>
              <option value="" defaultValue >any</option>
            </select>
          </div>
          <div className="flex-center space-x-2">
            <label htmlFor="title" hidden>search input</label>
            <input type="text" className="app-input h-8 w-72" name="title" />
            <button className="p-2 bg-primary" type="submit"> <SearchIcon /> </button>
          </div>
        </div>
      </Form>
      <div className="my-6"> <Line /> </div>
        <NavLink to="addabook" className="inline-block ml-8 my-1">
          <Button icon={<PlusIcon/>} text="Add a book"/>
        </NavLink>
      <section id="books-table" className="mt-5 mx-6 border border-gray">
        <div className="flex justify-between p-3 bg-primary text-white font-medium">
          <p>ID</p>
          <p>Title</p>
          <p>Author</p>
          <p>Year</p>
          <p>Type</p>
          <p>Copies</p>
        </div>
          {
            data.success ?
            data.books.map((book)=> (
                <div className="bookLink" key={book.id}>
                  <NavLink to={`/books/${book.id}`}>
                    <ul className="flex justify-between mx-2 py-3">
                      <li>{book.id}</li>
                      <li>{book.title}</li>
                      <li>{book.author}</li>
                      <li>{book.publishedYear}</li>
                      <li>{book.type}</li>
                      <li>{book.leftCopies}/{book.totalCopies}</li>
                    </ul>
                  </NavLink>
                </div>
              )) : <p className="text-center my-8">{data.error}</p> 
          }
      </section>
      { 
       data.success && 
        <footer className="mt-10">  
          <Pagination length={data.books.length} page={page} pages={12} />
        </footer>
      }
    </>
  )
}