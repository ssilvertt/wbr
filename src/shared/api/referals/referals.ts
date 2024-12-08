import { baseAPI } from '../base';
import { LastReferals } from './types';

export const referalsApi = {
    getReferrals: () =>
        baseAPI.get<LastReferals>('user/last_referrals_list'),
};