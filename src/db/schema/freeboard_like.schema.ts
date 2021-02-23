import { Schema, model } from 'mongoose';

interface freeBoardLike {
    LIKE_TYPE: Array<string>;
    REG_USER_ID: number;
    REG_DATE: Date;
    BFB_ID: number;
}

const likeType: Array<string> = ['Good', 'Bad'];

const freeBoardLikeSchema: Schema = new Schema({
    LIKE_TYPE: { type: Number, required: true, enum: likeType },
    REG_USER_ID: { type: Number, required: true },
    REG_DATE: { type: Date, default: Date.now },
    BFB_ID: { type: Number, required: true },
});

const FreeBoardLikeSchema = model('freeboard_like', freeBoardLikeSchema);

export { FreeBoardLikeSchema, freeBoardLike };
