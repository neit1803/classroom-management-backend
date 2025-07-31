require('dotenv').config();

const path = require('path');
const admin = require("firebase-admin");

const serviceAccountPath = path.resolve(__dirname, '../../', process.env.SERVICE_ACCOUNT_KEY_PATH);
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL || ""
});

const db = admin.database();
const auth = admin.auth();

module.exports = {
  admin,
  db,
  auth
};