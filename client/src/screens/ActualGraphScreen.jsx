import React, {useEffect, useState} from 'react'

import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { auth } from '../Firebase';

import Sidebar from './global/Sidebar'
import Topbar from './global/Topbar'
import HeaderTitle from './global/HeaderTitle';
import FinancialPerformance from "./tabs/FinancialPerformanceTab";
import OwnershipTimeline from './tabs/OwnershipTimelineTab';
import OperationalEfficiency from './tabs/OperationalEfficiencyTab';
import OwnershipAndValuation from './tabs/OwnershipAndValuationTab';
import { AccessTimeFilled } from '@mui/icons-material';
import { ReactComponent as FinanceLogo} from '../assets/license.svg';
import { ReactComponent as OperationalLogo} from '../assets/pennant.svg';
import { ReactComponent as OwnershipLogo} from '../assets/table-share.svg';

const containerStyle = (isSidebarOpen) => ({
    width: `calc(100% - ${isSidebarOpen ? '256px' : '80px'})`,
    marginLeft: isSidebarOpen ? '256px' : '80px',
    transition: 'width 0.3s ease, margin-left 0.3s ease', // smooth matching animation
});

function TabPanel({ children, value, index}) {
    return (
        <div role='tabpanel' hidden={value !== index}>
            {value === index && (
                <Box sx={{ p: 4 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function ActualGraphScreen() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, loading, error] = useAuthState(auth);
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!loading && !user) {
            loginChecker();
        }
    }, [user, loading]);
    
    const navigate = useNavigate("");
    
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const loginChecker= async()=>{
    alert("you do not have access for this page")
    try {
        navigate('/');
    }catch(err){
    
        }
    }
    
    if(user){

    return (
        <div className='min-h-screen h-auto'>
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            
            {/* Topbar */}
            <div className='flex-1 flex flex-col'>
            <Topbar isSidebarOpen={isSidebarOpen}/>
                
                {/* Main Content */}
                <div className='px-8 py-4 flex-1 overflow-y-auto bg-[#eef2f6] rounded-lg'>
                <HeaderTitle title='Actual Data Graphs' isSidebarOpen={isSidebarOpen} />

                {/* Tabs */}
                <Box className="bg-[#eef2f6] shadow-lg rounded-lg p-4"
                 sx={{
                    ...containerStyle(isSidebarOpen), 
                    backgroundColor: 'white',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                    borderRadius: 2, 
                    p: 2, 
                    mt: 4
                    }}>
                    <Tabs value={value} onChange={handleTabChange} aria-label='Graph Tabs' 
                    sx={{
                        mb: 2,
                        "& .MuiTabs-flexContainer": { justifyContent: "center" },
                        "& .MuiTab-root": {
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: 14,
                            padding: "12px 16px",
                        },
                        "& .Mui-selected": { color: "#007AFF" },
                        "& .MuiTabs-indicator": { backgroundColor: "#007AFF" },
                    }}>
                        <Tab icon={<FinanceLogo/>} iconPosition='start' label="Financial Performance" />
                        <Tab icon={<OwnershipLogo/>} iconPosition='start' label="Ownership & Valuation" />
                        <Tab icon={<OperationalLogo/>} iconPosition='start' label="Operational Efficiency" />
                        <Tab icon={<AccessTimeFilled/>} iconPosition='start' label="Ownership Timeline" />
                    </Tabs>
                
                    {/* Tab Panels */}
                    <TabPanel value={value} index={0}>
                        <Box className="bg-white shadow-lg rounded-lg p-4">
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                            Financial Performance
                        </Typography>
                        <FinancialPerformance />
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Box className="bg-white shadow-lg rounded-lg p-4">
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                            Ownership & Valuation
                        </Typography>
                        <OwnershipAndValuation />
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Box className="bg-white shadow-lg rounded-lg p-4">
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                            Operational Efficiency
                        </Typography>
                        <OperationalEfficiency />
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <Box className="bg-white shadow-lg rounded-lg p-4">
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                            Ownership Timeline
                        </Typography>
                        <OwnershipTimeline />
                        </Box>
                    </TabPanel>
                </Box>
            </div>    
        </div>
    </div>
    );
    }

}

export default ActualGraphScreen