export interface Process {
    pid: number;
    cpu: number;
    mem: number;
    user: string;
    command: string;
}