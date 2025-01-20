import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import { Select, MenuItem, FormControl, InputLabel, Divider, Stack, Chip } from '@mui/material';

const RevenueVsEBIDAGraph = () => {
  const [chartData, setChartData] = useState([]);
  const [filter, setFilter] = useState('this_month');

  useEffect(() => {
    const fetchData = async () => {
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

        const formattedData = data.map(item => ({
          x: item.Revenue,
          y: item.Ebida,
          company: item.Company
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
      labels: { formatter: value => `${value.toLocaleString()}` },
    },
    yaxis: {
      title: { text: 'EBIDA (IDR)' },
      labels: { formatter: value => `${value.toLocaleString()}` },
    },
    tooltip: {
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const pointData = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        return `<div style="padding:10px;"><strong>${pointData.company}</strong><br/>Revenue: ${pointData.x}<br/>EBIDA: ${pointData.y}</div>`;
      }
    },
    markers: {
      size: 6,
      colors: ['#00E396']
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
    <div style={{ padding: '16px', width: '100%', height: '450px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h4 style={{ margin: 0 }}>Revenue Vs EBIDA</h4>
        <FormControl style={{ width: '200px' }}>
          <InputLabel>Filter By</InputLabel>
            <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <MenuItem value="this_month">This Month</MenuItem>
              <MenuItem value="last_month">Last Month</MenuItem>
              <MenuItem value="last_90_days">Last 90 Days</MenuItem>
            </Select>
        </FormControl>
      </div>

      <Divider style={{ marginBottom: '16px', backgroundColor: '#d3d3d3', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} />

      <Stack spacing={1} direction="row" style={{ marginBottom: '16px' }}>
        <Chip label="Revenue" variant="outlined" sx={{ backgroundColor: '#00E396', color: 'black' }} />
        <Chip label="EBIDA" variant="outlined" sx={{ backgroundColor: '#2500E3', color: 'white' }} />
      </Stack>

      <Chart options={options} series={series} type="scatter" height={450} />
    </div>
  )
}

export default RevenueVsEBIDAGraph