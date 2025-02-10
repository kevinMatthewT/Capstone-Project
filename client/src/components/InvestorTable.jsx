import { useEffect, useState } from 'react'
import axios from 'axios';
import {format} from 'date-fns';
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton'
import {Box, Button, Divider} from '@mui/material'

import './styles/InvestorTable.css';


const containerStyle = (isSidebarOpen) => ({
  width: `calc(100% - ${isSidebarOpen ? '256px' : '80px'})`,
  marginLeft: isSidebarOpen ? '256px' : '80px',
  transition: 'width 0.3s ease, margin-left 0.3s ease',
});

function CustomToolbar() {
  return (
    <GridToolbarContainer style={{  marginBottom:'16px', padding: '14px', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
    
      <Button
        variant="contained"
        className='grid-button'
      >
        <Box className='grid-button-box'>
          <GridToolbarExport />
        </Box>
      </Button>

      <Button
        variant="contained"
        className='grid-button'
      >
        <Box className='grid-button-box'>
          <GridToolbarColumnsButton />
        </Box>
      </Button>

      <Button
        variant="contained"
        className='grid-button'
      >
        <Box className='grid-button-box'>
          <GridToolbarFilterButton />
        </Box>
      </Button>

    
    <GridToolbarQuickFilter
      sx={{ marginLeft: 'auto', width: '200px',
        '& .MuiInputBase-root': {
            borderRadius: '8px',
            backgroundColor: '#fff',
            border: '2px solid',
            borderColor: '#eef2f6',
            padding: '4px 12px',
            '&:hover': {
              backgroundColor: '#eef2f6',
            },
          },
        '& .MuiInputBase-input': {
          fontSize: '12px',
          
        },
      }}
      quickFilterParser={(input) => input.split(',')}
      quickFilterFormatter={(values) => values.join(',')}
    />
  </GridToolbarContainer>
  );
}

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
            .then(res => {
              console.log(res.data);
              setInvestment(res.data);
            })
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
        { field: 'Percentage_Ownership', headerName: 'Percentage Ownership (%)', width: 190},
        { field: 'Revenue', headerName: 'Revenue', width: 175,
          
        },
        { field: 'Expense', headerName: 'Expense', width: 175,
    
        },
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
                <IconButton sx={{ color: '#009688', paddingBottom: '24px'}} onClick={() => navigate(`/investments/update/${params.id}`)}>
                  <EditIcon />
                </IconButton>
                <IconButton sx={{ color: '#d9534f', paddingBottom: '24px'}} onClick={() => deleteData(params.id)}>
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
      <Box sx={{
      ...containerStyle(isSidebarOpen), 
      backgroundColor: 'white',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
      borderRadius: 2, 
      mt: 2,
      p: 2
      }}>
        
        <Box sx={{ marginBottom: 2,}}>
          <h2 style={{ marginLeft:'16px' ,marginBottom:'4px', fontSize: '20px', fontWeight: 'bold', color: 'black'}}>Investment Data Grid</h2>
          <h4 style={{ marginLeft:'16px', marginBottom: '16px', fontSize: '14px', color: '#4b5565'}}> All investment data is being displayed in the data grid</h4>

          <Divider style={{ marginBottom: '1rem', backgroundColor: '#eef2f6',}} />

          <DataGrid
            rows={rows}
            columns={columns}
            slots={{ toolbar: CustomToolbar }}
            sx={{
              width: '100%',
              height: '500px',
              overflow: 'hidden',
              border:'1px solid white',
              '& .MuiDataGrid-columnHeaders': {
                color: '#364152',
                borderTop: '2px solid #364152',
                borderBottom: '2px solid #364152',
              },
              '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
                display: 'none',
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: "1px solid #eef2f6",
                backgroundColor: 'white',
              },
            }}
          />
        </Box>
    </Box>
  )
}

export default InvestorTable