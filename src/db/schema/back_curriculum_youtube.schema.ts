import { model, Schema, connection } from 'mongoose';

import autoIncrement from 'mongoose-auto-increment';
autoIncrement.initialize(connection);

interface backCurriculumYoutube {
    BCU_ID: number;
    TITLE: string;
    LINK_URL: string;
    SUMMARY: string;
    REG_USER_ID: number;
    REG_DATE: Date;
    SORT_ORDER: number;
    BC_ID: number;
}

const backCurriculumYoutubeSchema: Schema = new Schema({
    BCU_ID: { type: Number, unique: true },
    TITLE: { type: String, default: null, maxLength: 150 },
    LINK_URL: { type: String, required: true },
    SUMMARY: { type: String, default: null, maxLength: 4000 },
    REG_USER_ID: { type: Number, default: 0 },
    REG_DATE: { type: Date, default: Date.now },
    SORT_ORDER: { type: Number, default: 0, required: true },
    BC_ID: { type: Number, default: 0, required: true },
});
backCurriculumYoutubeSchema.index({ BCU_ID: 1, TITLE: 1 });
backCurriculumYoutubeSchema.plugin(autoIncrement.plugin, {
    model: 'back_curriculum_youtube',
    field: 'BCU_ID',
    startAt: 1,
    increment: 1,
});

const BackCurriculumYoutubeSchema = model('back_curriculum_youtube', backCurriculumYoutubeSchema);

export { BackCurriculumYoutubeSchema, backCurriculumYoutube };
