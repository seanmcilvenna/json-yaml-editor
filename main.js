"use strict";
const express = require("express");
const compression = require("compression");
const fs = require("fs");
const bodyParser = require('body-parser');

const _port = 8080;
const _app_folder = 'dist/json-yaml-editor';
const _dataPath = 'db/data.json';

const app = express();
app.use(compression());
app.use(bodyParser.json());

// ---- SERVE STATIC FILES ---- //
app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));

function getData() {
  var data = [];

  if (fs.existsSync(_dataPath)) {
    data = JSON.parse(fs.readFileSync(_dataPath).toString());
  }

  return data;
}

function updateData(data) {
  if (!fs.existsSync('db/')) {
    fs.mkdirSync('db/');
  }

  fs.writeFileSync(_dataPath, JSON.stringify(data, null, '\t'));
}

/*  "/api/status"
 *   GET: Get server status
 *   PS: it's just an example, not mandatory
 */
app.get("/api/deployment", function (req, res) {
  var response = getData()
    .map(d => {
      return {
        id: d.id,
        name: d.name
      };
    });

  res.send(response);
});

app.get('/api/deployment/:id', function(req, res) {
  var data = getData();
  var found = data.find(d => d.id === req.params.id);
  res.send(found);
});

app.put('/api/deployment/:id', function(req, res) {
  var data = getData();
  var found = data.find(d => d.id === req.params.id);
  var foundIndex = !!found ? data.indexOf(found) : -1;

  if (!found) {
    res.status(404).send();
  } else {
    data[foundIndex] = req.body;
  }

  updateData(data);
  res.send();
});

app.post('/api/deployment', function (req, res) {
  var data = getData();
  var found = data.find(d => d.id === req.body.id);
  var foundIndex = !!found ? data.indexOf(found) : -1;

  if (foundIndex >= 0) {
    data[foundIndex] = req.body;
  } else {
    data.push(req.body);
  }

  updateData(data);
  res.send();
});

app.delete('/api/deployment/:id', function(req, res) {
  var data = getData();
  var found = data.find(d => d.id === req.params.id);
  var foundIndex = !!found ? data.indexOf(found) : -1;

  if (foundIndex >= 0) {
    data.splice(foundIndex, 1);
  }

  updateData(data);
  res.send();
});

// ---- SERVE APLICATION PATHS ---- //
app.all('*', function (req, res) {
  res.status(200).sendFile(`/`, {root: _app_folder});
});

// ---- START UP THE NODE SERVER  ----
app.listen(_port, function () {
  console.log("Node Express server for " + app.name + " listening on http://localhost:" + _port);
});
