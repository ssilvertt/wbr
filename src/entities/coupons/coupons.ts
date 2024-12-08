import type { SpinResult } from '@/entities/coupons/types.ts';
import { createDomain } from 'effector';
import { baseAPI } from '@/shared/api/base.ts';
const spinDomain = createDomain('spin');

// Создаем эффект для запроса результатов
export const fetchSpinResultsFx = spinDomain.effect<void, SpinResult[]>(async () => {
    const response = await baseAPI.get<SpinResult[]>('/spin/get_spin_application_results');
    return response.data;
});

// Создаем стор для хранения отфильтрованных результатов
export const $validSpinResults = spinDomain.store<SpinResult[]>([])
    .on(fetchSpinResultsFx.doneData, (_, payload) =>
        payload.filter(result =>
            ['500_rub', '1000_rub', '5000_rub'].includes(result.coupon)
        )
    );

// Дополнительно можем создать производный стор для получения общей суммы выигрышей
export const $totalWinnings = $validSpinResults.map(results =>
    results.reduce((sum, result) => {
        const amount = parseInt(result.coupon);
        return sum + amount;
    }, 0)
);

// Опционально: создаем стор для отслеживания состояния загрузки
export const $isLoading = spinDomain.store(false)
    .on(fetchSpinResultsFx.pending, (_, isPending) => isPending);

// Опционально: стор для ошибок
export const $error = spinDomain.store<string | null>(null)
    .on(fetchSpinResultsFx.failData, (_, error) => error.message)
    .reset(fetchSpinResultsFx);