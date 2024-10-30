import { useEffect, useState } from 'react'

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";

//importing components
import Sidebar from '../components/Sidebar'
import InvestorTable from '../components/InvestorTable'

import "./styles/HomeScreen.css"
import Topbar from '../components/Topbar'

function HomeScreen() {

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!loading && !user) {
        loginChecker();
    }
  }, [user, loading]);
  
  const navigate = useNavigate("");

  const loginChecker= async()=>{
    alert("you do not have access for this page")
    try {
      navigate('/');
    }catch(err){

    }
  }

  if(user){
  return (
    <>
    <Sidebar/>
    <Topbar/>
    <div className='data-container'>
      dashboard
    </div>
    
    </>
  )}
}

export default HomeScreen