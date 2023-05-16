import { useState } from 'react'
import './Pagination.css'
import { NavLink } from 'react-router-dom'

export default function Pagination({length, page, pages }){

  if(!page) page=1

  let paginationPages = [1,2,3,4,5]

  if(pages < 5) {
    paginationPages = [];
    for (let i = 1; i <= pages; i++) 
    paginationPages.push(i)

  }
  const [activeIndex, setPageIndex] = useState(page)

  const [pagesTab, setPagesTab] = useState(paginationPages)


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
        newPagesTab.unshift(lastIndex - (i+4))
      }
      setPagesTab([...newPagesTab])
      return
    }

  }

  return(
    <div className={`pl-4 flex-center space-x-2 ${ pagesTab.length === 1 ? 'hidePagination' : ''}`}>
      <button 
        className='previous-page-btn'
        onClick={previousPage}
      > Prev </button>
      {
         pagesTab.map((pageIndex , i) => (
          <NavLink key={i} to={`/books/?page=${pageIndex}`}>
            <button
              className={`page-number-btn ${(pageIndex) === activeIndex ? "activeBtn" : ""}`}
              onClick={() => selectPage(pageIndex)}
              >  
                {pageIndex}    

            </button>
          </NavLink>))
      }
      <button 
        className='next-page-btn'
        onClick={nextPages}
      > Next</button>
    </div>
  )
}