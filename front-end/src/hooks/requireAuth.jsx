import { redirect } from "react-router-dom"
// import axios from "axios"
import { getCookie } from "./AppCookies"
import {fakeTokenVerify} from '../../API'

export default async function RequireAuth() {
  try{
    const token = getCookie('token')
    const response = await fakeTokenVerify(token)    
    // const resp = await axios.get('/serverip/books/1',
    // { 
    //   headers: {
    //     Authorization: token,
    //   }
    // })
    if(!response.success) {
      sessionStorage.setItem("authenticated", false)
        throw redirect('/login')
    }
  }
  catch(e){
    // if(!location.pathname == '/login') 
    throw redirect('/login')
  }      
  sessionStorage.setItem("authenticated", true)
  return null 

}
