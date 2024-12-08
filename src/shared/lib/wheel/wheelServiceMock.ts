import type { CouponValue } from '@/entities/coupons/types.ts';
import { delay, getSegmentsForCoupon, type WheelSegments, wheelService } from './wheelservice';


// Вероятности выпадения разных призов
const PRIZE_PROBABILITIES: Record<CouponValue, number> = {
    '0_rub': 0,   
    '500_rub': 0,  
    '1000_rub': 0, 
    '5000_rub': 1  
};

const getRandomPrize = (): CouponValue => {
    const random = Math.random();
    let cumulativeProbability = 0;
    
    for (const [prize, probability] of Object.entries(PRIZE_PROBABILITIES)) {
        cumulativeProbability += probability;
        if (random <= cumulativeProbability) {
            return prize as CouponValue;
        }
    }
    
    return '0_rub';
};

const MOCK_SERVER_DELAY = {
    MIN: 1000, 
    MAX: 2000   
};

const getRandomDelay = () =>
    Math.floor(Math.random() * (MOCK_SERVER_DELAY.MAX - MOCK_SERVER_DELAY.MIN) + MOCK_SERVER_DELAY.MIN);

export const wheelServiceMock = {
    async spin(uniqId: string): Promise<WheelSegments> {
        try {
            await delay(getRandomDelay());
            console.log(uniqId);
            
            const prizeCoupon = getRandomPrize();
            
            return getSegmentsForCoupon(prizeCoupon);
            
        } catch (error) {
            console.error('Mock spin error:', error);
            return getSegmentsForCoupon('0_rub');
        }
    }
};

export const USE_MOCK_SERVICE = false; 

export const getWheelService = () =>
    USE_MOCK_SERVICE ? wheelServiceMock : wheelService;