import { createStore, createEffect } from 'effector';
import { spinsAPI } from '@/shared/api/spins/spins';
import { SpinsCountResponse } from '@/shared/api/spins/types';

// Effect для получения количества спинов
export const fetchAvailableSpinsFx = createEffect<void, SpinsCountResponse>(async () => {
    const { data } = await spinsAPI.getAvailableSpinsCount();
    return data;
});

// Store для хранения количества доступных спинов
export const $availableSpins = createStore<number>(0)
    .on(fetchAvailableSpinsFx.doneData, (_, { available_spins_count }) => available_spins_count);

// Store для отслеживания состояния загрузки
export const $isLoadingSpins = fetchAvailableSpinsFx.pending;

// Store для отслеживания ошибок
export const $spinsError = createStore<string | null>(null)
    .on(fetchAvailableSpinsFx.failData, (_, error) => error.message)
    .reset(fetchAvailableSpinsFx);
