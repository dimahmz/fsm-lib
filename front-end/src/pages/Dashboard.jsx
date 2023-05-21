import { NavLink, useLoaderData } from 'react-router-dom'
import axios from 'axios'
import Line from '../components/Line'
import { ReactComponent as StateIcon }from '../assets/icons/statistics.svg'
import './Dashboard.css'


export const  loadStats  =  async ()=>{
  try{
    const {data}  = await axios.get("/serverip/overview/")
    console.log(data)
    return data
  }
  catch(e){
    console.log(e)
    return [null]
  }
}

export default function DashBoard() {
  const data = useLoaderData()
  return (
    <>
      <h1 className="font-medium text-2xl mt-6 ml-14">Welcome back Mr. Ahmed</h1>
      <div className='my-3'><Line/></div>
      <div className='flex items-center space-x-7 ml-14'>
        <span><StateIcon/></span>
        <p>Statistics</p>
      </div>
      <div className='flex items-center space-x-4 my-1 ml-28 '>
        {
          data.success ? (
              <><section className="stats-wrapper">
              <h3 className='title'>Borrowing Stats</h3>
              <div className='stats'>
                <div>
                  <p className='stat-title'>Borrowed</p>
                  <p className='stat-number'>{data.borrowed_books}</p>
                </div>
                <div>
                  <p className='stat-title'>Overdue</p>
                  <p className='stat-number'> {data.overdue_books}</p>
                </div>
              </div>
            </section><section className="stats-wrapper">
                <h3 className='title'>Students Stats</h3>
                <div className='stats'>
                  <div>
                    <p className='stat-title'>Active</p>
                    <p className='stat-number'>{data.active_students}</p>
                  </div>
                  <div>
                    <p className='stat-title'>Inactive</p>
                    <p className='stat-number'>{data.inactive_students}</p>
                  </div>
                </div>
              </section></>): <p className='my-10 text-red-500'>Error while syncing with database!</p>
        }
      </div>
      <div className='mt-5'><Line/></div>
      <p className='ml-14 mt-4'>Latest books</p>
      {
        !data.latest_books ? <p className="text-center text-red-500 my-16">server Error! please try again later</p> :
        <section className="my-6 mx-6 border border-gray">
          <div className="flex justify-between p-2 bg-primary text-white font-medium">
            <p>ID</p>
            <p>Title</p>
            <p>Add date</p>
            <p>Copies</p>
          </div>
          {
            data.latest_books.map((book)=> (
                <div className="bookLink text-sm text-center" key={book.id}>
                  <NavLink to={`/books/${book.id}`}>
                    <ul className="flex justify-between mx-2 py-3">
                      <li>{book.id}</li>
                      <li>{book.title}</li>
                      <li>{book.book_add_date}</li>
                      <li>{book.copies}</li>
                    </ul>
                  </NavLink>
                </div>
              )) 
          }
          </section>
        }
    </>
  )
}
