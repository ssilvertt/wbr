import Copy from '@/assets/svg/copy.svg?react';
import Friendsicon from '@/assets/friends/friendsicon.svg?react';
import Bgfriend from '@/assets/friends/bgfriend.svg?react';
import Usersleft from '@/assets/friends/usersleft.svg?react';
import Roundbg from '@/assets/friends/roundbg.svg?react';
import Roundright from '@/assets/friends/roundright.svg?react';
import topglow from '@/assets/friends/topglow.png';
import referralavatar from '@/assets/friends/referralavatar.png';
import { useFriendsData } from '@/hooks/useUnifiedData.ts';
import WebApp from '@twa-dev/sdk';
import { useUnit } from 'effector-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { $user } from '@/entities/user/model.ts';
import { useLocation } from 'react-router-dom';

interface NotificationProps {
    message: string;
    isVisible: boolean;
}

const CopyNotification = ({ message, isVisible }: NotificationProps) => (
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

export default function Friends() {
    const {
        referralsCount,
        referrals, 
        spinsWord,
       
    } = useFriendsData();
    
    const displayedFriends = useMemo(() => {
        return referrals.slice(0, 5);
    }, [referrals]);
    const [showNotification, setShowNotification] = useState(false);
    const user = useUnit($user);
    const location = useLocation();
    useEffect(() => {
        WebApp.setHeaderColor('#251425');
    }, [location]);
    

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(`https://t.me/Ruletkawinbot?start=ref_${user?.telegram_id}`);
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };
  
    const handleInviteClick = () => {
        const url = `https://t.me/Ruletkawinbot?start=ref_${user?.telegram_id}`;
        const text = `☝️ Переходи по ссылке в лучшую Telegram рулетку, вращай и получай купоны от 500₽ до 30000₽ на WB`;
        WebApp.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
    };
    
  

    return (
        <div className="relative w-full min-h-screen font-proxima text-white bg-[#151517] pb-28">
            {displayedFriends.length > 5 && (
                <div
                    className="absolute bottom-0 left-0 w-full z-10 pointer-events-none"
                    style={{
                        height: '120px',
                        background:
                            'linear-gradient(to top, #151517 10%, rgba(21, 21, 23, 0.8) 40%, rgba(21, 21, 23, 0) 100%)',
                    }}
                />
            )}
            <div className="relative z-0">
                <div className="relative h-[195px] border border-[#202023] rounded-b-3xl flex flex-col items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0">
                            <img src={topglow} alt="Background mask" className="w-full h-full object-cover" />
                        </div>
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent"
                            style={{
                                background:
                                    'linear-gradient(to top, #121214 10%, rgba(18, 18, 20, 0.8) 20%, rgba(18, 18, 20, 0) 50%)',
                            }}
                        />
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <p className="text-[32.14px] font-bold leading-[110%] tracking-[-2%]">Приглашай и вращай</p>
                        <p className="text-[10.71px] leading-[110%] tracking-[-2%] opacity-50 mt-1">
                            За каждого друга вы получаете 1 вращение
                        </p>
                        <motion.button
                            className="p-px bg-gradient-to-t from-transparent from-70% to-[#F03AC2] rounded-[12.17px] mt-3"
                            whileTap={{ scale: 0.98 }}
                            onClick={handleInviteClick}
                        >
                            <div className="flex items-center gap-x-1 bg-gradient-to-b from-[#E204A9] to-[#FE5FD6] w-[202px] justify-center h-[44px] rounded-[12px]">
                                <p className="font-bold text-[17px] leading-[110%] tracking-[-2%]">Пригласить друга</p>
                            </div>
                        </motion.button>
                    </div>
                </div>
                <div className="flex flex-col border border-[#202023] rounded-[15px] mt-7 px-4 py-3 gap-y-[2px]">
                    <p className="text-[19.2px] font-bold leading-[23px]">Скопировать вашу ссылку</p>
                    <div className="flex gap-x-1 items-center" onClick={handleCopyClick}>
                        <div
                            style={{
                                width: '1px',
                                height: '16px',
                                borderRadius: '19px',
                                backgroundColor: 'rgb(225, 0, 168)',
                                boxShadow: '0px 0px 10.7px rgb(225, 0, 168)',
                            }}
                        />
                        <p className="text-[13.69px] leading-[17px] text-[#F74DCC]">
                            https://t.me/Ruletkawinbot?start=ref_{user?.telegram_id}
                        </p>
                        <Copy className="text-[#F74DCC]" />
                    </div>
                </div>
                <div className="flex flex-col border border-[#202023] rounded-[24px] mt-7 py-2 px-4 gap-y-[2px] h-[154px]">
                    <p className="text-[20px] font-bold leading-24px]">Статистика</p>
                    <div className="flex justify-center gap-x-2">
                        <div className="relative w-full">
                            <div className="border border-[#202023] rounded-2xl w-full h-[90px] relative overflow-hidden">
                                <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2">
                                    <Bgfriend className="w-full h-full" />
                                </div>
                                <div className="absolute bottom-[-20%] left-[-20%] ">
                                    <Usersleft className="w-full h-full" />
                                </div>
                                <p className="absolute top-[25%] left-1/2 -translate-x-1/2 text-3xl leading-9 font-bold">
                                    {referralsCount}
                                </p>
                                <p className="absolute bottom-2 w-full text-sm font-bold leading-4 text-center">
                                    Всего друзей
                                </p>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[104px] h-3 rounded-xl bg-[#FC8DFF] opacity-100 blur-2xl -mb-4" />
                            </div>
                        </div>
                        <div className="relative w-full">
                            <div className="border border-[#202023] rounded-2xl w-full h-[90px] relative overflow-hidden">
                                <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2">
                                    <Roundbg className="w-full h-full" />
                                </div>
                                <div className="absolute bottom-[-25%] right-[-18%] ">
                                    <Roundright className="w-full h-full" />
                                </div>
                                <p className="absolute top-[25%] left-1/2 -translate-x-1/2 text-3xl leading-9 font-bold">
                                    {referralsCount}
                                </p>
                                <p className="absolute bottom-2 w-full text-sm font-bold leading-4 text-center">
                                    {spinsWord}
                                </p>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[104px] h-3 rounded-xl bg-[#FC8DFF] opacity-100 blur-2xl -mb-4" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-[#202023] mt-4 rounded-t-3xl flex flex-col">
                    <p className="text-[20px] font-bold leading-[24px] ml-4 mt-3">Друзья</p>

                    {displayedFriends.length > 0 ? (
                        <div className="flex flex-col mt-3">
                            {displayedFriends.map((friend, index) => (
                                <div key={friend.telegram_id}>
                                    <div className="flex items-center justify-between px-4 py-3">
                                        <div className="flex items-center gap-x-3">
                                            <div className="relative w-[25px] h-[25px]">
                                                <img
                                                    src={referralavatar}
                                                    className="absolute w-[25px] h-[25px]"
                                                    style={{ transform: 'scale(2.5)' }}
                                                    alt="Friend avatar"
                                                />
                                            </div>
                                            <p className="text-sm font-bold leading-[110%]">{friend.first_name}</p>
                                        </div>

                                        <span className="text-[13px] font-semibold leading-[16px]">+1BP</span>
                                    </div>
                                    {index !== displayedFriends.length - 1 && (
                                        <div className="h-[1px] mx-4 bg-[#202023]" />
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-center relative">
                                <Friendsicon />
                                <Friendsicon className="absolute blur-[24.6px] opacity-75" />
                            </div>
                            <div className="flex flex-col items-center justify-center mt-2 gap-y-2">
                                <p className="text-[25px] font-bold leading-[30px]">Пока пусто</p>
                                <p className="text-[13px] leading-[16px] text-center opacity-10">
                                    Здесь будет список друзей, которых <br /> вы пригласили
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <CopyNotification message="Ссылка скопирована" isVisible={showNotification} />
        </div>
    );
}
