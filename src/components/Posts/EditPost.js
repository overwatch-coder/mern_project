import React, { useState, useContext, useEffect, useRef } from 'react';
import Layout from '../../pages/Layout';
import { AuthContext } from '../../context/authContext';
import { FetchPost } from '../Fetch/FetchPost';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import FileBase64 from 'react-file-base64';
import { Editor } from '@tinymce/tinymce-react';


const EditPost = () => {
    document.title = 'Update Existing Post - Edit';
    const { id } = useParams();

    const editorRef = useRef(null);
    const [editor, setEditor] = useState('');
    const editorInit = {
        height: 400,
        menubar: true,
        plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help',
        ],
        toolbar: 'undo redo | blocks | ' + 
            'bold italic forecolor fontsize | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
    }

    const navigate = useNavigate();
    const { GetPosts, CreatePost } = FetchPost();
    const { user, posts, error, setPosts, setError } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('');
    const [titleLength, setTitleLength] = useState(0);
    const [descriptionLength, setDescriptionLength] = useState(0);

    useEffect(() => {
        // fetch post into existing form
        GetPosts(`${process.env.REACT_APP_API_URL}/auth/posts/${id}`, user.token, 'GET')
       .then(({data, response}) => {
            if(!response.ok){
                return setError(data.message);
            }
            setTitle(data[0].title);
            setAuthor(data[0].author);
            setDescription(data[0].description);
            setImage(data[0].image);
            setError('');
       })
       .catch(err => setError(err.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setError, id, user.token]);

    useEffect(() => {
        setError('');
        setTitleLength(title.split(' ').length);
        setDescriptionLength(description.split(' ').length);
        
    }, [description, setError, title]);
    


    const handleFormSubmit = (event) => {
        event.preventDefault();   
        // check if title and description are empty or not
        if(title === '' || description === '') {
            return setError('Please fill in all fields');
        } else if(titleLength > 50 || titleLength < 5 || descriptionLength < 20) {
            return setError('Title must be between 5 and 50 words and description must be at least 20 words');
        }else {

            // create post data to be sent to server
            const userAuthor = author === '' ? user.username : author;
            const postData = {
                title,
                description: editor, 
                author: userAuthor,
                image
            };

            // send post data to server and get response
            CreatePost(`${process.env.REACT_APP_API_URL}/auth/posts/${id}`, user.token, 'PUT', postData)
                .then(({data, response}) => {
                    if(!response.ok) {
                        return setError(data.message); 
                    }
                    // update existing post
                    if(posts.length > 0){
                        setPosts([data, ...posts]);
                    }else{
                        setPosts([data]);
                    }
                    // save success message to localStorage
                    localStorage.setItem('success', JSON.stringify('Post updated successfully'));
                    // navigate to posts page
                    navigate('/posts');
                    // reset form fields
                    setTitle('');
                    setDescription('');
                    setAuthor('');
                    setError('');
                    setImage('')
                    setEditor('');
                })
                .catch(err => {
                    setError(err.message);
                }
            );
        }
    }

    const formVariants = {
        hidden: {
            scale: 0,
            opacity: 0,
            y: '-100vh'
        },
        visible: {
            scale: 1,
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeInOut',
            }
        }
    }

  return (
    <Layout>
        <div className='pt-10 bg-cyan-700 w-full h-full font-[poppins] flex justify-center items-center pb-16'>
            <AnimatePresence exitBeforeEnter>
                <motion.form 
                    variants={formVariants}
                    initial='hidden'
                    animate='visible'
                    exit='hidden'
                    onSubmit={handleFormSubmit}
                    className='mx-5 bg-white w-full md:w-[700px] py-5 px-10 md:mx-0 rounded shadow-2xl'>

                    <h1 className='text-xl font-[600] text-blue-700 text-center uppercase tracking-widest'>
                        Update Post
                    </h1>

                    <div className='flex flex-col gap-y-3'>
                        <div className='flex flex-col gap-y-3'>
                            <label className='font-[600]'>Title</label>
                            <input 
                                type="text" 
                                placeholder='Enter title'
                                className='w-full py-2 px-3 focus:outline-none rounded border-[1px] border-blue-500 focus:border-blue-600'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <p className='text-right font-[600]'>
                                {title.length === 0 ? 
                                    <span className='text-red-600'> 0 word </span> : 
                                    <span className={(titleLength > 4 && titleLength < 51) ? 'text-green-600' : 'text-red-600' }>
                                        {titleLength} words 
                                    </span>
                                }
                            </p>
                        </div>

                        <div className='flex flex-col gap-y-3 mb-3'>
                            <label className='font-[600]'>Author</label>
                            <input 
                                type="text" 
                                placeholder='Enter author name if different from username'
                                className='w-full py-2 px-3 focus:outline-none rounded border-[1px] border-blue-500 focus:border-blue-600'
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </div>

                        <div className='flex flex-col gap-y-3 mb-3 w-full py-2 px-3 focus:outline-none rounded border-[1px] border-blue-500 focus:border-blue-600'>
                            <label className='font-[600]'>Add an image (Optional) </label>
                            <FileBase64 
                                multiple={false}
                                onDone = {({base64}) => setImage(base64)}
                                className='w-full py-2 px-3 focus:outline-none rounded border-[1px] border-blue-500 focus:border-blue-600'
                            />
                            {image && <div className='my-3'>
                                <p>Preview Image</p>
                                {<img src={image} alt="uploaded file" className='w-40 object-contain' />}
                            </div>}
                        </div>

                        <div className='flex flex-col gap-y-3'>
                            <label className='font-[600]'>Description</label>
                            <Editor
                                apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
                                cloudChannel='6-dev'
                                init={editorInit}
                                onInit={(evt, editor) => editorRef.current = editor}
                                initialValue={description}
                                onEditorChange={(e) => {setEditor(e); setDescription(e)}}
                            />
                            <p className='text-right font-[600]'>
                                {description.length === 0 ? 
                                    <span className='text-red-600'> 0 word </span> : 
                                    <span className={(descriptionLength > 19) ? 'text-green-600' : 'text-red-600' }
                                    >     
                                        {descriptionLength} words
                                    </span>
                                }
                            </p>
                        </div>

                        {/* Display Errors if any */}
                        {error && <p className='text-red-600 text-center py-1'>{error}</p>}

                        <button 
                            type='submit'
                            className='uppercase w-full md:w-1/3 p-3 bg-blue-500 text-white rounded hover:bg-blue-600'
                        >
                            Update Post
                        </button>
                    </div>
                </motion.form>
            </AnimatePresence>
        </div>
    </Layout>
  )
}

export default EditPost
