import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function InvestorForm() {
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

    const handleSubmit =async (e)=>{
        await axios.post("http://localhost:8080/api/post/investment",{
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

  return (
    <>
    <form onSubmit={handleSubmit}>
        <input type='text' value={Company} onChange={(e)=>setCompany(e.target.value)}/>
        <input type='text' value={Domicile} onChange={(e)=>setDomicile(e.target.value)}/>
        <input type='number' value={Year_Of_Operation} onChange={(e)=>setYear_Of_Operation(e.target.value)}/>
        <input type='text' value={Business} onChange={(e)=>setBusiness(e.target.value)}/>
        <input type='number' value={Percentage_Ownership} onChange={(e)=>setPercentage_Ownership(e.target.value)}/>
        <input type='number' value={Price_Asset} onChange={(e)=>setPrice_Asset(e.target.value)}/>
        <input type='date' value={Date_Of_Ownership} onChange={(e)=>setDate_Of_Ownership(e.target.value)}/>
        <button type='submit'>submit form</button>
    </form>
      
    </>
  )
}

export default InvestorForm