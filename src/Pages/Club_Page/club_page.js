import React, {useState } from 'react';
import SearchBar from './SearchBar';
import club_styles from './club_page_style.module.css';

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






export default function Page() {
  const resume_list = get_resumes();
  const [search_results, set_search_results] = useState(resume_list);
  const resumes_total = resume_list.length;
  const resumes_graded = get_resumes_graded(); // replace with function to return number of graded resumes

  const handleSearch = (searchTerm) => {
    const filteredResults = resume_list.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
    set_search_results(filteredResults);
  };
  

  function back(){
    //TODO: go back to clubs page
  }

  function compare(){
    //TODO: go to resume comparison page
  }  

  document.body.style.backgroundColor = "#3f4f37cc";
  
  return (
    <div>
      <button className={club_styles.backButton} onClick={back}> Back to Clubs page </button>
      <h1> Club Page </h1>
      <div className={club_styles.contentContainer}>
        <div className={club_styles.content}>
          <Resumes resumes={search_results} handleSearch={handleSearch} ></Resumes>
        </div>
        <div className={club_styles.content}>
          <Counter resumesGraded={resumes_graded} resumeTotal={resumes_total}></Counter>
          <div className={club_styles.compareButton} onClick={compare}> Compare </div>
        </div>
      </div>
    </div>
  )
}

function Resumes({resumes, handleSearch}){ // Do we want resumes to be a link that can prese nt the pdf or just a name
  const resumeItems = resumes.map((resume,index) => ( // currently implemented as a list of strings
     <div className={club_styles.resumeContainer} key={index}>{resume}</div>
     )
   );
 
  return (<div className={club_styles.scrollContainer}>
   <div className={club_styles.scrollTitleWithSearchBar}>
             <div className={club_styles.scrollTitle}> Club Resumes </div>
             <SearchBar handleSearch={handleSearch} />
   </div>
   {resumeItems}
  </div>)
 }



function get_resumes() {
  //TODO: return a list of resume names or links

  //filler
  let resumes = [];
  for (let i = 0; i < 100; i++){
    let b = String(i)
    resumes.push(b);
  };
  return resumes;
}

function get_resumes_graded() {
  // TODO: implement way to get number of resumes graded 
  return 3;
}


