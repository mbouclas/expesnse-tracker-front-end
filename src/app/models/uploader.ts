export interface IBaseUploaderSettings {
    usePreviews?: boolean;
    multiple?: boolean;
    accept?: string;
    disabled?: boolean;
    expandable?: boolean;
    disableClick?: boolean;
    dropLabel?: string;
    id?: string;
    maxFileSize?: number;
    maxNumberOfFiles?: number;
    autoStart?: boolean;
    showTextFields?: boolean;
    showClearAll?: boolean;
    async: boolean;
}
export interface IImageUploaderSettings extends IBaseUploaderSettings{
    imageType: string;
}
