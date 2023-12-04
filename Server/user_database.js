const { update_scores } = require('./file_info');
const fs = require('fs');

class User_Database {
    constructor(database) {
        this.db = database;
        //Clubs is JSON column that holds array of clubs for each user
        this.db.run('CREATE TABLE IF NOT EXISTS users (UID PRIMARY KEY, Email TEXT UNIQUE)');
        // this.db.run('CREATE TABLE IF NOT EXISTS clubs (club_name TEXT PRIMARY KEY)');
        this.db.run('CREATE TABLE IF NOT EXISTS user_clubs (UID TEXT, club_name TEXT)');
    }

    
    add_user(UID, email) {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO users(UID, email ) VALUES(?, ?)`;
            this.db.run(sql, [UID, email], function (err) {
                if (err) console.log(err) //reject(err);
                resolve();
            });
    }   );
    }

    get_all_users() {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM users", [], (err, rows) => {
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
            // check if user exists
            // let sql = `SELECT * FROM users WHERE UID = ?`;
            // this.db.get(sql, [UID], (err, row) => {
            //     if (err) return console.error(err.message);
            //     if (!row) {
            //         reject("User does not exist");
            //     } else {
            let sql = `SELECT * FROM user_clubs WHERE club_name = ?`;
            this.db.get(sql, [club_name], (err, row) => {
                if (err) return console.error(err.message);
                // add club if does not already exist
                if (!row) {
                    let sql = `INSERT INTO user_clubs(UID, club_name) VALUES(?, ?)`;
                    this.db.run(sql, [UID, club_name], function (err) {
                        if (err) return console.error(err.message);
                        resolve();
                    });
                } else {
                    reject("Club already exists");
                }
            });
            //     }
            // });
        });
    }

    get_clubs(UID) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT club_name FROM user_clubs WHERE UID = ?`;
            this.db.all(sql, [UID], (err, rows) => {
                if (err) return console.error(err.message);
                resolve(rows.map(row => row.club_name));
            });
        });
    }

}

module.exports = User_Database;