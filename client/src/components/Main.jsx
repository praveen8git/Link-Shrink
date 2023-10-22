import { React, useState, useRef } from "react";
import axios from "axios";
import Loader from "./Loader";

const postURL = "http://localhost:3100/shrink"

//following regex willbe used to validate the URL entered by user in input field
const urlRegex = /^(https?):\/\/(([a-z0-9$_\.\+!\*\'\(\),;\?&=-]|%[0-9a-f]{2})+(:([a-z0-9$_\.\+!\*\'\(\),;\?&=-]|%[0-9a-f]{2})+)?@)?((([a-z0-9]\.|[a-z0-9][a-z0-9-]*[a-z0-9]\.)*[a-z][a-z0-9-]*[a-z0-9]|((\d|[1-9]\d|1\d{2}|2[0-4][0-9]|25[0-5])\.){3}(\d|[1-9]\d|1\d{2}|2[0-4][0-9]|25[0-5]))(:\d+)?)(((\/+([a-z0-9$_\.\+!\*\'\(\),;:@&=-]|%[0-9a-f]{2})*)*(\?([a-z0-9$_\.\+!\*\'\(\),;:@&=-]|%[0-9a-f]{2})*)?)?)?(#([a-z0-9$_\.\+!\*\'\(\),;:@&=-]|%[0-9a-f]{2})*)?$/i

function Main() {
  const inputRef = useRef(null);
  const [shortURL, setShortURL] = useState();
  const [copyBtn, setCopyBtn] = useState("copy");
  const [btnDisable, setBtnDisable] = useState(true);
  const [loading,setLoading] = useState(false);
  const [disabled, setDisable] = useState(false);


  function shrink(e) {
    setDisable(true);
    setLoading(true);
    console.info(inputRef.current.value);
    const longURL = inputRef.current.value;
    setCopyBtn("copy");

    if (!urlRegex.test(longURL)) 
    {
      console.log("invalid URL");
      setShortURL("invalid URL");
      setLoading(false);
      setDisable(false);
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
        setBtnDisable(false);
        setDisable(false);
        setLoading(false);
      })
      .catch(function(error){
        console.error(error);
        setDisable(false);
        setLoading(false);
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
    <>
    <div className="w-[100%] h-[100vh] flex justify-center items-center px-5">
      <div className="mx-3 sm:max-w-[700px] max-w-[350px] text-center flex flex-col justify-center items-center">
        <div
          className="w-full bg-clip-text
          bg-gradient-to-tr from-indigo-700 via-purple-700 to-pink-700"
        >
          <h1
            className="
            mx-2
            font-bold text-transparent 
            transition ease-in-out duration-1000 
            hover:text-purple-700"
          >
            URL Compressor
          </h1>
        </div>
          <p className="font-mono pt-2 ">Enter long URL below</p>
          <div className="w-full sm:m-8 mx-5 flex my-8 ">
            <div className="w-full">
              <input
                type="url"
                name="longUrl"
                id="longUrl"
                className="sm:max-w-[600px] max-w-[350px] border rounded-r rounded-full
                border-purple-600 border-r-0 shadow-md
                truncate
                hover:border-indigo-600
                sm:p-8 p-6 sm:mx-12 min-w-full"
                placeholder="https://"
                required
                ref={inputRef}
              />
            </div>
            <div>
            <button 
              disabled={disabled}
              type="submit"
              onClick={shrink}
              className={`${disabled ? "cursor-wait" : "cursor-pointer" } rounded-l rounded-full
              border-purple-600 border-l-0 shadow-md
              bg-gradient-to-tr from-indigo-700 via-purple-700 to-pink-700
              text-transparent bg-clip-text 
              hover:border-indigo-600
              sm:p-8 p-6 sm:px-7 sm:mx-12 min-w-fit`}>
              Shrink
            </button>
            </div>
          </div>
          <div className="grid grid-flow-col auto-cols-max justify-center h-[70px] items-center">
             <a id="shrinked" className=" overflow-hidden max-w-[150px] sm:max-w-[300px]" target="_blank" href={shortURL} > { loading ? <Loader/> : shortURL }</a>
             <button 
              id="copy"
              className="-my-3 mx-2 font-mono h-[50px] w-[150px]"
              disabled={btnDisable}
              onClick={copy} >
              {copyBtn}
             </button>
          </div>
      </div>
    </div>
    </>
  );
}

export default Main;
