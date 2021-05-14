import {environment} from '../../environments/environment';

export function debug(payload: any) {
    if (environment.production) {return;}

    console.log(payload);
}
