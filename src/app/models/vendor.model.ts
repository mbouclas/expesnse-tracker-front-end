export interface IVendor {
    id: number
    title: string
    vendor_type: string
    created_at: Date
    updated_at: Date
}

export class VendorModel implements IVendor {
    created_at: Date;
    vendor_type: string
    id: number;
    title: string;
    updated_at: Date;
}
