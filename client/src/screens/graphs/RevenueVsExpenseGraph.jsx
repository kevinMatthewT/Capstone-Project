import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { Stack, Chip, Select, MenuItem, FormControl, Divider, useMediaQuery} from '@mui/material';

const RevenueVsExpenseGraph = () => {

    const [chartData, setChartData] = useState({
        categories: [],
        revenueData: [],
        expenseData: [],

    })

    const [filter, setFilter] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width: 720px)');

    useEffect(() => {
        const fetchData = async () => {

            if (!filter) {
                setChartData({ categories: [], revenueData: [], expenseData: []})
            }

            try {
                const response = await axios.get(
                    `http://localhost:8080/api/get/investment/filter/${filter}`
                );

                console.log("API Response:", response.data);

                const data = response.data || [];
                const categories = data.map(item => item.Company);
                const revenueData = data.map(item => item.Revenue);
                const expenseData = data.map(item => item.Expense);
        
                setChartData({ categories, revenueData, expenseData });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [filter]);

    const options = {
        chart: {
            type: 'bar',
            toolbar: { show: true },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '60%', 
                endingShape: 'rounded', 
            },
        },
        xaxis: {
            categories: chartData.categories,
            title: { text: 'Company' },
            labels: {
                style: {
                    colors: '#6c757d',
                    fontSize: '12px',
                },
            },
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
        colors: ['#00E396', '#FF4560'], 
        grid: {
            borderColor: '#e9ecef',
            strokeDashArray: 4,
        },
        dataLabels: {
            enabled: false, 
        },
        legend: {
            position: 'top',
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
            formatter: (value) => {
                return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
            },
            },
        },
    };
    
    const series = [
        { name: 'Revenue', data: chartData.revenueData },
        { name: 'Expense', data: chartData.expenseData },
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
            <h3 style={{ margin:'14px', padding: "8px", fontSize: '18px', fontWeight: 'bold', color: '#364152'}}>Revenue Vs Expense</h3>

            <Divider style={{ marginBottom: '16px', backgroundColor: '#eceff1', width: '100%' }} />

            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding:'0px 16px'}}>
                {!isSmallScreen && (
                    <Stack spacing={1} direction="row" >
                        <Chip label="Revenue" variant='outlined' sx={{ backgroundColor: '#00E396', color: 'black' }}/>
                        <Chip label='Expense' variant='outlined' sx={{ backgroundColor: '#FF4560', color: 'black' }}/>
                    </Stack> 
                )}

                <FormControl style={{  width: isSmallScreen ? '100%' : '200px'}}
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
                    inputProps={{'aria-label': 'Filter By'}}
                    >
                        <MenuItem value="">No Data Selected</MenuItem>
                        <MenuItem value="this_month">This Month</MenuItem>
                        <MenuItem value="last_month">Last Month</MenuItem>
                        <MenuItem value="last_90_days">Last 90 Days</MenuItem>
                    </Select>
                </FormControl>
            </div>
            
            <div style={{padding: '16px'}}>
                <Divider style={{ marginBottom: '16px', backgroundColor: '#eceff1', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }} />
                
                <Chart options={options} series={series} type="bar" height={450} />
            </div>
        </div>    
    )
}

export default RevenueVsExpenseGraph