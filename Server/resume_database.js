const { update_scores } = require('./file_info');
const fs = require('fs');


class Resume_Database {
    constructor(database) {
        this.db = database;
        this.db.run('CREATE TABLE IF NOT EXISTS resume_info (id INTEGER PRIMARY KEY AUTOINCREMENT, club_name TEXT, pdf_name TEXT, elo INTEGER, games_played INTEGER)');
    }
    //populate database if does not already exist
    populate_database(club_name) {
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
        
    add_resume(club_name, pdf_name) {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO resume_info(club_name, pdf_name, elo, games_played) VALUES(?, ?, ?, ?)`;
            this.db.run(sql, [club_name, pdf_name, 1000, 0], function (err) {
                if (err) reject(err);
                resolve();
            });
    }   );
    }

    //get two random resumes from database
    get_next_resumes(club_name) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT pdf_name FROM resume_info WHERE club_name = ? ORDER BY RANDOM() LIMIT 2`;
            this.db.all(sql, [club_name], (err, rows) => {
                if (err) return console.error(err.message);
                if (rows.length == 2) {
                    resolve(rows.map(row => row.pdf_name));
                } else {
                    resolve(null);
                }
            });
        });
    }

    get_resume_elo(club_name, pdf) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT elo FROM resume_info WHERE club_name = ? AND pdf_name = ?`;
            this.db.get(sql, [club_name, pdf], (err, row) => {
                if (err) return console.error(err.message);
                if (row) {
                    resolve(row.elo);
                } else {
                    resolve(-1);
                }
            });
        });
    }

    get_all_rows(table_name, cb) {
        let sql = `SELECT * FROM ${table_name}`;
        this.db.all(sql, [], (err, rows) => {
            if (err) return console.error(err.message);
            cb(rows);
        });
    }

    update_scores(club_name, winner, loser) {
        return new Promise((resolve, reject) => {
            this.get_resume_elo(club_name, winner).then((winner_elo) => {
                this.get_resume_elo(club_name, loser).then((loser_elo) => {
                    if (winner_elo == -1 || loser_elo == -1) {
                        resolve(null);
                    }
                    let winner_expected = 1 / (1 + Math.pow(10, ((loser_elo - winner_elo) / 400)));
                    let loser_expected = 1 / (1 + Math.pow(10, ((winner_elo - loser_elo) / 400)));
                    let winner_new_elo = winner_elo + 32 * (1 - winner_expected);
                    let loser_new_elo = loser_elo + 32 * (0 - loser_expected);
                    let sql = `UPDATE resume_info SET elo = ?, games_played = games_played + 1 WHERE club_name = ? AND pdf_name = ?`;
                    this.db.run(sql, [winner_new_elo, club_name, winner], function (err) {
                        if (err) return console.error(err.message);
                    });
                    this.db.run(sql, [loser_new_elo, club_name, loser], function (err) {
                        if (err) return console.error(err.message);
                    });
                    resolve([winner_new_elo, loser_new_elo]);
                });
            });
        }
        );
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

module.exports = Resume_Database;