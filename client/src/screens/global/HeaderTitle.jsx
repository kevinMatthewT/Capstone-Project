const containerStyle = (isSidebarOpen) => ({
    width: `calc(100% - ${isSidebarOpen ? '256px' : '80px'})`,
    marginLeft: isSidebarOpen ? '256px' : '80px',
    transition: 'width 0.3s ease, margin-left 0.3s ease', // smooth matching animation
});

const HeaderTitle = ({ title, isSidebarOpen }) => {
    return (
        <header className="bg-[#eef2f6] bg-opacity-50 backdrop-blur-md border-b border-gray-300 shadow-md transition-all duration-300"
        style={{
            ...containerStyle(isSidebarOpen),
            position: 'relative', // Ensures it’s within the stacking context
            zIndex: 20,           // Adjusts it to be above the sidebar
        }}>
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-[#100831]">
                    {title}
                </h1>
            </div>
        </header>
    )
}

export default HeaderTitle