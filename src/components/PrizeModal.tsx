import { motion, AnimatePresence } from 'framer-motion';
import prize from '@/assets/prizemodal/prize.webp';
import CloseSVG from '@/assets/svg/close.svg?react';
import WebApp from '@twa-dev/sdk';
import textlogo from '@/assets/prizemodal/textlogo.webp';

interface PrizeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PrizeModal({ isOpen, onClose }: PrizeModalProps) {
    const handleClick = () => {
        WebApp.openLink('https://onesecgo.ru/stream/ruletka1000p');
    };
    
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <div
                        className="bg-black rounded-[15px] p-6 w-[350px] h-[360px] mx-4 relative overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(180deg, #480D3F 0%, rgba(72, 13, 63, 0) 80%)',
                            }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-full h-full">
                                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[158px] h-[158px]">
                                    <div
                                        className="w-full h-full relative"
                                        style={{
                                            maskImage: 'linear-gradient(to bottom, black 10%, transparent 100%)',
                                            WebkitMaskImage: 'linear-gradient(to bottom, black 10%, transparent 100%)',
                                        }}
                                    >
                                        <img src={prize} alt="Prize" className="w-full h-full object-contain" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-[70] hover:opacity-80 active:scale-95 transition-all"
                        >
                            <CloseSVG />
                        </button>
                        <div className="relative z-50 h-full flex flex-col justify-center mt-10">
                            <div className="text-[20.55px] font-proxima font-bold leading-[110%] tracking-[-2%] text-center mb-4">
                                <img
                                    src={textlogo}
                                    alt="WB"
                                    className="inline-block w-[67px] h-[33px] object-cover"
                                    style={{ transform: 'scale(3)' }}
                                />{' '}
                                <span className="text-[#E101A8]">рулетка</span> - Дарит подарок от партнера <br />
                                каждому <span className="text-[#E101A8]">своему участнику</span>
                                <div className="relative flex justify-center mt-2 ml-20">
                                    <div className="w-[167px] h-[1px] rounded-[18px] bg-gradient-to-r from-transparent to-[#E100A8]" />
                                    <div
                                        className="w-[167px] h-[1px] rounded-[18px] bg-gradient-to-r from-transparent to-[#E100A8] absolute top-0"
                                        style={{ filter: 'blur(10px)' }}
                                    />
                                </div>
                            </div>
                            <div className="text-[51.3px] font-proxima font-[800] leading-[110%] tracking-[-2%] text-center relative overflow-visible">
                                <span className="absolute left-1/3 -translate-x-5 blur-[25px] text-[#FF31D2] whitespace-nowrap">
                                    1000Р
                                </span>
                                <span
                                    className="relative text-white whitespace-nowrap"
                                    style={{
                                        textShadow: `-1px -1px 0 #E100A8, 1px -1px 0 #E100A8, -1px 1px 0 #E100A8, 1px 1px 0 #E100A8`,
                                    }}
                                >
                                    1000Р
                                </span>

                                <div className="relative flex justify-center w-full mt-2">
                                    <div className="relative w-[150px]">
                                        <div className="w-full h-[1px] border-[1px] border-[rgb(251,12,190)]" />
                                        <div className="w-full h-[1px] border-[1px] border-[rgb(251,12,190)] blur-[12.6px] opacity-90 absolute top-0" />
                                    </div>
                                </div>
                                <p className="text-[7.69px] leading-[17px]">
                                    Далее оплачиваем 1Р за доступ к подписке на 5 дней
                                </p>
                            </div>
                            <div className="mx-auto">
                                <button
                                    className="p-px bg-gradient-to-t from-transparent from-70% to-[#F03AC2] rounded-[12.17px] mt-2 mx-auto z-50 active:scale-95 transition-transform"
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