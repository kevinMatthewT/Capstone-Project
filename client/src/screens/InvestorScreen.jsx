import { useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";

//importing components
import Sidebar from './global/Sidebar'
import InvestorTable from '../components/InvestorTable'

import Topbar from './global/Topbar'
import HeaderTitle from './global/HeaderTitle';

function InvestorScreen() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate=useNavigate();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!loading && !user) {
        loginChecker();
    }
  }, [user, loading]);

  const loginChecker= async()=>{
    alert("you do not have access for this page")
    try {
      navigate('/');
    }catch(err){

    }
  }

  if (user){
  return (
    <>
    <div className='flex min-h-screen h-auto'>
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        
        {/* Topbar */}
        <div className='flex-1 flex flex-col'>
          <Topbar isSidebarOpen={isSidebarOpen}/>
            
            {/* Main Content */}
            <div className='px-8 py-4 flex-1 overflow-y-auto bg-[#eef2f6] rounded-lg'>
              <HeaderTitle title='Investment' isSidebarOpen={isSidebarOpen}/>
              <InvestorTable name="editor" isSidebarOpen={isSidebarOpen} />
            </div>
        </div>
    </div> 
    
    
    </>
  )}
}

export default InvestorScreen