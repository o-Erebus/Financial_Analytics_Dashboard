import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from './hooks/useAuth';

function App() {
    const { isLoading } = useAuth();

    // If checking for token on initial load, show a full-screen loader
    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/*" element={<DashboardPage />} />
            </Route>
        </Routes>
    );
}

export default App;