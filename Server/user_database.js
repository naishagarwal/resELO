const { update_scores } = require('./file_info');
const fs = require('fs');

//const fire_database = firebase.database()

class User_Database {
    constructor(database) {
        this.db = database;
        //Clubs is JSON column that holds array of clubs for each user
        this.db.run('CREATE TABLE IF NOT EXISTS user_info (UID INTEGER, Email TEXT, Clubs JSON)');
    }

    //populate database if does not already exist
    populate_database(user) {
        fs.readdir(__dirname + '/database/clubs/' + club_name, (err, files) => {
            let array = files.filter(function (str) { return str.match(/\.pdf$/); });
            // console.log(array);
            array.forEach(pdf_name => {
                //check if pdf alreayd in database
                let sql = `SELECT * FROM resume_info WHERE club_name = ? AND pdf_name = ?`;
                this.db.get(sql, [club_name, pdf_name], (err, row) => {
                    if (err) return console.error(err.message);
                    console.log(row);
                    if (!row) {
                        let sql = `INSERT INTO resume_info(club_name, pdf_name, elo, games_played) VALUES(?, ?, ?, ?)`;
                        this.db.run(sql, [club_name, pdf_name, 1000, 0], function (err) {
                            if (err) return console.error(err.message);
                        });
                    }
                });
            });
        });
    }
        
    add_user(UID) {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO resume_info(club_name, pdf_name, elo, games_played) VALUES(?, ?, ?, ?)`;
            this.db.run(sql, [club_name, pdf_name, 1000, 0], function (err) {
                if (err) reject(err);
                resolve();
            });
    }   );
    }

    add_club(club_name) {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO resume_info(club_name, pdf_name, elo, games_played) VALUES(?, ?, ?, ?)`;
            this.db.run(sql, [club_name, pdf_name, 1000, 0], function (err) {
                if (err) reject(err);
                resolve();
            });
    }   );
    }
    
    get_club_info(club_name) {
        return new Promise((resolve, reject) => {
            //get number of resumes and stats about them from database
            // if club does not exist return {exitst: false}
            let sql = `SELECT * FROM resume_info WHERE club_name = ?`;
            this.db.all(sql, [club_name], (err, rows) => {
                if (err) {
                    reject({exists : false, message: err.message})
                }
                if (rows.length == 0) {
                    resolve({ exists: false });
                } else {
                    let num_resumes = rows.length;
                    let num_games = 0;
                    rows.forEach((row) => {
                        num_games += row.games_played;
                    });
                    let avg_games = num_games / num_resumes;
                    resolve({ exists: true, 
                        num_resumes: num_resumes, 
                        num_games: num_games, 
                        avg_games: avg_games });
                }
            });
        });
    }

}

module.exports = User_Database;