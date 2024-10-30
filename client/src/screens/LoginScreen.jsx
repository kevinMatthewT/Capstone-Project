import React, {useState, useEffect} from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth,logInWithEmailAndPassword } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';


import '../screens/styles/LoginScreen.css';

import CoverImage from "../assets/Cover2.jpg";
import CoverImage2 from "../assets/coverimage2.jpg";
import CoverImage3 from "../assets/coverimage3.jpg";
import CoverImage4 from "../assets/coverimage4.jpg";
import CoverImage5 from "../assets/coverimage5.jpg";
import TinyLogo from "../assets/MERKLE-logo.png";

const color = {
    primary: "#335BB3",
    background: "#F4F1DE",
    blue: "#edf5fc",
}

const LoginScreen = () => {
    //see/hide password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }

  //login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate("");

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }

    if (user) {
      console.log(user.displayName);
      navigate("/dashboard");
    }
    if (error) alert(error);
  }, [error, loading, navigate, user]);

  return (
    <div className='w-full h-screen flex items-start'>
        <div className="relative w-1/2 h-full flex flex-cool">
            <div className="absolute top-[25%] left-[10%] flex flex-col">
                <h1 className="text-4xl text-white font-bold my-4">
                    Welcome to the TechAsia Management Dashboard
                </h1>
                <p className="text-xl text-white font-normal">
                    Come and see our management system
                </p>
            </div>
            <img src= {CoverImage5} alt="cover" className='w-full h-full object-cover' />
        </div>

        <div className="w-1/2 h-full bg-[#edf5fc] flex flex-col p-20 justify-between items-center">
            <div className="flex mb-5">
                <img src= {TinyLogo} alt="tinylogo" className='h-8 w-8 mr-2' />
                <h1 className="w-full max-w-[450px] mx-auto text-xl text-[#335bb3] font-semibold mr-auto mb-5">TechAsia</h1> 
            </div>
            

            <div className="w-full flex flex-col max-w-[450px]">
                <div className="w-full flex flex-col mb-2">
                    <h3 className="text-3xl font-semibold mb-2">Welcome</h3>
                    <p className="text-base mb-2">Welcome Back! Please enter your details!</p>
                </div>

                <div className="w-full relative flex-col">
                    <input 
                    type="email" 
                    placeholder='Email' 
                    className='w-full text-black py-2 my-4 bg-transparent border-b border-black outline-none focus:outline-none' 
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    />

                    <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder='Password' 
                    className='w-full text-black py-2 my-4 bg-transparent border-b border-black outline-none focus:outline-none' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={handleClickShowPassword}
                        className=" absolute right-0 top-1/2 transform translate-y-1/2 color-gray focus:outline-none"
                    >
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>        
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <   path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                        )}
                    </button>
                </div>

                <div className="w-full flex items-center justify-between">
                    <div className="w-full flex items-center">
                        <input type="checkbox" className='w-4 h-4 mr-2' />
                        <p className="text-sm">Remember Me</p>
                    </div>

                    <Link to="/resetpass" className='text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2'>
                    Forgot Password?
                    </Link>
                </div>

                <div className="w-full flex flex-col my-4">
                    <button className="w-full text-white my-2 font-semibold bg-[#335bb3] rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
                    onClick={() => logInWithEmailAndPassword(email, password)}>
                        <LoginIcon className="mr-2" />
                        Log in
                    </button>
                </div>

                <div className="w-full flex items-center justify-center relative py-2">
                    <div className="w-full h-[1px] bg-black/40"></div>
                </div>

            </div>

        </div>
    </div>
  )
}

export default LoginScreen