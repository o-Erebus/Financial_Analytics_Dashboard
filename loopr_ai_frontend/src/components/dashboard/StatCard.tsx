import { CardContent, Typography, Box, Grid } from '@mui/material';
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
        <Grid item xs={12} sm={6} md={3}>
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
        </Grid>
    );
};

export default StatCard;