const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
let db =  new sqlite3.Database('chinook.db');
var sqliteCommands = require('sqliteCommands');
let wejscia = 0;

app.post('/AddWorker', (req, res) => {
    db.all(sqliteCommands.addWorker(req.query.PersonId, req.query.LastName, req.query.FirstName, req.query.NFCCode), (err, rows) => {
        if(err){
            return console.log(err);
        }
        return res.send(rows);
    })
});

app.post('/WorkerScanned', (req, res) => {
    db.all(sqliteCommands.workerScanned(req.res.FirstName, req.res.LastName, req.res.DateAndTime), (err, rows) => {
        if(err){
            return console.log(err);
        }
        return res.send(rows);
    })
});

app.get('/GetWorkerStatus', (req, res) => {
    db.all(sqliteCommands.getWorkerStatus(req.query.FirstName, req.query.LastName), (err, rows) => {
        if(err){
            return console.log(err);
        }
        //hopefully returns only one element
        wejscia = rows[0].IsCurrentlyWorking;
        console.log(wejscia);
        return wejscia
    })
});

app.post('/SetWorkerStatus', (req, res) => {
    db.all(sqliteCommands.setWorkerStatus(req.query.WorkerStatus, req.query.FirstName, req.query.LastName), (err, rows) => {
        if(err){
            return console.log(err);
        }
    })
});

app.get('/FindWorkerByNfcCode', (req, res) => {
    db.all(sqliteCommands.findWorkerByNfcCode(req.query.NfcCode), (err, rows) => {
        if(err) return console.log(err);
        return res.send(rows);
    })
})

app.get('/GetAllFromTable', (req, res) => {
    db.all(sqliteCommands.getAllFromTable(req.query.Table), (err, rows) => {
        if(err) return console.log(err);
        return res.send(rows);
    })    
});

app.get('/GetAllTables', (req, res) => {
    db.all(sqliteCommands.getAllTables(), (err, rows) => {
        if(err) return console.log(err);
        res.send(rows);
    })    
});


app.use(bodyParser.json());
app.listen(port, () => console.log(`Server is listening on port ${port}`));


function closeDb(){
    db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
      });   
}

