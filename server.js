const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
let db =  new sqlite3.Database('chinook.db');

app.get('/get', (req, res) => {
    db.all('SELECT Title FROM albums Where AlbumId = 4', (err, rows) => {
        console.log(rows);
        res.send(rows);
    })
});
    // db.serialize(() => {
    //     let arr = [];
    //     db.each('SELECT * FROM albums', (err, row) => {
    //       if (err) {
    //         console.error(err.message);
    //       }
    //       arr.push(row);
    //     });
    //       res.send(arr)
    //     }); 
    //   });


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

