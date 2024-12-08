import { useState } from 'react';
import { WheelType, WHEEL_SEGMENTS, BIG_WHEEL_OFFSET_ADJUSTMENTS, WheelRotations } from './types';

export const useWheelRotation = () => {
    const [rotations, setRotations] = useState<WheelRotations>({
        little: 0,
        middle: 0,
        big: 90
    });
    
    const getRotationForSegment = (
        wheel: WheelType,
        segmentIndex: number,
        currentRotation: number
    ): number => {
        const { anglePerSegment, offset } = WHEEL_SEGMENTS[wheel];
        let targetAngle = 360 - (segmentIndex * anglePerSegment + offset);
        
        if (wheel === 'big' && segmentIndex in BIG_WHEEL_OFFSET_ADJUSTMENTS) {
            targetAngle += BIG_WHEEL_OFFSET_ADJUSTMENTS[segmentIndex];
        }
        
        const fullRotations = (Math.floor(Math.random() * 3) + 6) * 360;
        const currentNormalizedRotation = currentRotation % 360;
        let deltaRotation = targetAngle - currentNormalizedRotation;
        if (deltaRotation < 0) deltaRotation += 360;
        
        return currentRotation + deltaRotation + fullRotations;
    };
    
    const updateRotation = (wheel: WheelType, segmentIndex: number) => {
        setRotations(prev => ({
            ...prev,
            [wheel]: getRotationForSegment(wheel, segmentIndex, prev[wheel])
        }));
    };
    
    return {
        rotations,
        updateRotation
    };
};