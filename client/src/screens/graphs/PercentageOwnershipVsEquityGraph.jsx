import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { format, subMonths, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { Stack, Chip, Select, MenuItem, FormControl, useMediaQuery, Divider} from '@mui/material';

const PercentageOwnershipVsEquityGraph = () => {
  const [chartData, setChartData] = useState({
    ownershipData: [],
    equityData: [],
    companyData: [],
  });

  const [filter, setFilter] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 720px)');

  useEffect(() => {
    const fetchData = async () => {

      if (!filter) {
        setChartData({ ownershipData: [], equityData: [], companyData: []})
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/get/investment/filter/${filter}`

        );
        const data = response.data;

        const ownershipData = data.map((item) => item.Percentage_Ownership);
        const equityData = data.map((item) => item.Equity);
        const companyData = data.map((item) => item.Company)

        setChartData({ ownershipData, equityData, companyData});
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [filter]);

  const options = {
    chart: {
      type: "scatter",
      toolbar: { show: true },
      zoom: { enabled: true },
    },
    xaxis: {
      title: { text: "Percentage Ownership (%)" },
      labels: {
        style: {
          colors: "#073b4c",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: { text: "Equity (IDR)" },
      labels: {
        style: {
          colors: "#073b4c",
          fontSize: "12px",
        },
      },
    },
    colors: ["#073b4c"],
    markers: {
      size: 6,
      colors: ["#ef476f"],
      strokeColors: "#073b4c",
      strokeWidth: 1,
    },
    grid: {
      borderColor: "#e9ecef",
      strokeDashArray: 4,
    },
    tooltip: {
      shared: false,
      intersect: true,
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const company = w.globals.initialSeries[seriesIndex].data[dataPointIndex].company;
        const ownership = w.globals.initialSeries[seriesIndex].data[dataPointIndex].x;
        const equity = w.globals.initialSeries[seriesIndex].data[dataPointIndex].y;

        return `<div style="padding:10px;">
                  <strong>${company}</strong><br/>
                  Ownership: ${ownership} %<br/>
                  Equity: IDR ${equity.toLocaleString()}
                </div>`;
      },
    },
  };

  const series = [
    {
      name: "Ownership vs Equity",
      data: chartData.ownershipData.map((ownership, index) => ({
        x: ownership,
        y: chartData.equityData[index],
        company: chartData.companyData[index],
      })),
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
      <h3 style={{ margin:'14px', padding: "8px", fontSize: '18px', fontWeight: 'bold', color: '#364152'}}>Percentage Ownership vs. Equity</h3>
      
      <Divider style={{ marginBottom: '16px', backgroundColor: '#eceff1', width: '100%' }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" , padding: '0 16px'}}>
        {!isSmallScreen && (
          <Stack spacing={1} direction="row">
            <Chip label="Ownership Percentage" sx={{ backgroundColor: '#ef476f', color: 'white' }} />
            <Chip label="Equity" sx={{ backgroundColor: '#073b4c', color: 'white' }} />
          </Stack>
        )}
        <FormControl style={{  width: isSmallScreen ? '100%' : '200px' }}
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
            inputProps={{ 'aria-label' : 'Filter By'}}
          >
            <MenuItem value="">No Data Selected</MenuItem>
            <MenuItem value="this_month">This Month</MenuItem>
            <MenuItem value="last_month">Last Month</MenuItem>
            <MenuItem value="last_90_days">Last 90 Days</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div style={{ padding: '16px' }}>
        
        <Divider style={{ marginBottom: '16px', backgroundColor: '#eceff1', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }} />

        <Chart options={options} series={series} type="scatter" height={400} />
        
      </div>
    </div>
  )
}

export default PercentageOwnershipVsEquityGraph