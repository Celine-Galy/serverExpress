const mysql = require('mysql');
  
class DBManager {
    db;
    constructor() {
        this.db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'majorette'
          });
          this.db.connect(function (err) {
    if (err) throw err;
    console.log("tu es bien connectée à la base de donnée!");
  
  });
        console.log('DB MANAGER CONSTRUCT');
        console.log(this.db);
    }
    getDB(){
        return this.db;
    }
}
module.exports = DBManager;