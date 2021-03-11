import { Schema, model } from 'mongoose';

interface like {
    likeType: string;
    regUser: string;
    regDate: Date;
}

const likeTypes: Array<string> = ['Good', 'Bad'];

const likeSchema: Schema = new Schema({
    likeType: { type: String, required: true, enum: likeTypes },
    regUser: { type: Schema.Types.ObjectId, ref: 'User_INFO', required: true },
    regDate: { type: Date, default: Date.now },
});

const LikeSchema = model('curriculum_like', likeSchema);

export { LikeSchema, like };
