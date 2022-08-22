import React, { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import Navbar from './Navbar';
import {motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Mobile = () => {
    const [isOpen, setIsOpen] = useState(false);

    const displayNav = () => {
        setIsOpen(isOpen => !isOpen);
    }

    const navBarVariants = {
        hidden: {
            opacity: 0,
            y: '-100vh'
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: "easeInOut",
            }
        }
    }

  return (
    <AnimatePresence exitBeforeEnter>
        <div className='flex flex-col font-[poppins]'>
            <div className='flex justify-between items-center '>
                <Link to="/" className='flex items-center gap-x-1'>
                    <img src={logo} alt="watch Tech Logo" className='w-10 object-contain' />
                    <h1 className='pl:10 font-[poppins] text-3xl text-blue-600 font-[500] tracking-wider'>WatchTech.</h1>
                </Link>
                <MdMenu className='text-white text-4xl cursor-pointer' onClick={displayNav} />
            </div>
        {isOpen &&  
            <motion.div
                variants={navBarVariants}
                initial="hidden"
                animate="visible"
                exit= "hidden"
                className="mt-5 bg-blue-900 py-3"
            >
                <Navbar />
            </motion.div>
        }
        </div>
    </AnimatePresence>
  )
}

export default Mobile
