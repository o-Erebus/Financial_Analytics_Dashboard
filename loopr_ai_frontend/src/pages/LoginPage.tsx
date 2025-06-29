import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
  useMediaQuery,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Link,
  Fade
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Logo } from '../assets/logo';
import { waveStyles } from '../assets/wavePattern';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { login } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Animation effect on load
    useEffect(() => {
        setFadeIn(true);
    }, []);

    const validateForm = (): boolean => {
        let isValid = true;

        // Username validation
        if (!username) {
            setUsernameError('Username is required');
            isValid = false;
        } else {
            setUsernameError('');
        }

        // Password validation
        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            await login({ username, password });
            // Handle remember me functionality here
            if (rememberMe) {
                localStorage.setItem('rememberedUser', username);
            } else {
                localStorage.removeItem('rememberedUser');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: 'background.default',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Left side with wave pattern - no text overlay */}
            <Box sx={waveStyles.waveContainer}>
                <Box sx={{
                    ...waveStyles.wave,
                    transition: 'transform 0.5s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.02)',
                    }
                }} />
            </Box>

            {/* Right side with login form */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: { xs: 2, sm: 4 },
                    ml: { md: '45%' },
                }}
            >
                <Fade in={fadeIn} timeout={800}>
                    <Paper
                        elevation={6}
                        sx={{
                            width: '100%',
                            maxWidth: '450px',
                            p: { xs: 4, sm: 5 },
                            borderRadius: 2,
                            backgroundColor: 'background.paper',
                            boxShadow: theme => `0 8px 32px rgba(0, 0, 0, 0.12), 0 0 10px rgba(${theme.palette.primary.main.replace('#', '').match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(',')}, 0.05)`,
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                boxShadow: theme => `0 10px 40px rgba(0, 0, 0, 0.15), 0 0 15px rgba(${theme.palette.primary.main.replace('#', '').match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(',')}, 0.08)`,
                            }
                        }}
                    >
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mb: 5
                        }}>
                            <Logo width={isMobile ? 140 : 180} height={isMobile ? 38 : 49} />
                        </Box>

                        <Typography variant="h5" component="h1" sx={{ mb: 1, fontWeight: 600 }}>
                            Sign In
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                                mb: 3,
                                fontSize: '1rem',
                                letterSpacing: '0.01em'
                            }}
                        >
                            Access your financial dashboard
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit}>
                            {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
                            <TextField
                                margin="dense"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                error={!!usernameError}
                                helperText={usernameError}
                                sx={{
                                    mb: 1.5,
                                    '& .MuiOutlinedInput-root': {
                                        transition: 'all 0.2s',
                                        '&:hover fieldset': {
                                            borderColor: 'primary.main',
                                            boxShadow: '0 0 0 2px rgba(31, 203, 79, 0.08)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            boxShadow: '0 0 0 3px rgba(31, 203, 79, 0.12)',
                                        }
                                    },
                                }}
                            />
                            <TextField
                                margin="dense"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!passwordError}
                                helperText={passwordError}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                size="large"
                                            >
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                sx={{
                                    mb: 1.5,
                                    '& .MuiOutlinedInput-root': {
                                        transition: 'all 0.2s',
                                        '&:hover fieldset': {
                                            borderColor: 'primary.main',
                                            boxShadow: '0 0 0 2px rgba(31, 203, 79, 0.08)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            boxShadow: '0 0 0 3px rgba(31, 203, 79, 0.12)',
                                        }
                                    },
                                }}
                            />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, mt: 0 }}>
                                <FormControlLabel
                                    control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} color="primary" />}
                                    label="Remember me"
                                />
                                <Link href="#" variant="body2" sx={{ color: 'primary.main', '&:hover': { textDecoration: 'underline' } }}>
                                    Forgot password?
                                </Link>
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={isSubmitting}
                                sx={{
                                    py: 1.5,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    fontSize: '1.05rem',
                                    borderRadius: 1,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                            </Button>
                        </Box>
                    </Paper>
                </Fade>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 4, textAlign: 'center' }}
                >
                    © {new Date().getFullYear()} Penta. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default LoginPage;
