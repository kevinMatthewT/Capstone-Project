import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, CircularProgress, Avatar, Typography, Divider } from '@mui/material';
import { FixedSizeList } from "react-window";
import axios from 'axios';

const formatIDR = (num) => {
    const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
}).format(num);

return formatted.replace(/^Rp\s?/, 'Rp ');
};

const countryFlags = {
    USD: "us", // United States
    SGD: "sg", // Singapore
    CNY: "cn", // China
    EUR: "eu", // European Union
    KRW: "kr", // South Korea
    AUD: "au", // Australia
    CAD: "ca", // Canada
    CHF: "ch", // Switzerland
    DKK: "dk", // Denmark
    GBP: "gb", // United Kingdom
    SAR: "sa", // Saudi Arabia
    HKD: "hk", // Hong Kong
    JPY: "jp", // Japan
    MYR: "my", // Malaysia
    NZD: "nz", // New Zealand
    THB: "th", // Thailand
    SEK: "se", // Sweden
};

const ExchangeRateList = () => {
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);

    const countries = [
        'USD', 'SGD', 'CNY', 'EUR', 'KRW',
        'AUD', 'CAD', 'CHF', 'DKK', 'GBP', 'SAR',
        'HKD', 'JPY', 'MYR', 'NZD', 'THB', 'SEK'
    ];

    const baseCurrency = 'IDR';

    const fetchRates = async () => {
        try {
            const response = await axios.get(`https://v6.exchangerate-api.com/v6/0e4c691155b6b86db3072f3d/latest/${baseCurrency}`);
            console.log('API response data:', response.data);
            if (response.data && response.data.conversion_rates) {
                setRates(response.data.conversion_rates);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
        }
    };
    
    useEffect(() => {
        fetchRates();
        
        const intervalId = setInterval(fetchRates, 60000);
        
        return () => clearInterval(intervalId);
    }, []);
    
    const renderRow = ({ index, style }) => {
        const currency = countries[index];
        const conversionRate = rates[currency];
        const idrAmount = conversionRate ? 1 / conversionRate : null;
        const formattedIDR = idrAmount ? formatIDR(idrAmount) : "N/A";
        const flagCode = countryFlags[currency];

        return (
            <ListItem style={style} key={currency} disablePadding 
            sx={{
                display: 'flex',
                alignItems: 'center',
                px: 2,
                py: 1.5,
                borderRadius: 1,
                transition: 'background-color 0.3s ease',
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)', 
                '&:last-child': {
                    borderBottom: 'none', 
                },
                '&:hover': {
                    backgroundColor: '#badbeb',
                }
            }}>
              {/* Flag and Text */}
                <Avatar
                    src={`https://flagcdn.com/w160/${flagCode}.png`} // Fetch flag from FlagCDN
                    alt={`${currency} flag`}
                    sx={{ marginRight: 2, width: 25, height: 25 }}
                />
                    <ListItemText sx={{ fontSize:'14px', fontWeight: 600, color:'#121926' }} primary={`${currency}: ${formattedIDR}`} />
                </ListItem>
            );
        };
        
    if (loading) {
        return <CircularProgress />;
    }

    

    return (
        <Box
        sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            padding: 2,
            borderRadius: 2,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            overflow: 'hidden',
            border: '1px solid rgba(0, 0, 0, 0.1)',
        }}
        >
        {/* Title */}
        <Typography
            variant="h2"
            component="div"
            gutterBottom
            sx={{ fontWeight:'600', fontSize: '18px', margin: '16px'}}
        >
            Exchange Rates
        </Typography>

        <Divider style={{ marginBottom: '16px', backgroundColor: '#d3d3d3', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} />

        {/* Exchange Rates List */}
        <FixedSizeList
        height={400} // Height of the list container
        width={360} // Width of the list container
        itemSize={56} // Height of each list item (adjusted to fit the flag and text)
        itemCount={countries.length} // Number of items in the list
        overscanCount={5} // Number of items to preload before/after visible items
        >
            {renderRow}
        </FixedSizeList>
    </Box>
    )
}

export default ExchangeRateList