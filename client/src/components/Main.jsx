import React from "react";

function Main() {
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
          <p className="font-mono pt-2 ">Enter long URL below</p>
          <div className="w-full grid grid-flow-col auto-cols-max justify-center ">
            <div className="w-full">
              <input
                type="text"
                className="border rounded-r rounded-full
                border-purple-600 border-r-0 shadow-md
                hover:border-pink-600
                p-8 m-8 mx-12 min-w-full"
                placeholder="https://"
              />
            </div>
            <div className="w-full justify-self-start">
            <button 
              type="submit"
              className="rounded-l rounded-full
                border-purple-600 border-l-0 shadow-md
                bg-gradient-to-tr from-indigo-700 via-purple-700 to-pink-700
                text-transparent bg-clip-text
                p-8 px-7 m-8 mx-12 min-w-fit">
              Shrink
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
