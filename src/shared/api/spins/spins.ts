import { baseAPI } from '../base';
import { SpinsCountResponse } from './types';

export const spinsAPI = {
    getAvailableSpinsCount: () =>
        baseAPI.get<SpinsCountResponse>('/spin/get_available_spins_count'),
};