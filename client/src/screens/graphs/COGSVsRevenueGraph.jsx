import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { format, subMonths, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { Stack, Chip, Select, MenuItem, FormControl, InputLabel, Divider} from '@mui/material';

const COGSVsRevenueGraph = () => {

  const [chartData, setChartData] = useState({
    categories: [],
    revenueData: [],
    cogsData: [],
})

const [filter, setFilter] = useState('this_month');

useEffect(() => {
    const fetchData = async () => {
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
        columnWidth: '50%',
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
    
};

const series = [
    { name: 'Revenue', data: chartData.revenueData },
    { name: 'COGS', data: chartData.cogsData }, 
];

  return (
    <div style={{ padding: '16px', width: '100%', height:'400px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                <h4 style={{ margin: 0}}>COGS Vs Revenue</h4>
                <FormControl style={{ width: '200px'}}>
                    <InputLabel>Filter By</InputLabel>
                    <Select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    >
                        <MenuItem value="this_month">This Month</MenuItem>
                        <MenuItem value="last_month">Last Month</MenuItem>
                        <MenuItem value="last_90_days">Last 90 Days</MenuItem>
                    </Select>
                </FormControl>
            </div>
            
            <Divider style={{ marginBottom: '16px', backgroundColor: '#d3d3d3', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} />

            <Stack spacing={1} direction="row" style={{ marginBottom: '16px' }}>
                <Chip label="Revenue" variant='outlined' sx={{ backgroundColor: '#00E396', color: 'black' }}/>
                <Chip label='COGS' variant='outlined' sx={{ backgroundColor: '#05445e', color: 'white' }}/>
            </Stack>
            
            <Chart options={options} series={series} type="bar" height={450} />
        </div>
  )
}

export default COGSVsRevenueGraph