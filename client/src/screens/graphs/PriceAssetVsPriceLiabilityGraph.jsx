import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { format, subMonths, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { Stack, Chip, Select, MenuItem, FormControl, InputLabel, Divider } from '@mui/material';

const PriceAssetVsPriceLiabilityGraph = () => {
  const [chartData, setChartData] = useState({
    categories: [],
    assetData: [],
    liabilityData: [],
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
        title: { text: 'Price Asset', style: { color: '#f28482' } },
        labels: { style: { colors: '#f28482' } },
      },
      {
        opposite: true,
        title: { text: 'Price Liability', style: { color: '#344e41' } },
        labels: { style: { colors: '#344e41' } },
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
    },
  };

  const series = [
    { name: 'Price Asset', type: 'column', data: chartData.assetData },
    { name: 'Price Liability', type: 'column', data: chartData.liabilityData },
  ];

  return (
    <div style={{ padding: '16px', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4>Price Asset vs. Price Liability</h4>
        <FormControl style={{ width: '200px' }}>
          <InputLabel>Filter By</InputLabel>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <MenuItem value="this_month">This Month</MenuItem>
            <MenuItem value="last_month">Last Month</MenuItem>
            <MenuItem value="last_90_days">Last 90 Days</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Divider sx={{ my: 2, boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }} />
      <Stack spacing={1} direction="row" sx={{ mb: 2 }}>
        <Chip label="Price Asset" sx={{ backgroundColor: '#f28482', color: 'black' }} />
        <Chip label="Price Liability" sx={{ backgroundColor: '#344e41', color: 'white' }} />
      </Stack>
      <Chart options={options} series={series} type="bar" height={500} />
    </div>
  )
}

export default PriceAssetVsPriceLiabilityGraph