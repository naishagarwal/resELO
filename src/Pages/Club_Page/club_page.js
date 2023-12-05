import React, {useState, useEffect} from 'react';
import SearchBar from './SearchBar';
import club_styles from './club_page_style.module.css';
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';


function Stats({num_resumes, num_games, avg_games}) {

  const my_num_resumes = num_resumes;
  const my_num_games = num_games;
  const my_avg_games = num_games/num_resumes;

  return (
    <>
      <div className={club_styles.stats}> 
        <div className={club_styles.titleBar}> Stats </div>
        <div className={club_styles.counterContent}> <br /> Confidence Score: n/a% <br />
        Number of Resumes: {my_num_resumes}<br />
        Total Games: {my_num_games}<br />
        Average Games per Resume: {my_avg_games}<br />
        <br />
        </div>
      </div>
    </>
  )
}

export default function Page() {
  const {clubName} = useParams();
  const [resume_list, set_resume_list] = useState([]);
  const [search_results, set_search_results] = useState([]);
  
  const [club_exists, set_club_exists] = useState("Loading...");
  const navigate = useNavigate(); // replace with function to return list of resume objects
  const [clubData, setClubData] = useState(null);
  let isNonListObject = false;

useEffect(() => {
  console.log("LOOOK"+clubName);
  if (clubName == null) {
    return;
  }
  console.log("clubName: " + clubName);
  fetch('http://localhost:4000/club_info/' + clubName, {
    mode: 'cors',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    method: 'get',
  }).then((response) => { return response.json()})
  .then((data) => {
    console.log(data);
    if(data.exists) {
      set_club_exists("Exists");
      setClubData(data); // Update clubData with the received data
    } else {
      set_club_exists("Does not exist");
      console.log("Club does not exist");
    }
      // Additional processing or state setting with the data here
  }).catch((error) => {
      setValid("server down");
      console.log(error);
  });

  fetch('http://localhost:4000/get_resumes/'+ clubName, {
    mode: 'cors',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    method: 'get',
  }).then((response) => { return response.json()})
  .then((data) => {
    console.log(data.resumes);

    // Check if data.resumes is an array or list
    if (Array.isArray(data.resumes)) {
        set_resume_list(data.resumes);
        set_search_results(data.resumes);
    } else {
        // Set flag to true if it's a non-list object
        isNonListObject = true;
    }
    
  }).catch((error) => {
      alert(error);
      return [];
  });


}, [clubName]);


  const handleSearch = (searchTerm) => {
    const filteredResults = resume_list.filter(item => item.author_name.toLowerCase().includes(searchTerm.toLowerCase()));
    set_search_results(filteredResults);
  };
  

  function back(){
    //TODO: go back to clubs page
    navigate('/dashboard')

  }

  function compare(){
    //TODO: go to resume comparison page
    navigate('/compare/'+clubName)
  }  

  document.body.style.backgroundColor = "#3f4f37cc";
  if(club_exists == "Loading...") {
    return (<div>Loading</div>)
  } else if(club_exists == "Exists") {
    return (
      <div>
        <button className={club_styles.backButton} onClick={back}> Back to Dashboard </button>
        <h1> {clubName} Page </h1>
        <div className={club_styles.contentContainer}>
          <div className={club_styles.content1}>
            <Resumes resumes={search_results} handleSearch={handleSearch} ></Resumes>
          </div>
          <div className={club_styles.content2}>
            {clubData ? <Stats num_resumes={clubData.num_resumes} num_games={clubData.num_games} avg_games={clubData.avg_games}></Stats> : <div>test</div>}
            <div className={club_styles.compareButton} onClick={compare}> Compare </div>
          </div>
        </div>
      </div>
    )
  } else {
      return (
        <div>Club {clubName} does not exist</div>
      )
  }
}

function Resumes({resumes, handleSearch}){ // Do we want resumes to be a link that can prese nt the pdf or just a name
  let emp_resumeItems = []
  console.log("Number of Resumes" + resumes.length)
  if (resumes.length != 0)
  { 
    emp_resumeItems = resumes.map((resume,index) => ( // currently implemented as a list of strings
      <div className={club_styles.resumeContainer} key={index}>
        <div>{Math.round(resume.elo)}</div>
        <div> {resume.author_name}</div>
        <div>{resume.games_played}</div>
        <div>{resume.author_email}</div>
      </div>
      )
    );
    emp_resumeItems.sort((a,b) => b.elo - a.elo)
  }
  const resumeItems = emp_resumeItems
  return (<div className={club_styles.scrollContainer}>
   <div className={club_styles.scrollTitleWithSearchBar}>
             <div className={club_styles.scrollTitle}> Club Resumes </div>
             <SearchBar handleSearch={handleSearch} />
   </div>
   <div className={club_styles.scrollTitleCategories}>
    <div>ELO:</div>
    <div>Name:</div>
    <div>Games Played:</div>
    <div>Email:</div>
   </div>
   {resumeItems}
  </div>)
 }

function get_stats_array() {
  // TODO: implement way to get number of resumes graded 
  return [84,6];
}


