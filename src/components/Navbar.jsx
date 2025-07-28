import React from 'react'

const Navbar = () => {
  return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-white text-3xl font-bold">iTask</h1>
            <ul className="flex gap-12">
              
                <li><a href="#" className="text-white hover:text-gray-500 font-bold transition-all">Home</a></li>
                <li><a href="#" className="text-white hover:text-gray-500 font-bold">About</a></li>
                <li><a href="#" className="text-white hover:text-gray-500 font-bold">Tasks</a></li>
              
            </ul>
            </div>
        </nav>
  )
}


export default Navbar
