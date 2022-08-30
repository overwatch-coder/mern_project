import React, { useContext } from 'react';
import * as timeago from 'timeago.js';
import { AuthContext } from '../../context/authContext';

const SinglePost = ({post}) => {
    const { user, isLoggedIn } = useContext(AuthContext);
    
  return (
    <div className='font-[poppins] mt-3 grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-0 md:gap-x-10'>
        <div className='flex flex-col gap-y-4 col-span-1'>
            <h1 className='uppercase text-center md:hidden text-2xl text-cyan-700 font-[600] font-[georgia] tracking-wider'>
                <span>{post.title}</span>
                <div className='border-b-2 w-full md:w-60 border-cyan-600'></div>
            </h1>
            <img src={post.image ? post.image : "https://via.placeholder.com/150" }  
                alt="placeholder for content" 
                className='w-full object-contain'
            />
            <div className='flex justify-start items-center gap-x-3'>
                {isLoggedIn && 
                    <p className='italic font-semibold text-sm text-blue-700'>
                    Written by {
                        (post.author !== '' && post.author) ? post.author : 
                        (post.user_id !== user.user_id) ? 'Anonymous' : user.username }
                    </p>}

                {!isLoggedIn && 
                    <p className='italic font-semibold text-sm text-blue-700'>
                        Written by {post.author ? post.author : 'Anonymous'}
                    </p>
                }
            </div>
            <p className='font-[500] text-sm'>
               Posted: {timeago.format(post.createdAt)}
            </p>

            <p className='font-[500] text-sm'>
                Last Update: {timeago.format(post.updatedAt)}
            </p>
        </div>

        <div className='flex flex-col gap-y-4 col-span-1 mt-6 md:mt-0'>
            <h1 className='uppercase hidden md:block text-start text-2xl text-cyan-700 font-[600] font-[georgia] tracking-wider'>
                {post.title}
                <div className='border-b-2 w-full md:w-96 border-cyan-600'></div>
            </h1>
            <h3 className='leading-loose text-lg'>
                <span dangerouslySetInnerHTML={{ __html: post.description}} />
            </h3>
        </div>
    </div>
  )
}

export default SinglePost
