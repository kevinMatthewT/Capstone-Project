import { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams ,useNavigate} from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import { TextField, Button, Box, Divider, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker} from '@mui/x-date-pickers';
import { Formik, Form, Field } from "formik";
import classNames from "classnames";
import * as Yup from "yup";

//components
import Sidebar from './global/Sidebar'
import Topbar from './global/Topbar'
import './styles/UpdateInvestor.css'

import dayjs from 'dayjs';

const containerStyle = (isSidebarOpen) => ({
  width: `calc(100% - ${isSidebarOpen ? '256px' : '80px'})`,
  marginLeft: isSidebarOpen ? '256px' : '80px',
  transition: 'width 0.3s ease, margin-left 0.3s ease', 
});

function UpdateInvestor() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const {id}= useParams();
    const navigate=useNavigate();
    const [investment, setInvestment] = useState({});

    // const [investments, setInvestment] = useState({});

    // const [Company, setCompany]= useState('');
    // const [Company_Investor, setCompany_Investor]= useState('');
    // const [Domicile, setDomicile]= useState('');
    // const [Year_Of_Operation,setYear_Of_Operation]= useState('');
    // const [Business, setBusiness]= useState('');
    // const [Percentage_Ownership,setPercentage_Ownership]= useState('');
    // const [Revenue, setRevenue]= useState('');
    // const [Expense, setExpense]= useState('');
    // const [Ebida, setEbida]= useState('');
    // const [Tax_Investment, setTax_Investment]= useState('');
    // const [Price_Asset,setPrice_Asset]= useState('');
    // const [Price_Liability, setPrice_Liability]= useState('');
    // const [Equity, setEquity]= useState('');
    // const [COGS,setCOGS]=useState('')
    // const [Date_Of_Ownership, setDate_Of_Ownership]= useState(dayjs());
 
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

    useEffect(()=>{
      axios.get(`http://localhost:8080/api/get/investment/${id}`)
      .then((response) => setInvestment(response.data))
      .catch(err=>console.log(err));
    },[id]);

    useEffect(() => {
      // Apply specific styles when the component is mounted
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.overflowX = 'hidden';
  
      return () => {
        // Clean up the styles when the component is unmounted
        document.body.style.margin = '';
        document.body.style.padding = '';
        document.body.style.overflowX = '';
      };
    }, []);
    
    const validationSchema = Yup.object({
      Company: Yup.string().required("Company Name is required"),
      Company_Investor: Yup.string().required("Company Investor is required"),
      Domicile: Yup.string().required("Domicile is required"),
      Year_Of_Operation: Yup.number()
        .required("Year of Operation is required")
        .min(1900, "Enter a valid year")
        .max(new Date().getFullYear(), "Year cannot exceed the current year"),
      Business: Yup.string().required("Business Type is required"),
      Percentage_Ownership: Yup.number()
        .required("Percentage of Ownership is required")
        .min(0, "Value must be at least 0")
        .max(100, "Value must not exceed 100"),
      Revenue: Yup.number()
        .required("Revenue is required")
        .min(0, "Revenue cannot be negative"),
      Expense: Yup.number()
        .required("Expense is required")
        .min(0, "Expense cannot be negative"),
      Ebida: Yup.number()
        .required("EBIDA is required")
        .min(0, "EBIDA cannot be negative"),
      Tax_Investment: Yup.number()
        .required("Tax Investment is required")
        .min(0, "Tax Investment cannot be negative"),
      Price_Asset: Yup.number()
        .required("Price of Asset is required")
        .min(0, "Price of Asset cannot be negative"),
      Price_Liability: Yup.number()
        .required("Price Liability is required")
        .min(0, "Price Liability cannot be negative"),
      Equity: Yup.number()
        .required("Equity is required")
        .min(0, "Equity cannot be negative"),
      COGS: Yup.number()
        .required("COGS is required")
        .min(0, "COGS cannot be negative"),
      Date_Of_Ownership: Yup.date()
        .required("Date of Ownership is required")
        .typeError("Invalid date format"),
    });

    const initialValues = {
      Company: investment.Company || "",
      Company_Investor: investment.Company_Investor || "",
      Domicile: investment.Domicile || "",
      Year_Of_Operation: investment.Year_Of_Operation || "",
      Business: investment.Business || "",
      Percentage_Ownership: investment.Percentage_Ownership || "",
      Revenue: investment.Revenue || "",
      Expense: investment.Expense || "",
      Ebida: investment.Ebida || "",
      Tax_Investment: investment.Tax_Investment || "",
      Price_Asset: investment.Price_Asset || "",
      Price_Liability: investment.Price_Liability || "",
      Equity: investment.Equity || "",
      COGS: investment.COGS || "",
      Date_Of_Ownership: investment.Date_Of_Ownership
        ? dayjs(investment.Date_Of_Ownership)
        : dayjs(),
    };
  
    const onSubmit = async (values, {setSubmitting})=>{
      try{
        await axios.put(`http://localhost:8080/api/update/investment/${id}`, values);
        navigate('/investments')
      }catch(erorr) {
        console.error("Error submitting form:", error);
      } finally {
        setSubmitting(false);
      }
    };

  if(user){
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
          {/* <HeaderTitle title='Update Form' isSidebarOpen={isSidebarOpen}/> */}

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
                <h2 style={{ marginBottom:'4px', fontSize: '24px', fontWeight: 'bold', color: 'black'}}>Update Form</h2>
                <h4 style={{ marginBottom: '16px', fontSize: '14px', color: '#4b5565'}}> Change all the nessecary fields and submit to change the data in the database</h4>

                <Divider style={{ marginBottom: '2rem', backgroundColor: '#eef2f6', width: '100%',}} />

                <Formik
                  initialValues={initialValues}
                  enableReinitialize
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({ values, errors, touched, handleChange, handleBlur, isSubmitting, setFieldValue,}) => (
                    <Form>

                    {/* Section 1 */}
  
                    <Typography variant='h6' gutterBottom style={{fontWeight:'600', fontSize: '16px', margin: '16px 0'}}>A. Company Details</Typography>
                    <Grid container spacing={2} alignItems='center'>
                      <Grid item size={{xs:12, md:2}}>
                        <Typography className="typography-label">Name: </Typography>
                      </Grid>
                        <Grid item size={{xs:12, md:10}}>
                          <Field
                            as={TextField}
                            fullWidth
                            placeholder="Enter Company"
                            variant="outlined"
                            className={classNames("textbox-root", {
                              error: touched.Company && errors.Company, 
                            })}
                            name="Company"
                            value={values.Company}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.Company && Boolean(errors.Company)}
                            helperText={touched.Company && errors.Company}
                          />
                        </Grid>

                      <Grid item size={{xs:12, md:2}}>
                        <Typography className="typography-label">Company Investor: </Typography>
                      </Grid>
                        <Grid item size={{xs:12, md:10}}>
                          <Field
                            as={TextField}
                            fullWidth
                            placeholder="Enter Company Investor"
                            variant="outlined"
                            className={classNames("textbox-root", {
                              error: touched.Company_Investor && errors.Company_Investor, 
                            })}
                            name="Company_Investor"
                            value={values.Company_Investor}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.Company_Investor && Boolean(errors.Company_Investor)}
                            helperText={touched.Company_Investor && errors.Company_Investor}
                          />
                        </Grid>

                      <Grid item size={{xs:12, md:2}}>
                        <Typography className="typography-label">Domicile: </Typography>
                      </Grid>
                        <Grid item size={{xs:12, md:10}}>
                          <Field
                            as={TextField}
                            fullWidth
                            placeholder="Enter Domicile"
                            variant="outlined"
                            className={classNames("textbox-root", {
                              error: touched.Domicile && errors.Domicile, 
                            })}
                            name="Domicile"
                            value={values.Domicile}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.Domicile && Boolean(errors.Domicile)}
                            helperText={touched.Domicile && errors.Domicile}
                          />
                        </Grid>

                      <Grid item size={{xs:12, md:2}}>
                        <Typography className="typography-label">Year of Operation: </Typography>
                      </Grid>
                        <Grid item size={{xs:12, md:10}}>
                          <Field
                            as={TextField}
                            fullWidth
                            placeholder="Enter Year Of Operation"
                            variant="outlined"
                            className={classNames("textbox-root", {
                              error: touched.Year_Of_Operation && errors.Year_Of_Operation, 
                            })}
                            name="Year_Of_Operation"
                            value={values.Year_Of_Operation}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.Year_Of_Operation && Boolean(errors.Year_Of_Operation)}
                            helperText={touched.Year_Of_Operation && errors.Year_Of_Operation}
                          />
                        </Grid>

                      <Grid item size={{xs:12, md:2}}>
                        <Typography className="typography-label">Business Type: </Typography>
                      </Grid>
                        <Grid item size={{xs:12, md:10}}>
                          <Field
                            as={TextField}
                            fullWidth
                            placeholder="Enter Business Type"
                            variant="outlined"
                            className={classNames("textbox-root", {
                              error: touched.Business && errors.Business, 
                            })}
                            name="Business"
                            value={values.Business}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.Business && Boolean(errors.Business)}
                            helperText={touched.Business && errors.Business}
                          />
                        </Grid>
                    </Grid>

                    <Divider style={{ margin: '2rem 0', backgroundColor: '#eef2f6', width: '100%',}} />
                    
                    {/* Section 2 */}

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Typography variant='h6' gutterBottom style={{fontWeight:'600', fontSize: '18px', margin: '16px 0'}}>B. Investment Details</Typography>
                      
                      <Grid container spacing={2} alignItems='center'>
                      <Grid item size={{xs:12, md:2}}>
                          <Typography className="typography-label">Percentage of Ownership: </Typography>
                        </Grid>
                        <Grid item size={{xs:12, md:10}}>
                          <Field
                            as={TextField}
                            fullWidth
                            placeholder="Enter Percentage of Ownership"
                            variant="outlined"
                            className={classNames("textbox-root", {
                              error: touched.Percentage_Ownership && errors.Percentage_Ownership, 
                            })}
                            name="Percentage_Ownership"
                            value={values.Percentage_Ownership}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.Percentage_Ownership && Boolean(errors.Percentage_Ownership)}
                            helperText={touched.Percentage_Ownership && errors.Percentage_Ownership}
                          /> 
                        </Grid>

                        <Grid item size={{xs:12, md:2}}>
                          <Typography className="typography-label">Revenue: </Typography>
                        </Grid>
                        <Grid item size={{xs:12, md:10}}>
                          <Field
                            as={TextField}
                            fullWidth
                            placeholder="Enter Revenue"
                            variant="outlined"
                            className={classNames("textbox-root", {
                              error: touched.Revenue && errors.Revenue, 
                            })}
                            name="Revenue"
                            value={values.Revenue}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.Revenue && Boolean(errors.Revenue)}
                            helperText={touched.Revenue && errors.Revenue}
                          />
                        </Grid>

                        <Grid item size={{xs:12, md:2}}>
                          <Typography className="typography-label">Expense: </Typography>
                        </Grid>
                        <Grid item size={{xs:12, md:10}}>
                          <Field
                            as={TextField}
                            fullWidth
                            placeholder="Enter Expense"
                            variant="outlined"
                            className={classNames("textbox-root", {
                              error: touched.Expense && errors.Expense, 
                            })}
                            name="Expense"
                            value={values.Expense}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.Expense && Boolean(errors.Expense)}
                            helperText={touched.Expense && errors.Expense}
                          />
                        </Grid>

                        <Grid item size={{xs:12, md:2}}>
                          <Typography className="typography-label">EBIDA: </Typography>
                        </Grid>
                        <Grid item size={{xs:12, md:10}}>
                          <Field
                            as={TextField}
                            fullWidth
                            placeholder="Enter EBIDA"
                            variant="outlined"
                            className={classNames("textbox-root", {
                              error: touched.Ebida && errors.Ebida, 
                            })}
                            name="Ebida"
                            value={values.Ebida}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.Ebida && Boolean(errors.Ebida)}
                            helperText={touched.Ebida && errors.Ebida}
                          />
                        </Grid>

                        <Grid item size={{xs:12, md:2}}>
                          <Typography className="typography-label">Tax Investment: </Typography>
                        </Grid>
                        <Grid item size={{xs:12, md:10}}>
                          <Field
                            as={TextField}
                            fullWidth
                            placeholder="Enter Tax Investment"
                            variant="outlined"
                            className={classNames("textbox-root", {
                              error: touched.Tax_Investment && errors.Tax_Investment, 
                            })}
                            name="Tax_Investment"
                            value={values.Tax_Investment}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.Tax_Investment && Boolean(errors.Tax_Investment)}
                            helperText={touched.Tax_Investment && errors.Tax_Investment}
                          />
                        </Grid>

                        <Grid item size={{xs:12, md:2}}>
                          <Typography className="typography-label">Price of Asset: </Typography>
                        </Grid>
                        <Grid item size={{xs:12, md:10}}>
                          <Field
                            as={TextField}
                            fullWidth
                            placeholder="Enter Price of Asset"
                            variant="outlined"
                            className={classNames("textbox-root", {
                              error: touched.Price_Asset && errors.Price_Asset, 
                            })}
                            name="Price_Asset"
                            value={values.Price_Asset}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.Price_Asset && Boolean(errors.Price_Asset)}
                            helperText={touched.Price_Asset && errors.Price_Asset}
                          />
                        </Grid>

                        <Grid item size={{xs:12, md:2}}>
                          <Typography className="typography-label">Price Liability: </Typography>
                        </Grid>
                        <Grid item size={{xs:12, md:10}}>
                          <Field
                              as={TextField}
                              fullWidth
                              placeholder="Enter Price Liability"
                              variant="outlined"
                              className={classNames("textbox-root", {
                                error: touched.Price_Liability && errors.Price_Liability, 
                              })}
                              name="Price_Liability"
                              value={values.Price_Liability}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.Price_Liability && Boolean(errors.Price_Liability)}
                              helperText={touched.Price_Liability && errors.Price_Liability}
                            />
                        </Grid>

                        <Grid item size={{xs:12, md:2}}>
                          <Typography className="typography-label">Equity: </Typography>
                        </Grid>
                        <Grid item size={{xs:12, md:10}}>
                        <Field
                              as={TextField}
                              fullWidth
                              placeholder="Enter Equity"
                              variant="outlined"
                              className={classNames("textbox-root", {
                                error: touched.Equity && errors.Equity, 
                              })}
                              name="Equity"
                              value={values.Equity}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.Equity && Boolean(errors.Equity)}
                              helperText={touched.Equity && errors.Equity}
                            />
                        </Grid>

                        <Grid item size={{xs:12, md:2}}>
                          <Typography className="typography-label">COGS: </Typography>
                        </Grid>
                        <Grid item size={{xs:12, md:10}}>
                        <Field
                              as={TextField}
                              fullWidth
                              placeholder="Enter COGS"
                              variant="outlined"
                              className={classNames("textbox-root", {
                                error: touched.COGS && errors.COGS, 
                              })}
                              name="COGS"
                              value={values.COGS}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.COGS && Boolean(errors.COGS)}
                              helperText={touched.COGS && errors.COGS}
                            />
                        </Grid>
                        
                        <Grid item size={{xs:12, md:2}}>
                          <Typography className="typography-label">Date of Ownership: </Typography>
                        </Grid>
                        <Grid item size={{xs:12, md:10}}>
                          <DatePicker
                            placeholder="Date of Ownership"
                            value={values.Date_Of_Ownership}
                            onChange={(newValue) => setFieldValue("Date_Of_Ownership", newValue)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                variant="outlined"
                                error={touched.Date_Of_Ownership && Boolean(errors.Date_Of_Ownership)}
                                helperText={touched.Date_Of_Ownership && errors.Date_Of_Ownership}
                                className="textbox-root"
                              />
                            )}
                          />
                        </Grid>
                        
                        <Grid item size={{xs:12}}>
                          <Box textAlign="right" mt={2}>
                            <Button variant="contained" type="submit" disabled={isSubmitting}
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
                    </Form>
                  )}
                </Formik>
              </Box>
            </div>
        </div>
      </div>
    </div>
    
    </>
  )}
}

export default UpdateInvestor