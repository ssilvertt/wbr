import { baseAPI } from '../base';
import { SpinsHistoryResponse, ReferralsCountResponse } from './types';

export const userAPI = {
    getSpinsHistory: () =>
        baseAPI.get<SpinsHistoryResponse>('/user/number_of_spins'),
    
    getReferralsCount: () =>
        baseAPI.get<ReferralsCountResponse>('/user/referrals_count'),
};