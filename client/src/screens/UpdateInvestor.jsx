import { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams ,useNavigate} from 'react-router-dom'
import './styles/UpdateInvestor.css'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";

//components
import Sidebar from './global/Sidebar'
import Topbar from './global/Topbar'
import HeaderTitle from './global/HeaderTitle';

function UpdateInvestor() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const {id}= useParams();
    const navigate=useNavigate();

    const [investments, setInvestment] = useState({});

    const [Company, setCompany]= useState('');
    const [Domicile, setDomicile]= useState('');
    const [Year_Of_Operation,setYear_Of_Operation]= useState('');
    const [Business, setBusiness]= useState('');
    const [Percentage_Ownership,setPercentage_Ownership]= useState('');
    const [Price_Asset,setPrice_Asset]= useState('');
    const [Date_Of_Ownership, setDate_Of_Ownership]= useState('');

    useEffect(()=>{
        axios.get(`http://localhost:8080/api/get/investment/${id}`)
        .then(investments=>setInvestment(investments.data))
        .catch(err=>console.log(err));

        setCompany(investments.Company);
        setDomicile(investments.Domicile);
        setYear_Of_Operation(investments.Year_Of_Operation);
        setBusiness(investments.Business);
        setPercentage_Ownership(investments.Percentage_Ownership);
        setPrice_Asset(investments.Price_Asset);
        setDate_Of_Ownership(investments.Date_Of_Ownership);
    },[]
    )

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


    // console.log(investments)

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
    
    const handleSubmit =async (e)=>{
        
        await axios.put(`http://localhost:8080/api/update/investment/${id}`,{
            Company,
            Domicile,
            Year_Of_Operation,
            Business,
            Percentage_Ownership,
            Price_Asset,
            Date_Of_Ownership
        })
    .then(navigate('/investments'))
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
    <div className='flex min-h-screen h-auto'>
    {/* Sidebar */}
    <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
    
      {/* Topbar */}
      <div className='flex-1 flex flex-col'>
        <Topbar isSidebarOpen={isSidebarOpen}/>
            
        {/* Main Content */}
        <div className='px-8 py-4 flex-1 overflow-y-auto bg-[#eef2f6] rounded-lg'>
          <HeaderTitle title='Update Form' isSidebarOpen={isSidebarOpen}/>

          <form style={{ ...containerStyle(isSidebarOpen)}}  onSubmit={handleSubmit} className='form-box'>
            <table>
              <tr>
                <td className='form-field-name'>Company:</td>
                <td><input type='text' defaultValue={Company} onChange={(e)=>setCompany(e.target.value)} placeholder={investments.Company}/></td>
              </tr>
              <tr>
                <td className='form-field-name'>Domicile:</td>
                <td><input type='text' defaultValue={Domicile} onChange={(e)=>setDomicile(e.target.value)} placeholder={investments.Domicile}/></td>
              </tr>
              <tr>
                <td className='form-field-name'>Year of operation:</td>
                <td><input type='number' defaultValue={Year_Of_Operation} onChange={(e)=>setYear_Of_Operation(e.target.value)} placeholder={investments.Year_Of_Operation}/></td>
              </tr>
              <tr>
                <td className='form-field-name'>Business type:</td>
                <td><input type='text' defaultValue={Business} onChange={(e)=>setBusiness(e.target.value)} placeholder={investments.Business}/></td>
              </tr>
              <tr>
                <td className='form-field-name'>Percentage of Ownership:</td>
                <td><input type='number' defaultValue={Percentage_Ownership} onChange={(e)=>setPercentage_Ownership(e.target.value)} placeholder={investments.Percentage_Ownership}/></td>
              </tr>
              <tr>
                <td className='form-field-name'>Price of asset:</td>
                <td><input type='number' defaultValue={Price_Asset} onChange={(e)=>setPrice_Asset(e.target.value)} placeholder={investments.Price_Asset}/></td>
              </tr>
              <tr>
                <td className='form-field-name'>Date of Ownership:</td>
                <td><input type='date' defaultValue={Date_Of_Ownership} onChange={(e)=>setDate_Of_Ownership(e.target.value)} placeholder={investments.Date_Of_Ownership}/></td>
              </tr>
            </table> 
            <button type='submit'>update form</button>
          </form>
        </div>
      </div>
    </div>
    
    </>
  )}
}

export default UpdateInvestor