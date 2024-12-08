import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import logo from '@/assets/tutor/logo3.png';
import first from '@/assets/tutor/1.png';
import stars from '@/assets/tutor/stars.png';
import second from '@/assets/tutor/2.png';
import third from '@/assets/tutor/3.png';
import fourth from '@/assets/tutor/4.png';
import { useSwipeable } from 'react-swipeable';


interface SlideContent {
    title: string;
    image: string;
    customTitle?: React.ReactNode;
    customText?: React.ReactNode;
}

interface TutorialModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
    
    const goToNextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setSlideDirection('left');
            setCurrentSlide((prev) => prev + 1);
        } else {
            onClose();
            setCurrentSlide(0);
        }
    };
    const goToPrevSlide = () => {
        if (currentSlide > 0) {
            setSlideDirection('right');
            setCurrentSlide((prev) => prev - 1);
        }
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => goToNextSlide(),
        onSwipedRight: () => goToPrevSlide(),
        trackMouse: false,
    });
    useEffect(() => {
        const timer = setTimeout(() => {
            setSlideDirection(null);
        }, 300);

        return () => clearTimeout(timer);
    }, [currentSlide]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const slides: SlideContent[] = [
        {
            title: 'Выигрывай призы',
            image: first,
            customTitle: (
                <div className="flex flex-col text-center">
                    <p className="font-inter text-[24.75px] font-bold leading-[32px]">
                        <span className="bg-[#DF12A7] px-[2px]">Выиграй</span> один из десятка
                        <br />
                        призов от нашей <span className="bg-[#DF12A7] px-[2px] py-[2px]">рулетки</span>
                    </p>
                    <p className="font-proxima opacity-70 text-[10px] font-bold leading-[12px] mt-2">
                        500₽, 5000₽ и целых 30000₽
                    </p>
                    <div className="relative mx-auto">
                        <p className="font-inter font-bold text-[16px] leading-[19px] text-[#E100A8] opacity-58 blur-[33px] absolute top-0 left-0">
                            Также супер приз IPhone 16 Pro!
                        </p>
                        <p className="font-inter font-bold text-[16px] leading-[19px] text-[#E100A8] mt-1 relative">
                            Также супер приз IPhone 16 Pro!
                        </p>
                    </div>
                </div>
            ),
        },
        {
            title: 'Приглашай друзей',
            image: second,
            customTitle: (
                <div className="flex flex-col text-center">
                    <p className="font-inter text-[20.75px] font-bold leading-[30px]">
                        <span className="bg-[#DF12A7] px-[2px] py-[1px]">Приглашай друзей,</span> получай вращения{' '}
                        <br />
                        За каждого друга получишь по <br />1 бесплатному{' '}
                        <span className="bg-[#DF12A7] px-[2px] py-[1px]">вращению</span> <br />
                        Чем больше друзей, тем больше <br />
                        <span className="bg-[#DF12A7] px-[2px] py-[1px]">шанс выиграть</span> призы
                    </p>
                </div>
            ),
        },
        {
            title: 'Выполняй задания',
            image: third,
            customTitle: (
                <div className="flex flex-col text-center">
                    <p className="font-inter text-[18px] font-bold leading-[30px]">
                        <span className="bg-[#DF12A7] px-[2px] py-[1px]">Выполняй задания,</span> получай вращения{' '}
                        <br />
                        Куча разных легких заданий, и <br />
                        за <span className="bg-[#DF12A7] px-[2px] py-[1px]">каждое</span> ценные награды <br />
                        Оформи карту и получи <span className="bg-[#DF12A7] px-[2px] py-[1px]"> 1000₽ </span>
                        <br />
                    </p>
                </div>
            ),
        },
        {
            title: 'Призы',
            image: fourth,
            customTitle: (
                <div className="flex flex-col text-center">
                    <p className="font-inter text-[18.75px] font-bold leading-[30px]">
                        Еще <span className="bg-[#DF12A7] px-[2px] py-[1px]"> больше</span> подарков и контента <br />
                        Наша рулетка лучшая и <br />
                        честная в Telegram <br />
                        Крути, выводи купоны, зови <span className="bg-[#DF12A7] px-[2px] py-[1px]"> друзей</span>
                        <br />
                    </p>
                </div>
            ),
        },
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#151515] z-[80]">
            <div className="h-full flex flex-col relative" {...handlers}>
                <div
                    className="absolute left-0 right-0 top-0 pointer-events-none"
                    style={{
                        height: '100px',
                        background: `linear-gradient(
                            to bottom,
                            rgba(225, 0, 168, 0.1) 0%,
                            rgba(225, 0, 168, 0) 70%
                        )`,
                    }}
                />
                
                <div className="absolute left-1/2 -translate-x-1/2 -top-4 z-20">
                    <div className="relative w-40 h-40">
                        <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                </div>
                
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-20 w-12 h-12 flex items-center justify-center  text-white/60"
                >
                    <X className='font-bold' />
                </button>
                
                <div className="absolute top-[30%] left-0 right-0 z-10">
                    <img src={stars} alt="Stars" className="w-full h-auto object-contain" />
                </div>
                
                <div className="pt-28">
                    <div className="h-[170px] flex items-center justify-center">
                        <div
                            className={`w-full transition-transform duration-300 ease-in-out ${
                                slideDirection === 'left' ? 'translate-x-[-100%]' :
                                    slideDirection === 'right' ? 'translate-x-[100%]' : ''
                            }`}
                        >
                            {slides[currentSlide].customTitle}
                        </div>
                    </div>
                </div>
                
                <div className="relative flex-1 overflow-hidden mt-4">
                    <div
                        className={`absolute inset-x-0 mt-4 px-4 transition-transform duration-300 ease-in-out ${
                            slideDirection === 'left' ? 'translate-x-[-100%]' :
                                slideDirection === 'right' ? 'translate-x-[100%]' : ''
                        }`}
                    >
                        <img
                            src={slides[currentSlide].image}
                            alt={slides[currentSlide].title}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div
                        className="absolute inset-x-0 bottom-0 pointer-events-none"
                        style={{
                            height: '25%',
                            background: `linear-gradient(
                                to top,
                                rgba(21, 21, 21, 1) 0%,
                                rgba(21, 21, 21, 0.7) 40%,
                                rgba(21, 21, 21, 0) 100%
                            )`,
                        }}
                    />
                </div>
                
                <div className="p-6 bg-[#151515] relative">
                    <div
                        className="absolute left-0 right-0 bottom-0 pointer-events-none"
                        style={{
                            height: '300px',
                            background: `linear-gradient(
                                to top,
                                rgba(225, 1, 168, 0.1) 0%,
                                rgba(225, 1, 168, 0) 100%
                            )`,
                        }}
                    />
                    
                    <div className="flex items-center justify-between gap-4 relative z-10">
                        <button
                            onClick={goToPrevSlide}
                            disabled={currentSlide === 0}
                            className="p-3 rounded-full bg-gradient-to-b from-[#E204A9] to-[#FE5FD6] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        
                        <div className="flex gap-3">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-2 h-2 rounded-full transition-colors ${
                                        currentSlide === index
                                            ? 'bg-gradient-to-b from-[#E204A9] to-[#FE5FD6]'
                                            : 'bg-white/20'
                                    }`}
                                />
                            ))}
                        </div>
                        
                        <button
                            onClick={goToNextSlide}
                            className="p-3 rounded-full bg-gradient-to-b from-[#E204A9] to-[#FE5FD6]"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorialModal;
