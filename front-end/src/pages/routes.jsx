// import { useAuth } from '../hooks/AuthProvider'
import requireAuth from '../hooks/requireAuth'
import { Route, createBrowserRouter,  createRoutesFromElements } from 'react-router-dom'
import { Login, LoginLoader , action as LoginAction} from './Login'
import SideBar from '../components/ui/SideBar'
import Dashboard, {rootAction} from './Dashboard'
import Students from './Students'
import { Books, booksLoader } from './Books'
import NoMatch from './NoMatch'
import sleep from '../sleep'

const router = createBrowserRouter(createRoutesFromElements(
  <>
  <Route path="/" 
    element={<SideBar />}
    loader={async () => await requireAuth()}
    action={rootAction}
  >
    <Route index 
      element={<Dashboard />}     
      loader={async () => {await sleep(2000); return null}}
    />
    <Route 
      path="books" 
      element={<Books />}
      loader={booksLoader}
    />
    <Route 
        path="books/:id" 
        element={<h1>one book </h1>}
      />
    <Route 
      path="students"
      element={<Students />} 
      loader={async () => {await sleep(2000); return null}} 
    />
  </Route>
  <Route
    path="login"
    element={<Login />} 
    loader={LoginLoader} 
    action={LoginAction}
  />
  <Route path="*" element={<NoMatch />} />
 </>
));

export default router