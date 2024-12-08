// // model.ts
// import { createStore, createEffect } from 'effector';
// import type { LastReferals } from '@/shared/api/referals/types.ts';
// import { referalsApi } from '@/shared/api/referals/referals.ts';
//
// // Create the effect with explicit typing and error boundaries
// export const fetchReferralsFx = createEffect(async () => {
//     try {
//         const response = await referalsApi.getReferrals();
//         return response.data;
//     } catch (error) {
//         console.error('Referrals fetch error:', error);
//         throw error;
//     }
// });
//
// // Initialize stores with strict typing
// export const $referrals = createStore<LastReferals>({
//     total_count: 0,
//     items: []
// });
//
// export const $isLoading = createStore<boolean>(false);
// export const $error = createStore<string | null>(null);
//
// // Setup store updates with proper error handling
// $referrals.on(fetchReferralsFx.doneData, (_, payload) => payload);
// $isLoading
//     .on(fetchReferralsFx, () => true)
//     .on(fetchReferralsFx.finally, () => false);
// $error
//     .on(fetchReferralsFx.failData, (_, error) => error.message)
//     .reset(fetchReferralsFx);