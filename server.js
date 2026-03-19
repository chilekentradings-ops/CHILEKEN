const express = require('express');
const cron = require('node-cron');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname))); // Serves your index.html

// Health endpoint for keep-alive pinger
app.get('/ping', (req, res) => res.send('pong'));

let config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
console.log('✅ Loaded', config.statuses.length, 'statuses');

function pickNext() { /* same as before */ }
async function postStatus(status) { /* same Wassenger code as before */ }

// Daily cron (your chosen time)
const [hour, minute] = config.postTime.split(':');
cron.schedule(`${minute} ${hour} * * *`, () => postStatus(pickNext()));

// Also run once on startup for testing
postStatus(pickNext());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 App running on port ${PORT} + daily cron active`));