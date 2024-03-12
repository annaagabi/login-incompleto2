const mysql = require('mysql2');
 
function createDBConnection() {
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'signup'
    });
    
    return db;
}
 
module.exports = createDBConnection;