export interface Task {
    abort(): void;
    promise: Promise<void>;
}
export declare function clear_loops(): void;
export declare function loop(fn: (number: any) => void): Task;
