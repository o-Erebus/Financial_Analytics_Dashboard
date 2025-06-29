import { CardContent, Typography, Box } from '@mui/material';
import { formatCurrency } from '../../utils/formatters';
import React from "react";

interface StatCardProps {
    title: string;
    value: number;
    icon: React.ReactElement;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
    return (
        <Box sx={{borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            bgcolor: 'background.default',}}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: '#282C35', color: 'theme.palette.success.main' }}>
                        {icon}
                    </Box>
                    <Box>
                        <Typography variant="body2" color="text.secondary">{title}</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            {formatCurrency(value)}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Box>
    );
};

export default StatCard;
