import { RouterProvider } from 'react-router-dom'
import router  from './pages/routes.jsx'
// import { useEffect, useState } from 'react'
// import Loading from './components/Loading'
import './assets/styles/main.css'
import './index.css'

function App() {
  // const auth = sessionStorage.getItem("authenticated")
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //     setLoading(false);
  // }, [auth]);  
  return (
    <>
      {/* { loading && <Loading/> } */}
        <RouterProvider router={router} />
    </>
  )
}
export default App