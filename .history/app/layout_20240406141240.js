
import React from "react";

export default async function AppLayout({ children }) {
  return (
    <div className=" flex relative w-full  md:px-10 gap-4">
      <div className="w-full md:w-9/12 md:mt-9">
        {children}
      </div>
    </div>
  );
}
