import { useEffect, useState } from 'react'
import axios from 'axios';
import {format} from 'date-fns';
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton'
import {Box} from '@mui/material'

// import './styles/InvestorTable.css';

function CustomToolbar() {
  return (
    <GridToolbarContainer style={{ padding: '8px', backgroundColor: '#f9f9f9', height: '50px', display: 'flex', justifyContent: 'space-between' }}>
    <GridToolbarExport />
    <GridToolbarColumnsButton />
    <GridToolbarFilterButton />
    <GridToolbarQuickFilter
      quickFilterParser={(input) => input.split(',')}
      quickFilterFormatter={(values) => values.join(',')}
    />
  </GridToolbarContainer>
  );
}

const containerStyle = (isSidebarOpen) => ({
  width: `calc(100% - ${isSidebarOpen ? '256px' : '80px'})`,
  marginLeft: isSidebarOpen ? '256px' : '80px',
  transition: 'width 0.3s ease, margin-left 0.3s ease',
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
        { field: 'Company', headerName: 'Company', width: 175},
        { field: 'Company_Investor', headerName: 'Company Investor', width: 175},
        { field: 'Domicile', headerName: 'Domicile', width: 175},
        { field: 'Year_Of_Operation', headerName: 'Year of Operation', width: 175},
        { field: 'Business', headerName: 'Business', width: 175},
        { field: 'Percentage_Ownership', headerName: 'Percentage Ownership', width: 175},
        { field: 'Revenue', headerName: 'Revenue', width: 175},
        { field: 'Expense', headerName: 'Expense', width: 175},
        { field: 'Ebida', headerName: 'Ebida', width: 175},
        { field: 'Tax_Investment', headerName: 'Tax Investment', width: 175},
        { field: 'Price_Asset', headerName: 'Price Asset', width: 175},
        { field: 'Price_Liability', headerName: 'Price Liability', width: 175},
        { field: 'Equity', headerName: 'Equity', width: 175},
        { field: 'COGS', headerName:'COGS', width: 175},
        { field: 'Date_Of_Ownership', headerName: 'Date of Ownership', width: 175,
          valueFormatter: (params) => {
            return params.value
            // return params.value ? format(new Date(params.value), 'dd-MM-yyyy') : ''; 
          }
        },
        {
            field: 'actions', 
            headerName: 'Actions', 
            width: 125,
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
      <Box sx={{ ...containerStyle(isSidebarOpen), paddingTop: '16px' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[25, 50, 100]}
        components={{ Toolbar: CustomToolbar }}
        sx={{
          width: '100%',
          height: '500px',
          borderRadius: '8px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          '& .MuiDataGrid-root': {
            border: "none",
          },
          '& .MuiDataGrid-toolbarContainer': {
            backgroundColor: '#f0f0f0',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'blue',
            fontWeight: 'bold',
            borderBottom: '1px solid black',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
            padding: '15px',
          },
          '& .MuiDataGrid-virtualScroller': {
            overflowX: 'auto',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: "none",
            backgroundColor: 'gray',
          },
        }}
      />
    </Box>
  )
}

export default InvestorTable