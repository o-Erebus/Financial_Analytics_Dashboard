import { CardContent, Typography, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type {RevenueVsExpensesTrend} from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface OverviewChartProps {
    data: RevenueVsExpensesTrend[];
}

// This function transforms the API data into a format Recharts can easily use
const transformDataForChart = (data: RevenueVsExpensesTrend[]) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyData: { [key: string]: { name: string; Income: number; Expenses: number } } = {};

    data.forEach(item => {
        const monthName = monthNames[item.month - 1];
        if (!monthlyData[monthName]) {
            monthlyData[monthName] = { name: monthName, Income: 0, Expenses: 0 };
        }
        if (item.category === 'Revenue') {
            monthlyData[monthName].Income += item.totalAmount;
        } else if (item.category === 'Expense') {
            monthlyData[monthName].Expenses += item.totalAmount;
        }
    });

    return Object.values(monthlyData);
};

const OverviewChart: React.FC<OverviewChartProps> = ({ data }) => {
    const chartData = transformDataForChart(data);

    return (
        <Box sx={{flex:1, height: 400, borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            bgcolor: 'background.default',
            '& .recharts-wrapper': {
                outline: 'none',
            },
            '& .recharts-surface': {
                outline: 'none',
            },
            '& .recharts-layer': {
                outline: 'none',
            }

        }}>
            <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={3}>Overview</Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData} >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                        <YAxis stroke="rgba(255,255,255,0.5)" tickFormatter={(value) => formatCurrency(Number(value), 0)} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '8px',
                            }}
                            formatter={(value) => formatCurrency(Number(value))}
                        />
                        <Line type="monotone" dataKey="Income" stroke="#4CAF50" strokeWidth={3} dot={false} />
                        <Line type="monotone" dataKey="Expenses" stroke="#FF9800" strokeWidth={3} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Box>
    );
};

export default OverviewChart;