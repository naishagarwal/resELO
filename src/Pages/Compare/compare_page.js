import React from 'react';
import { useState } from 'react';
import compare_styles from './compare_style.module.css';
import {useNavigate} from 'react-router-dom'

function Resume({ pdf_link, onButtonClick }) {
    return (
        <div className={compare_styles.resumeContainer}>
            <iframe src={pdf_link} className={compare_styles.pdf} />
            <button className={compare_styles.resumeButton} onClick={onButtonClick}> This One </button>
        </div>
    );
}

function get_pdf_link() { //placeholder fucntion, might actually have to be one function that returns two links later
    //call backend function that returns the link
    console.log('get_pdf_link called!');
    return 'http://africau.edu/images/default/sample.pdf';
}

export default function Page() {
    const navigate = useNavigate()
    const [pdf_1_link, setPdf_1_link] = useState(get_pdf_link()); //replace with function that returns the link
    const [pdf_2_link, setPdf_2_link] = useState(get_pdf_link()); //replace with function that returns the link
    document.body.style.backgroundColor = '#3f4f37cc';
    //console.log('pdf_1_link: ' + pdf_1_link);
    //console.log('pdf_2_link: ' + pdf_2_link);

    function winClick(win,lose) { //Do we want to pass in link or ID? - let's do link, but convert to ID when calling the backend func
        console.log('Button clicked!'); // For example, log a message to the console
        // You can also navigate to a different page, trigger a function, etc.
    }

    function back() {
        //TODO: Go back to the club page
        navigate('/club-page')
    }

    return (
        <div>
            <button className={compare_styles.backButton} onClick={back}> Back To Club Page</button>
            <h1>Choose the better resume</h1>
            <div className={compare_styles.contentContainer}>
                <Resume pdf_link={pdf_1_link} onButtonClick={() => winClick(pdf_1_link, pdf_2_link)}/>
                <Resume pdf_link={pdf_2_link} onButtonClick={() => winClick(pdf_2_link, pdf_1_link)}/>
            </div>
        </div>
    )
}
