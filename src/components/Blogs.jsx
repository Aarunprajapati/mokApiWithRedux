import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUsers, getAllUsers } from '../feature/createSlice';
import CustomePop from './CustomePop';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../services/authService';

function Post() {
  const navigateTo = useNavigate()
  const [isUser, setIsUser] = useState('')
  useEffect(() => {
    const IsLoggedUser = async () => {
        try {
            const user = await isLoggedIn();
            if(!user){
              navigateTo('/login')
            }
            setIsUser(user)
            navigateTo('/blog')
        } catch (error) {
            console.error('Error checking authentication status:', error);
        }
    };

    IsLoggedUser();
}, []);

  

  const { users, loading, searchUser } = useSelector((state) => state.app);
  const [showpop, setShowPop] = useState(false);
  const [id, setId] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center space-x-2 h-screen items-center bg-zinc-100">
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-800"></div>
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-800"></div>
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-800"></div>
      </div>
    );
  }
  if(!isUser){
    navigateTo('/login')
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div>
      {showpop && <CustomePop id={id} showpop={showpop} setShowPop={setShowPop} />}
      <section className="m-4 md:m-8 dark:bg-gray-800 dark:text-gray-100">
        <div className="container p-4 mx-auto my-6 space-y-1 text-center">
          <span className="text-xs font-semibold tracki uppercase dark:text-violet-400">All Posts are Here</span>
          <h2 className="pb-3 text-3xl font-bold md:text-4xl">User Details</h2>
          <p>Using Redux Toolkit and Tailwind CSS for style.</p>
        </div>
        <div className="container grid border-2 p-8 border-blue-800 justify-center gap-4 mx-auto lg:grid-cols-2 xl:grid-cols-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} className="mt-2 p-5 flex flex-col items-center border-2 border-gray-300 px-8 py-6">
                <h2 className="mb-2 text-lg font-semibold sm:text-xl title-font dark:text-gray-100">{user.name}</h2>
                <p className="flex-1 mb-4 text-base leadi dark:text-gray-400">{user.gender}</p>
                <div className='w-full flex gap-2'>
                  <button type="button" className="px-5 py-3 font-semibold rounded-full dark:bg-gray-100 dark:text-gray-800" onClick={() => [setId(user.id), setShowPop(true)]}>View</button>
                  <Link to={`/edit/${user.id}`} className="px-5 py-3 font-semibold rounded-full dark:bg-gray-100 dark:text-gray-800">Edit</Link>
                  <button type="button" className="px-5 py-3 font-semibold rounded-full dark:bg-gray-100 dark:text-gray-800" onClick={() => dispatch(deleteUsers(user.id))}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-3xl w-full flex justify-end">
            <div className="mr-[-450px]">
              <div className="items-center">No User Found</div>
            </div>
          </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Post;
