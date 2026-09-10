export interface AttachmentEditorModel {
    attachmentGuidID: string;
    fileName: string;
    fileSize: number;
    attachmentID: number;
    mimeType: string;
}

export interface UploadFileModel {

    attachmentGuidID: string;
    fileName: string;
    fileSize: number;
    contentType: string;
    attachmentID: number;
    mimeType: string;
    typeID: number;

}


export interface DownloadViewModel {

    title: string;
    base64String: string;
    mimeType: string;
}


export interface UploadFileViewModel {

    attachmentID: number;
    attachmentGuidID: string;
    mimeType: string;
    typeID: number;
}
