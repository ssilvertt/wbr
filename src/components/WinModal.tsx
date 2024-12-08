import { motion, AnimatePresence } from 'framer-motion';
import CloseSVG from '@/assets/svg/close.svg?react';
import { useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';

interface WinModalProps {
    isOpen: boolean;
    onClose: () => void;
    winAmount: string;
}

export default function WinModal({ isOpen, onClose, winAmount }: WinModalProps) {
    const navigate = useNavigate();
    
    const handleClick = () => {
        if (winAmount === '500_rub' || winAmount === '1000_rub') {
            onClose();
            navigate('/coupons');
        } else {
            WebApp.openLink('https://onesecgo.ru/stream/ruletka5000');
        }
    };
    
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <div
                        className="bg-black rounded-[15px] p-6 w-[350px] h-[320px] mx-4 relative overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(180deg, #480D3F 0%, rgba(72, 13, 63, 0) 80%)',
                            }}
                        />
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 hover:opacity-80 active:scale-95 transition-all"
                        >
                            <CloseSVG />
                        </button>
                        <div className="relative z-10 h-full mt-7 flex flex-col">
                            <div
                                className="text-[30px] font-proxima font-bold leading-[110%] tracking-[-2%] text-center">
                                ПОЗДРАВЛЯЕМ! <br />
                                ВЫ {` `}
                                <span className="relative inline-block text-[#FF31D2]">
                                    ВЫИГРАЛИ
                                    <span className ="absolute left-0 -translate-y-2 blur-[25px] text-[#FF31D2]">
                                        ВЫИГРАЛИ
                                    </span>
                                    <div className="-mt-1">
                                        <div
                                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[167px] h-[1px] rounded-[18px] bg-gradient-to-r from-[rgba(225,0,168,0)] to-[rgb(225,0,168)]" />
                                        <div
                                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[167px] h-[1px] rounded-[18px] bg-gradient-to-r from-[rgba(225,0,168,0)] to-[rgb(225,0,168)] blur-[10px]" />
                                    </div>
                                </span>
                                <br/>
                                
                            </div>
                            <div className='text-[15px] font-proxima font-bold leading-[110%] mt-2 opacity-100 tracking-[-2%] text-center'>
                                ВОЗМОЖНОСТЬ ПОЛУЧИТЬ
                            </div>
                            <div
                                className="text-[51.3px] font-proxima font-[800] leading-[110%] tracking-[-2%] text-center relative overflow-visible mt-4">
                                <span
                                    className="absolute left-1/3 -translate-x-5 blur-[25px] text-[#FF31D2] whitespace-nowrap">
                                    {winAmount.replace('_rub', '')}Р
                                </span>
                                <span
                                    className="relative text-white whitespace-nowrap"
                                    style={{
                                        textShadow: `-1px -1px 0 #E100A8, 1px -1px 0 #E100A8, -1px 1px 0 #E100A8, 1px 1px 0 #E100A8`,
                                    }}
                                >
                                    {winAmount.replace('_rub', '')}Р
                                </span>
                                <div className="relative flex justify-center w-full mt-2">
                                    <div className="relative w-[150px]">
                                        <div className="w-full h-[1px] border-[1px] border-[rgb(251,12,190)]" />
                                        <div
                                            className="w-full h-[1px] border-[1px] border-[rgb(251,12,190)] blur-[12.6px] opacity-90 absolute top-0" />
                                    </div>
                                </div>
                            
                            </div>
                            <div className="flex flex-col items-center justify-center flex-grow">
                                {!(winAmount === '500_rub' || winAmount === '1000_rub') && (
                                    <p className="text-[9.69px] font-bold leading-[17px] mb-2">
                                        Далее оплачиваем 1Р за доступ к подписке на 5 дней
                                    </p>
                                )}
                                <button
                                    className="p-px bg-gradient-to-t from-transparent from-70% to-[#F03AC2] rounded-[12.17px] active:scale-95 transition-transform"
                                    style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
                                >
                                    <div
                                        onClick={handleClick}
                                        className="flex items-center gap-x-1 bg-gradient-to-b from-[#E204A9] to-[#FE5FD6] w-[202px] justify-center h-[44px] rounded-[12px]"
                                    >
                                        <p className="font-bold text-[17px] leading-[110%] tracking-[-2%]">
                                            Забрать подарок
                                        </p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}