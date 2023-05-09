import { Form , redirect, useNavigation} from 'react-router-dom'
import '../assets/styles/dashboard.css'
import sleep from '../sleep'


export const  loadBooks  =  async ()=>{
  await sleep(2000)
  return 'list of books' 
  // if(!sessionStorage.getItem('authenticated')) {
  //   throw redirect('/login?message=you must login first:')
  // }
}

export function rootAction(){
  console.log("im workin")
  return null
}


export default function DashBoard() {
  return (
    <>
      <div id="detail">
        <h1>DashBorad</h1>
      </div>
    </>
  )
}
