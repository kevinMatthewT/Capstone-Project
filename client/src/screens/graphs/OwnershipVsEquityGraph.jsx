import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { format, subMonths, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { Stack, Chip, Select, MenuItem, FormControl, useMediaQuery, Divider } from '@mui/material';

const OwnershipVsEquityGraph = () => {
  const [chartData, setChartData] = useState([]);
  const [filter, setFilter] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 720px)');

  useEffect(() => {
    const fetchData = async () => {

      if (!filter) {
        setChartData([])
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/get/investment/filter/${filter}`
        );
        const data = response.data;

        const equityData = data.map((item) => ({
          x: new Date(item.Date_Of_Ownership).toISOString(),
          y: item.Equity,
          company: item.Company,
        }));

        setChartData(equityData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [filter]);

  const options = {
    chart: {
      type: 'line',
      toolbar: { show: true },
      zoom: { enabled: true },
    },
    xaxis: {
      type: 'datetime',
      title: { text: 'Date of Ownership' },
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      title: { text: 'Equity (IDR)' },
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    colors: ['#FF4560'],
    grid: {
      borderColor: '#e9ecef',
      strokeDashArray: 4,
    },
    tooltip: {
      shared: false,
      x: {
        formatter: (val) => format(new Date(val), 'dd MMM yyyy'), // Format the date
      },
      y: {
        formatter: (val) => `IDR ${val.toLocaleString()}`, // Format the equity value
      },
      custom: ({ seriesIndex, dataPointIndex, w }) => {
        const pointData = w.globals.initialSeries[seriesIndex].data[dataPointIndex]; // Get the data for the specific point
        return `
          <div style="padding:10px;">
            <strong>${pointData.company}</strong><br/>
            Date: ${format(new Date(pointData.x), 'dd MMM yyyy')}<br/>
            Equity: IDR ${pointData.y.toLocaleString()}
          </div>
        `;
      }
    },
  };

  const series = [
    {
      name: 'Equity',
      data: chartData,
    },
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
      <h3 style={{ margin:'14px', padding: "8px", fontSize: '18px', fontWeight: 'bold', color: '#364152'}}>Date of Ownership vs. Equity</h3>
      
      <Divider style={{ marginBottom: '16px', backgroundColor: '#eceff1', width: '100%' }} />
      
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px'}}>
        {!isSmallScreen && (
          <Stack spacing={1} direction="row">
            <Chip label="Equity" sx={{ backgroundColor: '#FF4560', color: 'white' }} />
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
          <Select value={filter} onChange={(e) => setFilter(e.target.value)} displayEmpty inputProps={{ 'aria-label': 'Filter By' }}>
            <MenuItem value="">No Data Selected</MenuItem>
            <MenuItem value="this_month">This Month</MenuItem>
            <MenuItem value="last_month">Last Month</MenuItem>
            <MenuItem value="last_90_days">Last 90 Days</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div style={{padding:'16px'}}>
        <Divider style={{ marginBottom: '16px', backgroundColor: '#eceff1', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }} />
        <Chart options={options} series={series} type="line" height={400} />
      </div>
    </div>
  )
}

export default OwnershipVsEquityGraph