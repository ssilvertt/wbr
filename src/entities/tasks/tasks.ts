import WebApp from '@twa-dev/sdk';
import { createStore, createEffect, createEvent, sample } from 'effector';
import { baseAPI } from '@/shared/api/base.ts';

export type TaskStatus = 'checking' | 'completed' | 'not_completed';

export type Task = {
    task_id: string;
    is_visible: boolean;
    status: TaskStatus;
    subscribe_to_channel_payload: {
        channel_id: string;
        link: string;
        award_spins_amount: number;
    };
};

// Effects
export const fetchTasksFx = createEffect(async () => {
    const { data } = await baseAPI.get<Task[]>('task/get_tasks_with_status');
    return data;
});

export const checkTaskFx = createEffect(async (taskId: string) => {
    const { data } = await baseAPI.post<boolean>(`task/request_task_checking/${taskId}`);
    return data;
});

// Events
export const startPolling = createEvent<string>();
export const stopPolling = createEvent();
export const appBecameVisible = createEvent();
export const appBecameHidden = createEvent();

// Stores
export const $currentCheckingTaskId = createStore<string | null>(null)
    .on(startPolling, (_, taskId) => taskId)
    .on(stopPolling, () => null);

export const $isAppVisible = createStore(true)
    .on(appBecameVisible, () => true)
    .on(appBecameHidden, () => false);

export const $tasks = createStore<Task[]>([])
    .on(fetchTasksFx.doneData, (_, tasks) => tasks.filter(task => task.is_visible));

// Polling logic
let pollingInterval: ReturnType<typeof setInterval> | null = null;

// Start polling when checkTaskFx succeeds
sample({
    clock: checkTaskFx.doneData,
    source: $currentCheckingTaskId,
    filter: Boolean,
    fn: (taskId) => {
        fetchTasksFx();
        return taskId;
    },
    target: startPolling,
});

// Fetch tasks when app becomes visible
sample({
    clock: appBecameVisible,
    target: fetchTasksFx,
});

// Setup polling interval
startPolling.watch((taskId) => {
    if (pollingInterval) {
        clearInterval(pollingInterval);
    }
    
    pollingInterval = setInterval(() => {
        const currentTaskId = $currentCheckingTaskId.getState();
        const isVisible = $isAppVisible.getState();
        
        if (currentTaskId === taskId && isVisible) {
            fetchTasksFx();
        }
    }, 3000);
});

// Watch for task completion
$tasks.watch((tasks) => {
    const checkingTaskId = $currentCheckingTaskId.getState();
    if (!checkingTaskId) return;
    
    const task = tasks.find(t => t.task_id === checkingTaskId);
    if (task && (task.status === 'completed' || task.status === 'not_completed')) {
        stopPolling();
    }
});

// Cleanup polling on stop
stopPolling.watch(() => {
    if (pollingInterval) {
        clearInterval(pollingInterval);
        pollingInterval = null;
    }
});

// Handle Telegram WebApp visibility events
WebApp.onEvent('viewportChanged', () => {
    if (WebApp.isExpanded) {
        appBecameVisible();
    } else {
        appBecameHidden();
    }
});