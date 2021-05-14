import {BehaviorSubject} from 'rxjs';
import {store} from '../state/app.state';




const {subscribe,getState} = store;
export function SelectSnapshot<T>(rawSelector?: T, ...paths: string[]): PropertyDecorator {
    return function(target, key): void {
        // @ts-ignore
        let obs = new BehaviorSubject(getState()[rawSelector]);
        const name: string = key.toString();
        const selectorId = `__${name}__selector`;
        Object.defineProperties(target, {
            [selectorId]: {
                writable: true,
                enumerable: false,
                configurable: true
            },
            [name]: {
                enumerable: true,
                configurable: true,
                get(): any {
                    // @ts-ignore
                    return this[selectorId] || (this[selectorId] = getState()[rawSelector]);
                }
            }
        });
    }
}
