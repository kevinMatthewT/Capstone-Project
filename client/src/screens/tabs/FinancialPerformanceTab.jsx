import React from 'react'
import Graph1 from "../graphs/RevenueVsExpenseGraph";
import Graph2 from "../graphs/RevenueVsEBIDAGraph";
import Graph3 from "../graphs/COGSVsRevenueGraph";
import { Divider } from '@mui/material';


const FinancialPerformanceTab = () => {
  return (
    <div>
        <Graph1 />
          <Divider style={{ margin: '3rem 0rem', backgroundColor: '#697586'}} />
        <Graph2 />
          <Divider style={{ margin: '3rem 0rem', backgroundColor: '#697586'}} /> 
        <Graph3 />
    </div>
  )
}

export default FinancialPerformanceTab