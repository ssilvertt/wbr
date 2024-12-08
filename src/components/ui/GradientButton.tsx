import { memo } from 'react';

interface GradientButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    className?: string;
}

const GradientButton = memo(({ onClick, children, variant = 'primary', className = '' }: GradientButtonProps) => {
    const gradientClasses = {
        primary: "bg-gradient-to-t from-transparent from-70% to-[#F03AC2]",
        secondary: "bg-gradient-to-t from-transparent from-70% to-[#1F1F22]"
    };
    
    const innerClasses = {
        primary: "bg-gradient-to-b from-[#E204A9] to-[#FE5FD6]",
        secondary: "bg-[#151517]"
    };
    
    return (
        <button
            onClick={onClick}
            className={`p-px ${gradientClasses[variant]} rounded-[12.17px] active:scale-95 transition-transform touch-manipulation ${className}`}
        >
            <div className={`flex items-center gap-x-1 ${innerClasses[variant]} w-[162px] justify-center h-[44px] rounded-[12px]`}>
                {children}
            </div>
        </button>
    );
});

GradientButton.displayName = 'GradientButton';

export default GradientButton;