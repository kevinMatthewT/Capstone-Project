import React, { useState } from "react";

import { logout } from "../../Firebase";
import { useNavigate } from 'react-router-dom';

// import './styles/Topbar.css'

import { Logout, NotificationsOutlined, Search, SettingsOutlined } from "@mui/icons-material";

const containerStyle = (isSidebarOpen) => ({
    width: `calc(100% - ${isSidebarOpen ? '256px' : '80px'})`,
    marginLeft: isSidebarOpen ? '256px' : '80px',
    transition: 'width 0.3s ease, margin-left 0.3s ease', // smooth matching animation
});

const Topbar = ({ isSidebarOpen }) => {
    const navigate=useNavigate();

    const logoutUser =async ()=>{
    await logout();
    navigate('/');

}  
    return (
    <div className={`bg-[#F6FBFF] flex justify-between items-center p-3 w-full transition-all duration-300 shadow-sm`}
    style={{
        ...containerStyle(isSidebarOpen),
        position: 'relative', // Ensures it’s within the stacking context
        zIndex: 20,           // Adjusts it to be above the sidebar
    }}>
        
    {/* Search Bar */}
        <div className="flex bg-white rounded-md focus:outline-none hover:shadow-md flex-1 max-w-xs">
            <input className="flex-1 ml-2 p-2 focus:outline-none " placeholder="Search" />
            <button className="p-2">
                <Search />
            </button>
        </div>

    {/* Icons */}
        <div className="flex items-center space-x-3">
            <button className="p-2 rounded-full hover:bg-[#A7CADC] max-w-fit">
                <NotificationsOutlined/>
            </button>
        <button className="p-2 rounded-full hover:bg-[#A7CADC] max-w-fit">
            <SettingsOutlined />
        </button>
        <button className="p-2 rounded-full hover:bg-[#A7CADC] max-w-fit" onClick={logout}>
            <Logout />
        </button>
        </div>
    </div>
    )
}

export default Topbar