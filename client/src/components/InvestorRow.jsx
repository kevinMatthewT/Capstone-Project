import { useEffect, useState } from 'react'
import axios from 'axios';

function InvestorRow() {

    const [investments, setInvestment] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8080/api/get/investment")
    .then(investments=>setInvestment(investments.data))
    .catch(err=>console.log(err));
    })

    const deleteData=async(_id)=>{
      axios.delete(`http://localhost:8080/api/delete/investment/`+_id)
      .then(res=>console.log(res.data))
      .catch(err=>console.log(err));
      
    }

    return(
    <>
    {investments.map(investment=>{
        return(
    <>
     <tr>
        <td>{investment.Company}</td>
        <td>{investment.Domicile}</td>
        <td>{investment.Year_Of_Operation}</td>
        <td>{investment.Business}</td>
        <td>{investment.Percentage_Ownership}</td>
        <td>{investment.Price_Asset}</td>
        <td>{investment.Date_Of_Ownership}</td>
        <td><button type='button' onClick={()=>deleteData(investment._id)}>Delete</button></td>
     </tr>
    </>)})}
    </>)
}

export default InvestorRow