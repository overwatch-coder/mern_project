import React from 'react'

const Pagination = ({ postsPerPage, totalPosts, setCurrentPage}) => {
    let pages = [];
    for (let page = 1; page <= Math.ceil(totalPosts / postsPerPage); page++) {
        pages.push(page);
    }
  return (
    <div className='text-center mx-auto my-5'>
        {pages?.map((page, index) => (
            <button 
                key={index} className="bg-slate-800 text-white px-4 py-3 rounded mx-2 hover:bg-slate-700 hover:scale-105"
                onClick={() => setCurrentPage(page)}
            >
                {page}
            </button>
        ))}
    </div>
  )
}

export default Pagination