export interface AppRoute {
    path: string;
    element: React.ReactNode;
    authRequired?: boolean;
    title?: string;
}