import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useSelector, useDispatch } from 'react-redux';
import { changePage } from '../features/all-jobs/allJobsSlice';

const PageBtnContainer=()=>{
    const { numOfPages, page } = useSelector((store) => store.allJobs); 
    const dispatch= useDispatch()

    // We shall use this array to display buttons
    const pages= Array.from({length:numOfPages},(item,index)=>{
        return index+1;
    })
    const nextPage=()=>{
       dispatch(changePage((page%numOfPages)+1)); // As the pages are 1 indexed, the method of calculation is slightly different
    }
    const prevPage=()=>{
        if(page-1<1){
            dispatch(changePage(numOfPages))
            return;
        }
        dispatch(changePage(page-1));
    }

    // Here, the server sends 10 jobs per page. Therefore, we only need to request a different page.
    return <Wrapper>
      <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber) => {
          return (
            <button
              type='button'
              className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
              key={pageNumber}
              onClick={()=>dispatch(changePage(pageNumber))}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className='next-btn' onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
}

export default PageBtnContainer;