import home_styles from './home.module.css';
import {Link} from 'react-router-dom'

const Home = () => {
    document.body.style.backgroundColor = "#535945";

    return (
        <div>
            <h1 className={home_styles.heading}>
                WELCOME TO ResELO!
            </h1>
            <h2 className={home_styles.info_text}>
                The premier resume ranking app! Simply have your applicants upload their resumes, and let the easy ranking begin!
            </h2>
            <div className={home_styles.buttons}>
            <Link to="./Pages/SignUp/signup_page"><button className={home_styles.account_button}>
                    SIGN IN
                </button>
                </Link>
            </div>
            <div className={home_styles.buttons}>
                <button className={home_styles.account_button}>
                    CREATE ACCOUNT
                </button>
            </div>
        </div>

    );

}

export default Home;