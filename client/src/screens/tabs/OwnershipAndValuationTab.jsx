import React from 'react'
import Graph1 from "../graphs/PercentageOwnershipVsEquityGraph";
import Graph2 from "../graphs/PriceAssetVsPriceLiabilityGraph";

const OwnershipAndValuationTab = () => {
  return (
    <div>
        <h2>Ownership and Evaluation</h2>
        <Graph1 />
        <Graph2 />
    </div>
  )
}

export default OwnershipAndValuationTab