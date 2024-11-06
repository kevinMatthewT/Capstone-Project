import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";

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
    const [Domicile, setDomicile]= useState('');
    const [Year_Of_Operation,setYear_Of_Operation]= useState('');
    const [Business, setBusiness]= useState('');
    const [Percentage_Ownership,setPercentage_Ownership]= useState('');
    const [Price_Asset,setPrice_Asset]= useState('');
    const [Date_Of_Ownership, setDate_Of_Ownership]= useState('');


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
        Domicile,
        Year_Of_Operation,
        Business,
        Percentage_Ownership,
        Price_Asset,
        Date_Of_Ownership
    })
  .then(alert("New investment added"),navigate('/investments'))
  .catch(err=>console.log(err));
    }
    
    
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
            <HeaderTitle title='Investor Form' isSidebarOpen={isSidebarOpen}/>

            <div className=''>
              <form onSubmit={handleSubmit} className='form-box'>
                <table>
                  <tr>
                    <td className='form-field-name'>Company:</td>
                    <td><input type='text' value={Company} onChange={(e)=>setCompany(e.target.value)}/></td>
                  </tr>
                  <tr>
                    <td className='form-field-name'>Domicile:</td>
                    <td><input type='text' value={Domicile} onChange={(e)=>setDomicile(e.target.value)}/></td>
                  </tr>
                  <tr>
                    <td className='form-field-name'>Year of operation:</td>
                    <td><input type='number' value={Year_Of_Operation} onChange={(e)=>setYear_Of_Operation(e.target.value)}/></td>
                  </tr>
                  <tr>
                    <td className='form-field-name'>Business type:</td>
                    <td><input type='text' value={Business} onChange={(e)=>setBusiness(e.target.value)}/></td>
                  </tr>
                  <tr>
                    <td className='form-field-name'>Percentage of Ownership:</td>
                    <td><input type='number' value={Percentage_Ownership} onChange={(e)=>setPercentage_Ownership(e.target.value)}/></td>
                  </tr>
                  <tr>
                    <td className='form-field-name'>Price of asset:</td>
                    <td><input type='number' value={Price_Asset} onChange={(e)=>setPrice_Asset(e.target.value)}/></td>
                  </tr>
                  <tr>
                    <td className='form-field-name'>Date of Ownership:</td>
                    <td><input type='date' value={Date_Of_Ownership} onChange={(e)=>setDate_Of_Ownership(e.target.value)}/></td>
                  </tr>
                </table> 
                <button type='submit'>submit form</button>
              </form>
            </div>
          </div>
        </div>
    </div> 

      
        
      </>
    )}
}

export default InvestorForm