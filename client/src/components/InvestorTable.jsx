import { useEffect, useState } from 'react'
import axios from 'axios';
import {format} from 'date-fns';
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton'

// import './styles/InvestorTable.css';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <IconButton color='#009688' >CSV Export</IconButton>
    </GridToolbarContainer>
  )
}

const containerStyle = (isSidebarOpen) => ({
  width: `calc(100% - ${isSidebarOpen ? '256px' : '80px'})`,
  marginLeft: isSidebarOpen ? '256px' : '80px',
  transition: 'width 0.3s ease, margin-left 0.3s ease', // smooth matching animation
});

function InvestorTable({isSidebarOpen}) {
    const [investments, setInvestment] = useState([]);
    const [Filter, setFilter]= useState('');
    const [FilterValue, setFilterValue]= useState('');
    const [inputType, setInputType]=useState('text');

    const navigate=useNavigate();

    useEffect( () => {
        const url = Filter === ''
            ? 'http://localhost:8080/api/get/investment'
            : `http://localhost:8080/api/get/investment/${Filter}/filter${FilterValue}`;

        axios.get(url)
            .then(res => setInvestment(res.data))
        .catch(err => console.log(err));
    }, [Filter, FilterValue]);

    const deleteData = async (_id) => {
        axios.delete(`http://localhost:8080/api/delete/investment/`+_id)
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err));
    }


    const handleSubmit = async (e)=> {
        const url = `http://localhost:8080/api/get/investment/${Filter}/filter${FilterValue}`;
        axios.get(url)
        .then(investments=>setInvestment(investments.data))
        .catch(err=>console.log(err));
    }

    const toggleInput = () => {
        if(Filter==='Company'||Filter==='Domicile'||Filter==='Business'){
            setInputType('text');
        }   else if(Filter==='Year_Of_Operation'||Filter==='Percentage_Ownership'||Filter=='Price_Asset'){
            setInputType('number');
        }   else if(Filter==='Date_Of_Ownership'){
            setInputType('date');
        } 
    }

    const columns = [
        { field: 'Company', headerName: 'Company', flex: 1 },
        { field: 'Domicile', headerName: 'Domicile', flex: 1 },
        { field: 'Year_Of_Operation', headerName: 'Year of Operation', flex: 1 },
        { field: 'Business', headerName: 'Business', flex: 1 },
        { field: 'Percentage_Ownership', headerName: 'Percentage Ownership', flex: 1 },
        { field: 'Price_Asset', headerName: 'Price Asset', flex: 1 },
        { field: 'Date_Of_Ownership', headerName: 'Date of Ownership', flex: 1, 
          valueFormatter: (params) => {
            return params.value
            // return params.value ? format(new Date(params.value), 'dd-MM-yyyy') : ''; 
          }
        },
        {
            field: 'actions', 
            headerName: 'Actions', 
            renderCell: (params) => (
            <div>
                <IconButton color='#009688' onClick={() => navigate(`/investments/update/${params.id}`)}>
                  <EditIcon />
                </IconButton>
                <IconButton color='#d9534f' onClick={() => deleteData(params.id)}>
                  <DeleteIcon />
                </IconButton>
            </div>
            )
        }
    ];
    
    const rows = investments.map((investment) => ({
        id: investment._id,
        Company: investment.Company,
        Domicile: investment.Domicile,
        Year_Of_Operation: investment.Year_Of_Operation,
        Business: investment.Business,
        Percentage_Ownership: investment.Percentage_Ownership,
        Price_Asset: investment.Price_Asset,
        Date_Of_Ownership: investment.Date_Of_Ownership
          ? format(new Date(investment.Date_Of_Ownership), 'dd-MM-yyyy')
          : ''
    }));
    return (
    <>
    {/* <div className='header-container'>
        <p className='filter-text'>Set Filters</p>      
        <select size="3" className='filter-box'>
        <option value={Filter} onClick={()=>setFilter('')}>No Filter</option>
            <option value={Filter} onClick={()=>setFilter('Company')}>company</option>
            <option value={Filter} onClick={()=>setFilter('Domicile')}>Domicile</option>
            <option value={Filter} onClick={()=>setFilter('Year_Of_Operation')}>Year_Of_Operation</option>
            <option value={Filter} onClick={()=>setFilter('Business')}>Busienss</option>
            <option value={Filter} onClick={()=>setFilter('Percentage_Ownership')}>Percentage_Ownership</option>
            <option value={Filter} onClick={()=>setFilter('Price_Asset')}>Price_Asset</option>
            <option value={Filter} onClick={()=>setFilter('Date_Of_Ownership')} >Date_Of_Ownership</option>
        </select>
        <input type={inputType} value={FilterValue} onChange={(e)=>setFilterValue(e.target.value)} onClick={toggleInput} className='search-box'/>
        {/* <button onClick={toggleInput}>go filter</button>
        </div> */}
    <div style={{ ...containerStyle(isSidebarOpen), padding: '16px' }}>
      <div style={{ overflowY: 'auto', overflowX: 'auto', width: '100%', height: '600px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10} 
          rowsPerPageOptions={[10, 15, 25]}
          disableSelectionOnClick
          components={{ Toolbar: CustomToolbar }}
          style={{ minWidth: '900px' }}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-cell': {
              padding: '10px',
            },
          }}
        />
      </div>  
    </div>
    </>
)
}

export default InvestorTable