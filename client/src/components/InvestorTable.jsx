import { useEffect, useState } from 'react'
import axios from 'axios';

import './styles/InvestorTable.css';

function InvestorTable() {
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

  return (
    <>
      <div className='header-container'>
        Filter
      </div>
      <div className='table-container'>
        <table className='table-investments'>
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Domicile</th>
                    <th>Year of operation</th>
                    <th>Business</th>
                    <th>Percentage_Ownership</th>
                    <th>Price_Asset</th>
                    <th>Date_Of_Ownership</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {investments.map(investment=>{
                  // const id_information=
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
                    </>)
                })
                }
            </tbody>
        </table>
      </div>
    </>
  )
}

export default InvestorTable