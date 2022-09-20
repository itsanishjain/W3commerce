import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-3 ">
      <div className="rounded-full loader h-12 w-12 animate-spin ">
        <div className="m-[0.1rem] rounded-full h-12 w-12"></div>
      </div>
    </div>
  );
};

export default Loader;
