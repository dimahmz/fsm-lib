import { useLoaderData , Form} from "react-router-dom"
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg"
import { fakeBooks } from "../../API"
import { getCookie } from "../hooks/AppCookies" 

export async function booksLoader(){
  try{
    const response = await fakeBooks(getCookie('token'))
    if(!response.success) return response.error
    return response.books
  }
  catch(e) {
    return e
  }
}

export function Books() {
  const books =  useLoaderData()
  return (
    <>
      <Form>
        <label htmlFor="book-type">Book&apos;s type</label> <br />
        <select name="book-type">
          <option value="a">a</option>
          <option value="b">b</option>
          <option value="b">c</option>
          <option value="" defaultValue >any</option>
        </select>
        <label htmlFor="search-input" hidden>search input</label>
        <input type="text" name="search-input" />
        <button> <SearchIcon className="bg-primary" /> </button>
      </Form>
      <section>
        {
          books.map((book)=> (
            <ul key={book.id} >
              <li>{book.title}</li>
              <li>{book.author}</li>
              <li>{book.publishedYear}</li>
            </ul>
          )
          )
        }
      </section>
    </>
  )
}