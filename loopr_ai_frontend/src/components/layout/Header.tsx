import { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    Avatar,
    Popover,
    MenuItem,
    Divider
} from '@mui/material';
import {
    Search as SearchIcon,
    Notifications as NotificationsIcon
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'avatar-popover' : undefined;

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 4,
                mt: -3,
                mx: -3,
                p: 2,
                bgcolor: 'background.default',
            }}
        >
            <Typography variant="h4" sx={{ ml: 1, fontWeight: 'bold' }}>
                Dashboard
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                    placeholder="Search..."
                    size="small"
                    disabled
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            bgcolor: 'background.paper',
                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                        }
                    }}
                    slotProps={{input:{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'text.secondary' }} />
                            </InputAdornment>
                        ),
                    },}}
                />
                <IconButton sx={{ color: 'text.primary' }}>
                    <NotificationsIcon />
                </IconButton>
                <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
                    <Avatar src={user.user_profile} alt={user.name || 'User'} />
                </IconButton>

                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    slotProps={{
                        paper: {
                            sx: {
                                mt: 1,
                                borderRadius: 2,
                                minWidth: 180,
                                boxShadow: 4,
                                p: 1.5, // main breathing space
                            }
                        }
                    }}
                >
                    <Box sx={{ mb: 1 }}>
                        <Typography variant="body1" noWrap>
                            <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                                Signed in as
                            </Box>
                            <Box component="span" sx={{ fontWeight: 500 }}>
                                {user?.username}
                            </Box>
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 1 }} />
                    <MenuItem
                        onClick={() => {
                            handleClose();
                            logout();
                        }}
                        sx={{
                            color: 'error.main',
                            fontWeight: 500,
                            px: 2,
                            py: 1,
                            borderRadius: 1,
                            '&:hover': {
                                bgcolor: 'error.light',
                                color: 'error.contrastText'
                            }
                        }}
                    >
                        Logout
                    </MenuItem>
                </Popover>
            </Box>
        </Box>
    );
};

export default Header;
