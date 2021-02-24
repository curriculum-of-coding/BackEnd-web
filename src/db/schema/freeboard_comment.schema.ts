import { model, Schema } from 'mongoose';

interface freeBoardComment {
    childs: Array<string>;
    comment: string;
    regUser: number;
    regDate: string;
}

const freeBoardCommentSchema: Schema = new Schema({
    childs: { type: [Schema.Types.ObjectId], default: null },
    comment: { type: String, default: null, maxLength: 1000 },
    regUser: { type: Schema.Types.ObjectId, required: true },
    regDate: { type: Date, default: Date.now },
});

const FreeBoardCommentSchema = model('freeboard_comment', freeBoardCommentSchema);

export { FreeBoardCommentSchema, freeBoardComment };
