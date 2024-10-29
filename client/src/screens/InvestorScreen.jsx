import { useEffect, useState } from 'react'

//importing components
import Sidebar from '../components/Sidebar'
import InvestorTable from '../components/InvestorTable'

import "./styles/HomeScreen.css"
import Topbar from '../components/Topbar'

function InvestorScreen() {
  
  return (
    <>
    <Sidebar/>
    <Topbar/>
    <div className='data-container'>
      <InvestorTable name="editor"/>
    </div>
    
    </>
  )
}

export default InvestorScreen