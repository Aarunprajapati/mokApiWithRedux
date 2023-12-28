import React, { useState } from "react";
import { useSelector } from "react-redux";

function CustomePop({id, showpop, setShowPop}){
    const Alluser = useSelector((state)=>state.app.users)
    const sigleUser = Alluser.filter((user)=> user.id === id)
    console.log((sigleUser))
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 overflow">
      <div className="relative bg-white dark:bg-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-md w-full mx-[40px] h-auto flex flex-col justify-center items-center">
        <div className="text-4xl mb-2">Title : {sigleUser[0].name}</div>
        <div className="text-lg dark:text-gray-100 py-20 px-20">
         <h1 className="text-lg font-bold ">Description: {sigleUser[0].email} </h1>
        </div>
        {/* <div className="text-lg dark:text-gray-100">
        <h1 className="text-lg font-bold ">Age: {sigleUser[0].age} </h1>
        </div>
        <div className="text-lg dark:text-gray-100">
        <h1 className="text-lg font-bold ">Gender: {sigleUser[0].gender} </h1>
        </div> */}
        <button
          type="button"
          className="absolute top-0 right-0 z-10 px-3 py-2 text-xl font-semibold rounded-full overflow-hidden dark:bg-gray-100 dark:text-gray-800"
          onClick={()=>setShowPop(false)}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default CustomePop;
