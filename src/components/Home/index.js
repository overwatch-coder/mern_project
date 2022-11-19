import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/authContext';
import ShowPost from '../Posts/ShowPost';
import Pagination from './Pagination';

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`${process.env.REACT_APP_API_URL}/posts/`)
    .then(res => res.json())
    .then(data => {
      if(data){
        setAllPosts(data);
        setLoading(false);
      }else {
        throw Error('Could not fetch posts');
      }
    })
    .catch(err => console.log(err.message))
  }, [])

  const [currentPage, setCurrentPage] = useState(1);
  const totalPosts = allPosts.length;
  const postsPerPage = 8;
  const lastPage = currentPage * postsPerPage;
  const firstPage = lastPage - postsPerPage;
  const currentPosts = allPosts?.slice(firstPage, lastPage);

  if(loading) return (
    <div className='text-center mx-auto justify-center items-center text-3xl mt-20'>Loading...</div>
  )

  return (
    <section className='flex flex-col items-center gap-y-3 pt-10 font-[poppins]'>
      <h1 
        className='text-center text-3xl md:text-5xl text-blue-600 uppercase'>
        Welcome to WatchTech.
      </h1>

      <div className='flex flex-col items-center md:flex-row md:justify-around md:items-center'>
        <div className='flex flex-col items-center'>
          <p className='text-lg text-center'>
            This is a community for Overwatch users to share their <br /> experiences and opinions in the form of a blog
          </p>

          <div className='flex justify-center items-center container mx-auto py-7 md:px-5'>
            <div className='flex flex-col items-center gap-y-3'>
              <h1 className='text-center text-xl font-medium underline font-[swap] tracking-wider py-3'>
                Browse through our posts
              </h1>

              <div className='gap-y-8 sm:gap-x-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {currentPosts && currentPosts.map(post => (
                  <div className='' key={post._id}>
                    <ShowPost post={post}/>
                  </div>

                ))}
              </div>
            </div>
          </div>

          
          {
            (Object.keys(allPosts).length > 0) && 
              <Pagination 
                lastPage={lastPage} 
                postsPerPage={postsPerPage}
                totalPosts={totalPosts}
                setCurrentPage={setCurrentPage}
              />
          }

          <Link to="/posts" className='py-10'>
            <motion.button
              transition={{ duration: 1, repeat: Infinity }}
              initial={{ y:-10 }}
              animate={{ y:0 }}
              className='uppercase px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition'
              onClick={() => isLoggedIn ? navigate('/posts') : navigate('/login')}
              >
              View your posts
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Home
