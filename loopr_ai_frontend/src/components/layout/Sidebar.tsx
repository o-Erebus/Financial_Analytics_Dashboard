import { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
    Dashboard as DashboardIcon,
    AccountBalance as TransactionsIcon,
    AccountBalanceWallet as WalletIcon,
    Analytics as AnalyticsIcon,
    Person as PersonIcon,
    Message as MessageIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';
import { Logo } from '../../assets/logo';

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Transactions', icon: <TransactionsIcon /> },
    { text: 'Wallet', icon: <WalletIcon /> },
    { text: 'Analytics', icon: <AnalyticsIcon /> },
    { text: 'Personal', icon: <PersonIcon /> },
    { text: 'Message', icon: <MessageIcon /> },
    { text: 'Setting', icon: <SettingsIcon /> }
];

const Sidebar = () => {
    const [selected, setSelected] = useState('Dashboard');

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 270,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 270,
                    boxSizing: 'border-box',
                    bgcolor: 'background.default',
                    borderRight: 'none',
                },
            }}
        >
            <Box
                sx={{
                    p: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 2,
                    mt: 2 // Added top margin to lower the logo
                }}
            >
                <Logo width={190} height={43} />
            </Box>
            <List sx={{ px: 2,ml:1 }}>
                {menuItems.map((item) => (
                    <ListItem
                        key={item.text}
                        onClick={() => setSelected(item.text)}
                        sx={{
                            borderRadius: 2,
                            mb: 1.5,
                            // bgcolor: selected === item.text ? 'rgba(0, 212, 170, 0.1)' : 'transparent',
                            color: selected === item.text ? 'primary.main' : 'text.secondary',
                            cursor: 'pointer',
                            '&:hover': {
                                bgcolor: 'rgba(0, 212, 170, 0.05)'
                            }
                        }}
                    >
                        <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                        {selected === item.text && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    right: -16,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: 6,
                                    height: 24,
                                    bgcolor: 'secondary.main',
                                    borderRadius: '4px 0px 0px 4px'
                                }}
                            />
                        )}
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
