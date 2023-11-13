import React from 'react';
import { useState } from 'react';

function Resume({ pdf_link, onButtonClick }) {
    return (
        <div className="resume-container">
            <iframe src={pdf_link} className="pdf" />
            <button className="resume-button" onClick={onButtonClick}> This One </button>
        </div>
    );
  }

export default function Page() {
    const [pdf_1_link, setPdf_1_link] = useState(get_pdf_link()); //replace with function that returns the link
    const [pdf_2_link, setPdf_2_link] = useState(get_pdf_link()); //replace with function that returns the link

    //console.log('pdf_1_link: ' + pdf_1_link);
    //console.log('pdf_2_link: ' + pdf_2_link);

    function winClick(win,lose) { //Do we want to pass in link or ID? - let's do link, but convert to ID when calling the backend func
        console.log('Button clicked!'); // For example, log a message to the console
        // You can also navigate to a different page, trigger a function, etc.
    }

    function back() {
        //TODO: Go back to the club page
    }

    return (
        <>
        <button className="back-button" onClick={back}> Back To Club Page</button>
        <h1>Choose the better resume</h1>
        
        <div className="content-container">
            <Resume pdf_link={pdf_1_link} onButtonClick={() => winClick(pdf_1_link, pdf_2_link)}/>
            <Resume pdf_link={pdf_2_link} onButtonClick={() => winClick(pdf_2_link, pdf_1_link)}/>
        </div>
        </>
        
    )
}


function get_pdf_link() { //placeholder fucntion, might actually have to be one function that returns two links later
    //call backend function that returns the link
    console.log('get_pdf_link called!');
    return 'http://africau.edu/images/default/sample.pdf';
}