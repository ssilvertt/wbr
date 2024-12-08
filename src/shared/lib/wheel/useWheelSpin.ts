import { getWheelService } from '@/shared/lib/wheel/wheelServiceMock.ts';
import { useState } from 'react';
import { getSegmentsForCoupon } from './wheelservice';
import { type SpinResult, WHEEL_SPIN_DURATION } from './types';
export const useWheelSpin = (
    updateRotation: (wheel: 'little' | 'middle' | 'big', segmentIndex: number) => void,
    onSpinStart?: () => void,
    onSpinEnd?: (results: SpinResult) => void,
) => {
    const [isSpinning, setIsSpinning] = useState(false);
    const wheelService = getWheelService();
    const handleSpin = async () => {
        if (isSpinning) return;
        
        setIsSpinning(true);
        onSpinStart?.();
        
        const initialSegments = getSegmentsForCoupon('0_rub');
        updateRotation('little', initialSegments.little);
        
        const spinPromise = wheelService.spin(crypto.randomUUID());
        
        await new Promise(resolve => setTimeout(resolve, WHEEL_SPIN_DURATION));
        
        updateRotation('middle', initialSegments.middle);
        
        try {
            const [result] = await Promise.all([
                spinPromise,
                new Promise(resolve => setTimeout(resolve, WHEEL_SPIN_DURATION))
            ]);
            
            updateRotation('big', result.big);
            
            setTimeout(() => {
                setIsSpinning(false);
                onSpinEnd?.(result);
            }, WHEEL_SPIN_DURATION);
            
        } catch (error) {
            console.error('Spin failed:', error);
            const fallbackSegments = getSegmentsForCoupon('0_rub');
            updateRotation('big', fallbackSegments.big);
            
            setTimeout(() => {
                setIsSpinning(false);
            }, WHEEL_SPIN_DURATION);
        }
    };
    
    return {
        isSpinning,
        handleSpin
    };
};