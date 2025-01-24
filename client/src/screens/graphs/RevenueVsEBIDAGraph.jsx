import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import { Select, MenuItem, FormControl, Divider, Stack, Chip, useMediaQuery } from '@mui/material';

const RevenueVsEBIDAGraph = () => {
  const [chartData, setChartData] = useState([]);
  const [filter, setFilter] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 720px)');

  useEffect(() => {
    const fetchData = async () => {

      if (!filter) {
        setChartData([])
      }

      let startDate, endDate;

      switch (filter) {
        case 'this_month':
          startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
          endDate = new Date().toISOString().split('T')[0];
        break;
        case 'last_month':
          const lastMonthStart = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
          startDate = lastMonthStart.toISOString().split('T')[0];
          endDate = new Date(lastMonthStart.getFullYear(), lastMonthStart.getMonth() + 1, 0).toISOString().split('T')[0];
          break;
        case 'last_90_days':
          startDate = new Date(new Date().setDate(new Date().getDate() - 90)).toISOString().split('T')[0];
          endDate = new Date().toISOString().split('T')[0];
        break;
        default:
      return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/get/investment?start=${startDate}&end=${endDate}`);
        const data = response.data;

        const formattedData = data
        .filter(item => item.Revenue !== null && item.Ebida !== null) // Remove null/undefined values
        .map(item => ({
          x: item.Revenue,
          y: item.Ebida,
          company: item.Company,
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filter]);

  const options = {
    chart: {
      type: 'scatter',
      height: 350,
      toolbar: { show: true },
      zoom: {
        type: 'xy',
      },
    },
    xaxis: {
      title: { text: 'Revenue (IDR)' },
      labels: { formatter: (value) => value ? `${value.toLocaleString()}` : "N/A" },
    },
    yaxis: {
      title: { text: 'EBIDA (IDR)' },
      labels: { formatter: (value) => value ? `${value.toLocaleString()}` : "N/A" },
    },
    tooltip: {
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const pointData = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        return `<div style="padding:10px;"><strong>${pointData.company}</strong><br/>Revenue: ${pointData.x}<br/>EBIDA: ${pointData.y}</div>`;
      }
    },
    markers: {
      size: 6,
      colors: ['#00E396'],
      strokeColors: "#2500E3",
      strokeWidth: 1,
    },
    grid: {
      borderColor: '#e9ecef',
      strokeDashArray: 4,
    },
  };

  const series = [{
    name: 'Revenue vs EBIDA',
    data: chartData,
  }];

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
      <h3 style={{ margin:'14px', padding: "8px", fontSize: '18px', fontWeight: 'bold', color: '#364152' }}>Revenue Vs EBIDA</h3>

        <Divider style={{ marginBottom: '16px', backgroundColor: '#eceff1', width: '100%' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding:'0px 16px'}}>

          {!isSmallScreen && (
            <Stack spacing={1} direction="row">
              <Chip label="Revenue" variant="outlined" sx={{ backgroundColor: '#00E396', color: 'black' }} />
              <Chip label="EBIDA" variant="outlined" sx={{ backgroundColor: '#2500E3', color: 'white' }} />
            </Stack>
          )}
          
          <FormControl style={{ width: isSmallScreen ? '100%' : '200px' }}
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
              <Select value={filter} onChange={(e) => setFilter(e.target.value)} displayEmpty inputProps={{ 'aria-label': 'Filter By'}}>
                <MenuItem value="">No Data Selected</MenuItem>
                <MenuItem value="this_month">This Month</MenuItem>
                <MenuItem value="last_month">Last Month</MenuItem>
                <MenuItem value="last_90_days">Last 90 Days</MenuItem>
              </Select>
          </FormControl>
        </div>

      <div style={{padding: '16px'}}>
        <Divider style={{ marginBottom: '16px', backgroundColor: '#d3d3d3', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }} />

        <Chart options={options} series={series} type="scatter" height={450} /> 
      </div>
    </div>
  )
}

export default RevenueVsEBIDAGraph