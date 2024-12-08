import type { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Roulette from '@/assets/svg/roulette.svg?react'
import Friends from '@/assets/svg/friends.svg?react'
import Tasks from '@/assets/svg/tasks.svg?react'

interface NavItemProps {
    to: string;
    Icon: FC<{ className?: string }>;
    label: string;
    iconSize: string;
}

const NavItem = ({ to, Icon, label, iconSize }: NavItemProps) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex flex-col items-center rounded-xl px-4 pt-[6px] pb-1 w-[98px] ${
                    isActive ? 'bg-[#EC11F1]' : ''
                }`
            }
        >
            <div className="h-[23px] flex items-center">
                <Icon
                    className={`${iconSize} ${isActive ? 'text-white' : 'text-[#F7F7F7]/40'}`}
                />
            </div>
            <span className={`text-xs mt-1 ${isActive ? 'text-white' : 'text-white/40'}`}>
                {label}
            </span>
        </NavLink>
    );
};

const BottomNavigation = () => {
    const location = useLocation();
    const isRoulettePage = location.pathname === '/';
    
    const navItems = [
        {
            to: '/',
            Icon: Roulette,
            label: 'Рулетка',
            iconSize: 'w-[23px] h-[22.99px]'
        },
        {
            to: '/profile',
            Icon: Friends,
            label: 'Друзья',
            iconSize: 'w-[21.96px] h-[22.4px]'
        },
        {
            to: '/tasks',
            Icon: Tasks,
            label: 'Задания',
            iconSize: 'w-[20.25px] h-[22.5px]'
        }
    ];
    
    return (
        <div
            className={`fixed bottom-0 font-proxima font-bold rounded-t-xl left-0 right-0 border-t px-4 pt-2 pb-3 z-50 ${
                isRoulettePage ? 'bg-[#4E4E4E]/15 backdrop-blur-xl border-[#6C3661]' : 'bg-[#151515] border-[#353537]'
            }`}
        >
            <div className="flex justify-around items-center">
                {navItems.map((item) => (
                    <NavItem
                        key={item.to}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
};

export default BottomNavigation;