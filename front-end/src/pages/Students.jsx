import { useLoaderData , Form, NavLink} from "react-router-dom"
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg"
import axios from "../../axios"
import Button from "../components/AppButton"
import Pagination from "../components/Pagination"
import Line from "../components/Line"
import  { ReactComponent as PlusIcon }  from '../assets/icons/plus.svg'
import './Students.css'

export async function studentsLoader({ request }){

  const page = new URL(request.url).searchParams.get('page')?.trim()  
  const first_name = new URL(request.url).searchParams.get('first_name')?.trim()
  const last_name = new URL(request.url).searchParams.get('last_name')?.trim() 
  const id = new URL(request.url).searchParams.get('id')?.trim() 
  const branch = new URL(request.url).searchParams.get('branch')?.trim()
  console.log(page,first_name,last_name,id,branch)
  //setting the query parameters
  let searchParameters = ""
  if(page && page !=='')
    searchParameters+=`&page=${page}`
  if(first_name && first_name !=='' )
    searchParameters+=`&first_name=${first_name}`
  if(last_name && last_name !=='')
    searchParameters+=`&last_name=${last_name}`
  if(branch && branch !=='')
    searchParameters+=`&branch=${branch}`
  if(id && id!=='')
    searchParameters+=`&id=${id}`

    

  if(searchParameters!='') searchParameters='?'+searchParameters

  // fetch the books from the back-end 
  try{
    const { data } = await axios.get(`/serverip/students/${searchParameters}`)
    const msg = new URL(request.url).searchParams.get('msg')
    if(msg)
      window.alert(msg)
      return data
    }
    catch(e) {
      console.log(e)
      return[null]
    }
  }
  


  export default function Students() {
    
    const page = Number (new URL(location.href ).searchParams.get('page'))
    
    const data =  useLoaderData()
    
    window.history.pushState("","","/students")
    
  return (
    <>
      <Form method='get' >
        <div className="flex items-center ml-8 mt-6 md:ml-0 md:justify-center space-x-7  text-center">
            <div className="filter-input">
              <label htmlFor="branch">Branch</label>
              <input type="text" className="app-input h-8 w-20" name="branch" />
            </div>   
            <div className="filter-input" >
              <label htmlFor="id">ID</label>
              <input type="text" className="app-input h-8 w-20" name="id" />
            </div >   
            <div className="filter-input">
              <label htmlFor="firsName">first name</label>
              <input type="text" className="app-input h-8 w-20" name="first_name" />
            </div>   
            <div className="filter-input" >
              <label htmlFor="lastName">last name</label>
              <input type="text" className="app-input h-8 w-20" name="last_name" />
            </div>   
            <div className="flex-center pt-5">
              <button className="p-2 bg-primary" type="submit"> <SearchIcon /> </button>
            </div>
          </div>       
      </Form>
      <div className="my-6"> <Line /> </div>
        <NavLink to="addastudent" className="inline-block ml-8 my-1">
          <Button icon={<PlusIcon/>} text="Add a Student"/>
        </NavLink>
        <NavLink to="/students" className="inline-block ml-8 my-1">
          <Button text="Refresh"/>
      </NavLink>
      <section id="data-table" className="my-5 mx-6 border border-gray">
        <div className="flex justify-between p-3 bg-primary text-white font-medium">
          <p>ID</p>
          <p>Branch</p>
          <p>First name</p>
          <p>Last name</p>
        </div>
          {
           data.results ? data.results.length == 0 ? <p className="text-center font-medium text-xl my-8">Sorry, this student doesn't exist!</p> :
            data.results.map((student)=> (
                <div className="bookLink" key={student.id}>
                  <NavLink to={`/students/${student.id}`}>
                    <ul className="flex justify-between mx-2 py-3 text-sm">
                      <li>{student.id}</li>
                      <li>{student.branch}</li>
                      <li>{student.first_name}</li>
                      <li>{student.last_name}</li>
                    </ul>
                  </NavLink>
                </div>
              )) : <p className="text-center my-8">server Error! please try again later</p> 
          }
      </section>
      { 
       (data.results && data.count > 5) &&
        <footer className="relative flex-center">  
          <Pagination length={data.results.length} record="students" page={page} pages={data.count} />
        </footer>
      }
    </>
  )
}