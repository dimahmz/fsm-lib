import Button from '../form/AppButton'
import './AppModal.css'


export default function MessageModal({ onClose ,message , confirm}){

  const closeModal = (e) => { onClose(e) }

  return(

  <div  className='modal-bg' onClick={closeModal}>
    <section className='modal-content'>
        <p> {message} </p>
        <span onClick={closeModal}>
          <Button text={confirm}/>
        </span>
    </section>
  </div>
  )
}