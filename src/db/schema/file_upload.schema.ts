import { model, Schema } from 'mongoose';

interface fileUpload {
    fileName: string;
    filePath: string;
    fileNameUuid: string;
    regUser: number;
    regDate: Date;
}

const fileUploadSchema: Schema = new Schema({
    fileName: { type: String, required: true, trim: true },
    filePath: { type: String, required: true, trim: true },
    fileNameUuid: { type: String, required: true },
    regUser: { type: Number, required: true },
    regDate: { type: Date, default: Date.now },
});

const FileUploadSchema = model('fileUpload', fileUploadSchema);

export { FileUploadSchema, fileUpload };
