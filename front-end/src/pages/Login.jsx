import {  useState } from 'react'
import { useLoaderData, useActionData, Form , redirect , useNavigation } from 'react-router-dom'
import { setCookie , getCookie , removeCookie } from '../hooks/AppCookies'
import { fakeAuth } from '../../API'
import './Login.css'

export const Login = () => {

  const navigation = useNavigation()
  const error = useActionData()
  const message = useLoaderData()

  return (
    <>
    {message && <h2 className="text-red-500">{message}</h2>}
    {error && <h2 className="text-red-600">{error}</h2>}
    <h2>Login</h2>
    <Form method='post' replace> 
      <label> email : </label><br />
      <input   name="email" placeholder='john@00.domain.com'/><br/>
      <label>Password : </label><br/>
      <input type="password" name="password" placeholder='*****'/><br/>
      <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
    </Form>
    </>
  )
}

export const LoginLoader = async ({request}) => {
  if(JSON.parse(sessionStorage.getItem('authenticated'))) return redirect('/')
  return new URL(request.url).searchParams.get('message')
}

export async function action ({request})  {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")

  // handel login function
  try{
     const response = await fakeAuth({email , password})
      if (response.success){
        if(!getCookie('token'))
          setCookie('token', response.user.token, 100)
        sessionStorage.setItem('authenticated', true)
        return redirect('/')
      }
      else{
        sessionStorage.setItem('authenticated', false)
        return 'email or password is invalid'
      }
    } catch(e){
      sessionStorage.setItem('authenticated', false)
      return e.message
    }
}



