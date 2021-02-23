import { Schema, model } from 'mongoose';

interface notice {
    title: string;
    noticeType: string;
    content: string;
    regUser: string;
    regDate: Date;
}

const noticeTypes = [''];

const noticeSchema: Schema = new Schema({
    title: { type: String, default: null, maxLength: 1000 },
    noticeType: { type: String, enum: noticeTypes },
    content: { type: String, maxLength: 4000 },
    regUser: { type: Schema.Types.ObjectId, ref: 'userInfo' },
    regDate: { type: Date, default: Date.now() },
});

const NoticeSchema = model('notice', noticeSchema);

export { NoticeSchema, notice };
