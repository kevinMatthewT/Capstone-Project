import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { format, subMonths, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { Stack, Chip, Select, MenuItem, FormControl, InputLabel, Divider} from '@mui/material';

const PercentageOwnershipVsEquityGraph = () => {
  const [chartData, setChartData] = useState({
    ownershipData: [],
    equityData: [],
  });

  const [filter, setFilter] = useState("this_month");

  useEffect(() => {
    const fetchData = async () => {
      let startDate, endDate;

      switch (filter) {
        case "this_month":
          startDate = format(startOfMonth(new Date()), "dd-MM-yyyy");
          endDate = format(endOfMonth(new Date()), "dd-MM-yyyy");
          break;
        case "last_month":
          startDate = format(startOfMonth(subMonths(new Date(), 1)), "dd-MM-yyyy");
          endDate = format(endOfMonth(subMonths(new Date(), 1)), "dd-MM-yyyy");
          break;
        case "last_90_days":
          startDate = format(subDays(new Date(), 90), "dd-MM-yyyy");
          endDate = format(new Date(), "dd-MM-yyyy");
          break;
        default:
          return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/get/investment?start=${startDate}&end=${endDate}`
        );
        const data = response.data;

        const ownershipData = data.map((item) => item.Percentage_Ownership);
        const equityData = data.map((item) => item.Equity);

        setChartData({ ownershipData, equityData });
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
          colors: "#ef476f",
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
      colors: ["#90e0ef"],
      strokeColors: "black",
      strokeWidth: 2,
    },
    grid: {
      borderColor: "#e9ecef",
      strokeDashArray: 4,
    },
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        formatter: (val) => `${val} %`,
      },
      y: {
        formatter: (val) => `IDR ${val.toLocaleString()}`,
      },
    },
  };

  const series = [
    {
      name: "Ownership vs Equity",
      data: chartData.ownershipData.map((ownership, index) => ({
        x: ownership,
        y: chartData.equityData[index],
      })),
    },
  ];

  return (
    <div style={{ padding: "16px", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h4>Percentage Ownership vs. Equity</h4>
        <FormControl style={{ width: "200px" }}>
          <InputLabel>Filter By</InputLabel>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="this_month">This Month</MenuItem>
            <MenuItem value="last_month">Last Month</MenuItem>
            <MenuItem value="last_90_days">Last 90 Days</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Divider sx={{ my: 2, boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)" }} />
      <Stack spacing={1} direction="row" sx={{ mb: 2 }}>
        <Chip label="Ownership Percentage" sx={{ backgroundColor: '#ef476f', color: 'black' }} />
        <Chip label="Equity" sx={{ backgroundColor: '#073b4c', color: 'white' }} />
      </Stack>
      <Chart options={options} series={series} type="scatter" height={400} />
    </div>
  )
}

export default PercentageOwnershipVsEquityGraph