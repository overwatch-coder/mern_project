import React, { useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../context/authContext';

const Message = () => {
    const { message, setMessage, messageAppear, setMessageAppear } = useContext(AuthContext);
    // get confirmation message from localStorage on login/signup
    useEffect(() => {
        const success = localStorage.getItem('success');
        if(success) {
        setMessageAppear(true);
        setMessage(JSON.parse(success));
        setTimeout(() => {
            localStorage.removeItem('success');
            setMessageAppear(false);
        }, 3000);
        }else {
        setMessageAppear(false);
        setMessage('');
        return;
        }
        
    } , [messageAppear, setMessage, setMessageAppear]);

    // add animation to dialog box
    const dialoagVariants = {
        hidden: {
        opacity: 0,
        y: '-100vh',
        scale: 0,
        },
        visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: 'easeInOut'
        }
        }
    }


  return (
    <div>
    {messageAppear && 
        <AnimatePresence exitBeforeEnter>
            <motion.dialog 
            open={messageAppear} 
            className="flex flex-col items-center"
            variants={dialoagVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            >
            <p className='bg-green-600 text-white p-5 rounded-md text-center'>
                {message && message}
            </p>
            </motion.dialog>
        </AnimatePresence>
    }
    </div>
  )
}

export default Message
