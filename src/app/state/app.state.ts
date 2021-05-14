import create from 'zustand/vanilla';
import {devtools} from 'zustand/middleware';
import {IExpenseType} from '../models/expense-type.model';
import {IBootResult} from '../shared/services/boot.service';
import {IVendor} from '../models/vendor.model';

export interface IAuthUser {
    firstName: string;
    lastName: string;
    token: string;
    refreshToken: string;
    issued: Date;
    expires: Date;
}

export type AppState = {
    user: IAuthUser;
    isHandset: boolean;
    expenseTypes: IExpenseType[];
    vendors: IVendor[];
}

export const store = create<AppState>(devtools(() => ({
    user: null,
    isHandset: false,
    expenseTypes: [],
    vendors: [],
})));

export const AuthStateActions = {
    setUser: (payload: IAuthUser) => store.setState({user: payload}),
    setToken: (token: string) => store.setState({...store.getState(), ...{token}}),
    logout: () => store.setState({user: null}),

}

export const AppStateActions = {
    setIsHandset: (payload: boolean) => store.setState({isHandset: payload}),
    setExpenseTypes: (payload: IExpenseType[]) => store.setState({expenseTypes: payload}),
    setVendors: (payload: IVendor[]) => store.setState({expenseTypes: payload}),
    setBoot: (payload: IBootResult) => store.setState({
        expenseTypes: payload.expenseTypes,
        vendors: payload.vendors,
    }),
}
