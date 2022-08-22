import React from 'react';
import Mobile from './Mobile';
import Desktop from './Desktop';

const Header = () => {
  return (
    <div className="w-screen z-50 px-3 bg-black/90 py-2 fixed">
        <div className='block md:hidden'>
          <Mobile />
        </div>
        <div className='hidden md:block'>
          <Desktop />
        </div>
    </div>
  )
}

export default Header
