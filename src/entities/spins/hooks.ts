import { useUnit } from 'effector-react/effector-react.umd';
import { useEffect } from 'react';
import { $availableSpins, $isLoadingSpins, $spinsError, fetchAvailableSpinsFx } from './model';

export const useSpins = () => {
    const availableSpins = useUnit($availableSpins);
    const isLoading = useUnit($isLoadingSpins);
    const error = useUnit($spinsError);
    
    useEffect(() => {
        fetchAvailableSpinsFx();
    }, []);
    
    return {
        availableSpins,
        isLoading,
        error,
    };
};