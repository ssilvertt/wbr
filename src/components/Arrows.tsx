import arrow from '@/assets/wheel/arrow.png';
import { memo } from 'react';

export const Arrows = memo(() => (
    <>
        <img
            src={arrow}
            alt="Arrow for middle circle"
            className="absolute w-[23.74px] h-[18.47px] z-30"
            style={{
                top: '7.5%', 
                left: '50%',
                transform: 'translateX(-50%)'
            }}
        />
        <img
            src={arrow}
            alt="Arrow for small circle"
            className="absolute w-[23.74px] h-[18.47px] z-40"
            style={{
                top: '21%', 
                left: '50%',
                transform: 'translateX(-50%)'
            }}
        />
        <img
            src={arrow}
            alt="Arrow for button"
            className="absolute w-[23.74px] h-[18.47px] z-50"
            style={{
                top: '34.6%', 
                left: '50%',
                transform: 'translateX(-50%)'
            }}
        />
    </>
));

Arrows.displayName = 'Arrows';