import home_styles from './home.module.css';
import {Link} from 'react-router-dom';

const Home = () => {
    document.body.style.backgroundColor = "#C1A88A";

    return (
        <div>
            <h1 className={home_styles.heading}>
                WELCOME TO ResELO!
            </h1>
            <h2 className={home_styles.info_text}>
                The premier resume ranking app!<br/>
                Simply have your applicants upload their resumes, and let the ranking begin!
            </h2>
            <img src={require('./res_logo.PNG')} alt = "ResELO Logo" className={home_styles.home_logo}/>
            <div className={home_styles.buttons}>
                <Link to='/login'>
                    <button className={home_styles.account_button}>
                        SIGN IN
                    </button>
                    </Link>
            </div>
            <div className={home_styles.buttons}>
                <Link to='/sign-up'>
                <button className={home_styles.account_button}>
                    CREATE ACCOUNT
                </button>
                </Link>
            </div>
            <h2 className={home_styles.info_text}>
                For questions, comments, or concerns, reach out to reselo@gmail.com!
            </h2>
        </div>

    );

}

export default Home;