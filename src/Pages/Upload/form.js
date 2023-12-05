import React, { useState } from 'react';
import upload_styles from './upload.module.css';
import {useNavigate} from 'react-router-dom'

function FileUpload({club_name}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('author_name', nameValue);
      formData.append('author_email', emailValue);
      formData.append('file', selectedFile);

      fetch('http://localhost:4000/upload/'+club_name, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {response.json()})
        .then((data) => {
          console.log('File uploaded:', data);
          navigate('/confirmation');
          setEmailValue('');
          setNameValue('');
          setSelectedFile(null);

        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });

        
    }
  };

  return (
    <span>
    <div>
      <div className={upload_styles.input_field}>
        <label>Name: </label>
        <input onChange = {e => setNameValue(e.target.value)} type="text" />
      </div>
      <div className={upload_styles.input_field}>
        <label>Email: </label>
        <input onChange = {e => setEmailValue(e.target.value)} type="text" />
      </div>
      <div className={upload_styles.buttons}>
      <input className={upload_styles.file_upload} type="file" onChange={handleFileChange} />
      <button className={upload_styles.file_upload} onClick={handleFileUpload}>Upload</button>
      </div>
    </div>
    </span>

  );
}

export default FileUpload;