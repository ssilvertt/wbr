import React, { useEffect, useRef } from 'react';
import { Arrows } from '@/components/Arrows';
import { SpinButton } from '@/components/SpinButton';
import { WheelCircle } from './WheelCircle';
import { type SpinResult, WHEEL_SPIN_DURATION } from '@/shared/lib/wheel/types.ts';
import { useWheelRotation } from '@/shared/lib/wheel/useWheelRotation.ts';
import { useWheelSpin } from '@/shared/lib/wheel/useWheelSpin.ts';
import WebApp from '@twa-dev/sdk';
import bigcircle from '@/assets/wheel/big.webp';
import middlecircle from '@/assets/wheel/middlecircle.webp';
import littlecircle from '@/assets/wheel/littlecircle.webp';

interface GameWheelProps {
    className?: string;
    onSpinEnd?: (results: SpinResult) => void;
    onSpinStart?: () => void;
    disabled?: boolean;
    onDisabledClick?: () => void;
}

const GameWheel: React.FC<GameWheelProps> = ({
                                                 className,
                                                 onSpinEnd,
                                                 onSpinStart,
                                                 disabled = false,
                                                 onDisabledClick
                                             }) => {
    const { rotations, updateRotation } = useWheelRotation();
    const { isSpinning, handleSpin } = useWheelSpin(updateRotation, onSpinStart, onSpinEnd);
    const wheelRef = useRef<HTMLDivElement>(null);
    
    const handleWheelSpin = () => {
        if (disabled) {
            onDisabledClick?.();
            return;
        }
        handleSpin();
    };
    
    useEffect(() => {
        const updateScale = () => {
            if (!wheelRef.current) return;
            
            const height = WebApp.viewportStableHeight;
            const width = window.innerWidth;
            const platform = WebApp.platform;
            
            let scale = 0.9;
            let translateY = 0;
            
            if (platform === 'ios') {
                if (width >= 390 && height >= 844) {
                    scale = 1.35;
                } else if (width >= 375 && height >= 812) {
                    scale = 1.25;
                    
                } else if (height < 550){
                    scale = 0.7;
                } 
                else {
                    scale = 1.15;
                }
            } else if (platform === 'android') {
                if (width === 1080 && height === 1884) {
                    scale = 1.1;
                    translateY = -5;
                }
                else if (height > 1800) {
                    scale = 1.1;
                    translateY = -2;
                } else if (width <= 360 || height <= 760) {
                    scale = Math.max((width / 360), 0.8);
                    translateY = -1;
                } else if (width >= 400) {
                    scale = 1.1;
                }
            }
            
            wheelRef.current.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        };
        
        updateScale();
        window.addEventListener('resize', updateScale);
        WebApp.onEvent('viewportChanged', updateScale);
        
        return () => {
            window.removeEventListener('resize', updateScale);
            WebApp.offEvent('viewportChanged', updateScale);
        };
    }, []);
    
    return (
        <div
            ref={wheelRef}
            className={`relative transform-gpu ${className}`}
            style={{
                width: '315px',
                height: '315px',
                margin: '0 auto',
               
            }}
        >
            <div className="absolute inset-0">
                <Arrows />
                
                <WheelCircle
                    rotation={rotations.big}
                    image={bigcircle}
                    size="w-[315px] h-[315px]"
                    zIndex={20}
                    duration={WHEEL_SPIN_DURATION}
                />
            
                
                
                <WheelCircle
                    rotation={rotations.middle}
                    image={middlecircle}
                    size="w-[314px] h-[314px]"
                    zIndex={30}
                    duration={WHEEL_SPIN_DURATION}
                />
                
                <WheelCircle
                    rotation={rotations.little}
                    image={littlecircle}
                    size="w-[219px] h-[219px]"
                    zIndex={40}
                    duration={WHEEL_SPIN_DURATION}
                />
                
                <SpinButton
                    onClick={handleWheelSpin}
                    isSpinning={isSpinning}
                    disabled={disabled}
                />
            </div>
        </div>
    );
};

export default GameWheel;