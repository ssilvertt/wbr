import topglow from '@/assets/friends/topglow.png';
import Question from '@/assets/svg/question.svg?react';
import Avatar from '@/assets/svg/avatar.svg?react';
import { type Task } from '@/entities/tasks/tasks.ts';
import { baseAPI } from '@/shared/api/base.ts';
import WebApp from '@twa-dev/sdk';
import { useEffect, useRef, useState } from 'react';
import Tick from '@/assets/svg/tick.svg?react';
import { motion } from 'framer-motion';
import image from '@/assets/tasks/image.webp';
import { useLocation } from 'react-router-dom';

export const mockTasks: Task[] = [
    {
        task_id: 'task_subscribe_to_main_channel',
        is_visible: false,
        status: 'not_completed',
        subscribe_to_channel_payload: {
            channel_id: '-1002283035227',
            link: 'https://t.me/+rU31WE06RPE2M2Vi',
            award_spins_amount: 0,
        },
    },
    {
        task_id: 'task_3',
        is_visible: true,
        status: 'completed',
        subscribe_to_channel_payload: {
            channel_id: '-1002348786260',
            link: 'https://t.me/+gfNc1TW2_IAxNzNi',
            award_spins_amount: 1,
        },
    },
    {
        task_id: 'task_2',
        is_visible: true,
        status: 'not_completed',
        subscribe_to_channel_payload: {
            channel_id: '-1002350533858',
            link: 'https://t.me/+561LUJeeWptmN2My',
            award_spins_amount: 1,
        },
    },
    {
        task_id: 'task_1',
        is_visible: true,
        status: 'not_completed',
        subscribe_to_channel_payload: {
            channel_id: '-1002418784718',
            link: 'https://t.me/+a8Tx76_fOStkOWYy',
            award_spins_amount: 1,
        },
    },
    {
        task_id: 'task_4',
        is_visible: true,
        status: 'not_completed',
        subscribe_to_channel_payload: {
            channel_id: '-1002363725135',
            link: 'https://t.me/+n8v1ADGRNethNDNi',
            award_spins_amount: 1,
        },
    },
];
const TaskButton = ({ onClick }: { onClick: () => void }) => (
    <motion.button
        className="p-px bg-gradient-to-t from-transparent from-70% to-[#F03AC2] rounded-xl"
        onClick={onClick}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.1 }}
    >
        <div className="flex items-center gap-x-1 bg-gradient-to-b from-[#E204A9] to-[#FE5FD6] px-4 h-8 rounded-xl">
            <p className="font-bold text-xs leading-[110%] tracking-[-2%] whitespace-nowrap">Перейти</p>
        </div>
    </motion.button>
);

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const checkingTaskId = useRef<string | null>(null);
    const location = useLocation();
    useEffect(() => {
        WebApp.setHeaderColor('#221423');
    }, [location]);
    useEffect(() => {
        fetchTasks();

        const interval = setInterval(async () => {
            if (checkingTaskId.current) {
                await baseAPI.post(`task/request_task_checking/${checkingTaskId.current}`);
                const { data } = await baseAPI.get<Task[]>('task/get_tasks_with_status');
                const tasks = data.filter((task) => task.is_visible);
                setTasks(tasks);

                const checkedTask = tasks.find((task) => task.task_id === checkingTaskId.current);
                if (checkedTask?.status === 'completed') {
                    checkingTaskId.current = null;
                }
            } else {
                fetchTasks();
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const fetchTasks = async () => {
        try {
            const { data } = await baseAPI.get<Task[]>('task/get_tasks_with_status');
            setTasks(data.filter((task) => task.is_visible));
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleTaskClick = async (task: Task) => {
        try {
            checkingTaskId.current = task.task_id;

            // Делаем первую проверку
            await baseAPI.post(`task/request_task_checking/${task.task_id}`);
            await fetchTasks();

            // Открываем ссылку на канал
            WebApp.openTelegramLink(task.subscribe_to_channel_payload.link);
        } catch (error) {
            console.error('Error handling task:', error);
        }
    };

    return (
        <div className="w-full relative min-h-screen font-proxima text-white bg-[#151517]">
            <div className="relative z-10">
                <div className="relative h-[110px] border border-[#202023] rounded-b-3xl flex flex-col items-center justify-center overflow-hidden">
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
                        <p className="text-[32.14px] font-bold leading-[110%] tracking-[-2%]">Задания</p>
                        <p className="text-[10.71px] leading-[110%] tracking-[-2%] opacity-50 mt-1">
                            Выполняй щалания и получай вращение
                        </p>
                    </div>
                </div>

                <div className=" border px-5 py-4 flex flex-col border-[#202023] mt-5 rounded-[24px]">
                    <div className="flex items-center justify-between">
                        <p className="text-[20px] font-bold leading-[24px]">Карта от партнера</p>
                        <Question />
                    </div>
                    <p className="text-[12px] leading-[15px] opacity-20 font-normal">
                        Оформи банковскую карту по ссылке и получи <br />
                        деньги на покупки в маркетплейсах и т.п
                    </p>
                    <div className=" bg-[#1D1D20] border-[0.89px] border-[#202023] rounded-[21.44px] flex flex-col mt-1">
                        <div className="flex flex-row justify-center mt-3 gap-x-3">
                            <img src={image} alt="Bank logo" className="w-[51.66px] h-[66px]" />
                            <div className="flex flex-col">
                                <p className="text-[20px] font-bold leading-[24px] mt-1">Получи 1000₽ на WB</p>
                                <p className="text-[12px] leading-[15px] opacity-20 mt-2">
                                    Закажи карту прямо сейчас <br />
                                    от партнера по кнопке ниже
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-center w-full px-[37px]">
                            <button
                                className="w-full p-px bg-gradient-to-t from-transparent from-70% to-[#F03AC2] rounded-[12.17px] mt-3"
                                onClick={() => WebApp.openLink('https://rfnd.io/t/5a3wt/?pid=1859&erid=2SDnjc4Ty9t')}
                            >
                                <div className="flex items-center gap-x-1 bg-gradient-to-b from-[#E204A9] to-[#FE5FD6] w-full justify-center h-[44px] rounded-[12px]">
                                    <p className="font-bold text-[17px] leading-[110%] tracking-[-2%]">
                                        Оформить карту
                                    </p>
                                </div>
                            </button>
                        </div>
                        <div className="justify-center flex">
                            <p className="opacity-10 text-[7.2px] leading-[9px]">
                                Реклама АО «Банк ГПБ» ИНН 7744001497
                            </p>
                        </div>
                    </div>
                </div>
                <div className="rounded-t-[24px] border-t border-[#202023] mt-5 h-[430px] px-5">
                    <p className="text-[20px] font-bold leading-[24px] mt-3">Задания</p>
                    <div className="flex flex-col gap-y-2 mt-2">
                        {tasks.map((task) => (
                            <div
                                key={task.task_id}
                                className="relative border-[0.68px] border-[#202023] rounded-[16.34px] h-[55px] flex items-center justify-between px-4"
                            >
                                <div className="flex items-center gap-x-3">
                                    <div className="relative w-12 h-12">
                                        <div
                                            className={`absolute -top-4 -left-4 ${task.status === 'completed' ? 'grayscale' : ''}`}
                                        >
                                            <Avatar />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[13px] font-bold leading-[16px]">Подпишись на канал</p>
                                        <p className="text-[11px] leading-[11px] opacity-50">
                                            +{task.subscribe_to_channel_payload.award_spins_amount} Вращение
                                        </p>
                                    </div>
                                </div>
                                {task.status === 'completed' ? (
                                    <div className="grayscale mr-3">
                                        <Tick />
                                    </div>
                                ) : (
                                    <TaskButton onClick={() => handleTaskClick(task)} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
