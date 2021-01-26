import { model, Schema } from 'mongoose';

interface fileUpload {
    CUS_ID: string;
    CUS_SEQ: number;
    FILE_NAME: string;
    FILE_PATH: string;
    FILE_NAME_UUID?: number;
    REG_USER_ID: string;
    REG_DATE: Date;
}

const fileUploadSchema: Schema = new Schema({
    CUS_ID: { type: String, required: true, unique: true },
    CUS_SEQ: { type: Number, required: true, unique: true },
    FILE_NAME: { type: String, required: true, lowercase: true, trim: true },
    FILE_PATH: { type: String, required: true, lowercase: true, trim: true},
    FILE_NAME_UUID: { type: Number, default: 1, min: 0, max: 250 },
    REG_USER_ID: { type: String, required: true, unique: true },
    REG_DATE: { type: Date, default: Date.now },
});

const FileUploadSchema = model('fileUpload', fileUploadSchema);

export { fileUploadSchema, fileUpload };
