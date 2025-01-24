import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { format, subMonths, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { Stack, Chip, Select, MenuItem, FormControl, useMediaQuery, Divider} from '@mui/material';

const COGSVsRevenueGraph = () => {

    const [chartData, setChartData] = useState({
        categories: [],
        revenueData: [],
        cogsData: [],
    });

const [filter, setFilter] = useState('');
const [isHovered, setIsHovered] = useState(false);
const isSmallScreen = useMediaQuery('(max-width: 720px)');

useEffect(() => {
    const fetchData = async () => {

        if (!filter) {
            setChartData({ categories: [], revenueData: [], cogsData: []});
            return;
        }

        let startDate, endDate;

        switch (filter) {
            case 'this_month':
                startDate = format(startOfMonth(new Date()), 'dd-MM-yyyy');
                endDate = format(endOfMonth(new Date()), 'dd-MM-yyyy');
                break;
            case 'last_month':
                startDate = format(startOfMonth(subMonths(new Date(), 1)), 'dd-MM-yyyy');
                endDate = format(endOfMonth(subMonths(new Date(), 1)), 'dd-MM-yyyy');
                break;
            case 'last_90_days':
                startDate = format(subDays(new Date(), 90), 'dd-MM-yyyy');
                endDate = format(new Date(), 'dd-MM-yyyy');
                break;
            default:
                return;
        }
    
        try {
            const response = await axios.get(
                `http://localhost:8080/api/get/investment?start=${startDate}&end=${endDate}`
            );
            const data = response.data;
            const categories = data.map(item => item.Company);
            const revenueData = data.map(item => item.Revenue);
            const cogsData = data.map(item => item.COGS); 
            
            setChartData({ categories, revenueData, cogsData });
        } catch (error) {
            console.error(error);
        }
    };

    fetchData();
}, [filter]);

const options = {
    chart: {
        type: 'bar',
        stacked: true,
        toolbar: { show: true },
    },
    plotOptions: {
        bar: {
        horizontal: false,
        columnWidth: '60%',
        }
    }
    ,
    xaxis: {
        categories: chartData.categories,
        title: { text: 'Company' },
        labels: {
            style: {
                colors: '#6c757d', 
                fontSize: '12px',
            },
        }
    },
    yaxis: {
        title: { text: 'Amount (IDR)' },
        labels: {
            style: {
                colors: '#6c757d',
                fontSize: '12px',
            },
        },
    },
    colors: ['#00E396', '#05445e'],
    grid: {
        borderColor: '#e9ecef',
        strokeDashArray: 4,
    },
    dataLabels: {
        enabled: false,
    },
};

const series = [
    { name: 'Revenue', data: chartData.revenueData },
    { name: 'COGS', data: chartData.cogsData }, 
];

  return (
    <div style={{ 
        width: '100%', 
        borderColor: '#eceff1', 
        borderWidth: '1px',
        borderRadius: '8px',
        boxShadow: isHovered ? "0px 4px 8px rgba(0, 0, 0, 0.2)" : "none",
        transition: "box-shadow 0.3s ease",
        backgroundColor: 'white'
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
        <h3 style={{ margin:'14px', padding: "8px", fontSize: '18px', fontWeight: 'bold', color: '#364152'}}>COGS Vs Revenue</h3>

        <Divider style={{ marginBottom: '16px', backgroundColor: '#eceff1', width: '100%' }} />

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding:'0px 16px'}}>
            
            {!isSmallScreen && (
                <Stack spacing={1} direction="row">
                    <Chip label="Revenue" variant='outlined' sx={{ backgroundColor: '#00E396', color: 'black' }}/>
                    <Chip label='COGS' variant='outlined' sx={{ backgroundColor: '#05445e', color: 'white' }}/>
                </Stack>
            )}
                <FormControl style={{ width: isSmallScreen ? '100%' : '200px'}}
                sx={{
                    '.MuiOutlinedInput-root': {
                        borderRadius: '8px', 
                        backgroundColor: '#f8fafc', 
                    '& fieldset': {
                        borderColor: '#d3d3d3', 
                    },
                    '&:hover fieldset': {
                        borderColor: '#a3a3a3', 
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#5a5a5a', 
                        borderWidth: '2px', 
                    },
                    },
                    '.MuiSelect-select': {
                        padding: '10px 16px', 
                        fontSize: '16px', 
                        color: '#333',
                    },
                }}>
                    <Select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Filter By' }}
                    >
                        <MenuItem value="">No Data Selected</MenuItem>
                        <MenuItem value="this_month">This Month</MenuItem>
                        <MenuItem value="last_month">Last Month</MenuItem>
                        <MenuItem value="last_90_days">Last 90 Days</MenuItem>
                    </Select>
                </FormControl>
            </div>
            
            <div style={{padding:'16px'}}>
                <Divider style={{ marginBottom: '16px', backgroundColor: '#d3d3d3', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} />
            
                <Chart options={options} series={series} type="bar" height={450} />
            </div>
        </div>
  )
}

export default COGSVsRevenueGraph