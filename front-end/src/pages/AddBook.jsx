import { Form } from 'react-router-dom'
import BackBtn from "../components/BackBtn"
import Line from '../components/Line'
import Button from '../components/AppButton'
import './AddBook.css'

export default function AddBook(){
  return(
    <div className="mb-16">
      <BackBtn />
      <h1 className='m-10'>Add  a book </h1>
      <Line/>
      <Form method="post">
        <div className='add-book-form'>
          <div>
            <label htmlFor="title"> title</label>
            <input type='text' name='title' />
          </div>
          <div>
            <label htmlFor="title"> title</label>
            <input type='text' name='title' />
          </div>
          <div>
            <label htmlFor="title"> title</label>
            <input type='text' name='title' />
          </div>
          <div>
            <label htmlFor="title"> title</label>
            <input type='text' name='title' />
          </div>
          <div>
            <label htmlFor="title"> title</label>
            <input type='text' name='title' />
          </div>
          <div>
            <label htmlFor="title"> title</label>
            <input type='text' name='title' />
          </div>
          <div>
            <label htmlFor="title"> title</label>
            <input type='text' name='title' />
          </div>
        </div>
          <div className="flex mt-10 justify-end mr-32">
            <Button text='Add' type="submit" />
          </div>
      </Form>
    </div>
  )
}