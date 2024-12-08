export type CouponValue = '0_rub' | '500_rub' | '1000_rub' | '5000_rub';

export interface SpinResult {
    created_at: string;
    spin_application_id: string;
    result_id: number;
    coupon: CouponValue;
    checking_code: string;
}