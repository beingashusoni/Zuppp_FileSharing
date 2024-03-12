import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { uploadFile } from "./service/api";
import shareImage from "./assets/share.gif";
import copyIcon from "./assets/copy-icon.png";

function App() {
  const [file, setFile] = useState("");
  const [result, setResult] = useState("");
  const [showCopyIcon, setShowCopyIcon] = useState(false); // State to track if copy icon should be shown

  const fileInputRef = useRef();

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
        setShowCopyIcon(true); // Set showCopyIcon to true when result is set
      }
    };
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="container">
      <img src={shareImage} className="img" alt="banner" />
      <div className="wrapper">
      <h1>Zuppp! <sub>Share Simply!</sub></h1>
        <p>Upload, Share & Download your File for Free!</p>

        <button onClick={onUploadClick}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        {result && ( // Render link and copy icon only if result is not empty
          <div className="link-wrapper">
            <a href={result} target="_blank" rel="noreferrer">
              {result}
            </a>
            {showCopyIcon && (
              <img
                className="copyIcon"
                src={copyIcon}
                alt="Copy"
                onClick={copyToClipboard}
              />
            )}
          </div>
        )}
        <span className="note">Note: The best view of this website is laptop/desktop screens.</span>
      </div>
    </div>
  );
}

export default App;
