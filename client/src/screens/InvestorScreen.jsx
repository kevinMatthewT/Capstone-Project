import { useEffect, useState } from 'react'
import axios from 'axios';

function InvestorScreen() {
  const [investments, setInvestment] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:8080/api/get/investments")
    .then(investments=>setInvestment(investments.data))
    .catch(err=>console.log(err));
    })
    // Company
    // Domicile
    // Year_Of_Operation
    // Business
    // Percentage_Ownership
    // Price_Asset
    // Date_Of_Ownership

  return (
    <>
      <div>
        <table>
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Domicile</th>
                    <th>Year_Of_Operation</th>
                    <th>Business</th>
                    <th>Percentage_Ownership</th>
                    <th>Price_Asset</th>
                    <th>Date_Of_Ownership</th>
                </tr>
            </thead>
            <tbody>
                {investments.map(investment=>{
                    return(
                    <tr>
                        <th>{investment.Company}</th>
                        <th>{investment.Domicile}</th>
                        <th>{investment.Year_Of_Operation}</th>
                        <th>{investment.Business}</th>
                        <th>{investment.Percentage_Ownership}</th>
                        <th>{investment.Price_Asset}</th>
                        <th>{investment.Date_Of_Ownership}</th>
                    </tr>)
                })
                }
            </tbody>
        </table>
      </div>
    </>
  )
}

export default InvestorScreen