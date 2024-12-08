import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Coupon from '@/assets/svg/coupon.svg?react';
import How from '@/assets/svg/how.svg?react';
import GradientButton from './GradientButton';

interface HeaderButtonsProps {
    onTutorialClick: () => void;
}

export const HeaderButtons = memo(({ onTutorialClick }: HeaderButtonsProps) => {
    const navigate = useNavigate();
    
    return (
        <div className="flex justify-between">
            <GradientButton onClick={() => navigate('/coupons')} variant="primary">
                <Coupon />
                <p className="font-bold text-[16px] leading-[110%] tracking-[-2%]">
                    Мои купоны
                </p>
            </GradientButton>
            
            <GradientButton onClick={onTutorialClick} variant="secondary">
                <How />
                <p className="font-bold text-[16px] leading-[110%] tracking-[-2%]">
                    Как играть?
                </p>
            </GradientButton>
        </div>
    );
});

HeaderButtons.displayName = 'HeaderButtons';