import express = require('express');
import bodyParser = require('body-parser');

interface device {
  id: number;
  name: string;
  ip: string;
  architecture: string;
}

interface Records{
  devices: Array<device>;
}

// Create a new express application instance
const app: express.Application = express();
const RECORDS: Records = {
  devices: []
}

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

// CREATE
app.post('/record', function (req, res) {
  if (req.body) {
    let newRecord = req.body;
    let exists = false;
    for (let i = 0; i < RECORDS.devices.length; i++) {
      if (RECORDS.devices[i].id === newRecord.id) {
        res.send(false);
        exists = true;
        break;
      }
    }
    if (!exists) {
      RECORDS.devices.push(newRecord);
      res.send(true);
      console.log(RECORDS);
    }
  } else {
    res.send(false);
  }
});
//READ
app.get('/record', function (req, res) {
  res.send(JSON.stringify(RECORDS.devices));
});
//UPDATE
app.put('/record', function (req, res) {
  if (req.body) {
    let newRecord = req.body;
    let exists = false;
    for (let i = 0; i < RECORDS.devices.length; i++) {
      if (RECORDS.devices[i].id === newRecord.id) {
        RECORDS.devices[i] = newRecord;
        res.send(true);
        exists = true;
        break;
      }
    }
    if (!exists) {
      res.send(false);
    }
  } else {
    res.send(false);
  }
  console.log(RECORDS);
});
//DELETE
app.delete('/record', function (req, res) {
  if (req.body) {
    let newRecord = req.body;
    let newDeviceList = [];
    for (let i = 0; i < RECORDS.devices.length; i++) {
      if (RECORDS.devices[i].id !== newRecord.id) {
        newDeviceList.push(RECORDS.devices[i]);
      }
    }
    RECORDS.devices = newDeviceList;
    res.send(true);
  } else {
    res.send(false);
  }
  console.log(RECORDS);
});

app.listen(4333, function () {
  console.log('Example app listening on port 4333!');
});