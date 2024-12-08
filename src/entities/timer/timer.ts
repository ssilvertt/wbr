import { createEffect, createStore } from 'effector';
import { baseAPI } from '@/shared/api/base.ts';

interface TimerResponse {
    seconds_left: number;
    status: 'timer_off' | 'timer_on';
}

export const getTimerFx = createEffect(async () => {
    const { data } = await baseAPI.get<TimerResponse>('/spin/get_daily_free_spin_timer');
    return data;
});

export const getDailySpinFx = createEffect(async () => {
    await baseAPI.post('/spin/get_daily_free_spin');
});

export const $timer = createStore<{ endTime: number | null; status: 'timer_off' | 'timer_on' }>({
    endTime: null,
    status: 'timer_off'
}).on(getTimerFx.doneData, (_, { seconds_left, status }) => ({
    endTime: status === 'timer_on' ? Date.now() + seconds_left * 1000 : null,
    status
}));
