// import { BackgroundGradient } from "@components/BackgroundGradient";
// import Sidebar from "@components/lgSidebar/Sidebar";
// import { SearchBox } from "@components/search/SearchBox";
import React from "react";

export default async function AppLayout({ children }) {
  return (
    <div className=" flex relative w-full  md:px-10 gap-4">
      <div className="w-full md:w-9/12 md:mt-9">
        {children}
      </div>
      <div className="hidden flex-col sticky top-[70px] overflow-y-scroll custom-scrollbar h-[90dvh] md:flex w-[35%] mt-24 mb-10">

    </div>
  );
}
