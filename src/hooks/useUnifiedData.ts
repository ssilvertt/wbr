import { useEffect, useCallback, useMemo, useState } from 'react';
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
} from '@/entities/user-stats/model';
import { baseAPI } from '@/shared/api/base';
import type { LastReferals } from '@/shared/api/referals/types';
import { getSplitSpinsCount } from '@/shared/lib/format/spins';

const REFRESH_INTERVAL = 12000; // 12 seconds

// Memoized API call function
const fetchReferralsList = async () => {
    try {
        const response = await baseAPI.get<LastReferals>('user/last_referrals_list');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch referrals list:', error);
        return null;
    }
};

export const useUnifiedData = () => {
    // Local state for referrals list
    const [referralsList, setReferralsList] = useState<LastReferals>({ total_count: 0, items: [] });
    
    // Get all required stores in a single useUnit call
    const stores = useUnit({
        totalSpins: $totalSpins,
        referralsCount: $referralsCount,
        isLoadingSpinsHistory: $isLoadingSpinsHistory,
        isLoadingReferrals: $isLoadingReferrals,
        spinsHistoryError: $spinsHistoryError,
        referralsError: $referralsError
    });
    
    // Memoize the fetch function
    const fetchAllData = useCallback(async () => {
        const [referralsListData] = await Promise.allSettled([
            fetchReferralsList(),
            fetchReferralsCountFx(),
            fetchSpinsHistoryFx()
        ]);
        
        // Update referrals list if fetch was successful
        if (referralsListData.status === 'fulfilled' && referralsListData.value) {
            setReferralsList(referralsListData.value);
        }
    }, []);
    
    // Set up periodic refresh with useEffect
    useEffect(() => {
        fetchAllData();
        const intervalId = setInterval(fetchAllData, REFRESH_INTERVAL);
        return () => clearInterval(intervalId);
    }, [fetchAllData]);
    
    // Memoize derived states
    const isLoading = useMemo(() =>
            stores.isLoadingSpinsHistory || stores.isLoadingReferrals,
        [stores.isLoadingSpinsHistory, stores.isLoadingReferrals]
    );
    
    const hasErrors = useMemo(() =>
            Boolean(stores.spinsHistoryError || stores.referralsError),
        [stores.spinsHistoryError, stores.referralsError]
    );
    
    const errors = useMemo(() => ({
        spinsHistory: stores.spinsHistoryError,
        referrals: stores.referralsError
    }), [stores.spinsHistoryError, stores.referralsError]);
    
    // Memoize referrals items to prevent unnecessary rerenders
    const referralsItems = useMemo(() => referralsList.items, [referralsList.items]);
    
    // Memoize the entire return object
    return useMemo(() => ({
        totalSpins: stores.totalSpins,
        referralsCount: stores.referralsCount,
        referrals: referralsItems,
        isLoading,
        hasErrors,
        errors,
        refreshData: fetchAllData
    }), [
        stores.totalSpins,
        stores.referralsCount,
        referralsItems,
        isLoading,
        hasErrors,
        errors,
        fetchAllData
    ]);
};

// Memoized stats hook
export const useUserStats = () => {
    const totalSpins = useUnit($totalSpins);
    
    // Memoize split spins calculation
    const splitSpins = useMemo(() =>
            getSplitSpinsCount(totalSpins),
        [totalSpins]
    );
    
    // Memoize the entire return object
    return useMemo(() => ({
        spinsNumber: splitSpins.number,
        spinsWord: splitSpins.word,
        totalSpins
    }), [splitSpins, totalSpins]);
};

// Combined hook for Friends component
export const useFriendsData = () => {
    const unifiedData = useUnifiedData();
    const stats = useUserStats();
    
    // Memoize the combined data
    return useMemo(() => ({
        ...unifiedData,
        spinsNumber: stats.spinsNumber,
        spinsWord: stats.spinsWord,
    }), [unifiedData, stats.spinsNumber, stats.spinsWord]);
};