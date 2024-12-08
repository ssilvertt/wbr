import { useUnit } from 'effector-react';
import {
    $totalSpins,
    $referralsCount,
    $isLoadingSpinsHistory,
    $isLoadingReferrals,
    $spinsHistoryError,
    $referralsError,
    fetchSpinsHistoryFx,
    fetchReferralsCountFx
} from './model';
import { formatSpinsCount, getSplitSpinsCount } from '@/shared/lib/format/spins';

export const useUserStats = () => {
    const totalSpins = useUnit($totalSpins);
    const referralsCount = useUnit($referralsCount);
    const isLoadingSpinsHistory = useUnit($isLoadingSpinsHistory);
    const isLoadingReferrals = useUnit($isLoadingReferrals);
    const spinsHistoryError = useUnit($spinsHistoryError);
    const referralsError = useUnit
    ($referralsError);
    
    const { number: spinsNumber, word: spinsWord } = getSplitSpinsCount(totalSpins);
    
    
    const refresh = () => {
        fetchSpinsHistoryFx();
        fetchReferralsCountFx();
    };
    
    return {
        totalSpins,
        spinsNumber,
        spinsWord,
        formattedSpins: formatSpinsCount(totalSpins),
        referralsCount,
        isLoadingSpinsHistory,
        isLoadingReferrals,
        spinsHistoryError,
        referralsError,
        refresh
    };
};