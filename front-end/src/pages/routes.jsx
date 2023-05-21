import { Route, createBrowserRouter,  createRoutesFromElements } from 'react-router-dom'
import { Login, LoginLoader , action as LoginAction} from './Login'
import SideBar from '../components/SideBar'
import Dashboard, { loadStats } from './Dashboard'
import { Books, booksLoader } from './Books'
import AddBook , { addAbookAction } from './AddBook'
import OneBook , { bookLoader ,  deleteBook , receiveBook , borrowBook } from './OneBook'
import Students ,{studentsLoader} from './Students'
import OneStudent, {studentLoader , deleteStudent, updateStudent} from './OneStudent'
import AddStudent, { addAstudent } from './AddStudent'
import NoMatch from './NoMatch'
import requireAuth from '../hooks/requireAuth'
// import sleep from '../sleep'


const router = createBrowserRouter(createRoutesFromElements(
  <>
  <Route path="/" 
    element={<SideBar />}
    loader={async () => await requireAuth()}
    >
    <Route index 
      element={<Dashboard />}     
      loader={loadStats}
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
        errorElement={<div>Oops! There was an error.</div>}
      />
       <Route 
        path="receive" 
        action={receiveBook}
      />
       <Route 
        path="borrow" 
        action={borrowBook}
      />
    </Route>
    <Route 
        path="books/addabook" 
        element={<AddBook />}
        action={addAbookAction}
      />

    <Route 
      path="students"
      element={<Students />} 
      loader={studentsLoader} 
    />
    <Route 
      path="students/:id"
      element={<OneStudent />} 
      loader={studentLoader} 
      action={updateStudent}
    />
    <Route 
      path="students/:id/destroy"
      loader={deleteStudent} 
    />
     <Route 
      path="students/addastudent"
      element={<AddStudent />} 
      action={addAstudent}
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