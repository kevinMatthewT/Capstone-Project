import { useEffect, useState } from 'react'
import axios from 'axios';
import dayjs from "dayjs";
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import { TextField, Button, Box, Divider, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker} from '@mui/x-date-pickers';

//components
import Sidebar from './global/Sidebar'
import Topbar from './global/Topbar'

import "./styles/InvestorForm.css"
import HeaderTitle from './global/HeaderTitle';

function InvestorForm() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [investments, setInvestment] = useState('');
//   useEffect(()=>{
    
//     })
    // const [investments, setInvestment] = useState({
    //     Company:'',
    //     Domicile:'',
    //     Year_Of_Operation:0,
    //     Busienss:'',
    //     Percentage_Ownership:0,
    //     Price_Asset:''
    //     Date_Of_Ownership
    // });
    const navigate=useNavigate();

    const [Company, setCompany]= useState('');
    const [Company_Investor, setCompany_Investor]= useState('');
    const [Domicile, setDomicile]= useState('');
    const [Year_Of_Operation,setYear_Of_Operation]= useState('');
    const [Business, setBusiness]= useState('');
    const [Percentage_Ownership,setPercentage_Ownership]= useState('');
    const [Revenue, setRevenue]= useState('');
    const [Expense, setExpense]= useState('');
    const [Ebida, setEbida]= useState('');
    const [Tax_Investment, setTax_Investment]= useState('');
    const [Price_Asset,setPrice_Asset]= useState('');
    const [Price_Liability, setPrice_Liability]= useState('');
    const [Equity, setEquity]= useState('');
    const [COGS,setCOGS]= useState('')
    const [Date_Of_Ownership, setDate_Of_Ownership]= useState(dayjs());


    //checks if user is logged in
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

    const handleSubmit =async (e)=>{
      if(Company==''||Domicile==''||Year_Of_Operation==''||Business==''||Percentage_Ownership==''||Price_Asset==''||Date_Of_Ownership==''){
        return ;
      }

      if(Percentage_Ownership<0||Percentage_Ownership>100){
        return ;
      }

      await axios.post("http://localhost:8080/api/post/investment",{
        Company,
        Company_Investor,   
        Domicile,
        Year_Of_Operation,
        Business,
        Percentage_Ownership,
        Revenue,
        Expense,
        Ebida,
        Tax_Investment,
        Price_Asset,
        Price_Liability,
        Equity,
        COGS,
        Date_Of_Ownership
    })
  .then(alert("New investment added"),navigate('/investments'))
  .catch(err=>console.log(err));
    }
    
    const containerStyle = (isSidebarOpen) => ({
      width: `calc(100% - ${isSidebarOpen ? '256px' : '80px'})`,
      marginLeft: isSidebarOpen ? '256px' : '80px',
      transition: 'width 0.3s ease, margin-left 0.3s ease', // smooth transition
    });
    
    if(user){
    return (
      <>
      <div className='flex min-h-screen h-auto' style={{overflowX: 'hidden'}}>
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        
        {/* Topbar */}
        <div className='flex-1 flex flex-col'>
          <Topbar isSidebarOpen={isSidebarOpen}/>
            
          {/* Main Content */}
          <div className='px-8 py-4 flex-1 overflow-y-auto bg-[#eef2f6] rounded-lg'>
            {/* <HeaderTitle title='Investor Form' isSidebarOpen={isSidebarOpen}/> */}

            <div style={{ ...containerStyle(isSidebarOpen), padding: '16px',  display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
              <Box
              sx={{
                backgroundColor: 'white',
                padding: 4,
                borderRadius: 2,
                boxShadow: 3,
                width: '100%',
                maxWidth: 600,
              }}>
                <h2 style={{ marginBottom:'4px', fontSize: '24px', fontWeight: 'bold', color: 'black'}}>Investor Form</h2>
                <h4 style={{ marginBottom: '16px', fontSize: '14px', color: '#4b5565'}}> Input the data into the respective fields to be inserted in the database</h4>

                <Divider style={{ marginBottom: '2rem', backgroundColor: '#eef2f6', width: '100%',}} />

                <form onSubmit={handleSubmit}>

                  {/* Section 1 */}

                  <Typography variant='h6' gutterBottom style={{fontWeight:'600', fontSize: '16px', margin: '16px 0'}}>A. Company Details</Typography>
                    <Grid container spacing={2} alignItems='center'>
                      <Grid item size={{xs:12, md:2}}>
                        <Typography style={{fontSize:'14px', fontWeight:'600', color:'#4b5565'}}>Name: </Typography>
                      </Grid>
                        <Grid item size={{xs:12, md:10}}>
                          <TextField
                            fullWidth
                            placeholder="Enter Company Name"
                            variant="outlined"
                            value={Company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                            sx={{
                            "& .MuiOutlinedInput-root": {
                              height: "45px", 
                              fontSize: "14px",
                              borderRadius: "12px", 
                              backgroundColor: "#f7f9fc", 
                              "& fieldset": {
                                borderRadius: "12px", 
                              },
                              "&:hover fieldset": {
                                borderColor: "#4b5565", 
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#4b5565", 
                              },
                            },
                          }}
                          />
                        </Grid>

                      <Grid item size={{xs:12, md:2}}>
                        <Typography style={{fontSize:'14px', fontWeight:'600', color:'#4b5565'}}>Company Investor: </Typography>
                      </Grid>
                        <Grid item size={{xs:12, md:10}}>
                          <TextField
                            fullWidth
                            placeholder="Enter Company Investor"
                            variant="outlined"
                            value={Company_Investor}
                            onChange={(e) => setCompany_Investor(e.target.value)}
                            required
                            sx={{
                            "& .MuiOutlinedInput-root": {
                              height: "45px", 
                              fontSize: "14px",
                              borderRadius: "12px", 
                              backgroundColor: "#f7f9fc", 
                              "& fieldset": {
                                borderRadius: "12px", 
                              },
                              "&:hover fieldset": {
                                borderColor: "#4b5565", 
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#4b5565", 
                              },
                            },
                          }}
                          />
                        </Grid>

                      <Grid item size={{xs:12, md:2}}>
                        <Typography style={{fontSize:'14px', fontWeight:'600', color:'#4b5565'}}>Domicile: </Typography>
                      </Grid>
                        <Grid item size={{xs:12, md:10}}>
                          <TextField
                            fullWidth
                            placeholder="Enter Domicile"
                            variant="outlined"
                            required
                            value={Domicile}
                            onChange={(e) => setDomicile(e.target.value)}
                            sx={{
                            "& .MuiOutlinedInput-root": {
                              height: "45px", 
                              fontSize: "14px",
                              borderRadius: "12px", 
                              backgroundColor: "#f7f9fc", 
                              "& fieldset": {
                                borderRadius: "12px", 
                              },
                              "&:hover fieldset": {
                                borderColor: "#4b5565", 
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#4b5565", 
                              },
                            },
                          }}
                          />
                        </Grid>

                      <Grid item size={{xs:12, md:2}}>
                        <Typography style={{fontSize:'14px', fontWeight:'600', color:'#4b5565'}}>Year of Operation: </Typography>
                      </Grid>
                        <Grid item size={{xs:12, md:10}}>
                          <TextField
                            fullWidth
                            placeholder="Enter Year of Operation"
                            variant="outlined"
                            type="number"
                            required
                            value={Year_Of_Operation}
                            onChange={(e) => setYear_Of_Operation(e.target.value)}
                            sx={{
                            "& .MuiOutlinedInput-root": {
                              height: "45px", 
                              fontSize: "14px",
                              borderRadius: "12px", 
                              backgroundColor: "#f7f9fc", 
                              "& fieldset": {
                                borderRadius: "12px", 
                              },
                              "&:hover fieldset": {
                                borderColor: "#4b5565", 
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#4b5565", 
                              },
                            },
                          }}
                          />
                        </Grid>

                      <Grid item size={{xs:12, md:2}}>
                        <Typography style={{fontSize:'14px', fontWeight:'600', color:'#4b5565'}}>Business Type: </Typography>
                      </Grid>
                        <Grid item size={{xs:12, md:10}}>
                          <TextField
                            fullWidth
                            placeholder="Enter Business Type"
                            variant="outlined"
                            required
                            value={Business}
                            onChange={(e) => setBusiness(e.target.value)}
                            sx={{
                            "& .MuiOutlinedInput-root": {
                              height: "45px", 
                              fontSize: "14px",
                              borderRadius: "12px", 
                              backgroundColor: "#f7f9fc", 
                              "& fieldset": {
                                borderRadius: "12px", 
                              },
                              "&:hover fieldset": {
                                borderColor: "#4b5565", 
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#4b5565", 
                              },
                            },
                          }}
                          />
                        </Grid>
                    </Grid>

                    <Divider style={{ margin: '2rem 0', backgroundColor: '#eef2f6', width: '100%',}} />
                    
                    {/* Section 2 */}

                  
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Typography variant='h6' gutterBottom style={{fontWeight:'600', fontSize: '18px', margin: '16px 0'}}>B. Investment Details</Typography>
                    
                    <Grid container spacing={2} alignItems='center'>
                    <Grid item size={{xs:12, md:2}}>
                        <Typography style={{fontSize:'14px', fontWeight:'600', color:'#4b5565'}}>Percentage of Ownership: </Typography>
                      </Grid>
                      <Grid item size={{xs:12, md:10}}>
                        <TextField
                          fullWidth
                          placeholder="Enter Percentage of Ownership"
                          variant="outlined"
                          type="number"
                          required
                          value={Percentage_Ownership}
                          onChange={(e) => setPercentage_Ownership(e.target.value)}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              height: "45px", 
                              fontSize: "14px",
                              borderRadius: "12px", 
                              backgroundColor: "#f7f9fc", 
                              "& fieldset": {
                                borderRadius: "12px", 
                              },
                              "&:hover fieldset": {
                                borderColor: "#4b5565", 
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#4b5565", 
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item size={{xs:12, md:2}}>
                        <Typography style={{fontSize:'14px', fontWeight:'600', color:'#4b5565'}}>Revenue: </Typography>
                      </Grid>
                      <Grid item size={{xs:12, md:10}}>
                        <TextField
                          fullWidth
                          placeholder="Enter Revenue"
                          variant="outlined"
                          type="number"
                          required
                          value={Revenue}
                          onChange={(e) => setRevenue(e.target.value)}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              height: "45px", 
                              fontSize: "14px",
                              borderRadius: "12px", 
                              backgroundColor: "#f7f9fc", 
                              "& fieldset": {
                                borderRadius: "12px", 
                              },
                              "&:hover fieldset": {
                                borderColor: "#4b5565", 
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#4b5565", 
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item size={{xs:12, md:2}}>
                        <Typography style={{fontSize:'14px', fontWeight:'600', color:'#4b5565'}}>Expense: </Typography>
                      </Grid>
                      <Grid item size={{xs:12, md:10}}>
                        <TextField
                          fullWidth
                          placeholder="Expense"
                          variant="outlined"
                          type="number"
                          required
                          value={Expense}
                          onChange={(e) => setExpense(e.target.value)}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              height: "45px", 
                              fontSize: "14px",
                              borderRadius: "12px", 
                              backgroundColor: "#f7f9fc", 
                              "& fieldset": {
                                borderRadius: "12px", 
                              },
                              "&:hover fieldset": {
                                borderColor: "#4b5565", 
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#4b5565", 
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item size={{xs:12, md:2}}>
                        <Typography style={{fontSize:'14px', fontWeight:'600', color:'#4b5565'}}>EBIDA: </Typography>
                      </Grid>
                      <Grid item size={{xs:12, md:10}}>
                        <TextField
                          fullWidth
                          placeholder="Enter Ebida"
                          variant="outlined"
                          type="number"
                          required
                          value={Ebida}
                          onChange={(e) => setEbida(e.target.value)}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              height: "45px", 
                              fontSize: "14px",
                              borderRadius: "12px", 
                              backgroundColor: "#f7f9fc", 
                              "& fieldset": {
                                borderRadius: "12px", 
                              },
                              "&:hover fieldset": {
                                borderColor: "#4b5565", 
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#4b5565", 
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item size={{xs:12, md:2}}>
                        <Typography style={{fontSize:'14px', fontWeight:'600', color:'#4b5565'}}>Tax Investment: </Typography>
                      </Grid>
                      <Grid item size={{xs:12, md:10}}>
                        <TextField
                          fullWidth
                          placeholder="Tax Investment"
                          variant="outlined"
                          type="number"
                          required
                          value={Tax_Investment}
                          onChange={(e) => setTax_Investment(e.target.value)}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              height: "45px", 
                              fontSize: "14px",
                              borderRadius: "12px", 
                              backgroundColor: "#f7f9fc", 
                              "& fieldset": {
                                borderRadius: "12px", 
                              },
                              "&:hover fieldset": {
                                borderColor: "#4b5565", 
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#4b5565", 
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item size={{xs:12, md:2}}>
                        <Typography style={{fontSize:'14px', fontWeight:'600', color:'#4b5565'}}>Price of Asset: </Typography>
                      </Grid>
                      <Grid item size={{xs:12, md:10}}>
                        <TextField
                          fullWidth
                          placeholder="Enter Price of Asset"
                          variant="outlined"
                          type="number"
                          required
                          value={Price_Asset}
                          onChange={(e) => setPrice_Asset(e.target.value)}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              height: "45px", 
                              fontSize: "14px",
                              borderRadius: "12px", 
                              backgroundColor: "#f7f9fc", 
                              "& fieldset": {
                                borderRadius: "12px", 
                              },
                              "&:hover fieldset": {
                                borderColor: "#4b5565", 
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#4b5565", 
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item size={{xs:12, md:2}}>
                        <Typography style={{fontSize:'14px', fontWeight:'600', color:'#4b5565'}}>Price Liability: </Typography>
                      </Grid>
                      <Grid item size={{xs:12, md:10}}>
                        <TextField
                          fullWidth
                          placeholder="Price Liability"
                          variant="outlined"
                          type="number"
                          value={Price_Liability}
                          required
                          onChange={(e) => setPrice_Liability(e.target.value)}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              height: "45px", 
                              fontSize: "14px",
                              borderRadius: "12px", 
                              backgroundColor: "#f7f9fc", 
                              "& fieldset": {
                                borderRadius: "12px", 
                              },
                              "&:hover fieldset": {
                                borderColor: "#4b5565", 
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#4b5565", 
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item size={{xs:12, md:2}}>
                        <Typography style={{fontSize:'14px', fontWeight:'600', color:'#4b5565'}}>Equity: </Typography>
                      </Grid>
                      <Grid item size={{xs:12, md:10}}>
                        <TextField
                          fullWidth
                          placeholder="Enter Equity"
                          variant="outlined"
                          type="number"
                          required
                          value={Equity}
                          onChange={(e) => setEquity(e.target.value)}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              height: "45px", 
                              fontSize: "14px",
                              borderRadius: "12px", 
                              backgroundColor: "#f7f9fc", 
                              "& fieldset": {
                                borderRadius: "12px", 
                              },
                              "&:hover fieldset": {
                                borderColor: "#4b5565", 
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#4b5565", 
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item size={{xs:12, md:2}}>
                        <Typography style={{fontSize:'14px', fontWeight:'600', color:'#4b5565'}}>COGS: </Typography>
                      </Grid>
                      <Grid item size={{xs:12, md:10}}>
                        <TextField
                          fullWidth
                          placeholder="Enter COGS"
                          variant="outlined"
                          type="number"
                          required
                          value={COGS}
                          onChange={(e) => setCOGS(e.target.value)}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              height: "45px", 
                              fontSize: "14px",
                              borderRadius: "12px", 
                              backgroundColor: "#f7f9fc", 
                              "& fieldset": {
                                borderRadius: "12px", 
                              },
                              "&:hover fieldset": {
                                borderColor: "#4b5565", 
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#4b5565", 
                              },
                            },
                          }}
                        />
                      </Grid>
                      
                      <Grid item size={{xs:12, md:2}}>
                        <Typography style={{fontSize:'14px', fontWeight:'600', color:'#4b5565'}}>Date of Ownership: </Typography>
                      </Grid>
                      <Grid item size={{xs:12, md:10}}>
                        <DatePicker
                          placeholder="Date of Ownership"
                          value={Date_Of_Ownership}
                          onChange={(newValue) => setDate_Of_Ownership(newValue)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              variant="outlined"
                              sx={{
                            "& .MuiOutlinedInput-root": {
                              height: "45px", 
                              fontSize: "14px",
                              borderRadius: "12px", 
                              backgroundColor: "#f7f9fc", 
                              "& fieldset": {
                                borderRadius: "12px", 
                              },
                              "&:hover fieldset": {
                                borderColor: "#4b5565", 
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#4b5565", 
                              },
                            },
                          }}
                            />
                          )}
                        />
                      </Grid>
                      
                      <Grid item size={{xs:12}}>
                        <Box textAlign="right" mt={2}>
                          <Button variant="contained" type="submit"
                          style={{
                            backgroundColor: '#4b5565',
                            color: '#fff',
                            padding: '10px 20px',
                          }}>
                            Submit Form
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                    </LocalizationProvider>
                  </form>
              </Box>
            </div>
          </div>
        </div>
    </div> 

      
        
      </>
    )}
}

export default InvestorForm