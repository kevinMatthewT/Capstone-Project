import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { format, subMonths, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { Stack, Chip, Select, MenuItem, FormControl, InputLabel, Divider} from '@mui/material';

const YearOfOperationVsRevenueGraph = () => {

  const [chartData, setChartData] = useState({
    categories: [],
    revenue: [],
  });

  const [filter, setFilter] = useState('this_month');

  useEffect(() => {
    const fetchData = async () => {
      let startDate, endDate;

      switch (filter) {
        case 'this_month':
          startDate = format(startOfMonth(new Date()), 'yyyy-MM-dd');
          endDate = format(endOfMonth(new Date()), 'yyyy-MM-dd');
          break;
        case 'last_month':
          startDate = format(startOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd');
          endDate = format(endOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd');
          break;
        case 'last_90_days':
          startDate = format(subDays(new Date(), 90), 'yyyy-MM-dd');
          endDate = format(new Date(), 'yyyy-MM-dd');
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
        const revenueData = data.map(item => item.Revenue); // Y-axis: Revenue

        setChartData({ categories, revenueData });
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
    },
    xaxis: {
      categories: chartData.categories,
      title: { text: 'Years of Operation' },
      labels: {
        style: {
          colors: '#6c757d',
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      title: { text: 'Revenue (IDR)' },
      labels: {
        style: {
          colors: '#2500E3',
          fontSize: '12px',
        },
      },
    },
    colors: ['#00E396'],
    grid: {
      borderColor: '#e9ecef',
      strokeDashArray: 4,
    },
    markers: {
      size: 4,
      colors: ['#00E396'],
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
          formatter: value => `IDR ${value.toLocaleString()}`, // Formatting tooltip value
        },
      },
  };

  const series = [
    {
      name: 'Revenue',
      data: chartData.revenueData,
      },
  ];

  return (
    <div style={{ padding: '16px', width: '100%' }}>
      <h4>Year of Operation vs. Revenue</h4>
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
          <Chip label="Revenue" sx={{ backgroundColor: '#00E396', color: 'white' }} />
        </Stack>
        <Chart options={options} series={series} type="line" height={400} />
    </div>
  )
}

export default YearOfOperationVsRevenueGraph