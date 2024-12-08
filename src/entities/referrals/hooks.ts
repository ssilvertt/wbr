import { useState, useEffect, useCallback, useMemo } from 'react';
import { baseAPI } from '@/shared/api/base.ts';
import type { LastReferals } from '@/shared/api/referals/types.ts';

export const useReferrals = () => {
    // State for storing the referrals data
    const [data, setData] = useState<LastReferals>({ total_count: 0, items: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Memoized fetch function to prevent unnecessary recreations
    const fetchReferrals = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await baseAPI.get<LastReferals>('user/last_referrals_list');
            setData(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch referrals');
            console.error('Failed to fetch referrals:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    // Memoized items to prevent unnecessary rerenders
    const memoizedItems = useMemo(() => data.items || [], [data.items]);
    
    // Initial fetch
    useEffect(() => {
        fetchReferrals();
    }, [fetchReferrals]);
    
    // Memoized return value
    return useMemo(() => ({
        items: memoizedItems,
        isLoading,
        error,
        totalCount: data.total_count,
        refetch: fetchReferrals
    }), [memoizedItems, isLoading, error, data.total_count, fetchReferrals]);
};