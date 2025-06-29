import axios, { AxiosError } from 'axios';

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/api';

// Generate a unique username for each test run to avoid conflicts
const testUsername = `user_001`;
const testPassword = 'testpassword123';
let authToken: string | null = null;

const logResponse = (message: string, data: any) => {
  console.log(`\n--- ${message} ---`);
  console.log(JSON.stringify(data, null, 2));
};

const logError = (message: string, error: any) => {
  console.error(`\n--- ERROR: ${message} ---`);
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('Status:', axiosError.response.status);
      console.error('Data:', JSON.stringify(axiosError.response.data, null, 2));
    } else if (axiosError.request) {
      console.error('No response received:', axiosError.request);
    } else {
      console.error('Error message:', axiosError.message);
    }
  } else {
    console.error(error);
  }
};

async function runTests() {
  console.log('Starting API tests...');

  // 1. Register a new user
  try {
    const registerResponse = await axios.post(`${BASE_URL}/auth/register`, {
      username: testUsername,
      password: testPassword,
      user_profile: "https://thispersondoesnotexist.com/"
    });
    logResponse('User Registration', registerResponse.data);
    if (registerResponse.data.token) {
        // Some registration endpoints might return a token directly
        authToken = registerResponse.data.token;
    }
  } catch (error) {
    logError('User Registration Failed', error);
    // If registration fails, we might not be able to proceed with other tests that depend on a user.
    // However, we'll try to login in case the user was created in a previous partial run.
  }

  // 2. Login with the new user
  if (!authToken) { // Only login if registration didn't provide a token
    try {
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
        username: testUsername,
        password: testPassword,
        });
        logResponse('User Login', loginResponse.data);
        authToken = loginResponse.data.token;
    } catch (error) {
        logError('User Login Failed', error);
        console.log('Cannot proceed without authentication token. Exiting tests.');
        return; // Exit if login fails
    }
  }


  if (!authToken) {
    console.error('Authentication token not obtained. Aborting further tests.');
    return;
  }

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  // 3. Get user profile (Protected Route)
  try {
    const profileResponse = await axios.get(`${BASE_URL}/auth/profile`, authHeaders);
    logResponse('Get User Profile', profileResponse.data);
  } catch (error) {
    logError('Get User Profile Failed', error);
  }

  // 4. Get transactions (Protected Route with query params)
  try {
    const params = new URLSearchParams({
        page: '1',
        limit: '5',
        category: 'Revenue',
        sortBy: 'amount',
        sortOrder: 'desc'
    }).toString();
    const transactionsResponse = await axios.get(`${BASE_URL}/transactions?${params}`, authHeaders);
    logResponse('Get Transactions (Revenue, sorted by amount desc, limit 5)', transactionsResponse.data);
  } catch (error) {
    logError('Get Transactions Failed', error);
  }

  // 5. Get transaction statistics (Protected Route)
  try {
    const statsResponse = await axios.get(`${BASE_URL}/transactions/stats`, authHeaders);
    logResponse('Get Transaction Stats', statsResponse.data);
  } catch (error) {
    logError('Get Transaction Stats Failed', error);
  }

  // 6. Export transactions to CSV (Protected Route)
  try {
    const exportParams = new URLSearchParams({
        fields: 'id,date,amount,category', // Select specific fields
        status: 'Paid'
    }).toString();
    const exportResponse = await axios.get(`${BASE_URL}/transactions/export?${exportParams}`, {
      ...authHeaders,
      responseType: 'text', // Get response as text to check headers
    });
    logResponse('Export Transactions to CSV - Status & Headers', {
      status: exportResponse.status,
      contentType: exportResponse.headers['content-type'],
      contentDisposition: exportResponse.headers['content-disposition'],
      // dataPreview: exportResponse.data.substring(0, 200) + '...' // Preview first 200 chars
    });
    if (exportResponse.status !== 200 || !exportResponse.headers['content-type']?.includes('text/csv')) {
        console.error("CSV Export did not return expected status or content type.");
    }
  } catch (error) {
    logError('Export Transactions to CSV Failed', error);
  }

  // 7. Test Transaction Listing with Search (assuming 'user_001' has 'Revenue' transactions)
  // This requires data to be loaded via loadData.ts script for meaningful search results
  try {
    const searchParams = new URLSearchParams({
        search: 'user_001', // Search for transactions associated with user_001 or text containing 'Revenue'
        limit: '3'
    }).toString();
    const searchTransactionsResponse = await axios.get(`${BASE_URL}/transactions?${searchParams}`, authHeaders);
    logResponse('Get Transactions with Search (text: "user_001")', searchTransactionsResponse.data);
  } catch (error) {
    logError('Get Transactions with Search Failed', error);
  }


  console.log('\nAPI tests completed.');
}

runTests().catch(error => {
  console.error('\n--- UNHANDLED ERROR IN TEST RUNNER ---');
  console.error(error);
});