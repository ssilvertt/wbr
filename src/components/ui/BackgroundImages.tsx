import { memo } from 'react';
import mainglow from '@/assets/roulette/mainglow.webp';
import barright from '@/assets/roulette/barright.webp';
import barleft from '@/assets/roulette/barleft.webp';
import whiteroung from '@/assets/roulette/whiteroung.webp';
import bottomglow from '@/assets/roulette/bottomglow.webp';

const BackgroundImages = memo(() => (
    <div className="absolute inset-0 pointer-events-none">
        <img
            src={mainglow}
            width={500}
            height={300}
            alt=""
            className="absolute left-1/2 w-full bottom-[-20%]"
            style={{ transform: 'translate(-50%, -50%) scale(5)' }}
        />
        <img
            src={barright}
            width={200}
            height={200}
            className="absolute bottom-[0%]"
            style={{ transform: 'scale(2) translateX(55%)' }}
        />
        <img
            src={barleft}
            width={200}
            height={200}
            className="absolute bottom-[0%]"
            style={{ transform: 'scale(2) translateX(-20%)' }}
        />
        <img
            src={whiteroung}
            width={300}
            height={300}
            className="absolute bottom-[-24%]"
            style={{ transform: 'scale(2)' }}
        />
        <img
            src={bottomglow}
            width={300}
            height={300}
            className="absolute bottom-[-22%]"
            style={{ transform: 'scale(2)' }}
        />
    </div>
));

BackgroundImages.displayName = 'BackgroundImages';

export default BackgroundImages;