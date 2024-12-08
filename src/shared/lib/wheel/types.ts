import type { CouponValue } from '@/entities/coupons/types.ts';

export type WheelType = 'little' | 'middle' | 'big';

export interface WheelSegment {
    count: number;
    anglePerSegment: number;
    offset: number;
}
export interface SpinResult {
    little: number;
    middle: number;
    big: number;
    coupon: CouponValue;
}

export interface WheelRotations {
    little: number;
    middle: number;
    big: number;
}

export const WHEEL_SEGMENTS: Record<WheelType, WheelSegment> = {
    little: {
        count: 7,
        anglePerSegment: 360 / 7,
        offset: 0,
    },
    middle: {
        count: 8,
        anglePerSegment: 360 / 8,
        offset: 0,
    },
    big: {
        count: 16,
        anglePerSegment: 360 / 16,
        offset: 0,
    },
};

export const WHEEL_SPIN_DURATION = 2500;

export const BIG_WHEEL_OFFSET_ADJUSTMENTS: Record<number, number> = {
    1: -2,
    4: 5,
    7: 7,
    11: 1,
    14: -3,
    15: 1,
};