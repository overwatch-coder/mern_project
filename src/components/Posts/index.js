import React, { useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/authContext';
import { FetchPost } from '../Fetch/FetchPost';
import Post from './ShowPost';
import { Link } from 'react-router-dom';
import Message from '../Message/Message';

const Posts = () => {
  const {GetPosts} = FetchPost();
  const { user, posts, setPosts, setError, messageAppear } = useContext(AuthContext);
  document.title = `Dashboard - ${user.username}`

  // fetch posts on page load
  useEffect(() => {
    GetPosts('http://localhost:5000/auth/posts/', user.token, 'GET')
      .then(({data, response}) => {
        if(response.ok) {
          setPosts(data);
        }else {
          if(response.status === 404) {
            return setError('sorry, no posts found!');
          }
          setError(data.message);
        }
      }).catch(err => {
        setError(err.message);
      }
    );
  } , [GetPosts, setError, setPosts, user.token]);

  // add animation to dialog box
    const dialoagVariants = {
      hidden: {
      opacity: 0,
      x: '-100vw',
      scale: 0,
      },
      visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
          duration: 0.5,
          ease: 'easeInOut'
      }
      }
  }

  return (
    <div>
      {messageAppear && <p className='text-center mt-20 text-lg'>Loading...</p>}
      <Message />

      {!messageAppear && 
        <div className='container mx-auto flex flex-col items-center'>
          <h1 className='px-3 text-center mt-10 mb-5 text-xl tracking-wider flex flex-col gap-y-2'>
              <p className='text-center italic text-3xl text-blue-600'>
                Welcome to your dashboard {user.username}
              </p>
              <span className='mt-1 text-center'>
                You can manage your posts here
              </span>
          </h1>

          <div className='grid grid-cols-1 sm:place-items-start sm:grid gap-y-5 md:gap-y-16 sm:grid-cols-2 md:grid-cols-3 sm:gap-x-6 xl:grid-cols-4 sm:px-5 py-10'>
            {posts.length === 1 && 
              <div 
                key={posts[0]._id} 
                className='col-span-1'
              >
                <Post post={posts[0]} />
              </div>
            }

            {posts.length > 1 && posts.map((post, index) => (
              <div 
                key={index} 
                className='col-span-1'
              >
                <Post post={post} />
              </div>
            ))}
          </div>

          {(posts.length === 0 || posts.length === undefined) && 
            <p className='mt-5 mb-10 text-xl text-center'>No posts found</p>
          }

          {!messageAppear && 
          <div className='flex flex-col items-center gap-y-5 pt-7 pb-10'>
            <Link to="create">
              <motion.button 
                variants={dialoagVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className='bg-green-600 px-4 py-3 uppercase rounded text-white hover:bg-green-600/80'
              >
                Create a new post
              </motion.button>
            </Link>

          </div>}
        </div>
      }
    </div>
  )
}

export default Posts
