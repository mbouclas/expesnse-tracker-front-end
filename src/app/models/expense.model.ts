import {IUser} from '../user/user.service';
import {IAttachment} from './attachment.model';
import {IExpenseType} from './expense-type.model';
import {IVendor} from './vendor.model';

export interface IExpense {
    id: number;
    title: string;
    userId: number;
    vendorId: number | null;
    expenseTypeId: number;
    price: number;
    created_at: Date;
    updated_at: Date;
    attachments?: IAttachment[];
    user?: IUser;
    expenseTypes?: IExpenseType[];
    vendor?: IVendor;
    purchased_at: Date;
}

export class ExpenseModel implements IExpense {
    created_at: Date;
    expenseTypeId: number;
    id: number;
    price: number;
    title: string;
    updated_at: Date;
    userId: number;
    vendorId: number | null;
    purchased_at = new Date();
    expenseTypes: IExpenseType[] = [];
    attachments?: IAttachment[] = [];
}
