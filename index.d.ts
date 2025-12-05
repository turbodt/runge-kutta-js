export declare class ButcherTableau {
    readonly order: number;
    a: Float64Array[];
    b: Float64Array;
    c: Float64Array;
    protected data: Float64Array;
    constructor(order: number);
    toString(): string;
    makeItConsistent(): ButcherTableau;
}

declare type ODEFunction = (t: number, x: Float64Array) => Float64Array;

export declare const rkdp45ButcherTableau: ButcherTableau;

export declare class RungeKutta {
    protected butcherTableau: ButcherTableau;
    f: ODEFunction;
    constructor(butcherTableau: ButcherTableau, f: ODEFunction);
    get order(): number;
    stepInto(h: number, t: number, x: Float64Array, xNew: Float64Array): RungeKutta;
    step(h: number, t: number, x: Float64Array): Float64Array;
    stepsInto(n: number, h: number, t: number, x: Float64Array, xNew: Float64Array): RungeKutta;
    steps(n: number, h: number, t: number, x: Float64Array): Float64Array;
    private k;
}

export { }
