import { useCallback, useState } from 'react';
import { initializeApp } from '@/app/init';

export const useInitialLoad = () => {
    const [isLoading, setIsLoading] = useState(true);
    
    const handleLoadingComplete = useCallback(() => {
        setIsLoading(false);
    }, []);
    

    
    const initialize = useCallback(async () => {
        try {
            await initializeApp();
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }, []);
    
    return {
        isLoading,
        initializeApp: initialize,
        handleLoadingComplete,
    };
};