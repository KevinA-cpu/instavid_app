import '@/styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { store, persistor } from '../../store/authStore';
import { PersistGate } from 'redux-persist/integration/react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { CircularProgress } from '@mui/material';
import styled from '@emotion/styled';

const Loading = () => {
  const [progressSize, setProgressSize] = useState(80);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenWidth]);

  useEffect(() => {
    if (screenWidth <= 800) {
      setProgressSize(80);
    } else if (screenWidth <= 1200) {
      setProgressSize(90);
    } else {
      setProgressSize(100);
    }
  }, [screenWidth]);

  return (
    <div className="flex flex-col justify-center items-center text-center h-screen w-screen">
      <CircularProgress
        style={{ color: 'red' }}
        size={progressSize}
        className="mt-5"
      />
    </div>
  );
};

const App = ({ Component, pageProps }: AppProps) => {
  //Server Side Rendering at start
  const [isSSR, setIsSSR] = useState(true);

  //Client Side Rendering when React mounts
  useEffect(() => {
    setTimeout(() => {
      setIsSSR(false);
    }, 2000);
  }, []);

  //If isSSR is true, return null
  if (isSSR) return <Loading />;

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLEAPI_TOKEN as string}
    >
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navbar />
          <div className="flex gap-6 md:gap-20">
            <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
              <Sidebar />
            </div>
            <div className="flex flex-1 flex-col gap-10 overflow-auto h-[88vh] mt-4 videos">
              <Component {...pageProps} />
            </div>
          </div>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default App;
