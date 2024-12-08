import { Routes, Route, useLocation } from 'react-router-dom';
import { routes } from './routes';
import { PageLayout } from '@/layouts/PageLayout';
import { AnimatePresence } from 'framer-motion';

export const Router = () => {
    const location = useLocation();
    
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {routes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <PageLayout>
                                {route.element}
                            </PageLayout>
                        }
                    />
                ))}
            </Routes>
        </AnimatePresence>
    );
};