import { Schema, model, connection } from 'mongoose';

import autoIncrement from 'mongoose-auto-increment';
autoIncrement.initialize(connection);

interface backFreeBoardLike {
    BFBL_ID: number;
    LIKE_TYPE: Array<string>;
    REG_USER_ID: number;
    REG_DATE: Date;
    BFB_ID: number;
}

const likeType: Array<string> = ['Good', 'Bad'];

const backFreeBoardLikeSchema: Schema = new Schema({
    BFBL_ID: { type: Number, unique: true },
    LIKE_TYPE: { type: Number, required: true, enum: likeType },
    REG_USER_ID: { type: Number, required: true },
    REG_DATE: { type: Date, default: Date.now },
    BFB_ID: { type: Number, required: true },
});
backFreeBoardLikeSchema.index({ BFBL_ID: 1 });
backFreeBoardLikeSchema.plugin(autoIncrement.plugin, {
    model: 'back_freeboard_like',
    field: 'BFBL_ID',
    startAt: 1,
    increment: 1,
});

const BackFreeBoardLikeSchema = model('back_freeboard_like', backFreeBoardLikeSchema);

export { BackFreeBoardLikeSchema, backFreeBoardLike };
