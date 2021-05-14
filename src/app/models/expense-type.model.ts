export interface IExpenseType {
    id: number
    title: string
    created_at?: Date
    updated_at?: Date
}

export class ExpenseTypeModel implements IExpenseType {
    created_at: Date;
    id: number;
    title: string;
    updated_at: Date;

}
