import { model, Schema, connection } from 'mongoose';

import autoIncrement from 'mongoose-auto-increment';
autoIncrement.initialize(connection);

interface backCurriculum {
    BC_ID: number;
    TITLE: string;
    CONTENT: string;
    REG_USER_ID: number;
    REG_DATE: Date;
}

const backCurriculumSchema: Schema = new Schema({
    BC_ID: { type: Number, unique: true },
    TITLE: { type: String, default: null, maxLength: 150 },
    CONTENT: { type: String, default: null, maxLength: 4000 },
    REG_USER_ID: { type: Number, default: 0 },
    REG_DATE: { type: Date, default: Date.now },
});
backCurriculumSchema.index({ BC_ID: 1, TITLE: 1 });
backCurriculumSchema.plugin(autoIncrement.plugin, {
    model: 'back_curriculum',
    field: 'BC_ID',
    startAt: 1,
    increment: 1,
});

const BackCurriculumSchema = model('back_curriculum', backCurriculumSchema);

export { BackCurriculumSchema, backCurriculum };
