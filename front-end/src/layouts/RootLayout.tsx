import { Outlet } from "react-router-dom";

import { useAppDispatch } from "@/hooks/redux";
import { useEffect } from "react";
import { getCurrentUserAsync } from "@/store/auth";
// import Footer from "@/components/shared/footer";
import { Dialogs } from "@/components/shared/dialogs";
// import { Navbar } from "@/components/shared/navbar";

const RootLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.userway.org/widget.js";
    script.setAttribute("data-account", "MVjPX6qZzm");
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    dispatch(getCurrentUserAsync());
  }, []);

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
