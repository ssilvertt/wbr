import { authenticateUserFx } from '@/entities/user/model';
import WebApp from '@twa-dev/sdk'
export const initializeApp = async () => {
    try {
        await authenticateUserFx(WebApp.initData);
    } catch (error) {
        console.error('Failed to initialize app:', error);
    }
};
