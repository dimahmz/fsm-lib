import { useLoaderData , Form, NavLink } from "react-router-dom"
import axios from "axios"
import Button from "../components/AppButton"
import  { ReactComponent as PlusIcon }  from '../assets/icons/plus.svg'
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg"
import Pagination from "../components/Pagination"
import Line from "../components/Line"
import './Books.css'

export async function booksLoader({request}){
  const page = new URL(request.url).searchParams.get('page')?.trim()
  const type = new URL(request.url).searchParams.get('type')?.trim() 
  const title = new URL(request.url).searchParams.get('title')?.trim()
  let searchParameters = ""
  if(page && page !=='')
    searchParameters+=`&page=${page}`
  if(type && type !=='' )
    searchParameters+=`&type=${type}`
  if(title && title !=='')
    searchParameters+=`&title=${title}`

  if(searchParameters!='') searchParameters='?'+searchParameters
  
  try{
    const  { data }  = await axios.get(`/serverip/books/${searchParameters}`)
    return data
  }
  catch(e) {
    console.log(e)
    return[null]
  }
}
export function Books() {

  const page = Number (new URL(location.href ).searchParams.get('page'))  
  const msg = Number (new URL(location.href ).searchParams.get('msg'))
  
  console.log(page,msg)

  const data  =  useLoaderData()
  if(msg) window.alert(msg)

  // @thoughts
  window.history.pushState("","","/books")

  return (
    <>
      <Form role='search'>
        <div className="ml-24 flex items-center space-x-24 mt-10">
            <label htmlFor="title" hidden>search input</label>
            <input type="text" className="app-input h-8 w-72"  name="title"/>
            {/* onChange={(e)=> {submit(e.currentTarget.form)}} */}
          <div className="flex-center space-x-10">
          <div className="select-menu">
            <select className="py-2 px-3 " name="type">
              <option value="" defaultValue >Any</option>
              <option value="maths">Maths</option>
              <option value="biology">Biology</option>
              <option value="chemistry">Chemistry</option>
            </select>
          </div>
            <button className="p-2 bg-primary rounded-lg" type="submit"> <SearchIcon /> </button>
          </div>
        </div>
      </Form>
      <div className="my-6"> <Line /> </div>
      <NavLink to="addabook" className="inline-block ml-8 my-1">
          <Button icon={<PlusIcon/>} text="Add a book"/>
        </NavLink>
      <NavLink to="/books" className="inline-block ml-8 my-1">
        <Button text="Refresh"/>
      </NavLink>
      {/* onChange={(e)=> {submit(e.currentTarget.form)}} */}
      <section id="data-table" className="text-center mt-5 mx-6 border border-gray">
        <div className="flex justify-between p-3 bg-primary text-white font-medium">
          <p>ID</p>
          <p>Title</p>
          <p>Author</p>
          <p>Year</p>
          <p>Type</p>
          <p>Copies</p>
        </div>
          {
            data.results ? data.results.length == 0 ? <p className="text-center my-8">Sorry, this book isn't available!</p> :
            data.results.map((book)=> (
                <div className="bookLink" key={book.id}>
                  <NavLink to={`/books/${book.id}`} key={book.id}>
                    <ul className="flex justify-between mx-2 py-3 text-xs" key={book.id}>
                      <li>{book.id}</li>
                      <li>{book.title.substr(0,15)}...</li>
                      <li>{book.author_name.substr(0,15)}</li>
                      <li>{book.language}</li>
                      <li>{book.book_type.substr(0,15)}</li>
                      <li>{book.copies}</li>
                   </ul>
                  </NavLink>
                </div>
              )) : <p className="text-center my-8">server Error! please try again later</p> 
          }
      </section>
      { 
       (data.results && data.count > 5) &&
        <footer className="relative flex-center">  
          <Pagination length={data.results.length} record="books" page={page} pages={data.count} />
        </footer>
      }
    </>
  )
}