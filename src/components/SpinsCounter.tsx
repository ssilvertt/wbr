import { formatSpinsCount } from '@/shared/lib/format/spins.ts';
import { memo } from 'react';
import RouletteSVG from '@/assets/svg/roulette.svg?react';

export const SpinsCounter = memo(({ spins }: { spins: number }) => (
    <div className="rounded-xl border-t border-[#5A3754] backdrop-blur-[0px] bg-[#4E4E4E]/15 max-[360px]:py-3 py-4 flex justify-center items-center gap-x-2">
        <RouletteSVG className="w-[42.59px] h-[42.58px] max-[360px]:w-[38px] max-[360px]:h-[38px] text-[#FF27CC]" />
        <p className="font-bold text-[25px] max-[360px]:text-[22px] leading-[30px] max-[360px]:leading-[26px]">
            {formatSpinsCount(spins)}
        </p>
    </div>
));