import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TablePagination,
    CircularProgress,
    Alert,
    Popover,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Chip,
    Avatar,
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { Search as SearchIcon, FilterList as FilterIcon, GetApp as ExportIcon } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, parseISO } from 'date-fns';
import { getTransactions, exportTransactions } from '../../api/transactionService';
import { useDebounce } from '../../hooks/useDebounce';
import { formatCurrency } from '../../utils/formatters';
import { useTheme } from '@mui/material/styles';
import type { Transaction } from '../../types';

const availableColumns = [
    { key: 'id', label: 'ID' },
    { key: 'date', label: 'Date' },
    { key: 'amount', label: 'Amount' },
    { key: 'category', label: 'Category' },
    { key: 'status', label: 'Status' },
    { key: 'user_id', label: 'User' },
    { key: 'user_profile', label: 'User Profile URL' }
];

const TransactionsTable: React.FC = () => {
    const theme = useTheme();

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [isRefetching, setIsRefetching] = useState(false);  // New state for tracking refreshes vs initial load
    const [error, setError] = useState<string | null>(null);
    const [totalTransactions, setTotalTransactions] = useState(0);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const [exportDialogOpen, setExportDialogOpen] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['id', 'date', 'amount', 'category', 'status', 'user_id']);

    const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
    const filterOpen = Boolean(filterAnchorEl);

    const [tempFilterCategories, setTempFilterCategories] = useState<{ Revenue: boolean; Expense: boolean }>({ Revenue: true, Expense: true });
    const [tempStartDate, setTempStartDate] = useState<Date | null>(null);
    const [tempEndDate, setTempEndDate] = useState<Date | null>(null);

    const [filterCategories, setFilterCategories] = useState<{ Revenue: boolean; Expense: boolean }>({ Revenue: true, Expense: true });
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const fetchAndSetTransactions = useCallback(async () => {
        // If we already have data, we're refetching rather than loading for the first time
        const hasExistingData = transactions.length > 0;
        if (hasExistingData) {
            setIsRefetching(true);
        } else {
            setLoading(true);
        }

        try {
            const selectedCategories = Object.keys(filterCategories).filter(
                (cat) => filterCategories[cat]
            );

            const params: never = {
                page: page + 1,
                limit: rowsPerPage,
                search: debouncedSearchTerm,
                sortBy,
                sortOrder,
                category: selectedCategories.length === 0 ? "null" : selectedCategories,
                startDate: startDate ? startDate.toISOString() : undefined,
                endDate: endDate ? endDate.toISOString() : undefined
            };

            const data = await getTransactions(params);
            setTransactions(data.transactions);
            setTotalTransactions(data.totalTransactions);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch transactions.');
        } finally {
            setLoading(false);
            setIsRefetching(false);
        }
    }, [page, rowsPerPage, debouncedSearchTerm, sortBy, sortOrder, filterCategories, startDate, endDate]);

    useEffect(() => {
        fetchAndSetTransactions();
    }, [fetchAndSetTransactions]);

    const handleSortRequest = (property: string) => {
        const isAsc = sortBy === property && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortBy(property);
    };

    const applyFilters = () => {
        setFilterCategories(tempFilterCategories);
        setStartDate(tempStartDate);
        setEndDate(tempEndDate);
        setPage(0);
        setFilterAnchorEl(null);
    };

    const resetFilters = () => {
        setTempFilterCategories({ Revenue: true, Expense: true });
        setTempStartDate(null);
        setTempEndDate(null);
    };

    const getStatusChip = (status: 'Paid' | 'Pending') => (
        <Chip label={status} color={status === 'Paid' ? 'success' : 'warning'} size="small" sx={{ fontWeight: 'bold' }} />
    );

    const getAmountColor = (category: string) => category === 'Revenue'
        ? theme.palette.success.main
        : theme.palette.error.main;

    const handleExport = async () => {
        try {
            const params = {
                search: debouncedSearchTerm,
                sortBy,
                sortOrder,
                fields: selectedColumns.join(',')
            };
            const blob = await exportTransactions(params);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'transactions.csv';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            setExportDialogOpen(false);
        } catch (err) {
            console.error('Export failed', err);
            setError('Failed to export transactions.');
        }
    };

    return (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 1, p: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h4" >Transactions</Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <TextField
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            slotProps={{ input:{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}}
                            sx={{ '& .MuiInputBase-root': { height: 40 } }}
                        />
                        <Button
                            variant="outlined"
                            startIcon={<FilterIcon />}
                            onClick={(e) => setFilterAnchorEl(e.currentTarget)}
                            sx={{ height: 40, minWidth: '100px', textTransform: 'none' }}
                        >
                            Filter
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<ExportIcon />}
                            onClick={() => setExportDialogOpen(true)}
                            sx={{ height: 40, minWidth: '100px', textTransform: 'none' }}
                        >
                            Export
                        </Button>
                    </Box>
                </Box>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <TableContainer>
                    <Table>

                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={4} sx={{ height: 16, padding: 0, borderBottom: 'none' }} />
                            </TableRow>
                            <TableRow sx={{fontSize:'small',fontWeight:'bold',}}>
                                <TableCell sx={{borderRadius: '8px 0px 0px 8px', borderBottom: 'none', bgcolor:'background.paper'}}>
                                    <TableSortLabel active={sortBy === 'user_id'} direction={sortOrder} onClick={() => handleSortRequest('user_id')}>Name</TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ borderBottom: 'none', bgcolor:'background.paper'}}>
                                    <TableSortLabel active={sortBy === 'date'} direction={sortOrder} onClick={() => handleSortRequest('date')}>Date</TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ borderBottom: 'none', bgcolor:'background.paper'}}>
                                    <TableSortLabel active={sortBy === 'amount'} direction={sortOrder} onClick={() => handleSortRequest('amount')}>Amount</TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ borderBottom: 'none',borderRadius:'0px 8px 8px 0px', bgcolor:'background.paper'}}>
                                    <TableSortLabel active={sortBy === 'status'} direction={sortOrder} onClick={() => handleSortRequest('status')}>Status</TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                            <TableCell colSpan={4} sx={{ height: 12, padding: 0, borderBottom: 'none' }} />
                        </TableRow>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center"><CircularProgress /></TableCell>
                                </TableRow>
                            ) : (
                                transactions.map((t) => (
                                    <TableRow key={t._id}>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Avatar src={t.user_profile} sx={{ width: 32, height: 32 }} />
                                                <Typography>{t.user_id}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{format(parseISO(t.date), 'MMM d, yyyy')}</TableCell>
                                        <TableCell>
                                            <Typography color={getAmountColor(t.category)} fontWeight="bold">
                                                {t.category === 'Revenue' ? '+' : '-'}{formatCurrency(t.amount)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{getStatusChip(t.status)}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    component="div"
                    count={totalTransactions}
                    page={page}
                    onPageChange={(_, newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </CardContent>

            {/* Filter Popover */}
            <Popover
                open={filterOpen}
                anchorEl={filterAnchorEl}
                onClose={() => setFilterAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Box sx={{ p: 2, maxWidth: 350 }}>
                    <Typography variant="subtitle2">Category</Typography>
                    <FormGroup row>
                        {(['Revenue', 'Expense'] as const).map((cat) => (
                            <FormControlLabel
                                key={cat}
                                control={
                                    <Checkbox
                                        checked={tempFilterCategories[cat]}
                                        onChange={(e) => setTempFilterCategories(prev => ({ ...prev, [cat]: e.target.checked }))}
                                    />
                                }
                                label={cat}
                            />
                        ))}
                    </FormGroup>
                    <Typography variant="subtitle2" sx={{ mt: 2 }}>Date Range</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Box sx={{ display: 'flex', gap: 1, mt: 2, alignItems:'center' }}>
                            <DatePicker
                                label="Start Date"
                                value={tempStartDate}
                                onChange={(date) => setTempStartDate(date)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        margin="dense"
                                    />
                                )}
                            />
                            <Typography sx={{ mx: 1 }}>–</Typography>
                            <DatePicker
                                label="End Date"
                                value={tempEndDate}
                                onChange={(date) => setTempEndDate(date)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        margin="dense"
                                    />
                                )}
                            />
                        </Box>

                    </LocalizationProvider>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button onClick={resetFilters}>Reset</Button>
                        <Button onClick={applyFilters} variant="contained">Apply</Button>
                    </Box>
                </Box>
            </Popover>

            {/* Export Dialog */}
            <Dialog open={exportDialogOpen} onClose={() => setExportDialogOpen(false)}>
                <DialogTitle>Export Transactions</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
                        Select columns to include in the CSV export:
                    </Typography>
                    <FormGroup>
                        {availableColumns.map((col) => (
                            <FormControlLabel
                                key={col.key}
                                control={
                                    <Checkbox
                                        checked={selectedColumns.includes(col.key)}
                                        onChange={(e) => {
                                            setSelectedColumns(
                                                e.target.checked
                                                    ? [...selectedColumns, col.key]
                                                    : selectedColumns.filter((c) => c !== col.key)
                                            );
                                        }}
                                    />
                                }
                                label={col.label}
                            />
                        ))}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setExportDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleExport} variant="contained">Export CSV</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TransactionsTable;



