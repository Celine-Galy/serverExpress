

class DBManager {
    db;
    constructor() {
        console.log('DBMANNAGER CONSTRUCT');
        this.db='toto';
        console.log(this.db);
    }
}
module.exports = DBManager;