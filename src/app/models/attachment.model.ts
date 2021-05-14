export interface IAttachment {
    id: number
    expenseId: number
    userId: number
    url: string
    attachment_type: string
    created_at: Date
    updated_at: Date
    preview?: string;
}

export class AttachmentModel implements IAttachment {
    attachment_type: string;
    created_at: Date;
    expenseId: number;
    id: number;
    updated_at: Date;
    url: string;
    userId: number;
    preview: string;
}
