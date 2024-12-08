import BrowserPage from '@/pages/BrowserPage.tsx';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { useInitialLoad } from '@/hooks/useInitialLoad';
import { Router } from '@/router/Router';
import {BrowserView, MobileView, isMobile} from 'react-device-detect';

function App() {
  const { isLoading, initializeApp, handleLoadingComplete } = useInitialLoad();
  
  useEffect(() => {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
    initializeApp();
    
  }, [initializeApp]);
  
  if (isLoading && isMobile) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} duration={7000} />;
  }
  
  return (
      <>
        <BrowserView>
         <BrowserPage/>
        </BrowserView>
        <MobileView>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </MobileView>
      </>
    
  );
}

export default App;