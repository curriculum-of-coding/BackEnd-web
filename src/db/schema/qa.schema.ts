import { model, Schema } from 'mongoose';

interface QA {
    PARENT_ID: number;
    TITLE: string;
    CONTENT: string;
    REG_USER_ID: number;
    REG_DATE: Date;
}

const _QASchema: Schema = new Schema({
    PARENT_ID: { type: Number, default: null },
    TITLE: { type: String, default: null, maxLength: 150 },
    CONTENT: { type: String, default: null, maxLength: 4000 },
    REG_USER_ID: { type: Number, required: true },
    REG_DATE: { type: Date, default: Date.now },
});
_QASchema.index({ TITLE: 1 });

const QASchema = model('QA', _QASchema);

export { QASchema, QA };
