const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
let db =  new sqlite3.Database('chinook.db');

app.post('/AddWorker', (req, res) => {
    db.all(`INSERT INTO PracownicyZatrudnieni VALUES (${req.query.PersonId}, ${req.query.LastName}, ${req.query.FirstName}, ${req.query.NFCCode})`, (err, rows) => {
        if(err){
            return console.log(err);
        }
        return res.send(rows);
    })
});

app.post('/WorkerScanned', (req, res) => {
    db.all(`INSERT INTO Wejscia VALUES (${req.query.PersonId}, ${req.query.LastName}, ${req.query.FirstName}, ${req.query.DateAndTime})`, (err, rows) => {
        if(err){
            return console.log(err);
        }
        return res.send(rows);
    })
});

app.get('/FindWorkerByNfcCode', (req, res) =>{
    db.all(`SELECT * FROM PracownicyZatrudnieni WHERE NFCCode = ${req.query.NfcCode}`, (err, rows) => {
        if(err) return console.log(err);
        return res.send(rows);
    })
})

app.get('/GetAllFromTable', (req, res) => {
    db.all(`SELECT * FROM ${req.query.Table}`, (err, rows) => {
        if(err) return console.log(err);
        return res.send(rows);
    })    
});

app.post('/CreateDebug', (req, res) => {
    db.all(`CREATE TABLE Wejscia (PersonID int, LastName varchart(255), FirstName varchart(255), DateAndTime datetime)`, (err, rows) => {
        if(err) return console.log(err);
    })    
});

app.get('/GetAllTables', (req, res) => {
    db.all(`SELECT name FROM sqlite_master WHERE type IN ('table','view') AND name NOT LIKE 'sqlite_%' ORDER BY 1`, (err, rows) => {
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

