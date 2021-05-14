// export declare function Dispatch(options?: DispatchOptions): PropertyDecorator;
export interface DispatchOptions {
    cancelUncompleted?: boolean;
}

export function Dispatch(
    options: DispatchOptions = { cancelUncompleted: false }
): PropertyDecorator {
    return (
        target: any,
        propertyKey: string | symbol,
        descriptor?: TypedPropertyDescriptor<Function>
    ) => {
        let originalValue: Function = null!;
        console.log(target[propertyKey], propertyKey, descriptor)
    }
}
