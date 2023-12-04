import React, {useState } from 'react';
import SearchBar from './SearchBar';
import club_styles from './club_page_style.module.css';
import {useParams} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

function Stats({stats_array}) {

  const confidence_score = stats_array[0];
  const resumes_graded = stats_array[1]

  return (
    <>
      <div className={club_styles.stats}> 
        <div className={club_styles.titleBar}> Stats </div>
        <div className={club_styles.counterContent}>  Confidence Score: {confidence_score}% <br />
        Resumes Graded: {resumes_graded} {'\n'}
        </div>
      </div>
    </>
  )
}






export default function Page() {
  const resume_list = get_resumes();
  const [search_results, set_search_results] = useState(resume_list);
  const {clubName} = useParams()
  const navigate = useNavigate() // replace with function to return list of resume objects
  const resumes_total = resume_list.length;
  const stats_array = get_stats_array(); // replace with function to return number of graded resumes

  const handleSearch = (searchTerm) => {
    const filteredResults = resume_list.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
    set_search_results(filteredResults);
  };
  

  function back(){
    //TODO: go back to clubs page
    navigate('/dashboard')

  }

  function compare(){
    //TODO: go to resume comparison page
    navigate('/compare')
  }  

  document.body.style.backgroundColor = "#3f4f37cc";
  
  return (
    <div>
      <button className={club_styles.backButton} onClick={back}> Back to Clubs page </button>
      <h1> {clubName} Page </h1>
      <div className={club_styles.contentContainer}>
        <div className={club_styles.content1}>
          <Resumes resumes={search_results} handleSearch={handleSearch} ></Resumes>
        </div>
        <div className={club_styles.content2}>
          <Stats stats_array={stats_array}></Stats>
          <div className={club_styles.compareButton} onClick={compare}> Compare </div>
        </div>
      </div>
    </div>
  )
}

function Resumes({resumes, handleSearch}){ // Do we want resumes to be a link that can prese nt the pdf or just a name
  const resumeItems = resumes.map((resume,index) => ( // currently implemented as a list of strings
     <div className={club_styles.resumeContainer} key={index}>
      <div>Rank</div>
      <div>ELO</div>
      <div> Name </div>
      <div>{resume}</div>
     </div>
     )
   );
 
  return (<div className={club_styles.scrollContainer}>
   <div className={club_styles.scrollTitleWithSearchBar}>
             <div className={club_styles.scrollTitle}> Club Resumes </div>
             <SearchBar handleSearch={handleSearch} />
   </div>
   <div className={club_styles.scrollTitleCategories}>
    <div>Rank:</div>
    <div>ELO:</div>
    <div>Name:</div>
    <div>Resume:</div>
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

function get_stats_array() {
  // TODO: implement way to get number of resumes graded 
  return [84,6];
}


