import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='max-w-100 bg-cyan-950 fixed container mx-auto lg:px-2 px-5 '>
      <div className='container flex items-center justify-between mx-auto'>
        <Link href="/" className="text-1xl font-medium text-white">T-Music</Link>
        <div>
          <ul className='flex items-center text-sm py-4'>
            <li>
              <Link href="/" className='block px-4 py-2 text-white hover:text-sky-900 transition-all durauion-300'>Home</Link>
            </li>
            <li>
              <Link href="/" className='block px-4 py-2 text-white hover:text-sky-900 transition-all durauion-300'>Home</Link>
            </li>
            <li>
              <Link href="/"className='block px-4 py-2 text-white hover:text-sky-900 transition-all durauion-300'>Home</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar