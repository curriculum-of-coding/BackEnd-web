import { model, Schema } from 'mongoose';

interface QA {
    title: string;
    content: string;
    regUser: number;
    regDate: Date;
}

const _QASchema: Schema = new Schema({
    title: { type: String, default: null, maxLength: 150 },
    content: { type: String, default: null, maxLength: 4000 },
    regUser: { type: Schema.Types.ObjectId, required: true },
    regDate: { type: Date, default: Date.now },
});
_QASchema.index({ TITLE: 1 });

const QASchema = model('QA', _QASchema);

export { QASchema, QA };
