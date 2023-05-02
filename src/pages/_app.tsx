import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const App = ({ Component, pageProps }: AppProps) => {
  //Server Side Rendering at start
  const [isSSR, setIsSSR] = useState(true);

  //Client Side Rendering when React mounts
  useEffect(() => {
    setIsSSR(false);
  }, []);

  //If isSSR is true, return null
  if (isSSR) return null;

  return (
    <div>
      <Navbar />
      <div className="flex gap-6 md:gap-20">
        <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
          <Sidebar />
        </div>
        <div className="flex flex-1 flex-col gap-10 overflow-auto h-[88vh] mt-4 videos">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
};

export default App;
