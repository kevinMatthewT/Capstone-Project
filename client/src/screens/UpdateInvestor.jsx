import { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams ,useNavigate} from 'react-router-dom'

function UpdateInvestor() {
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


    // console.log(investments)


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

  return (
    <>
    <form onSubmit={handleSubmit}>
        <input type='text' defaultValue={Company} onChange={(e)=>setCompany(e.target.value)} placeholder={investments.Company}/>
        <input type='text' defaultValue={Domicile} onChange={(e)=>setDomicile(e.target.value)} placeholder={investments.Domicile}/>
        <input type='number' defaultValue={Year_Of_Operation} onChange={(e)=>setYear_Of_Operation(e.target.value)} placeholder={investments.Year_Of_Operation}/>
        <input type='text' defaultValue={Business} onChange={(e)=>setBusiness(e.target.value)} placeholder={investments.Business}/>
        <input type='number' defaultValue={Percentage_Ownership} onChange={(e)=>setPercentage_Ownership(e.target.value)} placeholder={investments.Percentage_Ownership}/>
        <input type='number' defaultValue={Price_Asset} onChange={(e)=>setPrice_Asset(e.target.value)} placeholder={investments.Price_Asset}/>
        <input type='date' defaultValue={Date_Of_Ownership} onChange={(e)=>setDate_Of_Ownership(e.target.value)} placeholder={investments.Date_Of_Ownership}/>
        <button type='submit'>update form</button>
    </form>
    </>
  )
}

export default UpdateInvestor