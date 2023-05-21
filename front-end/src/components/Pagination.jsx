import { useState } from 'react'
import './Pagination.css'
import { NavLink } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
export default function Pagination({ page, pages, record }){

  // calculates the number of pages in the pagination
  const pages_number = () => {
    let count = ~~(pages / 5)
    if( pages % 5 != 0)
      count++
    return count
  } 

  if(!page) page=1

//the default pages number
  let paginationPages = [1,2,3,4,5]

  if(pages_number() < 5) {
    paginationPages = [];
    for (let i = 1; i <= pages_number(); i++) 
    paginationPages.push(i)
  }

  // style active page number 
  const [activeIndex, setPageIndex] = useState(page)

  const [pagesTab, setPagesTab] = useState(paginationPages)

  const selectPage = (i) =>{ setPageIndex(i)}

  // controle the pagination
  const nextPages = () =>{
    const lastIndex = pagesTab[pagesTab.length-1]

    if(lastIndex == pages_number()) return 

    const newPagesTab = []
    if(lastIndex + 5 <= pages_number()) {
      for (let i = 1; i <= 5 ; i++) 
        newPagesTab.push(lastIndex + i)
      setPagesTab([...newPagesTab])
      return
    }

    for (let i = 1; lastIndex + i <= pages_number() ; i++) 
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
    //  className={`pl-4 flex-center space-x-2 ${ pagesTab.length === 1 ? 'hidePagination' : ''}`}
    <div className='space-x-2 fixed bottom-10 '>
      <button 
        className='previous-page-btn'
        onClick={previousPage}
      > Prev </button>
      {
         pagesTab.map((pageIndex , i) => (
          <NavLink key={i} to={`/${record}/?page=${pageIndex}`}>
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