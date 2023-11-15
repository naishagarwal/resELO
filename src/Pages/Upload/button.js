import React, { useState } from 'react';

function PostRequestButton() {
  const [responseData, setResponseData] = useState(null);
  const [value, setValue] = useState(null);

  const handleClick = () => {
    // Replace 'your-api-endpoint' with the actual URL you want to send a POST request to
    fetch("http://localhost:4000/")
    .then((response) => response.json())
    .then((data) => {setResponseData(data)})
  };

  const createFile = (e) => {
        fetch('http://localhost:4000/', {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'post',
            body: JSON.stringify({
                "file_name": value,
                "file_content": "hello world"
            }),
        });
    }

  return (
    <div>
      <button onClick={handleClick}>Make GET Request</button>
        <div>{responseData && JSON.stringify(responseData)}</div>

    <input onChange={(e) => {setValue(e.target.value)}}/>
    <button onClick={createFile}>Create File aka make POST request</button>

    </div>
  );
}

export default PostRequestButton;