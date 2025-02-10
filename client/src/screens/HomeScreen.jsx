import { useEffect, useState } from 'react'
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { Wallet, AttachMoney, TrendingUp } from "@mui/icons-material";
import { Box, Select, MenuItem, FormControl} from "@mui/material";
import Grid from '@mui/material/Grid2';

//importing components
import Sidebar from './global/Sidebar';
import Topbar from './global/Topbar';
import HeaderTitle from './global/HeaderTitle';
import TotalRevenueGraph from './graphs/TotalRevenueGraph';
import ExchangeRateList from '../components/ExchangeRateList';
import DashboardCards from '../components/DashboardCards';

const containerStyle = (isSidebarOpen) => ({
  width: `calc(100% - ${isSidebarOpen ? '256px' : '80px'})`,
  marginLeft: isSidebarOpen ? '256px' : '80px',
  transition: 'width 0.3s ease, margin-left 0.3s ease', // smooth matching animation
});

function HomeScreen() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filters, setFilters] = useState({
    totalRevenue: "this_month",
    totalExpense: "this_month",
    totalCogs: "this_month",
  });
  const [cardData, setCardData] = useState({
    totalRevenue: 0,
    totalExpense: 0,
    totalInvestments: 0,
  });
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const results = await Promise.all(
          Object.entries(filters).map(async ([key, filter]) => {
            const response = await axios.get(
              `http://localhost:8080/api/get/investment/filter/${filter}`
            );
            const data = response.data;
  
            // Calculate total for the specific card
            const total = data.reduce((sum, item) => {
              if (key === "totalRevenue") return sum + (item.Revenue || 0);
              if (key === "totalExpense") return sum + (item.Expense || 0);
              if (key === "totalCogs") return sum + (item.COGS || 0);
              return sum;
            }, 0);
  
            return { [key]: total };
          })
        );
  
        // Merge results into a single object
        const updatedCardData = results.reduce((acc, result) => {
          return { ...acc, ...result };
        }, {});
  
        setCardData((prev) => ({ ...prev, ...updatedCardData }));
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchCardData();
  }, [filters]);

  const cardConfig = [
    {
      label: "Total Revenue",
      amount: cardData.totalRevenue,
      icon: Wallet,
      bgColor: "#00A19D",
      onFilterChange: (newFilter) =>
        setFilters((prev) => ({ ...prev, totalRevenue: newFilter })),
    },
    {
      label: "Total Expense",
      amount: cardData.totalExpense,
      icon: AttachMoney,
      bgColor: "#28A745",
      onFilterChange: (newFilter) =>
        setFilters((prev) => ({ ...prev, totalExpense: newFilter })),
    },
    {
      label: "Total COGS",
      amount: cardData.totalCogs,
      icon: TrendingUp,
      bgColor: "#023E8A",
      onFilterChange: (newFilter) =>
        setFilters((prev) => ({ ...prev, totalCogs: newFilter })),
    },
  ];

  useEffect(() => {
    if (!loading && !user) {
        loginChecker();
    }
  }, [user, loading]);
  
  const navigate = useNavigate("");

  const loginChecker= async()=>{
    alert("you do not have access for this page")
    try {
      navigate('/');
    }catch(err){

    }
  }

  if(user){
  return (
    <>
    <div className='overflow-x-hidden min-h-screen h-auto'>
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        
        {/* Topbar */}
        <div className='flex-1 flex flex-col'>
          <Topbar isSidebarOpen={isSidebarOpen}/>
            
            {/* Main Content */}
            <div className='px-8 py-4 flex-1 overflow-y-auto bg-[#eef2f6] rounded-lg'>
              <HeaderTitle title='Dashboard' isSidebarOpen={isSidebarOpen}/>

              {/* Cards section */}
              <Box sx={{...containerStyle(isSidebarOpen), padding: '16px', marginTop: 2 }}>

                  <Grid container spacing={'2rem'}>
                    {/* Cards */}
                      {cardConfig.map((card, index) => (
                      <Grid item xs={12} md={4} key={index}>
                        <DashboardCards
                          icon={card.icon}
                          amount={
                            typeof card.amount === "number"
                              ? `IDR ${card.amount.toLocaleString("id-ID")}`
                              : card.amount
                          }
                          label={card.label}
                          bgColor={card.bgColor}
                          onFilterChange={card.onFilterChange}
                        />
                      </Grid>
                    ))}
                  </Grid>

                  {/* Graph and list Section */}
                  <Grid container spacing={2} sx={{ marginTop: 4 }}>
                    <Grid item size={{xs:12, md:8}}>
                      <TotalRevenueGraph />
                    </Grid>
                    <Grid item size={{xs:12, md:4}}>
                      <ExchangeRateList />
                    </Grid>
                  </Grid>
                </Box>
            </div>

        </div>
    </div> 
    </>
  )}

  return null;
}

export default HomeScreen