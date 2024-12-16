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
import { Search } from '@mui/icons-material';

// import './styles/InvestorTable.css';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <IconButton sx={{ color: '#009688' }} >
        <SaveIcon /> 
        CSV Export
      </IconButton>
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
        { field: 'Company_Investor', headerName: 'Company Investor', flex: 1 },
        { field: 'Domicile', headerName: 'Domicile', flex: 1 },
        { field: 'Year_Of_Operation', headerName: 'Year of Operation', flex: 1 },
        { field: 'Business', headerName: 'Business', flex: 1.5 },
        { field: 'Percentage_Ownership', headerName: 'Percentage Ownership', flex: 1 },
        { field: 'Revenue', headerName: 'Revenue', flex: 1 },
        { field: 'Expense', headerName: 'Expense', flex: 1 },
        { field: 'Ebida', headerName: 'Ebida', flex: 1 },
        { field: 'Tax_Investment', headerName: 'Tax Investment', flex: 1 },
        { field: 'Price_Asset', headerName: 'Price Asset', flex: 1 },
        { field: 'Price_Liability', headerName: 'Price Liability', flex: 1 },
        { field: 'Equity', headerName: 'Equity', flex: 1 },
        { field: 'COGS', headerName:'COGS', flex:1},
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
                <IconButton sx={{ color: '#009688' }} onClick={() => navigate(`/investments/update/${params.id}`)}>
                  <EditIcon />
                </IconButton>
                <IconButton sx={{ color: '#d9534f' }} onClick={() => deleteData(params.id)}>
                  <DeleteIcon />
                </IconButton>
            </div>
            )
        }
    ];
    
    const rows = investments.map((investment) => ({
        id: investment._id,
        Company: investment.Company,
        Company_Investor: investment.Company_Investor,
        Domicile: investment.Domicile,
        Year_Of_Operation: investment.Year_Of_Operation,
        Business: investment.Business,
        Percentage_Ownership: investment.Percentage_Ownership,
        Revenue: investment.Revenue,
        Expense: investment.Expense,
        Ebida: investment.Ebida,
        Tax_Investment: investment.Tax_Investment,
        Price_Asset: investment.Price_Asset,
        Price_Liability: investment.Price_Liability,
        Equity: investment.Equity,
        COGS:investment.COGS,
        Date_Of_Ownership: investment.Date_Of_Ownership
          ? format(new Date(investment.Date_Of_Ownership), 'dd-MM-yyyy')
          : ''
    }));
    return (
    <>
    <div style={{ ...containerStyle(isSidebarOpen), padding: '16px 0' }}>
      <div style={{ width: '100%', height: '600px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10} 
          rowsPerPageOptions={[10, 15, 25]}
          disableSelectionOnClick
          components={{ Toolbar: CustomToolbar }}
          style={{ width: '100%', height: '100%' }}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'white',
              fontWeight: 'bold',
              borderBottom: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
              padding: '15px',
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: '#EEEEEE', 
              overflowY: 'auto',
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: 'white', // Adjust as needed
            },
            "& .MuiCheckbox-root": {
              color: '#A0E7E5 !important', // Adjust as needed
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: '#FFFFFF !important', // Adjust as needed
            }
          }}
        />
      </div>  
    </div>
    </>
)
}

export default InvestorTable