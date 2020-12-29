export interface FileData {
    previewUrl: string;
    rawFile: File;
    validationErrors: string[];
    fileID: string;
    fileName: string;
}

export const DefaultMaxFileSize = 15728640;
export const DefaultExpectedFileTypes: string[] = ['jpg', 'jpeg', 'pdf', 'png', 'svg', 'bmp'];

export const FileSize = {
    $2Mb: 2097152,
    $10Mb: 10485760
};

export enum FileType {
    All = 0,
    Image = 1
}
