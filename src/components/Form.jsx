import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleSignIn, signUpWithEmail } from "../services/authService";


function Form() {
    const [user, setUser] = useState({});
    const navigateTo = useNavigate();

    const getUserData = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault(); 
        // Validate email and password before submission
        if (!user.email || !user.password) {
            alert("Email and Password are required.");
            return;
        }

        try {
            const SignUpUser = await signUpWithEmail({
                email: user.email,
                password: user.password,
            });
            if(SignUpUser){
              alert("sign-up successfully")
            }

         
            setUser({}); 
            navigateTo('/'); 
        } catch (error) {
            console.error("Sign-in error:", error);
            // Additional error handling can be added here
        }
    };

    const GoogleHandler = async () => {
        try {
            const user = await googleSignIn();

            if (user) {
                alert("Sign-in successful!");
                navigateTo('/');
            } else {
                navigateTo('/login');
            }
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            // Handle Google sign-in errors here
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-100 shadow-md rounded h-auto w-full max-w-xs">
                <form className="px-8 pt-6 pb-8 mb-4">
                    {/* Email Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Enter your Email"
                            onChange={getUserData}
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpassword">
                            Password
                        </label>
                        <input
                            className="shadow rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            name="password"
                            id="cpassword"
                            type="password"
                            placeholder="Enter your password"
                            onChange={getUserData}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            onClick={submitHandler}           
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

                {/* Google Sign-In Button */}
                <div className="flex items-center justify-center my-3 rounded-lg mx-4 text-black dark:bg-gray-200">
                    <button
                        className="px-4 py-2 border flex gap-2 rounded-lg text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
                        onClick={GoogleHandler}
                    >
                        <img
                            className="w-6 h-6"
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            loading="lazy"
                            alt="google logo"
                        />
                        <span className="text-gray-700 border-none px-2">
                            Login with Google
                        </span>
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-500 text-xs my-3">
                    &copy;2020 Acme Corp. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default Form;
