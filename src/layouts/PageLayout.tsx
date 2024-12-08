import { ReactNode, useEffect } from 'react';
import BottomNavigation from '@/components/BottomNavigation';
import WebApp from '@twa-dev/sdk'
interface PageLayoutProps {
    children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
    useEffect(() => {
        WebApp.setHeaderColor('#2A1727');
        document.body.style.position = 'fixed';
        document.body.style.overflow = 'hidden';
        console.log(WebApp.initData);
    }, []);
    
    return (
        <div
            className="bg-[#151515] w-full h-full overflow-y-auto overflow-x-hidden overscroll-behavior-none"
            style={{
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'none'
            }}
        >
            {children}
            <BottomNavigation />
        </div>
    );
};