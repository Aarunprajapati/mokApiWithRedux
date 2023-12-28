import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setSearchUser } from '../feature/createSlice'

function Navbar() {
    const dispatch = useDispatch()
    const [searchData, setSearchData] = useState('');
    const batch = useSelector(state=> state.app.users)

    console.log(searchData)

    useEffect(()=>{
        dispatch(setSearchUser(searchData))
    },[searchData])

  return (
    <div>
        <nav
        className="flex items-center justify-between flex-wrap bg-gray-900 py-4 lg:px-12 shadow border-solid border-t-2 border-blue-700">
        <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
            <div className="flex items-center flex-shrink-0 text-gray-800 mr-16">
                <span className="font-semibold text-xl tracking-tight text-white">My Navbar</span>
            </div>
            <div className="block lg:hidden ">
                <button
                    id="nav"
                    className="flex items-center px-3 py-2 border-2 rounded text-white border-blue-700 hover:text-blue-100 hover:border-blue-100">
                </button>
            </div>
        </div>
    
        <div className="menu w-full flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
            <div className="text-md font-bold text-blue-100 lg:flex-grow">
                <Link to={'/'}
                   className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
                   Home
                </Link>
                <Link to={'/blog'}
                   className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
                 Blogs({batch.length})
                </Link>
                <Link to={`/post`}
                className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
                    Post
                </Link>
            
                    
            </div>
        
            <div className="relative mx-auto text-gray-600 lg:block hidden">
                <input
                    className="border-2 border-gray-300 bg-white h-10 pl-2 w-96 px-8 rounded-lg text-sm focus:outline-none"
                    type="search" name="search" placeholder="Search"
                    onChange={(e)=>setSearchData(e.target.value)}/>
                <button type="submit" className="absolute right-0 top-0 mt-3 mr-2">
                
                </button>
            </div>
            <div className="flex ">
            <Link to={'/login'}
                   className="block mt-4 lg:inline-block lg:mt-0 text-md font-bold text-blue-100 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
                   SignIn
                </Link>
            </div>
        </div>
    
    </nav>
      
    </div>
  )
}

export default Navbar
