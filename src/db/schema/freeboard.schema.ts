import { model, Schema } from 'mongoose';
import { domainTypes } from './boardWrap.schema';

interface freeboard {
    title: string;
    content: string;
    comments: Array<string>;
    likes: Array<string>;
    regUser: string;
    regDate: Date;
}

const freeBoardSchema: Schema = new Schema({
    title: { type: String, default: null, maxLength: 150 },
    content: { type: String, default: null, maxLength: 4000 },
    comments: { type: [Schema.Types.ObjectId], default: null },
    likes: { type: [Schema.Types.ObjectId], default: null },
    regUser: { type: Schema.Types.ObjectId, required: false },
    regDate: { type: Date, default: Date.now },
    type: { type: String, default: null, enum: domainTypes },
});
freeBoardSchema.index({ TITLE: 1 });

const FreeBoardSchema = model('freeboard', freeBoardSchema);

export { FreeBoardSchema, freeboard };
