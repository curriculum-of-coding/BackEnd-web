import { model, Schema } from 'mongoose';

interface freeBoardComment {
    PARENT_ID: number;
    COMMENT: string;
    REG_USER_ID: number;
    REG_DATE: string;
    BFB_ID: number;
}

const freeBoardCommentSchema: Schema = new Schema({
    PARENT_ID: { type: Number, default: null },
    COMMENT: { type: String, default: null, maxLength: 1000 },
    REG_USER_ID: { type: Number, required: true },
    REG_DATE: { type: Date, default: Date.now },
    BFB_ID: { type: Number, required: true },
});

const FreeBoardCommentSchema = model('freeboard_comment', freeBoardCommentSchema);

export { FreeBoardCommentSchema, freeBoardComment };
