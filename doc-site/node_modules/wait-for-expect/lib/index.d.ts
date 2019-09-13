declare const _default: ((expectation: () => void, timeout?: number, interval?: number) => Promise<{}>) & {
    defaults: {
        timeout: number;
        interval: number;
    };
};
export default _default;
