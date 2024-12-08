import { baseAPI } from '../base';
import { AuthResponse } from './types';

export const authAPI = {
    getToken: (initData: string) =>
        baseAPI.post<AuthResponse>('/auth/get_token', {
            initdata: initData,
        }),
};