import { createEffect, createEvent, createStore, sample } from 'effector';
import { v4 as uuidv4 } from 'uuid';
import { baseAPI } from '@/shared/api/base.ts';
// Types
interface SpinScrollResponse {
    is_ok: boolean;
    code: string;
    spin_application_id: string;
}

interface SpinResultResponse {
    coupon: string;
}

// Effects
export const spinScrollFx = createEffect<void, SpinScrollResponse, Error>(async () => {
    const uniq_id = uuidv4();
    const response = await baseAPI.post<SpinScrollResponse>('/spin/scroll_through', {
        uniq_id
    });
    return response.data;
});

export const getSpinResultFx = createEffect<string, SpinResultResponse, Error>(async (applicationId: string) => {
    const response = await baseAPI.get<SpinResultResponse>(
        `/spin/get_spin_application_result/${applicationId}`
    );
    return response.data;
});

// Events
export const spinWheelClicked = createEvent();
export const resetSpinning = createEvent();

// Stores
export const $spinResult = createStore<string | null>(null);
export const $isSpinning = createStore(false);
export const $error = createStore<string | null>(null);

// Logic
sample({
    source: spinWheelClicked,
    target: spinScrollFx,
});

// Устанавливаем состояние спиннера
sample({
    source: spinWheelClicked,
    fn: () => true,
    target: $isSpinning,
});

// Обработка успешного первого запроса
sample({
    source: spinScrollFx.doneData,
    filter: (response): response is SpinScrollResponse => response.is_ok,
    fn: (response) => response.spin_application_id,
    target: getSpinResultFx,
});

// Сохранение результата
sample({
    source: getSpinResultFx.doneData,
    fn: (response) => response.coupon,
    target: $spinResult,
});

// Обработка завершения эффектов по отдельности
sample({
    source: getSpinResultFx.finally,
    fn: () => false,
    target: $isSpinning,
});

sample({
    source: spinScrollFx.finally,
    fn: () => false,
    target: $isSpinning,
});

// Обработка ошибок
sample({
    source: spinScrollFx.failData,
    fn: (error: Error) => error.message,
    target: $error,
});

sample({
    source: getSpinResultFx.failData,
    fn: (error: Error) => error.message,
    target: $error,
});

// Сброс ошибки при начале нового спина
sample({
    source: spinWheelClicked,
    fn: () => null,
    target: $error,
});