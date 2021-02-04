import { Schema, model, connection } from 'mongoose';

import autoIncrement from 'mongoose-auto-increment';
autoIncrement.initialize(connection);

interface backCurriculumLike {
    BCL_ID: number;
    LIKE_TYPE: Array<string>;
    REG_USER_ID: number;
    REG_DATE: Date;
    BC_ID: number;
}

const likeType: Array<string> = ['Good', 'Bad'];

const backCurriculumLikeSchema: Schema = new Schema({
    BCL_ID: { type: Number, unique: true },
    LIKE_TYPE: { type: Number, required: true, enum: likeType },
    REG_USER_ID: { type: Number, required: true },
    REG_DATE: { type: Date, default: Date.now },
    BC_ID: { type: Number, required: true },
});

backCurriculumLikeSchema.index({ BCL_ID: 1 });
backCurriculumLikeSchema.plugin(autoIncrement.plugin, {
    model: 'back_curriculum_like',
    field: 'BCL_ID',
    startAt: 1,
    increment: 1,
});

const BackCurriculumLikeSchema = model('back_curriculum_like', backCurriculumLikeSchema);

export { BackCurriculumLikeSchema, backCurriculumLike };
