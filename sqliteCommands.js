
function workerScanned(FirstName, LastName, DateAndTime){
    return `INSERT INTO Wejscia (FirstName, LastName, DateAndTime) VALUES (${FirstName}, ${LastName}, ${DateAndTime})`
}

function getWorkerStatus(FirstName, LastName){
    return `SELECT isCurrentlyWorking FROM PracownicyZatrudnieni WHERE (FirstName = ${FirstName} AND LastName = ${LastName})`
}

function setWorkerStatus(WorkerStatus, FirstName, LastName){
    return `UPDATE PracownicyZatrudnieni SET isCurrentlyWorking = ${WorkerStatus} WHERE (FirstName = ${FirstName} AND LastName = ${LastName})`
}

function findWorkerByNfcCode(NfcCode){
    return `SELECT * FROM PracownicyZatrudnieni WHERE NFCCode = "${NfcCode}"`
}

function getAllFromTable(Table){
    return `SELECT * FROM ${Table}`
}

function getAllTables(){
    return `SELECT name FROM sqlite_master WHERE type IN ('table','view') AND name NOT LIKE 'sqlite_%' ORDER BY 1`
}