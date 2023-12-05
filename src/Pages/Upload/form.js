import React, { useState } from 'react';
import upload_styles from './upload.module.css';

function FileUpload({club_name}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch('http://localhost:4000/upload/'+club_name, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('File uploaded:', data);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    }
  };

  return (
    <form>
    <div>
      <div className={upload_styles.input_field}>
        <label>Name: </label>
        <input type="text" />
      </div>
      <div className={upload_styles.input_field}>
        <label>Email: </label>
        <input type="text" />
      </div>
      <div className={upload_styles.buttons}>
      <input className={upload_styles.file_upload} type="file" onChange={handleFileChange} />
      <button className={upload_styles.file_upload} onClick={handleFileUpload}>Upload</button>
      </div>
    </div>
    </form>

  );
}

export default FileUpload;