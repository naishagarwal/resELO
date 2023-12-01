const fs = require('fs');
const path = require('path');
function update_scores(club_name, pdf1, pdf2, winner) {
    file_name = path.join(__dirname,  '/database/clubs/' + club_name + '/scores.json')
    const data = fs.readFileSync(file_name, (err, data) => {
        if (err) throw err;
    });
    let scores = JSON.parse(data);

    scores[pdf1]['games_played'] += 1;
    scores[pdf2]['games_played'] += 1;
    scores[pdf1]['in_use'] = false;
    scores[pdf2]['in_use'] = false;
    if (winner == pdf1) {
        scores[pdf1]['elo'] += 32;
        scores[pdf2]['elo'] -= 32;
    } else {
        scores[pdf2]['elo'] -= 32;
        scores[pdf1]['elo'] += 32;
    }
    console.log(scores)
    fs.writeFileSync(file_name, JSON.stringify(scores));
}

function add_resume(club_name, pdf_name, cb) {
    file_name = path.join(__dirname,  '/database/clubs/' + club_name + '/scores.json')
    let data = fs.readFileSync(file_name, (err, data) => {
        if (err) throw err;
    });
    let resumes = JSON.parse(data);
        
    if(!resumes.hasOwnProperty(pdf_name)) {
        resumes[pdf_name] = {};
        resumes[pdf_name]['elo'] = 1000;
        resumes[pdf_name]['games_played'] = 0;
        resumes[pdf_name]['in_use'] = false;
    }
    fs.writeFileSync(file_name, JSON.stringify(resumes));
    cb(null, pdf_name);
}

function get_resume_elo(club_name, pdf) {
    try {
        const data = fs.readFileSync(__dirname + '/database/clubs/' + club_name + '/scores.json');
        let elo = JSON.parse(data);
        return elo[pdf]['elo'];
    } catch (error) {
        return -1;
    }
    
}

module.exports = { update_scores, add_resume, get_resume_elo };