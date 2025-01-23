import React, {useEffect, useState} from 'react'

import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';

import Sidebar from './global/Sidebar'
import Topbar from './global/Topbar'
import HeaderTitle from './global/HeaderTitle';
import { ImagesearchRoller } from '@mui/icons-material';
import { imageListClasses, Box } from '@mui/material';
import axios from 'axios';

function PredGraphScreen() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, loading, error] = useAuthState(auth);

    const [Company, setCompany]= useState('');
    const [Company_Investor, setCompany_Investor]= useState('');
    const [Domicile, setDomicile]= useState('');

    const [images, setImages] = useState([]);

    
    useEffect(() => {
        if (!loading && !user) {
            loginChecker();
        }
    }, [user, loading]);

    useEffect(()=>{
        console.log(images)
    },[images])
    
    const navigate = useNavigate("");

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
        const res= await axios.get(`http://localhost:8080/api/get/investment/forecast/${Company}/${Company_Investor}/${Domicile}`);
        setImages(res.data.images);
        }catch(err){
            console.error("Error fetching investment forecast:", error);
        }
    }
    
    const loginChecker= async()=>{
    alert("you do not have access for this page")
    try {
        navigate('/');
    }catch(err){
    
        }
    }
    
    if(user){
    return (
        <div className='flex min-h-screen h-auto'>
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            
            {/* Topbar */}
            <div className='flex-1 flex flex-col'>
            <Topbar isSidebarOpen={isSidebarOpen}/>
                
                {/* Main Content */}
                <div className='px-8 py-4 flex-1 overflow-y-auto bg-[#eef2f6] rounded-lg'>
                <HeaderTitle title='Prediction Graphs' isSidebarOpen={isSidebarOpen} />
                <form onSubmit={handleSubmit} className='form-box'>
                    <input type='text' value={Company} onChange={(e)=>setCompany(e.target.value)}/>
                    <input type='text' value={Company_Investor} onChange={(e)=>setCompany_Investor(e.target.value)}/>
                    <input type='text' value={Domicile} onChange={(e)=>setDomicile(e.target.value)}/>
                    <button type='submit'>submit form</button>
                </form>
                <Box
                    sx={{
                        width: "100%", 
                        height: "500px", 
                        overflow: "auto", 
                        border: "1px solid #ccc", 
                    }}
                    
                    >
                 {images.map((url, index) => (
                 <img
                  key={index}
                  src={ `http://localhost:8080/images/${url}` }
                  style={{ width: 500, height: 400, margin: 10 }}
                 />
                 ))}
                 </Box>
                </div>
        </div>
    </div>
    )}
}

export default PredGraphScreen