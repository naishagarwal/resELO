import React from 'react';
import club_styles from './club_page_style.module.css';
import {useParams} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

function Counter({resumes_graded, total_resumes}) {
  const graded = Number(resumes_graded);
  const total = Number(total_resumes);
  return (
    <>
      <div className={club_styles.counter}> 
        <div className={club_styles.titleBar}> Counter </div>
        <div className={club_styles.counterContent}>{graded} / {total}</div>
      </div>
    </>
  )
}

function Resumes({resumes}){ // Do we want resumes to be a link that can prese nt the pdf or just a name
 const resumeItems = resumes.map((resume,index) => ( // currently implemented as a list of strings
    <div className={club_styles.resumeContainer} key={index}>{resume}</div>
    )
  );

 return (<div className={club_styles.scrollContainer}>
  <div className={club_styles.scrollTitle}> Club Resumes </div>
  {resumeItems}
 </div>)
}

export default function Page() {
  const {clubName} = useParams()
  const navigate = useNavigate()
  const resume_list = get_resumes(); // replace with function to return list of resume objects
  const resumes_total = resume_list.length;
  const resumes_graded = get_resumes_graded(); // replace with function to return number of graded resumes

  

  function back(){
    //TODO: go back to clubs page
    navigate('/dashboard')

  }

  function compare(){
    //TODO: go to resume comparison page
    navigate('/compare')
  }  

  document.body.style.backgroundColor = "#3f4f37cc";
  
  return(
    <div>
      <button className={club_styles.backButton} onClick={back}> Back to Clubs page </button>
      <h1> {clubName} Page </h1>
      <div className={club_styles.contentContainer}>
        <div className={club_styles.content}>
          <Resumes resumes={resume_list} ></Resumes>
        </div>
        <div className={club_styles.content}>
          <Counter resumesGraded={resumes_graded} resumeTotal={resumes_total}></Counter>
          <div className={club_styles.compareButton} onClick={compare}> Compare </div>
        </div>
      </div>
    </div>
  )

}

function get_resumes() {
  //TODO: return a list of resume names or links

  //filler
  let resumes = [];
  for (let i = 0; i < 100; i++){
    resumes.push(i);
  };
  return resumes;
}

function get_resumes_graded() {
  // TODO: implement way to get number of resumes graded 
  return 3;
}

