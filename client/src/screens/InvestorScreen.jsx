import { useEffect, useState } from 'react'
import axios from 'axios';

function InvestorScreen() {
  const [investments, setInvestment] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:8080/api/get/investment")
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

    const deleteData=async(_id)=>{
      // console.log(id);
      axios.delete(`http://localhost:8080/api/delete/investment/`+_id)
      .then(res=>console.log(res.data))
      .catch(err=>console.log(err));
      // console.log(value);
      
    }

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

export default InvestorScreen