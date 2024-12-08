import { createStore, createEffect } from 'effector';
import { authAPI } from '@/shared/api/auth/auth';
import { UserEntity, AuthResponse } from '@/shared/api/auth/types';

// Effects
export const authenticateUserFx = createEffect<string, AuthResponse>(async (initData) => {
    const { data } = await authAPI.getToken(initData);
    return data;
});

// Stores
export const $user = createStore<UserEntity | null>(null);
export const $isAuthenticated = $user.map(Boolean);

// Store updates
$user
    .on(authenticateUserFx.doneData, (_, { user_entity }) => user_entity);

// Save token when authentication succeeds
authenticateUserFx.doneData.watch(({ access_token }) => {
    localStorage.setItem('auth_token', access_token);
    console.log('Token saved:', access_token);
});
