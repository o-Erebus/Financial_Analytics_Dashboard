import {CardContent, Typography, Box, Button, Avatar } from '@mui/material';
import type {Transaction} from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { useTheme } from '@mui/material/styles';
import React from "react";

interface RecentTransactionsProps {
    transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
    const theme = useTheme();

    const getAmountColor = (category: string) => {
        return category === 'Revenue' ? theme.palette.success.main : theme.palette.error.main;
    };

    return (
        <Box sx={{ height: 400,ml:4,width:'20vw',borderRight: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', bgcolor: 'background.default'}}>

            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" fontWeight="bold">Recent Transaction</Typography>
                    <Button size="small" sx={{ color: 'primary.main', textTransform: 'none' }}>See all</Button>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {transactions.map((t) => (
                        <Box key={t._id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar src={t.user_profile} sx={{ width: 40, height: 40 }} />
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="body2" fontWeight="bold">
                                    {t.category === 'Revenue' ? 'Transfer from' : 'Transfer to'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">{t.user_id}</Typography>
                            </Box>
                            <Typography variant="body2" fontWeight="bold" color={getAmountColor(t.category)}>
                                {t.category === 'Revenue' ? '+' : '-'}{formatCurrency(t.amount)}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Box>
    );
};

export default RecentTransactions;