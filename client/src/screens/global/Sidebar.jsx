import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AnalyticsTwoTone, Description, Menu, NoteAdd, SpeedRounded, ExpandMore, ChevronRight } from '@mui/icons-material'
import { motion, AnimatePresence} from "framer-motion";


import LogoImg from "../../assets/MERKLE-logo.png";

const MenuItem = [
    { 
        id: 'dash-home',
        name: 'Home Screen',
        icon: SpeedRounded,
        color: "#D32F2F",
        href: '/dashboard',
        section: 'Dashboard'
    },
    { 
        id: 'dash-analytics',
        name: 'Analytics',
        icon: AnalyticsTwoTone,
        color: '#FE938C',
        href: '/analytics',
        section: 'Dashboard',
        children: [
            { id: 'analytics-1', name: 'Actual Graphs', href: '/actual-graphs' },
            { id: 'analytics-2', name: 'Prediction Graphs', href: '/pred-graphs' },
            // { id: 'analytics-3', name: 'Comparison', href: '/analytics/comparison' },
        ],
    },
    { 
        id: 'app-invest',
        name: 'Investments',
        icon: Description,
        color: '#4281A4',
        href: '/investments',
        section: 'Application'
    },
    { 
        id: 'app-add-new',
        name: 'Add New',
        icon: NoteAdd,
        color: '#F29E4C',
        href: '/investments/form',
        section: 'Application'
    },
]

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen}) => {

    const navigate = useNavigate();
    const [expandedSections, setExpandedSections] = useState({});

    const toggleSection = (id) => {
        setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Separate menu items by sections
    const DashItems = MenuItem.filter(item => item.section === 'Dashboard');
    const AppItems = MenuItem.filter(item => item.section === 'Application');

    return (
    <motion.div
        className={`fixed left-0 top-0 bottom-0 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? 'w-64' : 'w-20'}`}
        animate={{ width: isSidebarOpen ? 256 : 80}}>
        <div className="h-16 flex items-center justify-between bg-[#F6FBFF] bg-opacity-50 backdrop-blur-md p-4 border-r border-[#CCC9DC] ">
            <a href="/" className="logo flex items-center">
                {isSidebarOpen && <img src={LogoImg} alt="Logo" className="transition-all duration-300" />}
                {isSidebarOpen && (
                    <span className="hidden lg:block transition-all duration-300 ml-2 font-bold text-sm text-[#335bb3]">
                        TechAsia Dashboard
                    </span>
                )}
            </a>

            {/* Sidebar Toggle Button */}
            <motion.button
            whileHover={{ scale: 1.1}}
            whileTap={{ scale: 0.9}}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className='p-2 rounded-full hover:bg-[#A7CADC] transition-colors max-w-fit'
            >
            <Menu size={24} />
            </motion.button>
        </div>

        <div className="h-full bg-[#F6FBFF] bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-[#CCC9DC]">

        <nav className="mt-2 flex-grow">

            {/* Dashboard Section */}
            <div>
                <AnimatePresence>
                    {isSidebarOpen && (
                    <motion.p
                        className="text-xs font-semibold text-black mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                    >
                        Dashboard
                    </motion.p>
                    )}
                </AnimatePresence>

                {DashItems.map((item) => (
                <div key={item.id}>
                    {/* Menu Item with Children */}
                    {item.children ? (
                    <>
                        <div
                        className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#badbeb] transition-colors mb-2 cursor-pointer"
                        onClick={() => toggleSection(item.id)}
                        >
                        <item.icon size={20} style={{ color: item.color, minWidth: '20px' }} />
                        {isSidebarOpen && (
                            <motion.span
                                className="ml-4 whitespace-nowrap flex-grow"
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.2, delay: 0.1 }}
                            >
                                {item.name}
                            </motion.span>
                        )}
                        {isSidebarOpen && (
                            <motion.div className="ml-auto">
                                {expandedSections[item.id] ? <ExpandMore /> : <ChevronRight />}
                            </motion.div>
                        )}
                        </div>

                        {/* Nested Menu Items */}
                        <AnimatePresence>
                        {expandedSections[item.id] && (
                            <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-8 overflow-hidden "
                            >
                            {item.children.map((child) => (
                                <Link key={child.id} to={child.href} className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#badbeb] transition-colors">
                                • {child.name}
                                </Link>
                            ))}
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </>
                    ) : (
                    <Link to={item.href}>
                        <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#badbeb] transition-colors mb-2">
                        <item.icon size={20} style={{ color: item.color, minWidth: '20px' }} />
                            {isSidebarOpen && (
                            <motion.span
                                className="ml-4 whitespace-nowrap"
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.2, delay: 0.1 }}
                            >
                                {item.name}
                            </motion.span>
                            )}
                        </motion.div>
                    </Link>
                    )}
                </div>
                ))}
            </div>

            <hr className="my-4 border-gray-400" />

            {/* Application Section  */}
            <div>
                {isSidebarOpen && (
                <motion.p
                    className="text-xs font-semibold text-black mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                >
                    Application
                </motion.p>
                )}

                {AppItems.map((item) => (
                <Link key={item.href} to={item.href}>
                    <motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#badbeb] transition-colors mb-2'>
                        <item.icon size={20} style={{ color: item.color, minWidth: '20px'}}/>
                        <AnimatePresence>
                            {isSidebarOpen && (
                                <motion.span
                                className='ml-4 whitespace-nowrap'
                                initial={{ opacity: 0, width: 0}}
                                animate={{ opacity: 1, width: "auto"}}
                                exit={{ opacity: 0, width: 0}}
                                transition={{ duration: 0.2, delay: 0.1}}
                                >
                                {item.name}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </Link>
                ))}

            </div>
        </nav>
        </div>
    </motion.div>
    )
}

export default Sidebar