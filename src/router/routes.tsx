import { lazy, Suspense } from 'react';
import { PageLoader } from '@/components/ui/PageLoader';
import { AppRoute } from '@/types/route';

const RoulettePage = lazy(() => import('@/pages/Roulette'));
const FriendsPage = lazy(() => import('@/pages/Friends'));
const TasksPage = lazy(() => import('@/pages/Tasks'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));
const CouponsPage = lazy(() => import('@/pages/Coupons'));

const withSuspense = (Component: React.ComponentType) => (
    <Suspense fallback={<PageLoader />}>
<Component />
</Suspense>
);

export const routes: AppRoute[] = [
    {
        path: '/',
        element: withSuspense(RoulettePage),
        title: 'Рулетка'
    },
    {
        path: '/profile',
        element: withSuspense(FriendsPage),
        title: 'Друзья',
        authRequired: true
    },
    {
        path: '/tasks',
        element: withSuspense(TasksPage),
        title: 'Задания',
        authRequired: true
    },
    {
        path: '/coupons',
        element: withSuspense(CouponsPage),
        title: 'Купоны',
        authRequired: true
    },
    {
        path: '*',
        element: withSuspense(NotFoundPage),
        title: '404'
    }
];