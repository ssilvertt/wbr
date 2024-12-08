import { createStore, createEffect } from 'effector';
import { userAPI } from '@/shared/api/user/user';
import { SpinsHistoryResponse, ReferralsCountResponse } from '@/shared/api/user/types';

// Effects
export const fetchSpinsHistoryFx = createEffect<void, SpinsHistoryResponse>(async () => {
    const { data } = await userAPI.getSpinsHistory();
    return data;
});

export const fetchReferralsCountFx = createEffect<void, ReferralsCountResponse>(async () => {
    const { data } = await userAPI.getReferralsCount();
    return data;
});

// Stores
export const $totalSpins = createStore<number>(0)
    .on(fetchSpinsHistoryFx.doneData, (_, { number_of_spins }) => number_of_spins);

export const $referralsCount = createStore<number>(0)
    .on(fetchReferralsCountFx.doneData, (_, { referrals_count }) => referrals_count);

// Loading states
export const $isLoadingSpinsHistory = fetchSpinsHistoryFx.pending;
export const $isLoadingReferrals = fetchReferralsCountFx.pending;

// Errors
export const $spinsHistoryError = createStore<string | null>(null)
    .on(fetchSpinsHistoryFx.failData, (_, error) => error.message)
    .reset(fetchSpinsHistoryFx);

export const $referralsError = createStore<string | null>(null)
    .on(fetchReferralsCountFx.failData, (_, error) => error.message)
    .reset(fetchReferralsCountFx);

// Автоматическая загрузка после авторизации
import { sample } from 'effector';
import { authenticateUserFx } from '@/entities/user/model';

sample({
    clock: authenticateUserFx.done,
    target: [fetchSpinsHistoryFx, fetchReferralsCountFx],
});