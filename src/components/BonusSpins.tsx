import Medal from '@/assets/svg/medal.svg?react';
import { $friendsAwardStatus, setFriendsAwardStatus } from '@/components/ui/LoadingScreen.tsx';
import { fetchAvailableSpinsFx } from '@/entities/spins/model.ts';
import { $referralsCount } from '@/entities/user-stats/model.ts';
import { useUnit } from 'effector-react';
import { memo, useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { baseAPI } from '@/shared/api/base.ts';

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

export const BonusSpins = memo(() => {
    const [notification, setNotification] = useState({ message: '', isVisible: false });
    const [isLoading, setIsLoading] = useState(false);
    const referrals = useUnit($referralsCount);
    const isAwarded = useUnit($friendsAwardStatus);
    
    const getReferralMessage = useCallback(() => {
        const remainingReferrals = 3 - referrals;
        if (remainingReferrals === 1) return 'Пригласите 1 друга, для награды!';
        if (remainingReferrals === 2) return 'Пригласите 2х друзей, для награды!';
        return 'Пригласите 3х друзей, для награды!';
    }, [referrals]);
    
    const showNotification = useCallback((message: string) => {
        setNotification({ message, isVisible: true });
        setTimeout(() => {
            setNotification(prev => ({ ...prev, isVisible: false }));
        }, 3000);
    }, []);
    
    const handleClick = useCallback(async () => {
        if (isLoading || isAwarded) return;
        
        setIsLoading(true);
        try {
            const { data: canGetAward } = await baseAPI.get('/prize/get_award_for_3_friends');
            
            if (canGetAward) {
                fetchAvailableSpinsFx();
                showNotification('Награда получена!');
                setFriendsAwardStatus(true);
            } else {
                showNotification(getReferralMessage());
            }
        } catch (error) {
            console.error('Error handling bonus spins:', error);
            showNotification('Произошла ошибка. Попробуйте позже.');
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, isAwarded, showNotification, getReferralMessage]);
    
    return (
        <>
            <div
                className="flex-1 rounded-xl border-t border-[#5A3754] backdrop-blur-[0px] bg-[#4E4E4E]/15 max-[360px]:py-2 py-3 flex flex-col max-[360px]:gap-y-1 gap-y-1">
                <div className="flex justify-center gap-x-[2px] items-center">
                    <Medal className="max-[360px]:scale-90" />
                    <p className="text-[11.71px] max-[360px]:text-[10.5px] font-bold leading-[110%] tracking-[-2%]">
                        3 Вращения
                    </p>
                </div>
                <div className="flex justify-center">
                    <motion.button
                        onClick={handleClick}
                        disabled={isAwarded || isLoading}
                        whileTap={{ scale: isAwarded ? 1 : 0.95 }}
                        whileHover={isAwarded ? {} : { scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className={`p-px bg-gradient-to-t from-transparent from-70% to-[#F03AC2] rounded-[234.17px] ${
                            isAwarded ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        <motion.div
                            className="flex items-center bg-gradient-to-b from-[#E204A9] to-[#FE5FD6] max-[360px]:px-6 px-8 max-[360px]:py-1 py-[6px] rounded-[234px]"
                            animate={isLoading ? { opacity: [1, 0.5, 1] } : {}}
                            transition={isLoading ? { repeat: Infinity, duration: 1 } : {}}
                        >
                            <p className="font-bold text-[13px] max-[360px]:text-[12px] leading-[110%] tracking-[-2%]">
                                {isAwarded ? 'Получено' : 'Получить'}
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
});