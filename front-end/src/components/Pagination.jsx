import { useState } from 'react'
import './Pagination.css'

export default function Pagination({length, page}){
  const pages=7

  const [activeIndex, setPageIndex] = useState(1)

  const [pagesTab, setPagesTab] =useState([1,2,3,4,5])

  const selectPage = (i) =>{
      setPageIndex(i)
  }

  const nextPages = () =>{
    const lastIndex = pagesTab[pagesTab.length-1]

    if(lastIndex == pages) return 

    const newPagesTab = []
    if(lastIndex + 5 <= pages) {
      for (let i = 1; i <= 5 ; i++) 
        newPagesTab.push(lastIndex + i)
      setPagesTab([...newPagesTab])
      return
    }

    for (let i = 1; lastIndex + i <= pages ; i++) 
      newPagesTab.push(lastIndex + i)
    setPagesTab([...newPagesTab])

  } 
  
  const previousPage = () =>{
    const lastIndex = pagesTab[pagesTab.length-1]
    
    if(lastIndex - 5 <= 0 ) return 
    const newPagesTab = []
    if( lastIndex - 5 > 0 ) {
      for (let i = 1; i <= 5 ; i++) {
        if(lastIndex - (i+4) <= 0) break
        newPagesTab.push(lastIndex - (i+4))
      }
      setPagesTab([...newPagesTab])
      return
    }

  }


  return(
    <div className='pl-4 flex-center space-x-2'>
      <button 
        className='previous-page-btn'
        onClick={previousPage}
      > Prev </button>
      {
         pagesTab.map((pageIndex , i) => (
           <button
            key={i}
            className={`page-number-btn ${(pageIndex) === activeIndex ? "activeBtn" : ""}`}
            onClick={() => selectPage(pageIndex)}
            >  
              {pageIndex}            
            </button>))
      }
      <button 
        className='next-page-btn'
        onClick={nextPages}
      > Next</button>
    </div>
  )
}