import React from 'react';
import club_styles from './club_page_style.module.css';

function Counter({resumes_graded, total_resumes}) {
  return (
    <div className={club_styles.counter}>
      <h1>{resumes_graded} / {total_resumes}</h1>
    </div>
  )
}

function Resumes({resumes}){ // Do we want resumes to be a link that can prese nt the pdf or just a name
  const resumeItems = resumes.map((resume,index) => ( // currently implemented as a list of strings
  <div className={club_styles.resumeContainer} key={index}>{resume}</div>
 ));
 return <div className={club_styles.scrollContainer}>{resumeItems}</div>
}

export default function Page() {
  const resume_list = get_resumes(); // replace with function to return list of resume objects
  const resumes_total = resume_list.length;
  const resumes_graded = get_resumes_graded(); // replace with function to return number of graded resumes

  

  function back(){
    //TODO: go back to clubs page
  }

  function compare(){
    //TODO: go to resume comparison page
  }  
  document.body.style.backgroundColor = "#3f4f37cc";
  return(
    <>
      <button className={club_styles.backButton} onClick={back}> Back to Clubs page </button>
      <button className={club_styles.compare} onClick={compare}> CR </button>
      <div>
        <Resumes resumes={resume_list}/>
        <Counter resumes_graded = {resumes_graded} resumes_total = {resumes_total} />
      </div>
    </>
  )

}

function get_resumes() {
  return ['zane','cheryl','artin','naisha'];
}

function get_resumes_graded() {
  return 3;
}