'use strict';

const express = require('express');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello ssh agent plugin is working and webhook also working fine!!');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
