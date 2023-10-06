import { React, useState, useRef } from "react";
import axios from "axios";

const postURL = "http://localhost:3100/shrink"

//following regex willbe used to validate the URL entered by user in input field
const urlRegex = /^(https?):\/\/(([a-z0-9$_\.\+!\*\'\(\),;\?&=-]|%[0-9a-f]{2})+(:([a-z0-9$_\.\+!\*\'\(\),;\?&=-]|%[0-9a-f]{2})+)?@)?((([a-z0-9]\.|[a-z0-9][a-z0-9-]*[a-z0-9]\.)*[a-z][a-z0-9-]*[a-z0-9]|((\d|[1-9]\d|1\d{2}|2[0-4][0-9]|25[0-5])\.){3}(\d|[1-9]\d|1\d{2}|2[0-4][0-9]|25[0-5]))(:\d+)?)(((\/+([a-z0-9$_\.\+!\*\'\(\),;:@&=-]|%[0-9a-f]{2})*)*(\?([a-z0-9$_\.\+!\*\'\(\),;:@&=-]|%[0-9a-f]{2})*)?)?)?(#([a-z0-9$_\.\+!\*\'\(\),;:@&=-]|%[0-9a-f]{2})*)?$/i

function Main() {
  const inputRef = useRef(null);
  const [shortURL, setShortURL] = useState();
  const [copyBtn, setCopyBtn] = useState("copy");
  const [btnDisable, setBtnDisable] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isShrinkDisabled, setIsShrinkDisabled] = useState(true);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsShrinkDisabled(newValue === '');
  }

  function shrink(e) {
    console.info(inputRef.current.value);
    const longURL = inputRef.current.value;
    console.log(longURL)
    setCopyBtn("copy");

    if (!urlRegex.test(longURL)) 
    {
      console.log("Invalid URL");
      setShortURL("Invalid URL")
      return
    }
    else {
      console.log("URL valid");

      axios.post(postURL, {
        longUrl: longURL
      })
      .then( function (response) {
        console.log(response);
        setShortURL(response.data.data);
        setBtnDisable(false)
      })
      .catch(function(error){
        console.log(error);
      })
      return
    }
  }
  // shrink function ends here

  function copy (e) {
    navigator.clipboard.writeText(shortURL);
    setCopyBtn("copied! ✅");
    
  }

  return (
    <div className="container w-screen min-h-screen text-center grid justify-center items-center">
      <div className="columns-1 w-full">
        <div
          className="w-full bg-clip-text
          bg-gradient-to-tr from-indigo-700 via-purple-700 to-pink-700"
        >
          <h1
            className="
            font-bold text-transparent 
            transition ease-in-out duration-1000 
            hover:text-purple-700"
          >
            URL Compressor
          </h1>
        </div>
          <p className="font-mono pt-2 ">Enter long URL below</p>
          <div className="w-full grid grid-flow-col auto-cols-max justify-center ">
            <div className="w-full">
              <input
                type="url"
                name="longUrl"
                id="longUrl"
                className="border rounded-r rounded-full
                border-purple-600 border-r-0 shadow-md
                truncate
                hover:border-indigo-600
                p-8 m-8 mx-12 min-w-full"
                placeholder="https://"
                value={inputValue}
                onChange={handleInputChange}
                required
                ref={inputRef}
              />
            </div>
            <div className="w-full justify-self-start">
            <button 
              type="submit"
              // onClick={shrink}
              className="rounded-l rounded-full
                border-purple-600 border-l-0 shadow-md
                bg-gradient-to-tr from-indigo-700 via-purple-700 to-pink-700
                text-transparent bg-clip-text 
                hover:border-indigo-600
                p-8 px-7 m-8 mx-12 min-w-fit"
              onClick={shrink}
              disabled={isShrinkDisabled}>
              Shrink
            </button>
            </div>
          </div>
          <div className="w-full grid grid-flow-col auto-cols-max justify-center my-2">
            {shortURL==="Invalid URL" ? <div>Invalid URL</div> : <a id="shrinked" target="_blank" href={shortURL} > {shortURL} </a>}
             <button 
              id="copy"
              className="-my-3 mx-2 font-mono"
              disabled={btnDisable}
              onClick={copy} >
              {copyBtn}
             </button>
          </div>
        
      </div>
    </div>
  );
}

export default Main;
