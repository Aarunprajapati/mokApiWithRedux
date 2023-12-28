import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { updateUser } from '../feature/createSlice';

function Update() {
  const navigateTo = useNavigate()
  const dispatch = useDispatch()
  const {id} = useParams();
  const [updateData, setUpdateData] = useState({})
  const {users, loading} = useSelector((state)=>state.app)
  const sigleUser = users.filter((user)=> user.id === id)

  useEffect(()=>{
    if(id){
      setUpdateData(sigleUser[0])
    }
  },[])

  const newupdatedata = (e) => {
    const { name, value} = e.target;

    setUpdateData((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };
  // console.log((updateData))

  const updatehandler = (e)=>{
    e.preventDefault();
    dispatch(updateUser(updateData))
    navigateTo('/post')

  }
  if (loading) {
    return <div class="flex justify-center space-x-2 h-screen items-center bg-zinc-100">
	<div class="w-4 h-4 rounded-full animate-pulse dark:bg-violet-800"></div>
	<div class="w-4 h-4 rounded-full animate-pulse dark:bg-violet-800"></div>
	<div class="w-4 h-4 rounded-full animate-pulse dark:bg-violet-800"></div>
</div>;
  }

  return (
    <div className=" flex justify-center items-center h-screen">
    <div className="w-full max-w-xs">
      <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={updatehandler}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"  
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="name"
            id="username"
            type="text" 
            placeholder="Username"
            value={updateData.name}
            onChange={newupdatedata}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={updateData.email}
             onChange={newupdatedata}
          />
        </div>
        <div className="mb-4 flex items-center gap-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="age"
          >
            Age:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 border-blue-400 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="age"
            id="age"
            type="text"
            placeholder="Enter your age"
            value={updateData.age}
            onChange={newupdatedata}
          />
        </div>
        <div class="flex items-center mb-2">
          <input
            type="checkbox"
            id="checkbox"
            name="gender"
            value='Male'
            checked={updateData && updateData.gender === 'Male'}
            class="form-checkbox h-5 w-5 text-blue-600"
            onChange={newupdatedata}
          />
          <label htmlFor="checkbox" class="ml-2 block text-gray-700 font-medium">
            Male
          </label>
        </div>
        <div class="flex items-center mb-4">
          <input
            type="checkbox"
            id="checkbox"
            name="gender"
            value='Female'
            checked={updateData && updateData.gender === 'Female'}
            class="form-checkbox h-5 w-5 text-blue-600"
            onChange={newupdatedata}
          />
          <label htmlFor="checkbox" class="ml-2 block text-gray-700 font-medium">
            Female
          </label>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  </div>
  )
}

export default Update
