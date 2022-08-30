import React from 'react';
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js'

const ShowPost = ({ post }) => {
    const path = window.location.pathname;
    
    let excerpt = '';
    
    if(post.description.length > 80) {
        excerpt = post.description.substring(0, 80) + '...';
    }else {
        excerpt = post.description;
    }

  return (
    <div className='font-[poppins] px-5 sm:px-0'>
        <div className='flex flex-col gap-y-1 items-start justify-center'>
            <img src={post.image ? post.image : "https://via.placeholder.com/150" } 
                alt="placeholder for content" 
                className='w-full md:w-[300px] object-contain'
            />

            {path === '/' && <Link to={`${post._id}`} className='text-blue-600 sm:text-sm'>{post.title}</Link>}

            {path !== '/' && <h1 className='text-blue-600'>{post.title}</h1>}

            {
            path === '/' && 
            <div className='mt-1 flex flex-col gap-y-1'>
                <p className='text-gray-600 text-xs font-medium italic'>
                    Author: {(post.author !== '' && post.author) ? post.author : 'Anonymous'}
                </p>
                <p className='text-gray-600 text-xs font-light'>
                   Posted: {timeago.format(post.createdAt)}
                </p>
                <p className='text-gray-600 text-xs font-light'>
                   Last Update: {timeago.format(post.updatedAt)}
                </p>
            </div>
            }

           {
            path !== '/' && 
            <>
                <div className='text-gray-600'>
                    <p dangerouslySetInnerHTML={{ __html: excerpt }} />
                </div>
                <Link to={post._id} className="my-2">
                    <button className='bg-green-600 px-4 py-2 rounded text-white hover:bg-green-600/80'>
                        Read more
                    </button> 
                </Link>
            </>
            }
        </div>
    </div>
    
  )
}

export default ShowPost
