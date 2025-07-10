import { Outlet } from "react-router-dom";

import { Dialogs } from "@/components/shared/dialogs";
// import { Navbar } from "@/components/shared/navbar";

const RootLayout = () => {
  return (
    <div className="relative flex flex-col min-h-screen justify-between ">
      {/* <Navbar /> */}
      <div className="flex-grow">
        <Outlet />
      </div>
      {/* <Footer /> */}
      <Dialogs />
    </div>
  );
};

export default RootLayout;
