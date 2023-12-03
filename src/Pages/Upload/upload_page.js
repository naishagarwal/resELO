import FileUpload from './form'
import { useEffect, useState } from 'react';

const Upload = () => {
    //get url
    const [valid, setValid] = useState("Loading...");
    let url = window.location.href;
    let club_name = url.split('/')[url.split('/').length-1];
    useEffect(() => {
        fetch('http://localhost:4000/club_info/'+club_name, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'get',
        }).then((response) => { return response.json()})
        .then((response) => {
            console.log(response);
            if (response.exists) {
                setValid("");
            }
        }).catch((error) => {
            setValid("server down")
            console.log(error);
        });
    });

    if(valid == "Loading...") {
        return (
            <div>
                <h1 style={{color: "black"}}>Club does not exist</h1>
            </div>
        );
    } else if (valid == "server down") {
        return (
            <div>
                <h1 style={{color: "black"}}>Server is down</h1>
            </div>
        );
    } else {
        return (
            <div>
                <h1 style={{color: "black"}}>Upload a resume</h1>
                <FileUpload club_name={club_name} />
            </div>
        );
    }
}

export default Upload;