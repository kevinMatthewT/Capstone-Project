import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Chart from "react-apexcharts";
import {Stack, Chip, Select, MenuItem, FormControl, useMediaQuery, Divider,} from "@mui/material";

const TotalRevenueGraph = () => {

  const [chartData, setChartData] = useState({ categories: [], revenueData: []});
  const [filter, setFilter] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 720px)");

  useEffect(() => {
    const fetchData = async () => {
      if (!filter) {
          setChartData({ categories: [], revenueData: []});
          return;
      }
      try {
          const response = await axios.get(
              `http://localhost:8080/api/get/investment/filter/${filter}`
          );
          const data = response.data;

          const categories = data.map(item => item.Company);
          const revenueData = data.map(item => item.Revenue);

          setChartData({ categories, revenueData });
      } catch (error) {
          console.error(error);
      }
    };

    fetchData();
}, [filter]);

  const totalRevenue = chartData.revenueData.reduce((sum, val) => sum + val, 0);

  const options = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: true },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
      },
    },
    xaxis: {
      categories: chartData.categories,
      title: { text: "Company" },
      labels: {
        style: {
          colors: "#6c757d",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: { text: "Amount (IDR)" },
      labels: {
        style: {
          colors: "#6c757d",
          fontSize: "12px",
        },
      },
    },
    colors: ["#00E396", "#05445E"],
    grid: {
      borderColor: "#e9ecef",
      strokeDashArray: 4,
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    { name: "Revenue", data: chartData.revenueData },
    { name: "Company", data: chartData.categories },
  ];

  return (
    <div
      style={{
        width: "100%",
        borderColor: "#eceff1",
        borderWidth: "1px",
        borderRadius: "8px",
        boxShadow: isHovered
          ? "0px 4px 8px rgba(0, 0, 0, 0.2)"
          : "0px 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s ease",
        backgroundColor: "white",
        padding: "16px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2
        style={{
          margin: "0 0 16px",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#364152",
        }}
      >
        Total Revenue:{" "}
        {totalRevenue.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        })}
      </h2>

      <Divider style={{ marginBottom: '16px', backgroundColor: '#eceff1', width: '100%' }} />
      
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding:'0px 16px'}}>
                  
        {!isSmallScreen && (
          <Stack spacing={1} direction="row">
            <Chip label="Revenue" variant='outlined' sx={{ backgroundColor: '#00E396', color: 'black' }}/>
            <Chip label='Company' variant='outlined' sx={{ backgroundColor: '#05445e', color: 'white' }}/>
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
            <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Filter By' }}
            >
              <MenuItem value="">No Data Selected</MenuItem>
              <MenuItem value="this_month">This Month</MenuItem>
              <MenuItem value="last_month">Last Month</MenuItem>
            </Select>
        </FormControl>
      </div>
      
      <div style={{padding:'16px'}}>
        <Divider style={{ marginBottom: '16px', backgroundColor: '#d3d3d3', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} />
    
        <Chart options={options} series={series} type="bar" height={450} />
      </div>
    </div>
  )
}

export default TotalRevenueGraph