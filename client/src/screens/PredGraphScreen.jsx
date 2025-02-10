import React, {useEffect, useState} from 'react'

import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';

import Sidebar from './global/Sidebar'
import Topbar from './global/Topbar'
import HeaderTitle from './global/HeaderTitle';
import { ImagesearchRoller } from '@mui/icons-material';
import { Divider, Box, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from 'axios';
  

const containerStyle = (isSidebarOpen) => ({
    width: `calc(100% - ${isSidebarOpen ? '256px' : '80px'})`,
    marginLeft: isSidebarOpen ? '256px' : '80px',
    transition: 'width 0.3s ease, margin-left 0.3s ease', // smooth matching animation
});

function PredGraphScreen() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, loading, error] = useAuthState(auth);

    const [Company, setCompany]= useState('');
    const [Company_Investor, setCompany_Investor]= useState('');
    const [Domicile, setDomicile]= useState('');

    const [images, setImages] = useState([]);

    const [errors, setErrors] = useState({});

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

        const newErrors = {};
        if (!Company.trim()) newErrors.Company = "Company field cannot be empty.";
        if (!Company_Investor.trim()) newErrors.Company_Investor = "Investor field cannot be empty.";
        if (!Domicile.trim()) newErrors.Domicile = "Domicile field cannot be empty.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors); 
            return;
        }

        setErrors({})

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
        <div className=' flex min-h-screen h-auto' style={{overflowX: 'hidden'}}>
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            
            {/* Topbar */}
            <div className='flex-1 flex-col'>
            <Topbar isSidebarOpen={isSidebarOpen}/>
                
                {/* Main Content */}
                <div className='px-8 py-4 flex-1 overflow-y-auto bg-[#eef2f6] rounded-lg'>
                <HeaderTitle title='Prediction Graphs' isSidebarOpen={isSidebarOpen} />

                {/* Input Forms */}

                <Box className="bg-[#eef2f6] shadow-lg rounded-lg p-4"
                    sx={{
                    ...containerStyle(isSidebarOpen), 
                    backgroundColor: 'white',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                    borderRadius: 2, 
                    paddingTop: '8px', 
                    mt: 2
                }}>
                    <h3 style={{ margin:'14px 14px 0 14px', padding: "0 8px", fontSize: '18px', fontWeight: '600', color: 'black'}}>Generate Prediction Graphs</h3>
                    <h4 style={{ margin: '0 14px 8px 14px', padding: "8px 0 8px 8px", fontSize: '13px', color: '#4b5565'}}> To generate the graphs please input the necessary informations</h4>

                    <Divider style={{ marginBottom: '16px', backgroundColor: '#eef2f6', width: '100%',}} />
                    
                    <form onSubmit={handleSubmit} style={{ padding:'0 16px', margin:'auto'}} >
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 4}}>
                                <h6 style={{fontWeight: '600', padding: '8px 8px 0 8px', fontSize: '14px', margin: 0}}>Company</h6>
                                <TextField 
                                    placeholder='Enter Company Name'
                                    value={Company} 
                                    onChange={(e)=>setCompany(e.target.value)}
                                    fullWidth
                                    margin='normal'
                                    variant='outlined'
                                    error={!!errors.Company}
                                    helperText={errors.Company || ""}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": {
                                                borderColor: "#4b5565",
                                            },
                                        }
                                    }}
                                    style={{
                                        backgroundColor: "#f7f9fc",
                                            borderRadius: "8px",
                                    }}
                                    required
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 4}}>
                                <h6 style={{fontWeight: '600', padding: '8px 8px 0 8px', fontSize: '14px', margin: 0}}>Company Investor</h6>
                                <TextField 
                                    placeholder='Enter Company Investor'
                                    value={Company_Investor} 
                                    onChange={(e)=>setCompany_Investor(e.target.value)}
                                    fullWidth
                                    margin='normal'
                                    variant='outlined'
                                    error={!!errors.Company_Investor}
                                    helperText={errors.Company_Investor || ""}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": {
                                                borderColor: "#4b5565",
                                            },
                                        }
                                    }}
                                    style={{
                                        backgroundColor: "#f7f9fc",
                                            borderRadius: "8px",
                                    }}
                                    required
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 4}}>
                                <h6 style={{fontWeight: '600', padding: '8px 8px 0 8px', fontSize: '14px', margin: 0}}>Domicile</h6>
                                <TextField 
                                    placeholder='Enter Domicile'
                                    value={Domicile} 
                                    onChange={(e)=>setDomicile(e.target.value)}
                                    fullWidth
                                    margin='normal'
                                    variant='outlined'
                                    error={!!errors.Domicile}
                                    helperText={errors.Domicile || ""}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": {
                                                borderColor: "#4b5565", 
                                            },
                                        }
                                    }}
                                    style={{
                                        backgroundColor: "#f7f9fc",
                                            borderRadius: "8px",
                                    }}
                                    required
                                />
                            </Grid>
                        </Grid>
                        
                        {/* Submit Button */}
                        
                        <Box textAlign="right" mt={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                style={{
                                    backgroundColor: '#4b5565',
                                    color: '#fff',
                                    padding: '10px 20px',
                                }}
                                startIcon={<ImagesearchRoller />}
                            >
                                Find Predictions
                            </Button>
                        </Box>
                    </form>

                    <Divider style={{ margin: '3rem 0 1rem 0', backgroundColor: '#eef2f6'}} />
                    
                    <Box
                        sx={{
                            width: "100%", 
                            height: "500px", 
                            overflow: "auto", 
                            
                        }}
                        
                        >
                            <h3 style={{ margin:'0 14px', padding: "0 8px", fontSize: '18px', fontWeight: '600', color: 'black'}}>Generated Prediction Graphs</h3>
                            <h4 style={{ margin: '0 14px 8px 14px', padding: "8px 0 8px 8px", fontSize: '13px', color: '#4b5565'}}> These are all the prediction graphs generated</h4>
                            
                            <Box 
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexWrap: "wrap",
                                    gap: '10px',
                                }}
                            >
                                {images.map((url, index) => (
                                    <img
                                    alt='prediction graphs'
                                    key={index}
                                    src={ `http://localhost:8080/images/${url}` }
                                    style={{ width: 700, height: 400}}
                                    />
                                ))}
                            </Box>
                    </Box>
                </Box>
                
            </div>
        </div>
    </div>
    )}
}

export default PredGraphScreen