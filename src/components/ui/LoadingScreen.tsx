import { fetchAvailableSpinsFx } from '@/entities/spins/model.ts';
import { fetchTasksFx } from '@/entities/tasks/tasks.ts';
import { fetchReferralsCountFx, fetchSpinsHistoryFx } from '@/entities/user-stats/model.ts';
import { baseAPI } from '@/shared/api/base.ts';
import { delay } from '@/shared/lib/wheel/wheelservice.ts';
import WebApp from '@twa-dev/sdk';
import { createEvent, createStore } from 'effector';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/loadingscreen/LoadingLogo.webp';
import wheel from '@/assets/loadingscreen/wheel4tc.webp';
import mainglow from '@/assets/loadingscreen/mainglowc.webp'
import bottomglow from '@/assets/loadingscreen/bottomglowc.webp'
import sidesglow from '@/assets/loadingscreen/sidesglow.webp'
import whiteround from '@/assets/loadingscreen/whiteround.webp'
import barright from '@/assets/loadingscreen/barrightc.webp'
import barleft from '@/assets/loadingscreen/barleftc.webp'
import barmiddle from '@/assets/loadingscreen/barmiddlec.webp'

interface LoadingScreenProps {
    onLoadingComplete?: () => void;
    duration?: number;
}

export const setFriendsAwardStatus = createEvent<boolean>();
export const $friendsAwardStatus = createStore<boolean | null>(null)
    .on(setFriendsAwardStatus, (_, status) => status);


export const LoadingScreen = ({ onLoadingComplete, duration = 2000 }: LoadingScreenProps) => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const MIN_LOADING_TIME = 4000;
    
    useEffect(() => {
        WebApp.setHeaderColor('#211420');
    }, []);
    useEffect(() => {
        const loadInitialData = async () => {
            const startTime = Date.now();
            
            try {
                setProgress(10);
                
                await Promise.all([
                    fetchAvailableSpinsFx(),
                    fetchTasksFx(),
                    fetchReferralsCountFx(),
                    fetchSpinsHistoryFx(),
                    baseAPI.post('/prize/am_i_awarded_for_3_friends').then(({ data }) => {
                        setFriendsAwardStatus(data);
                    }),
                    new Promise(resolve => {
                        let currentProgress = 10;
                        const interval = setInterval(() => {
                            if (currentProgress < 90) {
                                currentProgress += 1;
                                setProgress(currentProgress);
                            } else {
                                clearInterval(interval);
                                resolve(true);
                            }
                        }, 40); // Замедлили увеличение прогресса
                    })
                ]);
                
                setProgress(90);
                
                // Проверяем, прошло ли минимальное время
                const elapsedTime = Date.now() - startTime;
                if (elapsedTime < MIN_LOADING_TIME) {
                    await delay(MIN_LOADING_TIME - elapsedTime);
                }
                
                setDataLoaded(true);
                
            } catch (error) {
                console.error('Error loading initial data:', error);
                
                // Даже при ошибке ждем минимальное время
                const elapsedTime = Date.now() - startTime;
                if (elapsedTime < MIN_LOADING_TIME) {
                    await delay(MIN_LOADING_TIME - elapsedTime);
                }
                
                setDataLoaded(true);
            }
        };
        
        loadInitialData();
    }, []);
    
    useEffect(() => {
        const imageUrls = [logo, wheel, mainglow, bottomglow, sidesglow, whiteround, barright, barleft, barmiddle];
        Promise.all(imageUrls.map(url => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = resolve;
                img.onerror = reject;
            });
        }))
            .then(() => setImagesLoaded(true))
            .catch(error => console.error('Error loading images:', error));
    }, []);
    
    useEffect(() => {
        if (!imagesLoaded || !dataLoaded) return;
        
        const startTime = performance.now();
        const endTime = startTime + duration;
        
        const updateProgress = () => {
            const now = Date.now();
            const timeLeft = Math.max(0, endTime - now);
            const newProgress = 100 - (timeLeft / duration) * 100;
            
            if (newProgress >= 100) {
                setProgress(100);
                setTimeout(() => {
                    setIsVisible(false);
                    onLoadingComplete?.();
                }, 300);
            } else {
                setProgress(newProgress);
                requestAnimationFrame(updateProgress);
            }
        };
        
        const animationFrame = requestAnimationFrame(updateProgress);
        return () => cancelAnimationFrame(animationFrame);
    }, [duration, onLoadingComplete, imagesLoaded, dataLoaded]);
    
    if (!imagesLoaded) {
        return <div className="fixed inset-0 bg-[#151515]" />;
    }
    
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-[#151515] flex flex-col items-center overflow-hidden"
                >
                    <div className="w-full h-full relative">
                        <motion.img
                            src={wheel}
                            alt=""
                            className="absolute bottom-[-15%] left-[18%] w-[65vw] z-10"
                            style={{
                                transform: 'translateX(50%)',
                                scale: '3'
                            }}
                            initial={{ opacity: 1, rotate: -180 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                        <motion.img
                            src={mainglow}
                            alt=""
                            className="absolute bottom-[10%] opacity-40 z-10"
                            style={{ transform: 'scale(3)' }}
                            initial={{ opacity: 1, scale: 2.5 }}
                            animate={{ opacity: 1, scale: 3 }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                        />
                        <motion.img
                            src={bottomglow}
                            alt=""
                            className="absolute bottom-[-22%] opacity-10 z-20"
                            style={{ transform: 'scale(1.5) translateX(-2%)' }}
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        />
                        <motion.img
                            src={sidesglow}
                            alt=""
                            className="absolute bottom-[-5%] z-20"
                            style={{ transform: 'scale(1.5) translateX(-2%)' }}
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        />
                        
                        <motion.img
                            src={whiteround}
                            alt=""
                            className="absolute bottom-[-15%] z-30"
                            style={{ transform: 'scale(1.5) translateX(-2%)' }}
                            initial={{ opacity: 1, scale: 1.3 }}
                            animate={{ opacity: 1, scale: 1.5 }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                        />
                        <motion.img
                            src={barright}
                            alt=""
                            className="absolute bottom-[10%] z-30"
                            style={{ transform: 'scale(1.5) translateX(50%)' }}
                            initial={{ opacity: 1, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        />
                        <motion.img
                            src={barleft}
                            alt=""
                            className="absolute bottom-[10%] z-30"
                            style={{ transform: 'scale(1.5) translateX(-40%)' }}
                            initial={{ opacity: 1, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        />
                        <motion.img
                            src={barmiddle}
                            alt=""
                            className="absolute bottom-[10%] z-30"
                            style={{ transform: 'scale(1.5) translateX(40%)' }}
                            initial={{ opacity: 1, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        />
                        
                        <div className="w-full h-full flex flex-col items-center relative z-10">
                            <div className="mt-[3vh]">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="flex translate-x-3"
                                >
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        className="w-full h-full"
                                        style={{ transform: 'scale(1.5) translateX(-3%)' }}
                                    />
                                </motion.div>
                            </div>
                            <div className="w-[80vw] mt-20 relative" style={{ zIndex: 1 }}>
                                <div
                                    className="absolute inset-0 bg-[#151517] rounded-[29px]"
                                    style={{ opacity: 0.4, zIndex: 1 }}
                                />
                                
                                <div className="relative h-[29px] flex items-center" style={{ zIndex: 2 }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ ease: 'easeInOut' }}
                                        className="h-[27px] bg-gradient-to-b from-[#FBC5F7] to-[#F61ACB] rounded-[29px]"
                                        style={{
                                            position: 'absolute',
                                            left: '1px', 
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};