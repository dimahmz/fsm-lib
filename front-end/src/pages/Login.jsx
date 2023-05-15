import { useLoaderData, useActionData, Form , redirect , useNavigation } from 'react-router-dom'
import { setCookie , getCookie  } from '../hooks/AppCookies'
import { fakeAuth } from '../../API'
import './Login.css'

export const Login = () => {

  const navigation = useNavigation()
  const error = useActionData()
  const message = useLoaderData()

  return (
    <>
      <div className='text-center mt-16'>
        {(message && !error) && <h2 className="text-red-500">{message}</h2>}
        {error && <h2 className="text-red-600">{error}</h2>} 
      </div>
      <section className='form-container'>
        <header className='text-center'>
          <h1 className='text-2xl mb-4'>Library System</h1>
          <p className='text-gray mb-4'>log to your account</p>
        </header>
        <Form className='flex-center mt-5' method='post' replace> 
          <div>
            <div className="input-container">
              <input   name="email"/>
              <label>Enter email : </label>
            </div>
            <div className="input-container">
              <input type="password" name="password" />
              <label>Enter password : </label>
            </div>
            <div className='flex-center mt-4'>
              <button className='login-btn py-2 rounded-md' disabled={navigation.state === "submitting"}>
                {navigation.state === "submitting" ? "Logging in..." : "Log in"}
              </button>
            </div>
          </div>
        </Form>
      </section>
      <footer className='bg-primary h-20 absolute inset-x-0 bottom-0 w-full'></footer>
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



