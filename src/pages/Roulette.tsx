import { PrizeTimer } from '@/components/Prize.tsx';
import PrizeModal from '@/components/PrizeModal.tsx';
import { DailySpinButton } from '@/components/Timer.tsx';
import TutorialModal from '@/components/TutorialModal.tsx';
import BackgroundImages from '@/components/ui/BackgroundImages.tsx';
import { HeaderButtons } from '@/components/ui/HeaderButtons.tsx';
import GameWheel from '@/components/Wheel.tsx';
import WinModal from '@/components/WinModal.tsx';
import type { CouponValue } from '@/entities/coupons/types.ts';
import { $availableSpins, fetchAvailableSpinsFx } from '@/entities/spins/model.ts';
import WebApp from '@twa-dev/sdk';
// import WebApp from '@twa-dev/sdk';
import { useUnit } from 'effector-react';
import { useCallback, useEffect, useState } from 'react';
import { SpinsCounter } from '@/components/SpinsCounter';
import { BonusSpins } from '@/components/BonusSpins';
import { useModals } from '@/hooks/useModals';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface NotificationProps {
    message: string;
    isVisible: boolean;
}

const NoSpinsNotification = ({ message, isVisible }: NotificationProps) => (
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
);

export default function Roulette() {
    const availableSpins = useUnit($availableSpins);
    const location = useLocation();
    // const platform = WebApp.platform;

    useEffect(() => {
        fetchAvailableSpinsFx();
    }, [location]);

    const [showNoSpinsNotification, setShowNoSpinsNotification] = useState(false);
    const {
        showTutorial,
        setShowTutorial,
        showWinModal,
        setShowWinModal,
        showPrizeModal,
        setShowPrizeModal,
        winAmount,
        setWinAmount,
    } = useModals();

    const handleSpinEnd = useCallback(
        (results: { little: number; middle: number; big: number; coupon: CouponValue }) => {
            console.log('Выпали сегменты:', results);
            fetchAvailableSpinsFx();

            if (results.coupon && results.coupon !== '0_rub') {
                setWinAmount(results.coupon);
                setShowWinModal(true);
            }
        },
        [setWinAmount, setShowWinModal]
    );

    const handleSpinAttempt = () => {
        setShowNoSpinsNotification(true);
        setTimeout(() => setShowNoSpinsNotification(false), 3000);
    };

    const wheelClassName = () => {
        const platform = WebApp.platform;
        const height = WebApp.viewportStableHeight;

        if (platform === 'ios') {
            if (height <= 550) {
                return 'flex-1 flex flex-col justify-end min-h-0 scale-[0.7] -mb-5';
            }
            if (height > 750) {
                return 'flex-1 flex flex-col justify-end min-h-0 mb-[90px] scale-110';
            }
            return 'flex-1 flex flex-col justify-end min-h-0 mb-[53px]';
        }

        if (platform === 'android') {
            if (height <= 550) {
                return 'flex-1 flex flex-col justify-end min-h-0 scale-[0.7] -mb-5';
                }
            if (height > 750) {
                return 'flex-1 flex flex-col justify-end min-h-0 mb-[45px]';
            }
            if (height > 680) {
                return 'flex-1 flex flex-col justify-end min-h-0 mb-[35px]';
            }
            // Для самых маленьких экранов оставляем минимальный отступ
            return 'flex-1 flex flex-col justify-end min-h-0 mb-[18px]';
        }

        // return 'flex-1 flex flex-col justify-end min-h-0  -mb-10';
        return "flex-1 flex flex-col justify-end min-h-0 mb-8";
    };
    return (
        <div className="h-screen w-full relative bg-[#151515] overflow-hidden font-proxima text-white">
            <BackgroundImages />

            <div className="relative h-full flex flex-col">
                {/* Верхняя секция с кнопками и таймером */}
                <div className="px-4 py-1 relative min-h-[80px] flex-shrink-0">
                    <HeaderButtons onTutorialClick={() => setShowTutorial(true)} />
                    <PrizeTimer
                        onPrizeClick={() => {
                            setShowPrizeModal(true);
                        }}
                    />
                </div>

                {/* Центральная секция с колесом */}
                <div className={wheelClassName()}>
                    <div className="w-full flex justify-center transform-gpu">
                        <GameWheel
                            onSpinEnd={handleSpinEnd}
                            className="transform-gpu"
                            disabled={availableSpins === 0}
                            onDisabledClick={handleSpinAttempt}
                        />
                    </div>
                </div>

                {/* Нижняя секция с контролами */}
                <div className="px-4 mb-[75px] space-y-[6px] flex-shrink-0">
                    <SpinsCounter spins={availableSpins} />
                    <div className="flex gap-x-4">
                        <BonusSpins />
                        <DailySpinButton />
                    </div>
                </div>
            </div>

            <NoSpinsNotification message="У вас закончились вращения" isVisible={showNoSpinsNotification} />

            <WinModal isOpen={showWinModal} onClose={() => setShowWinModal(false)} winAmount={"5000_rub"} />
            <PrizeModal isOpen={showPrizeModal} onClose={() => setShowPrizeModal(false)} />
            <TutorialModal isOpen={showTutorial} onClose={() => setShowTutorial(false)} />
        </div>
    );
}
