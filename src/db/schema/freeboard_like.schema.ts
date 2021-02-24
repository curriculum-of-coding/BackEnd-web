import { Schema, model } from 'mongoose';

interface freeBoardLike {
    likeType: string;
    regUser: number;
    regDate: Date;
}

const likeTypes: Array<string> = ['Good', 'Bad'];

const freeBoardLikeSchema: Schema = new Schema({
    likeType: { type: String, required: true, enum: likeTypes },
    regUser: { type: Schema.Types.ObjectId, required: true },
    regDate: { type: Date, default: Date.now },
});

const FreeBoardLikeSchema = model('freeboard_like', freeBoardLikeSchema);

export { FreeBoardLikeSchema, freeBoardLike };
