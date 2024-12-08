import Star from '@/assets/svg/star.svg?react';
import { fetchAvailableSpinsFx } from '@/entities/spins/model.ts';
import { $timer, getDailySpinFx, getTimerFx } from '@/entities/timer/timer.ts';
import { useUnit } from 'effector-react/effector-react.umd';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, memo, useCallback } from 'react';

const CopyNotification = memo(({ message, isVisible }: { message: string; isVisible: boolean }) => (
    <AnimatePresence>
        {isVisible && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed inset-0 flex items-end justify-center z-50 pb-24"
            >
                <div className="flex items-center justify-center bg-[#151515] h-[44px] px-8 rounded-xl shadow-lg border border-[#202023]">
                    <p className="text-white font-bold text-[16px] whitespace-nowrap">{message}</p>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
));

export const DailySpinButton = () => {
    const timer = useUnit($timer);
    const [displayTime, setDisplayTime] = useState('');
    const [notification, setNotification] = useState({ message: '', isVisible: false });
    const [isLoading, setIsLoading] = useState(false);
    
    const showNotification = useCallback((message: string) => {
        setNotification({ message, isVisible: true });
        setTimeout(() => {
            setNotification(prev => ({ ...prev, isVisible: false }));
        }, 3000);
    }, []);
    
    useEffect(() => {
        getTimerFx();
        const interval = setInterval(() => {
            getTimerFx();
        }, 60000);
        return () => clearInterval(interval);
    }, []);
    
    useEffect(() => {
        const formatTimeLeft = () => {
            if (!timer.endTime) return '';
            const diff = Math.max(0, timer.endTime - Date.now());
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
    }, [timer.endTime]);
    
    const isButtonDisabled = () => {
        if (!timer.endTime) return false;
        return timer.endTime - Date.now() > 0;
    };
    
    const handleClick = async () => {
        if (isLoading || isButtonDisabled()) return;
        
        setIsLoading(true);
        try {
            await getDailySpinFx();
            await getTimerFx();
            await fetchAvailableSpinsFx();
            showNotification('Награда получена!');
        } catch (error) {
            console.error('Error getting daily spin:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <>
            <div
                className="flex-1 rounded-xl border-t border-[#5A3754] backdrop-blur-[0px] bg-[#4E4E4E]/15 max-[360px]:py-2 py-3 flex flex-col max-[360px]:gap-y-1 gap-y-1">
                <div className="flex justify-center gap-x-[2px] items-center">
                    <Star className="max-[360px]:scale-90" />
                    <p className="text-[11.71px] max-[360px]:text-[10.5px] font-bold leading-[110%] tracking-[-2%]">
                        Бесплатный спин
                    </p>
                </div>
                <div className="flex justify-center">
                    <motion.button
                        whileTap={{ scale: isButtonDisabled() ? 1 : 0.90 }}
                        whileHover={isButtonDisabled() ? {} : { scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        onClick={handleClick}
                        disabled={isButtonDisabled()}
                        className={`p-px bg-gradient-to-t from-transparent from-70% to-[#F03AC2] rounded-[234.17px] ${
                            isButtonDisabled() ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        <motion.div
                            className="flex items-center bg-gradient-to-b from-[#E204A9] to-[#FE5FD6] max-[360px]:px-6 px-8 max-[360px]:py-1 py-[6px] rounded-[234px]"
                            animate={isLoading ? { opacity: [1, 0.5, 1] } : {}}
                            transition={isLoading ? { repeat: Infinity, duration: 1 } : {}}
                        >
                            <p className="font-bold text-[13px] max-[360px]:text-[12px] leading-[110%] tracking-[-2%]">
                                {isButtonDisabled() ? displayTime : 'Получить'}
                            </p>
                        </motion.div>
                    </motion.button>
                </div>
            </div>
            <CopyNotification
                message={notification.message}
                isVisible={notification.isVisible}
            />
        </>
    );
};