import React from 'react'

const Footer = () => {
  return (
    <div 
      className='w-screen py-5 text-center text-sm bg-cyan-800'>
      <p className='text-white font-[poppins] tracking-wider'>Copyright &copy; {new Date().getFullYear()} Overwatch Coder </p>
    </div>
  )
}

export default Footer
