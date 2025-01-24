import React from 'react'
import Graph1 from "../graphs/YearOfOperationVsEBIDAGraph";
import Graph2 from "../graphs/YearOfOperationVsRevenueGraph";
import { Divider } from "@mui/material";

const OperationalEfficiencyTab = () => {
  return (
    <div>
        <Graph1 />
        <Divider style={{ margin: '3rem 0rem', backgroundColor: '#697586'}} />
        <Graph2 />
    </div>
  )
}

export default OperationalEfficiencyTab