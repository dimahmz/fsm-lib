import { NavLink, Outlet, useLoaderData, useNavigate, useNavigation} from "react-router-dom"
import  { ReactComponent as  HouseIcon }  from '../../assets/icons/house.svg'
import  { ReactComponent as BooksIcon }  from '../../assets/icons/books.svg'
import  { ReactComponent as StudentIcon }from '../../assets/icons/student.svg'
import  { ReactComponent as LogoutIcon }from '../../assets/icons/logout.svg'
import { removeCookie } from "../../hooks/AppCookies"

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
      <section className="absolute pt-14 bg-primary h-screen w-48 text-white">
        <nav className="flex flex-col space-y-4">
          <NavLink 
            className={({ isActive}) => isActive ? "active" : "" } 
            to='/'>
            <div className="flex-center space-x-6">
                <HouseIcon/>
                <p>Overview</p>
            </div>
          </NavLink>
          <NavLink 
            className={({ isActive}) => isActive ? "active" : "" } 
            to='/books'>
            <div className="flex-center space-x-6">
                <BooksIcon/>
                <p>Books</p>
            </div>
          </NavLink>
          <NavLink 
              className={({ isActive}) => isActive ? "active" : "" } 
              to='/students'>
            <div className="flex-center space-x-6">
                <StudentIcon className="ng-primary"/>
                <p>Students</p>
            </div>
          </NavLink>
        </nav>
        <nav>
          <button onClick={onLogout}>
            <div className="flex-center space-x-6">
                <LogoutIcon/>
                <p>log out</p>
            </div>
          </button>
        </nav>
      </section>
      <main>
      <div 
        className={ navigation.state === "loading" ? "full-loading-bg" : ""}>
          <div className="loader"></div>
      </div>
      <Outlet />
      </main>
    </>

  )
}