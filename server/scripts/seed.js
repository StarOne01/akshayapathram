/* Seed script for akshayapathram server.

Usage:
  node scripts/seed.js

This creates a sample donor user and several NGOs with addresses (latitude/longitude) so you can test /recommend.
*/

const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const Org = require('../models/Org');
const bcrypt = require('bcryptjs');

async function main() {
  await mongoose.connect(process.env.MONGO_URI, { dbName: 'akshayapathram' });
  console.log('Connected to Mongo');

  // Clear existing sample data (optional)
  // await User.deleteMany({});
  // await Org.deleteMany({});

  // Create donor
  const donorPh = '9999999999';
  let donor = await User.findOne({ phno: donorPh });
  if (!donor) {
    donor = new User({ name: 'Seed Donor', phno: donorPh, password: await bcrypt.hash('password', 10), role: 'donor' });
    await donor.save();
    console.log('Created donor user -> phno: 9999999999 password: password');
  } else {
    console.log('Donor already exists');
  }

  const sampleOrgs = [
    { name: 'Small NGO A', size: 10, address: { latitude: 10.9974, longitude: 76.9589 }, is_approved: true },
    { name: 'Medium NGO B', size: 50, address: { latitude: 10.9500, longitude: 76.9600 }, is_approved: true },
    { name: 'Large NGO C', size: 200, address: { latitude: 11.2000, longitude: 77.0000 }, is_approved: true },
    { name: 'Far NGO D', size: 20, address: { latitude: 12.5000, longitude: 77.5000 }, is_approved: true }
  ];

  for (const o of sampleOrgs) {
    let exists = await Org.findOne({ name: o.name });
    if (!exists) {
      const org = new Org(o);
      await org.save();
      console.log('Created org', o.name);
    } else console.log('Org already exists', o.name);
  }

  await mongoose.disconnect();
  console.log('Disconnected. Seed complete.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
