import topglow from '@/assets/friends/topglow.png';
import Coup from '@/assets/coupons/coup.svg?react';
import { $validSpinResults, fetchSpinResultsFx } from '@/entities/coupons/coupons.ts';
import { $user } from '@/entities/user/model';
import { useUnit } from 'effector-react/effector-react.umd';
import { useEffect, useState } from 'react';
import Couponicon from '@/assets/coupons/couponicon.svg?react';
import referralavatar from '@/assets/friends/referralavatar.png';
import { AnimatePresence, motion } from 'framer-motion';
import Coupp from '@/assets/coupons/Coupp.svg?react';
import WebApp from '@twa-dev/sdk';


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
// const mockResults = [
//     {
//         created_at: '2024-11-28T14:30:00.000Z',
//         spin_application_id: '1732833847_502493346_794ab2a9-1',
//         result_id: 1,
//         coupon: '5000_rub',
//         checking_code: '25-b903bebf',
//     },
//     {
//         created_at: '2024-11-28T12:15:00.000Z',
//         spin_application_id: '1732833847_502493346_794ab2a9-2',
//         result_id: 2,
//         coupon: '1000_rub',
//         checking_code: '26-c904cecf',
//     },
//     {
//         created_at: '2024-11-27T18:45:00.000Z',
//         spin_application_id: '1732833847_502493346_794ab2a9-3',
//         result_id: 3,
//         coupon: '500_rub',
//         checking_code: '27-d905dedf',
//     },
//     {
//         created_at: '2024-11-27T09:20:00.000Z',
//         spin_application_id: '1732833847_502493346_794ab2a9-4',
//         result_id: 4,
//         coupon: '1000_rub',
//         checking_code: '28-e906eeef',
//     },
//     {
//         created_at: '2024-11-26T15:55:00.000Z',
//         spin_application_id: '1732833847_502493346_794ab2a9-5',
//         result_id: 5,
//         coupon: '5000_rub',
//         checking_code: '29-f907feff',
//     },
//     {
//         created_at: '2024-11-28T14:30:00.000Z',
//         spin_application_id: '1732833847_502493346_794ab2a9-1',
//         result_id: 6,
//         coupon: '5000_rub',
//         checking_code: '25-b903bebf',
//     },
//     {
//         created_at: '2024-11-28T12:15:00.000Z',
//         spin_application_id: '1732833847_502493346_794ab2a9-2',
//         result_id: 7,
//         coupon: '1000_rub',
//         checking_code: '26-c904cecf',
//     },
//     {
//         created_at: '2024-11-27T18:45:00.000Z',
//         spin_application_id: '1732833847_502493346_794ab2a9-3',
//         result_id: 8,
//         coupon: '500_rub',
//         checking_code: '27-d905dedf',
//     },
//     {
//         created_at: '2024-11-27T09:20:00.000Z',
//         spin_application_id: '1732833847_502493346_794ab2a9-4',
//         result_id: 9,
//         coupon: '1000_rub',
//         checking_code: '28-e906eeef',
//     },
//     {
//         created_at: '2024-11-26T15:55:00.000Z',
//         spin_application_id: '1732833847_502493346_794ab2a9-5',
//         result_id: 10,
//         coupon: '5000_rub',
//         checking_code: '29-f907feff',
//     },
// ];

