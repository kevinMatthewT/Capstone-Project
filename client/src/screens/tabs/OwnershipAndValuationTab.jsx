import React from 'react'
import Graph1 from "../graphs/PercentageOwnershipVsEquityGraph";
import Graph2 from "../graphs/PriceAssetVsPriceLiabilityGraph";
import { Divider } from '@mui/material';

const OwnershipAndValuationTab = () => {
  return (
    <div>
        <Graph1 />
        <Divider style={{ margin: '3rem 0rem', backgroundColor: '#697586'}} />
        <Graph2 />
    </div>
  )
}

export default OwnershipAndValuationTab