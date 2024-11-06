import SendIcon from '@mui/icons-material/Send';
import React, {useState, useEffect} from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";

import "../index.css";

import TinyLogo from "../assets/MERKLE-logo.png";
import CoverImage from "../assets/coverimage2.jpg";

function ResetPass() {

  //Set Value/login
  const [email, setEmail] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate("");

  /*Pass Reset */
  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/");
  })

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center" style={{ backgroundImage: `url(${CoverImage})` }}>
      <div className="w-1/2 h-full bg-[#edf5fc] flex flex-col p-20 justify-between items-center max-w-lg shadow-lg border border-black rounded-lg">
        <div className="flex mb-5">
          <img src= {TinyLogo} alt="tinylogo" className='h-8 w-8 mr-2' />
          <h1 className="w-full max-w-[450px] mx-auto text-xl text-[#335bb3] font-semibold mr-auto mb-5">TechAsia</h1> 
        </div>
              
        <div className="w-full flex flex-col max-w-[450px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-2">Forgot your Password</h3>
            <p className="text-base mb-2">Enter your email to get password reset link</p>
        </div>

        <div className="w-full relative flex-col">
          <input 
          type="email" 
          placeholder='Email' 
          className='w-full text-black py-2 my-4 bg-transparent border-b border-black outline-none focus:outline-none' 
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          />

        </div>

        <div className="w-full flex items-end mb-5 mt-2">
          <Link to="/" className='text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2'>
            Already have an account?
          </Link>
        </div>

        <div className="w-full flex flex-col my-4">
          <button className="w-full text-white my-2 font-semibold bg-[#335bb3] rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
          onClick={() => sendPasswordReset(email)}>
            Get Reset Password Link
            <SendIcon className="ml-3" />
          </button>
        </div>

        <div className="w-full flex items-center justify-center relative py-2">
          <div className="w-full h-[1px] bg-black/40"></div>
        </div>

        </div>

      </div>
    </div>

    
  )
};

export default ResetPass;