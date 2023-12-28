import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../feature/createSlice";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../services/authService";

function Form() {
  const [isUser, setIsUser] = useState("");
  const navigateTo = useNavigate();
  const [user, setUser] = useState({});
  const getUserData = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (user.length === 0) return; // Check if user object is empty
    dispatch(createUser(user));
    navigateTo("/blog");
    setUser({});
  };
  useEffect(() => {
    const IsLoggedUser = async () => {
      try {
        const user = await isLoggedIn();
        if (!user) {
          navigateTo("/login");
        }
        setIsUser(user);
        navigateTo("/post");
      } catch (error) {
        console.error("Error checking authentication status:", error);
      }
    };

    IsLoggedUser();
  }, [navigateTo]);

  if (!isUser) {
    navigateTo("/login");
  }

  return (
    <>
      {isUser && (
        <div className=" flex justify-center items-center h-screen">
          <div className="w-full mx-40">
            <form
              className="bg-zinc-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={submitHandler}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="name"
                  id="username"
                  type="text"
                  placeholder="Enter Your Title"
                  onChange={getUserData}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="des"
                >
                  Description
                </label>
                <textarea
                  minLength={5}
                  maxLength={5000}
                  className="shadow rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  name="email"
                  id="email"
                  placeholder="Enter your Description..."
                  onChange={getUserData}
                />
              </div>
              {/* <div className="mb-4 flex items-center gap-2">
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
              onChange={getUserData}
            />
          </div>
          <div class="flex items-center mb-2">
            <input
              type="checkbox"
              id="checkbox"
              name="gender"
              value="Male"
              class="form-checkbox h-5 w-5 text-blue-600"
              onChange={getUserData}
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
              value="Female"
              class="form-checkbox h-5 w-5 text-blue-600"
              onChange={getUserData}
            />
            <label htmlFor="checkbox" class="ml-2 block text-gray-700 font-medium">
              Female
            </label>
          </div> */}

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
            {/* <p className="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p> */}
          </div>
        </div>
      )}
    </>
  );
}

export default Form;
