export {};

declare global {
    interface Window {
        logEvent: (name: string, data?: Record<string, any>) => void;
    }
}
