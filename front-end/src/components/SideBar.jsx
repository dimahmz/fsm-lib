import { NavLink, Outlet, useLoaderData, useNavigate, useNavigation} from "react-router-dom"
import Loading from "./Loading"
import { removeCookie } from "../hooks/AppCookies"
import  { ReactComponent as  HouseIcon }  from  '../assets/icons/house.svg'
import  { ReactComponent as BooksIcon }  from  '../assets/icons/books.svg'
import  { ReactComponent as StudentIcon }from  '../assets/icons/student.svg'
import  { ReactComponent as LogoutIcon }from  '../assets/icons/logout.svg'
import './sideBar.css'


export default  function SideBar() {

    useLoaderData() 
    const navigate = useNavigate()
    const navigation = useNavigation();

    const onLogout  = () => {
      removeCookie('token'); 
      sessionStorage.removeItem('authenticated')
      navigate('/login') 
    }

    
  return (
    <>      
      <aside className="fixed inset-0 py-14 bg-primary h-screen w-48 text-white
       flex flex-col justify-between">
        <nav className="flex flex-col space-y-8 ">
          <NavLink 
            className={({ isActive}) => isActive ? "active" : "" } 
            to='/'>
            <div className="flex space-x-3 pl-6">
                <HouseIcon/>
                <p>Overview</p>
            </div>
          </NavLink>
          <NavLink 
            className={({ isActive}) => isActive ? "active" : "" } 
            to='/books'>
            <div className="flex space-x-3 pl-6">
                <BooksIcon/>
                <p>Books</p>
            </div>
          </NavLink>
          <NavLink 
              className={({ isActive}) => isActive ? "active" : "" } 
              to='/students'>
            <div className="flex space-x-3 pl-6">
                <StudentIcon className="ng-primary"/>
                <p>Students</p>
            </div>
          </NavLink>
        </nav>
        <nav>
          <button className="ml-6 flex logout-btn" onClick={onLogout}>
            <div className="flex-center space-x-6">
                <LogoutIcon/>
                <p>log out</p>
            </div>
          </button>
        </nav>
      </aside>
      <main className="ml-48">
        { ( navigation.state != "submitting" && navigation.state === "loading") && <Loading/> }
        <Outlet />
      </main>
    </>

  )
}