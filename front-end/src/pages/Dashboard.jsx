import Line from '../components/Line'
import { ReactComponent as StateIcon }from '../assets/icons/statistics.svg'
import './Dashboard.css'
import sleep from '../sleep'


export const  loadBooks  =  async ()=>{
  await sleep(2000)
  return 'list of books' 
}

export function rootAction(){
  console.log("im workin")
  return null
}

export default function DashBoard() {
  return (
    <>
      <h1 className="font-medium text-2xl mt-8 ml-14">Welcome back Mr. Ahmed</h1>
      <div className='my-3'><Line/></div>
      <div className='flex items-center space-x-7 ml-14'>
        <span><StateIcon/></span>
        <p>Statistics</p>
      </div>
      <div className='flex items-center space-x-4 my-2 ml-28 '>
        <section className="stats-wrapper">
          <h3 className='title'>Borrowing Stats</h3>
          <div className='stats'>
            <div>
              <p className='stat-title'>Borrowed</p>
              <p className='stat-number'>33</p>
            </div>
            <div>
              <p className='stat-title'>Overdue</p>
              <p className='stat-number'> 10</p>
            </div>
          </div>
        </section>
        <section className="stats-wrapper">
          <h3 className='title'>Students Stats</h3>
          <div className='stats'>
          <div>
              <p className='stat-title'>Active</p>
              <p className='stat-number'>33</p>
            </div>
            <div>
              <p className='stat-title'>Inactive</p>
              <p className='stat-number'>10</p>
            </div>
          </div>
        </section>
      </div>
      <div className='mt-6'><Line/></div>
      <p className='ml-14 mt-3'>Latest books</p>
    </>
  )
}
