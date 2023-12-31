import React from 'react';
import { useState, useEffect } from 'react';
import compare_styles from './compare_style.module.css';
import {useNavigate, useParams} from 'react-router-dom'
// import { getAuth } from "firebase/auth";
import { getAuth } from "firebase/auth";
import Log_Out from '../Sign_Up_Page/log_out.js';


function Resume({ resume,  onButtonClick }) {
    return (
        <div className={compare_styles.resumeContainer}>
            <iframe src={resume} className={compare_styles.pdf} />
            <button className={compare_styles.resumeButton} onClick={onButtonClick}> This One </button>
            <text> {resume.elo} </text>
        </div>
    );
}

async function get_and_set_pdf_links(clubName, setPdf_1_link, setPdf_2_link) {
    fetch('http://localhost:4000/get_next_resumes/'+clubName, {
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'get'
    }).then((response) => {
        return response.json();
    }).then((data) => { 
        console.log("STUFF");
        console.log(data);
        let link1 = encodeURI('http://localhost:4000'+data.link1);
        let link2 = encodeURI('http://localhost:4000'+data.link2);
        console.log(link1);
        console.log(link2);
        setPdf_1_link(link1);
        setPdf_2_link(link2);
    }).catch((error) => {
        console.log(error);
    });
}

function winClick(win, lose, clubName, setPdf_1_link, setPdf_2_link) {
    fetch('http://localhost:4000/update_scores', {
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({
            club_name: clubName,
            winner: (win.split('/')[win.split('/').length-1]).split('?')[0],
            loser: (lose.split('/')[lose.split('/').length-1]).split('?')[0],
        })
    }).then((response) => {
        console.log(response);
        get_and_set_pdf_links(clubName, setPdf_1_link, setPdf_2_link);
    }).catch ((err) => {    
        console.log(err);
    });
}



export default function Page() {
    const {clubName} = useParams();
    const navigate = useNavigate();
    const [pdf_1_link, setPdf_1_link] = useState("");
    const [pdf_2_link, setPdf_2_link] = useState("");

    document.body.style.backgroundColor = '#3f4f37cc';

    useEffect(() => {
        get_and_set_pdf_links(clubName, setPdf_1_link, setPdf_2_link)
    }, []);

    function back() {
        navigate('/club/'+clubName);
    }

    return (
        <div>
            <Log_Out style_sheet='sign_up_styles'> </Log_Out>
            <button className={compare_styles.backButton} onClick={back}> Back To Club Page</button>
            <h1>Choose the better resume</h1>
            <div className={compare_styles.contentContainer}>
                <Resume resume={pdf_1_link} onButtonClick={() => winClick(pdf_1_link, pdf_2_link, clubName, setPdf_1_link, setPdf_2_link)}/>
                <Resume resume={pdf_2_link} onButtonClick={() => winClick(pdf_2_link, pdf_1_link, clubName, setPdf_1_link, setPdf_2_link)}/>
            </div>
        </div>
    )
}
