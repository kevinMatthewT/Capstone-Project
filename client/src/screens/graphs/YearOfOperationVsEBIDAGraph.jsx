import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { format, subMonths, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { Stack, Chip, Select, MenuItem, FormControl, InputLabel, Divider} from '@mui/material';

const YearOfOperationVsEBIDAGraph = () => {

    const [chartData, setChartData] = useState({
        categories: [],
        ebida: [],
    });
    
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
    
            const categories = data.map(item => item.Year_Of_Operation); // X-axis: Year of Operation
            const ebidaData = data.map(item => ({ x: item.Year_Of_Operation, y: item.Ebida })); // Scatter points
    
            setChartData({ categories, ebidaData });
        } catch (error) {
            console.error(error);
        }
    };
    
    fetchData();
    }, [filter]);
    
    const options = {
        chart: {
            type: 'scatter',
            toolbar: { show: true },
            zoom: { enabled: true },
        },
        xaxis: {
            title: { text: 'Years of Operation' },
            labels: {
            style: {
                colors: '#6c757d',
                fontSize: '12px',
                },
            },
        },
        yaxis: {
            title: { text: 'EBIDA (IDR)' },
            labels: {
                style: {
                    colors: '#2500E3',
                    fontSize: '12px',
                },
            },
        },
        colors: ['#008FFB'],
        grid: {
            borderColor: '#e9ecef',
            strokeDashArray: 4,
        },
        markers: {
            size: 6,
        },
        tooltip: {
            shared: false,
            intersect: true,
            x: { show: true },
            y: {
              formatter: value => `IDR ${value.toLocaleString()}`, // Formatting tooltip value
            },
        },
    };

    const series = [
        {
            name: 'EBIDA',
            data: chartData.ebidaData,
        },
    ];

    return (
    <div style={{ padding: '16px', width: '100%' }}>
        <h4>Year of Operation vs. EBIDA</h4>
        <FormControl style={{ marginBottom: '16px', width: '200px', float: 'right' }}>
            <InputLabel>Filter By</InputLabel>
            <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <MenuItem value="this_month">This Month</MenuItem>
            <MenuItem value="last_month">Last Month</MenuItem>
            <MenuItem value="last_90_days">Last 90 Days</MenuItem>
            </Select>
        </FormControl>
        <Divider style={{ margin: '16px 0', boxShadow: '0px 1px 4px rgba(0,0,0,0.1)' }} />
        <Stack spacing={1} direction="row" style={{ marginBottom: '16px' }}>
            <Chip label="EBIDA" sx={{ backgroundColor: '#2500E3', color: 'white' }} />
        </Stack>
        <Chart options={options} series={series} type="scatter" height={400} />
    </div>
    )
}

export default YearOfOperationVsEBIDAGraph