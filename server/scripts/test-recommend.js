/* Automated test for recommendation flow.

Usage:
  node scripts/test-recommend.js

This script will:
 - Ensure seed data exists (does NOT wipe DB)
 - Login as the seed donor (phone 9999999999 / password 'password')
 - Call /recommend with donor coordinates and print results

Make sure the server is running (npm run start)
*/

const axios = require('axios');
require('dotenv').config();

const BASE = process.env.BASE_URL || 'http://localhost:3000';

async function login() {
  try {
    const res = await axios.post(`${BASE}/auth/login`, { phno: '9999999999', password: 'password' });
    return res.data.token;
  } catch (err) {
    console.error('Login failed:', err.response?.data || err.message);
    throw err;
  }
}

async function callRecommend(token) {
  try {
    const res = await axios.post(
      `${BASE}/recommend`,
      { latitude: 10.9974, longitude: 76.9589, radiusKm: 40 },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('Recommend response:', JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error('Recommend API failed:', err.response?.data || err.message);
    throw err;
  }
}

(async () => {
  try {
    console.log('Logging in seed donor...');
    const token = await login();
    console.log('Got token:', token?.slice?.(0, 20) + '...');
    await callRecommend(token);
  } catch (err) {
    console.error('Test failed');
    process.exitCode = 1;
  }
})();
