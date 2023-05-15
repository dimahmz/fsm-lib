import requireAuth from '../hooks/requireAuth'
import { Route, createBrowserRouter,  createRoutesFromElements } from 'react-router-dom'
import { Login, LoginLoader , action as LoginAction} from './Login'
import SideBar from '../components/SideBar'
import Dashboard, {rootAction} from './Dashboard'
import Students from './Students'
import { Books, booksLoader } from './Books'
import OneBook , { bookLoader ,  deleteBook , receiveBook , borrowBook } from './OneBook'
import NoMatch from './NoMatch'
import AddBook from './AddBook'
import sleep from '../sleep'


const router = createBrowserRouter(createRoutesFromElements(
  <>
  <Route path="/" 
    element={<SideBar />}
    loader={async () => await requireAuth()}
    action={rootAction}>
    <Route index 
      element={<Dashboard />}     
      loader={async () => {await sleep(0); return null}}
    />
    <Route 
      path="books" 
      element={<Books />}
      loader={booksLoader}
    />
    <Route 
        path="books/:id" 
        element={<OneBook />}
        loader={bookLoader}
    >
      <Route 
        path="destroy" 
        action={deleteBook}
        element={<h1>deleting</h1>}
      />
       <Route 
        path="receive" 
        action={receiveBook}
        element={<h1>deleting</h1>}
      />
       <Route 
        path="borrow" 
        action={borrowBook}
        element={<h1>deleting</h1>}
      />
    </Route>
    <Route 
        path="books/addabook" 
        element={<AddBook />}
      />

    <Route 
      path="students"
      element={<Students />} 
      loader={async () => {await sleep(0); return null}} 
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