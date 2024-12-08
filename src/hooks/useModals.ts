import { useState } from 'react';

export const useModals = () => {
    const [showTutorial, setShowTutorial] = useState(false);
    const [showWinModal, setShowWinModal] = useState(true);
    const [showPrizeModal, setShowPrizeModal] = useState(false);
    const [winAmount, setWinAmount] = useState<string>('');
    
    return {
        showTutorial,
        setShowTutorial,
        showWinModal,
        setShowWinModal,
        showPrizeModal,
        setShowPrizeModal,
        winAmount,
        setWinAmount
    };
};