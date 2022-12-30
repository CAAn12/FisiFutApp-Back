const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'databasesd.mysql.database.azure.com',
    database: 'db_fisifutapp_en',
    user: 'g9root',
    password: 'S1stemasG9'
});

db.connect(function(err){
    if (err) throw err;
    console.log('DB conectada');
});

module.exports = db;