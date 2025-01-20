import React from 'react'
import Graph1 from "../graphs/RevenueVsExpenseGraph";
import Graph2 from "../graphs/RevenueVsEBIDAGraph";
import Graph3 from "../graphs/COGSVsRevenueGraph";


const FinancialPerformanceTab = () => {
  return (
    <div>
        <h2>Financial Performance</h2>
        <Graph1 />
        <Graph2 />
        <Graph3 />
    </div>
  )
}

export default FinancialPerformanceTab