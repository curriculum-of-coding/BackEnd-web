import { Schema, model } from 'mongoose';

interface curriculumLike {
    likeType: string;
    regUser: string;
    regDate: Date;
}

const likeTypes: Array<string> = ['Good', 'Bad'];

const curriculumLikeSchema: Schema = new Schema({
    likeType: { type: String, required: true, enum: likeTypes },
    regUser: { type: Schema.Types.ObjectId, ref: 'User_INFO', required: true },
    regDate: { type: Date, default: Date.now },
});

const CurriculumLikeSchema = model('curriculum_like', curriculumLikeSchema);

export { CurriculumLikeSchema, curriculumLike };
