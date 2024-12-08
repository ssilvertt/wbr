import { $prizeTimer, getPrizeTimerFx } from '@/entities/prize/prize.ts';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import gift from '@/assets/svg/gift.png';
import { motion } from 'framer-motion';

interface Props {
    onPrizeClick: () => void;
}

export const PrizeTimer = ({ onPrizeClick }: Props) => {
    const prizeTimer = useUnit($prizeTimer);
    const [displayTime, setDisplayTime] = useState('');
    
    useEffect(() => {
        getPrizeTimerFx();
    }, []);
    
    useEffect(() => {
        const formatTimeLeft = () => {
            if (!prizeTimer.endTime) return '';
            const diff = Math.max(0, prizeTimer.endTime - Date.now());
            const hours = Math.floor(diff / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        };
        
        setDisplayTime(formatTimeLeft());
        const tickInterval = setInterval(() => {
            setDisplayTime(formatTimeLeft());
        }, 1000);
        
        return () => clearInterval(tickInterval);
    }, [prizeTimer.endTime]);
    
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onPrizeClick();
    };
    
    return (
        <motion.div
            className="absolute right-4 top-[45px] w-[75px] h-[96px] flex flex-col justify-end items-center cursor-pointer z-[70]"
            onClick={handleClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <motion.img
                src={gift}
                alt="Gift"
                className="absolute top-0 left-0 w-[75px] h-[75px] object-contain z-20"
                animate={{
                    y: [0, -5, 0],
                    rotate: [0, -5, 5, 0]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <div className="bg-[#4E4E4E]/15 backdrop-blur-[0px] border-t border-[#5A3754] rounded-[5px] h-[52px] flex flex-col items-center justify-end w-[56px]">
                <p className="text-[8px] font-bold leading-[110%] tracking-[-2%]">Подарок</p>
                <div className="p-px bg-gradient-to-t from-transparent from-70% to-[#F03AC2] rounded-[100.17px]">
                    <div className="flex items-center justify-center bg-gradient-to-b from-[#E204A9] to-[#FE5FD6] w-[50px] h-3 rounded-[234px]">
                        <p className="font-bold text-[9px] leading-[110%] tracking-[-2%]">{displayTime}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};