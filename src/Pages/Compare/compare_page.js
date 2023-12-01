import React from 'react';
import { useState, useEffect } from 'react';
import compare_styles from './compare_style.module.css';
import {useNavigate} from 'react-router-dom'

function Resume({ resume,  onButtonClick }) {
    return (
        <div className={compare_styles.resumeContainer}>
            <iframe src={resume} className={compare_styles.pdf} />
            <button className={compare_styles.resumeButton} onClick={onButtonClick}> This One </button>
            <text> {resume.elo} </text>
        </div>
    );
}

async function get_and_set_pdf_links(club_name, setPdf_1_link, setPdf_2_link) {
    return await fetch('http://localhost:4000/get_next_resumes/'+club_name, {
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'get'
    }).then((response) => {
        return response.json();
    }).then((data) => { 
        let link1 = encodeURI('http://localhost:4000'+data.link1);
        let link2 = encodeURI('http://localhost:4000'+data.link2);
        console.log(link1);
        console.log(link2);
        setPdf_1_link(link1);
        setPdf_2_link(link2);
    });
}

function winClick(win, lose, club_name, setPdf_1_link, setPdf_2_link) {
    console.log((win.split('/')[win.split('/').length-1]).split('?')[0]);
    try {
        fetch('http://localhost:4000/update_scores', {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'post',
            body: JSON.stringify({
                club_name: club_name,
                winner: (win.split('/')[win.split('/').length-1]).split('?')[0],
                loser: (lose.split('/')[lose.split('/').length-1]).split('?')[0],
            })
        }).then((response) => {
            get_and_set_pdf_links(club_name, setPdf_1_link, setPdf_2_link)
        });
    } catch (error) {
        console.log(error);
    }
}



export default function Page({club_name}) {
    const navigate = useNavigate();
    const [pdf_1_link, setPdf_1_link] = useState('http://localhost:4000/resumes/test/llama.pdf');
    const [pdf_2_link, setPdf_2_link] = useState('http://localhost:4000/resumes/test/2.pdf');

    document.body.style.backgroundColor = '#3f4f37cc';

    function back() {
        //TODO: Go back to the club page
        navigate('/club-page');
    }

    return (
        <div>
            <button className={compare_styles.backButton} onClick={back}> Back To Club Page</button>
            <h1>Choose the better resume</h1>
            <div className={compare_styles.contentContainer}>
                <Resume resume={pdf_1_link} onButtonClick={() => winClick(pdf_1_link, pdf_2_link, club_name, setPdf_1_link, setPdf_2_link)}/>
                <Resume resume={pdf_2_link} onButtonClick={() => winClick(pdf_2_link, pdf_1_link, club_name, setPdf_1_link, setPdf_2_link)}/>
            </div>
        </div>
    )
}
