import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import Layout from '../../pages/Layout';
import SinglePost from '../Posts/SinglePost';

const HomeSinglePost = () => {
    const { id } = useParams();
    const [singlePost, setSinglePost] = useState({});
    const { isLoggedIn, user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`)
        .then(res => res.json())
        .then(data => {
            setSinglePost(data);
            document.title = data.title;
        })
        .catch(err => console.log(err));
    }, [id])
    
  return (
    <Layout>
      {singlePost && (
        <div className='flex justify-center items-center px-10 pt-10'>
            <SinglePost post={singlePost} />
        </div>
      )}

     {(!isLoggedIn || user.user_id !== singlePost.user_id) && <div className="py-10 flex justify-center items-center">
        <Link className='w-64 sm:w-36 text-center rounded shadow-md text-white uppercase bg-green-600 px-4 py-3 hover:bg-green-700 transition' to='/'>
            Go back
        </Link>
      </div>}

      {(isLoggedIn && user.user_id === singlePost.user_id) && <div className="py-10 flex flex-col items-center gap-y-3 sm:gap-y-0 sm:flex-row  sm:justify-center sm:gap-x-5">
        <Link className='w-64 sm:w-36 text-center rounded shadow-md text-white uppercase bg-green-600 px-4 py-3 hover:bg-green-700 transition' to='/'>
           Other posts
        </Link>
        <Link className='w-64 sm:w-36 text-center rounded shadow-md text-white uppercase bg-yellow-600 px-4 py-3 hover:bg-yellow-700 transition' to={`/posts/${singlePost._id}/edit`}>
            Edit post
        </Link>
      </div>}
    </Layout>
  )
}

export default HomeSinglePost
