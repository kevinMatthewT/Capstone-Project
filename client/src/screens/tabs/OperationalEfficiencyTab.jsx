import React from 'react'
import Graph1 from "../graphs/YearOfOperationVsEBIDAGraph";
import Graph2 from "../graphs/YearOfOperationVsRevenueGraph";

const OperationalEfficiencyTab = () => {
  return (
    <div>
        <h2>Operational Effeciency</h2>
        <Graph1 />
        <Graph2 />
    </div>
  )
}

export default OperationalEfficiencyTab