import { model, Schema, connection } from 'mongoose';

import autoIncrement from 'mongoose-auto-increment';
autoIncrement.initialize(connection);

interface backFreeBoardComment {
    BFBC_ID: number;
    PARENT_ID: number;
    COMMENT: string;
    REG_USER_ID: number;
    REG_DATE: string;
    BFB_ID: number;
}

const backFreeBoardCommentSchema: Schema = new Schema({
    BFBC_ID: { type: Number, unique: true },
    PARENT_ID: { type: Number, default: null },
    COMMENT: { type: String, default: null, maxLength: 1000 },
    REG_USER_ID: { type: Number, required: true },
    REG_DATE: { type: Date, default: Date.now },
    BFB_ID: { type: Number, required: true },
});
backFreeBoardCommentSchema.index({ BFBC_ID: 1 });
backFreeBoardCommentSchema.plugin(autoIncrement.plugin, {
    model: 'back_freeboard_comment',
    field: 'BFBC_ID',
    startAt: 1,
    increment: 1,
});

const BackFreeBoardCommentSchema = model('back_freeboard_comment', backFreeBoardCommentSchema);

export { BackFreeBoardCommentSchema, backFreeBoardComment };
