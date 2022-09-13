import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-3 ">
      <div className="rounded-full h-12 w-12 animate-spin bg-gradient-to-tr from-orange-700 to-orange-600  ">
        <div className="m-[0.1rem] bg-orange-500 rounded-full h-12 w-12"></div>
      </div>
    </div>
  );
};

export default Loader;
