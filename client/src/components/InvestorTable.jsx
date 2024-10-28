import { useEffect, useState } from 'react'
import axios from 'axios';
import {format} from 'date-fns';

import './styles/InvestorTable.css';

function InvestorTable() {
  const [investments, setInvestment] = useState([]);
  const [Filter, setFilter]= useState('');
  const [FilterValue, setFilterValue]= useState('');
  const [inputType, setInputType]=useState('text');

  useEffect(()=>{
    if(Filter==''){
    axios.get("http://localhost:8080/api/get/investment")
    .then(investments=>setInvestment(investments.data))
    .catch(err=>console.log(err));
  }else{
    axios.get(`http://localhost:8080/api/get/investment/${Filter}/filter${FilterValue}`)
    .then(investments=>setInvestment(investments.data))
    .catch(err=>console.log(err));
    }
  })

    const deleteData=async(_id)=>{
      axios.delete(`http://localhost:8080/api/delete/investment/`+_id)
      .then(res=>console.log(res.data))
      .catch(err=>console.log(err));
      
    }


    const handleSubmit =async (e)=>{
      axios.get(`http://localhost:8080/api/get/investment/${Filter}/filter${FilterValue}`)
    .then(investments=>setInvestment(investments.data))
    .catch(err=>console.log(err));
  }

  const toggleInput = ()=>{
    if(Filter=='Company'||Filter=='Domicile'||Filter=='Business'){
      setInputType('text');
    }else if(Filter=='Year_Of_Operation'||Filter=='Percentage_Ownership'||Filter=='Price_Asset'){
      setInputType('number');
    }else if(Filter=='Date_Of_Ownership'){
      setInputType('date');
    }
    
  }

  return (
    <>
      <div className='header-container'>
        Set Filters
        <form onSubmit={handleSubmit}>        
        <select size="3">
        <option value={Filter} onClick={()=>setFilter('')}>No Filter</option>
          <option value={Filter} onClick={()=>setFilter('Company')}>company</option>
          <option value={Filter} onClick={()=>setFilter('Domicile')}>Domicile</option>
          <option value={Filter} onClick={()=>setFilter('Year_Of_Operation')}>Year_Of_Operation</option>
          <option value={Filter} onClick={()=>setFilter('Business')}>Busienss</option>
          <option value={Filter} onClick={()=>setFilter('Percentage_Ownership')}>Percentage_Ownership</option>
          <option value={Filter} onClick={()=>setFilter('Price_Asset')}>Price_Asset</option>
          <option value={Filter} onClick={()=>setFilter('Date_Of_Ownership')}>Date_Of_Ownership</option>
        </select>
        <input type={inputType} value={FilterValue} onChange={(e)=>setFilterValue(e.target.value)}/>
        </form>
        <button onClick={toggleInput}>go filter</button>
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
                  if(Filter==''){
                    return(
                    <>
                     <tr>
                        <td>{investment.Company}</td>
                        <td>{investment.Domicile}</td>
                        <td>{investment.Year_Of_Operation}</td>
                        <td>{investment.Business}</td>
                        <td>{investment.Percentage_Ownership}</td>
                        <td>{investment.Price_Asset}</td>
                        <td>{format(investment.Date_Of_Ownership,'dd-MM-yyyy')}</td>
                        <td><button type='button' onClick={()=>deleteData(investment._id)}>Delete</button></td>
                     </tr>
                    </>)
                  }else {
                      return(
                      <tr>
                        <td>{investment.Company}</td>
                        <td>{investment.Domicile}</td>
                        <td>{investment.Year_Of_Operation}</td>
                        <td>{investment.Business}</td>
                        <td>{investment.Percentage_Ownership}</td>
                        <td>{investment.Price_Asset}</td>
                        <td>{format(investment.Date_Of_Ownership,'dd-MM-yyyy')}</td>
                        <td><button type='button' onClick={()=>deleteData(investment._id)}>Delete</button></td>
                     </tr>)
                    
                  }
                })
                }
            </tbody>
        </table>
      </div>
    </>
  )
}

export default InvestorTable