import { Form } from 'react-router-dom'
import BackBtn from "../components/BackBtn"
import Line from '../components/Line'
import Button from '../components/AppButton'
import './AddBook.css'

export default function AddBook(){
  return(
    <>
      {/* <div>
        <BackBtn />
      </div> */}
      <h1 className='m-10 font-semibold text-xl text-center'>Add  a book </h1>
      <Line/>
      <Form className="inline-block pb-10" method="get">
        <div className='add-book-form ml-28 mt-5 '>
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
    </>
  )
}