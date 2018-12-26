const functions = require('firebase-functions');
const express = require('express');
const apiPaths = require('./src/apiPaths.json');

const app = express();

app.get('/check', (request, response) => {
  response.send(`${Date.now()}`);
})

app.get('/players', (request, response) => {
  response.send(`${apiPaths.players}`);
});

exports.app = functions.https.onRequest(app);
