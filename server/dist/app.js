"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
// Create a new express application instance
var app = express();
var RECORDS = {
    devices: []
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
// CREATE
app.post('/record', function (req, res) {
    if (req.body) {
        var newRecord = req.body;
        var exists = false;
        for (var i = 0; i < RECORDS.devices.length; i++) {
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
    }
    else {
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
        var newRecord = req.body;
        var exists = false;
        for (var i = 0; i < RECORDS.devices.length; i++) {
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
    }
    else {
        res.send(false);
    }
    console.log(RECORDS);
});
//DELETE
app.delete('/record', function (req, res) {
    if (req.body) {
        var newRecord = req.body;
        var newDeviceList = [];
        console.log('FIND ME', newRecord);
        for (var i = 0; i < RECORDS.devices.length; i++) {
            if (RECORDS.devices[i].id !== newRecord.id) {
                newDeviceList.push(RECORDS.devices[i]);
            }
        }
        RECORDS.devices = newDeviceList;
        res.send(true);
    }
    else {
        res.send(false);
    }
    console.log(RECORDS);
});
app.listen(4333, function () {
    console.log('Example app listening on port 4333!');
});
