import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";

const DashboardCards = ({ icon: Icon, amount, label, bgColor, onFilterChange, selectedFilter}) => {
    return (

    <Card
        sx={{
        backgroundColor: bgColor,
        color: "white",
        borderRadius: "16px",
        position: "relative",
        overflow: "hidden",
        width: 280,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
    >
        <CardContent>
        {/* Icons Row */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box
                sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                padding: 1,
                borderRadius: "8px",
                }}
            >
                <Icon sx={{ fontSize: 30 }} />
            </Box>
            {/* Filter Buttons */}
            <Box display="flex" gap={1}>
                <Button
                size="small"
                variant="outlined"
                sx={{
                    color: selectedFilter === "this_month" ? bgColor : "white",
                    backgroundColor: selectedFilter === "this_month" ? "white" : "rgba(255, 255, 255, 0.2)",
                    textTransform: "none",
                    fontSize: "12px",
                    padding: "4px 8px",
                    borderColor: selectedFilter === "this_month" ? "white" : "rgba(255, 255, 255, 0.5)",
                    "&:hover": {
                        backgroundColor:
                            selectedFilter === "this_month" ? "white" : "rgba(255, 255, 255, 0.4)",
                    },
                }}
                onClick={() => onFilterChange("this_month")}
                >
                This Month
                </Button>
                <Button
                size="small"
                variant="outlined"
                sx={{
                    color: selectedFilter === "last_month" ? bgColor : "white",
                    backgroundColor: selectedFilter === "last_month" ? "white" : "rgba(255, 255, 255, 0.2)",
                    textTransform: "none",
                    fontSize: "12px",
                    padding: "4px 8px",
                    borderColor: selectedFilter === "last_month" ? "white" : "rgba(255, 255, 255, 0.5)",
                    "&:hover": {
                        backgroundColor:
                            selectedFilter === "last_month" ? "white" : "rgba(255, 255, 255, 0.4)",
                    },
                }}
                onClick={() => onFilterChange("last_month")}
                >
                Last Month
                </Button>
            </Box>
            </Box>

            {/* Amount */}
            <Typography variant="h4" fontWeight="bold">
            {amount}
            </Typography>
            <Typography variant="body1" mt={1} sx={{ opacity: 0.8 }}>
            {label}
            </Typography>

            {/* Overlapping Circles */}
            <Box
            sx={{
                position: "absolute",
                top: -20,
                right: -40,
                width: 100,
                height: 100,
                backgroundColor: "white",
                borderRadius: "50%",
                opacity: 0.2,
            }}
            />
            <Box
            sx={{
                position: "absolute",
                top: 10,
                right: -30,
                width: 70,
                height: 70,
                backgroundColor: "white",
                borderRadius: "50%",
                opacity: 0.3,
            }}
                />
        </CardContent>
    </Card>
    )
}

export default DashboardCards