import { redirect } from "react-router-dom"
import { fakeTokenVerify } from '../../API'
import { getCookie } from './AppCookies'

export default async function RequireAuth() {
  const token = getCookie('token')
  try{
    const resp = await fakeTokenVerify(token)
    if(!resp.success) {
      sessionStorage.setItem("authenticated", false)
      throw redirect('/login?message=you must login')
    }
  }
  catch(e){
    return e
  }      
  sessionStorage.setItem("authenticated", true)
  return null 

}