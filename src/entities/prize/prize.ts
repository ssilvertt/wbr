import { createEffect, createStore } from 'effector';
import { baseAPI } from '@/shared/api/base';

interface PrizeTimerResponse {
    seconds_left: number;
}

export const getPrizeTimerFx = createEffect(async () => {
    const { data } = await baseAPI.get<PrizeTimerResponse>('/prize/prize_timer');
    return data;
});

export const $prizeTimer = createStore<{ endTime: number | null }>({
    endTime: null
}).on(getPrizeTimerFx.doneData, (_, { seconds_left }) => ({
    endTime: Date.now() + seconds_left * 1000
}));
