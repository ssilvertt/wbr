import { memo } from 'react';

interface WheelCircleProps {
    rotation: number;
    image: string;
    size: string;
    zIndex: number;
    duration: number;
    className?: string;
}

export const WheelCircle = memo(({ rotation, image, size, zIndex, duration, className }: WheelCircleProps) => (
    <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${size} z-${zIndex} ${className}}`}
        style={{
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            transition: `transform ${duration}ms cubic-bezier(0.3, 0.1, 0.3, 0.9)`,
        }}
    >
        <img src={image} alt="circle" className="w-full h-full object-contain" />
    </div>
));

WheelCircle.displayName = 'WheelCircle';