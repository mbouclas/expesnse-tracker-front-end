import {IGenericObject} from '../models/generic';

export function createFilterUrl(url: string, filters: IGenericObject = {}) {
    if (Object.keys(filters).length > 0) {
        url += `?${serialize(filters)}`;
    }
    return url;
}

export function serialize(obj: IGenericObject, prefix?: any): string  {
    let str = [],
        p;
    for (p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + "[" + p + "]" : p,
                v = obj[p];
            str.push((v !== null && typeof v === "object") ?
                serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return str.join("&");
}
