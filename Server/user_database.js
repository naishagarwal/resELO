const { update_scores } = require('./file_info');
const fs = require('fs');

class User_Database {
    constructor(database) {
        this.db = database;
        //Clubs is JSON column that holds array of clubs for each user
        this.db.run('CREATE TABLE IF NOT EXISTS user_info (UID TEXT, Email TEXT, Clubs JSON)');
    }

    
    add_user(UID, email) {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO user_info(UID, email ) VALUES(?, ?)`;
            this.db.run(sql, [UID, email], function (err) {
                if (err) console.log(err) //reject(err);
                resolve();
            });
    }   );
    }

    get_all_users() {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM user_info", [], (err, rows) => {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    }

    add_club(UID, club_name) {
        return new Promise((resolve, reject) => {
            let selectSql = `SELECT Clubs FROM user_info WHERE UID = ?`; //fetching current clubs data for user
            this.db.get(selectSql, [UID], (selectErr, row) => {
                if(selectErr){
                    reject(selectErr)
                    return;
                }
            
            
            let clubs = row ? JSON.parse(row.Clubs) : []; //defaults to empty club array if no clubs are found for specific user
            clubs.push(club_name) //adding new club

            //update clubs data in database
            let updateSql = `UPDATE user_info SET Clubs = ? WHERE UID = ?`;
            this.db.run(updateSql, [JSON.stringify(clubs), UID], function (updateErr) {
                if(updateErr){
                    reject(updateErr);
                    return;
                }
                resolve();
            });

            
            });
        });
    }

}

module.exports = User_Database;