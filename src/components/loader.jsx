import React from "react";

const Loader =()=>{
    return (
          <div className="flex justify-center items-center py-3">
            <div className="animate-spin rounded-full w-9 h-9 border-b-4 border-blue-700 "/>
          </div>
        );
    }
    export default Loader;