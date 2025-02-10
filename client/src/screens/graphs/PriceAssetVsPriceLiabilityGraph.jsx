import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { format, subMonths, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { Stack, Chip, Select, MenuItem, FormControl, useMediaQuery, Divider } from '@mui/material';

const PriceAssetVsPriceLiabilityGraph = () => {
  const [chartData, setChartData] = useState({
    categories: [],
    assetData: [],
    liabilityData: [],
  });

  const [filter, setFilter] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 720px)');

  useEffect(() => {
    const fetchData = async () => {

      if (!filter) {
        setChartData({ categories: [], assetData: [], liabilityData: []})
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/get/investment/filter/${filter}`
        );
        const data = response.data;
        const categories = data.map((item) => item.Company);
        const assetData = data.map((item) => item.Price_Asset);
        const liabilityData = data.map((item) => item.Price_Liability);

        setChartData({ categories, assetData, liabilityData });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [filter]);

  const options = {
    chart: {
      type: 'bar',
      toolbar: { show: true },
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
    yaxis: [
      {
        title: { text: 'Price Asset'},
      },
      {
        opposite: true,
        title: { text: 'Price Liability'},
      },
    ],
    colors: ['#f28482', '#344e41'], 
    grid: {
      borderColor: '#e9ecef',
      strokeDashArray: 4,
    },
    legend: { position: 'top', horizontalAlign: 'center' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    { name: 'Price Asset', type: 'column', data: chartData.assetData },
    { name: 'Price Liability', type: 'column', data: chartData.liabilityData },
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
      <h3 style={{ margin:'14px', padding: "8px", fontSize: '18px', fontWeight: 'bold', color: '#364152'}}>Price Asset vs. Price Liability</h3>
      
      <Divider style={{ marginBottom: '16px', backgroundColor: '#eceff1', width: '100%' }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding:'0 16px'}}>
        {!isSmallScreen && (
          <Stack spacing={1} direction="row">
            <Chip label="Price Asset" sx={{ backgroundColor: '#f28482', color: 'black' }} />
            <Chip label="Price Liability" sx={{ backgroundColor: '#344e41', color: 'white' }} />
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
          <Select value={filter} onChange={(e) => setFilter(e.target.value)} displayEmpty inputProps={{ 'aria-label': 'Filter By'}}>
            <MenuItem value="">No Data Selected</MenuItem>
            <MenuItem value="this_month">This Month</MenuItem>
            <MenuItem value="last_month">Last Month</MenuItem>
            <MenuItem value="last_90_days">Last 90 Days</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div style={{ padding: '16px'}}>
        <Divider style={{ marginBottom: '16px', backgroundColor: '#eceff1', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }} />
        <Chart options={options} series={series} type="bar" height={500} />
      </div>
    </div>
  )
}

export default PriceAssetVsPriceLiabilityGraph