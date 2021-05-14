export interface IRequestResponse {
    success: boolean;
    reason?: string;
}

export interface IGenericObject<T = any> {
    [key: string]: T;
}

export interface BaseModel {

}

export interface IFacet extends BaseModel{
    count: number;
    label: string;
}

export interface IPagination<T = any> {
    total:number;
    limit:number; // num of items to display
    skip?: number; // offset
    page?: number;
    pages?: number;
    facets?: IGenericObject<IFacet[]>
    data: T[];
    totalPrice?: number;
}

export interface IFilterOptions {
    orderBy?: string;
    way?: string;
    limit: number;
    page: number;
    with?: string[];
    [key: string]: any;// Actual filters
}

export interface ISuccessResponse {
    success: boolean;
    reason?: string;
}
