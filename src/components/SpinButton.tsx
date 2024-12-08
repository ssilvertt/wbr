import { memo } from 'react';
import button from '@/assets/wheel/button.webp';

interface SpinButtonProps {
    onClick: () => void;
    isSpinning: boolean;
    disabled?: boolean;
}

export const SpinButton = memo(({ onClick, isSpinning, disabled }: SpinButtonProps) => (
    <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[229px] h-[229px] z-50
      ${(isSpinning || disabled) ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105 active:scale-95'} 
      transition-all`}
        onClick={(!isSpinning && !disabled) ? onClick : undefined}
    >
        <img src={button} alt="Center button" className="w-full h-full object-contain" />
    </div>
));