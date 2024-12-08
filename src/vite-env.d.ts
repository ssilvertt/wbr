/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare global {
    interface Window {
        Telegram: any;
    }
}

export {}