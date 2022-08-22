import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { FetchPost } from '../Fetch/FetchPost';
import Layout from '../../pages/Layout';
import SinglePost from './SinglePost';

const ShowSinglePost = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { GetPosts } = FetchPost();
    const { setError, error, user } = useContext(AuthContext);
    const [post, setPost] = useState({});

    useEffect(() => {
       GetPosts(`http://localhost:5000/auth/posts/${id}`, user.token, 'GET')
       .then(({data, response}) => {
            if(!response.ok){
                return setError(data.message);
            }
            document.title = data[0].title;
            setPost(data[0]);
            setError('');
       })
       .catch(err => setError(err.message));

    }, [GetPosts, id, post, setError, user.token])

    const handleDelete = async () => {
        GetPosts(`http://localhost:5000/auth/posts/${id}`, user.token, 'DELETE')
       .then(({data, response}) => {
            if(!response.ok){
                return setError(data.message);
            }
            
            localStorage.setItem('success', JSON.stringify('Post has been deleted successfully!'));
            navigate('/posts');
       })
       .catch(err => setError(err.message));
    }
    
  return (
    <Layout>
      {post && (
        <div className='flex justify-center items-center px-10 pt-10'>
            <SinglePost post={post} />
        </div>
      )}

      {error && <p>{error}</p>}

      <div className="py-10 flex flex-col items-center gap-y-3 sm:gap-y-0 sm:flex-row  sm:justify-center sm:gap-x-5">
        <Link className='w-64 sm:w-36 text-center rounded shadow-md text-white uppercase bg-green-600 px-4 py-3 hover:bg-green-700 transition' to='/posts'>
            all posts
        </Link>
        <Link className='w-64 sm:w-36 text-center rounded shadow-md text-white uppercase bg-yellow-600 px-4 py-3 hover:bg-yellow-700 transition' to='edit'>
            Edit post
        </Link>
        <button 
            className='w-64 sm:w-36 text-center rounded shadow-md text-white uppercase bg-red-600 px-4 py-3 hover:bg-red-700 transition'
            onClick={handleDelete}
        >
            delete post
        </button>
      </div>
    </Layout>
  )
}

export default ShowSinglePost
