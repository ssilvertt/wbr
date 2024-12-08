import { baseAPI } from '@/shared/api/base.ts';

interface SpinResponse {
    is_ok: boolean;
    code: string;
    spin_application_id: string;
}

type CouponValue = "0_rub" | "500_rub" | "1000_rub" | "5000_rub";

interface SpinResult {
    coupon: CouponValue;
}

export interface WheelSegments {
    little: number;
    middle: number;
    big: number;
    coupon: CouponValue;
}

type CouponSegmentMap = {
    [K in Exclude<CouponValue, null> | 'processing']: number[];
};

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getSegmentsForCoupon = (coupon: CouponValue): WheelSegments => {
    const littleOptions: CouponSegmentMap = {
        'processing': [1, 4],
        '0_rub': [1, 4],
        '500_rub': [1, 4],
        '1000_rub': [2],
        '5000_rub': [1, 4]
    };
    
    const middleOptions: CouponSegmentMap = {
        'processing': [2, 6],
        '0_rub': [2, 6],
        '500_rub': [2, 6],
        '1000_rub': [2, 6],
        '5000_rub': [2, 6]
    };
    
    const bigOptions: CouponSegmentMap = {
        'processing': [1 ,7, 11, 14],
        '0_rub': [1, 7, 11, 14],
        '500_rub': [10],
        '1000_rub': [3],
        '5000_rub': [4]
    };
    
    const randomFromArray = (arr: number[]) => arr[Math.floor(Math.random() * arr.length)];
    
    const key = coupon === null ? 'processing' : coupon;
    
    return {
        little: randomFromArray(littleOptions[key]),
        middle: randomFromArray(middleOptions[key]),
        big: randomFromArray(bigOptions[key]),
        coupon
    };
};

const MAX_ATTEMPTS = 10;
const POLLING_INTERVAL = 1000;

const pollForResults = async (applicationId: string): Promise<SpinResult> => {
    let attempts = 0;
    
    while (attempts < MAX_ATTEMPTS) {
        const resultResponse = await baseAPI.get<SpinResult>(
            `/spin/get_spin_application_result/${applicationId}`
        );
        
        if (resultResponse.data.coupon !== null) {
            return resultResponse.data;
        }
        
        attempts++;
        await delay(POLLING_INTERVAL);
    }
    
    throw new Error('Maximum polling attempts reached');
};

export const wheelService = {
    async spin(uniqId: string): Promise<{little: number; middle: number; big: number; coupon: CouponValue}> {
        try {
            const spinResponse = await baseAPI.post<SpinResponse>('/spin/scroll_through', {
                uniq_id: uniqId
            });
            
            if (!spinResponse.data.is_ok) {
                throw new Error('Spin request failed');
            }
            
            const result = await pollForResults(spinResponse.data.spin_application_id);
            console.log('Final result:', result.coupon);
            
            return getSegmentsForCoupon(result.coupon);
        } catch (error) {
            console.error('Spin error:', error);
            return getSegmentsForCoupon('0_rub');
        }
    }
};