export default function Coupons() {
    const user = useUnit($user);
    const results = useUnit($validSpinResults);
    // const results = mockResults;
    const [showNotification, setShowNotification] = useState(false);
    const handleCouponTap = async (code: string) => {
        try {
            await navigator.clipboard.writeText(code);
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 2000); // Hide after 2 seconds
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };
    useEffect(() => {
        fetchSpinResultsFx();
       
    }, []);

    // Форматируем сумму купона из строки вида "500_rub" в "500₽"
    const formatCouponValue = (coupon: string) => {
        return `${coupon.split('_')[0]}₽`;
    };

    // Форматируем дату в нужный формат
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="relative w-full font-proxima text-white min-h-screen bg-[#151517]">
            <div className="relative z-10">
                <div className="relative h-[195px] border border-[#202023] rounded-b-3xl flex flex-col items-start justify-center overflow-hidden">
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

                    <div className="relative z-10 flex flex-col px-4 w-full">
                        <div className="flex items-center gap-x-1">
                            <img
                                src={referralavatar}
                                className="h-[29px] w-[29px]"
                                style={{ transform: 'scale(1.8)' }}
                            />
                            <p className="text-[17.39px] font-bold leading-[110%] tracking-[-2%]">{user?.first_name}</p>
                        </div>
                        <p className="text-[10.71px] leading-[110%] tracking-[-2%] opacity-50 mt-1">Всего купонов</p>
                        <div className="relative">
                            <p className="text-[32.14px] font-bold leading-[110%] tracking-[-2%]">{results.length}</p>
                            <div className="absolute translate-x-1 top-1/2 -translate-y-1/2">
                                <Coup />
                            </div>
                        </div>
                        <div className="w-full mt-3">
                            <motion.button
                                className="w-full p-px bg-gradient-to-t from-transparent from-70% to-[#F03AC2] rounded-[12.17px]"
                                whileTap={{ scale: 0.98 }}
                                onClick={() => WebApp.openTelegramLink('https://t.me/MenegerWBR')}
                            >
                                <div className="flex items-center justify-center w-full h-[44px] bg-gradient-to-b from-[#E204A9] to-[#FE5FD6] rounded-[12px]">
                                    <p className="font-bold text-[17px] leading-[110%] tracking-[-2%]">
                                        Получить код активации
                                    </p>
                                </div>
                            </motion.button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-[#202023] mt-4  rounded-t-3xl flex flex-col">
                    <p className="text-[20px] font-bold leading-[24px] px-4 mt-3">Купоны</p>
                    {results.length === 0 ? (
                        <>
                            <div className="flex items-center justify-center relative">
                                <Coupp className="text-gray-800" />
                                <Coupp className="absolute blur-[10.6px] opacity-75" />
                            </div>
                            <div className="flex flex-col items-center justify-center mt-2 gap-y-2">
                                <p className="text-[25px] font-bold leading-[30px]">Пока пусто</p>
                                <p className="text-[13px] leading-[16px] text-center opacity-10">
                                    Здесь будет отображаться история ваших <br />
                                    заявок на вывод и статусы
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col mt-4 relative">
                            {results
                                .slice(0, 10)
                                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                                .map((result, index) => (
                                    <motion.div
                                        key={result.spin_application_id}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleCouponTap(result.checking_code)}
                                        className="cursor-pointer"
                                    >
                                        <div
                                            className="grid items-center px-4 py-3"
                                            style={{
                                                gridTemplateColumns: '40px 120px 24px 65px 1fr',
                                                gap: '4px',
                                            }}
                                        >
                                            <Couponicon className="h-6 w-6" style={{ transform: 'scale(1.7)' }} />

                                            {/* Увеличиваем пространство для кода */}
                                            <span className="font-bold text-[16.83px] leading-[20px] truncate">
                                                {result.checking_code}
                                            </span>

                                            <div className="flex justify-center">
                                                <div className="w-px h-4 bg-[#202023]" />
                                            </div>

                                            {/* Добавляем padding-right для суммы */}
                                            <span className="font-bold font-gilroy text-[16.83px] leading-[20px] whitespace-nowrap pr-1">
                                                {formatCouponValue(result.coupon)}
                                            </span>

                                            {/* Убираем ml-auto, так как теперь используем меньший gap */}
                                            <span className="text-right font-bold text-[16.83px] leading-[20px] whitespace-nowrap">
                                                {formatDate(result.created_at)}
                                            </span>
                                        </div>

                                        {index < results.length - 1 && <div className="h-px w-full bg-[#202023]" />}
                                    </motion.div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
            <div
                className="fixed bottom-10 left-0 right-0 h-24 pointer-events-none"
                style={{
                    background:
                        'linear-gradient(to top, #121214 10%, rgba(18, 18, 20, 0.8) 50%, rgba(18, 18, 20, 0) 100%)',
                    zIndex: 10,
                }}
            />
            <CopyNotification message="Код купона скопирован" isVisible={showNotification} />
        </div>
    );
}
