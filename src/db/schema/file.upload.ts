import { model, Schema, connection } from 'mongoose';

import autoIncrement from 'mongoose-auto-increment';
autoIncrement.initialize(connection);

interface fileUpload {
    CUS_ID: string;
    CUS_SEQ: number;
    FILE_NAME: string;
    FILE_PATH: string;
    FILE_NAME_UUID: string;
    REG_USER_ID: number;
    REG_DATE: Date;
}

const fileUploadSchema: Schema = new Schema({
    CUS_ID: { type: String, required: true },
    CUS_SEQ: { type: Number, unique: true },
    FILE_NAME: { type: String, required: true, trim: true },
    FILE_PATH: { type: String, required: true, trim: true },
    FILE_NAME_UUID: { type: String, required: true },
    REG_USER_ID: { type: Number, required: true},
    REG_DATE: { type: Date, default: Date.now }
});

fileUploadSchema.plugin(autoIncrement.plugin, {
    model: 'fileUpload',
    field: 'CUS_SEQ',
    startAt: 1,
    increment: 1,
});

const FileUploadSchema = model('fileUpload', fileUploadSchema);

export { FileUploadSchema, fileUpload };
