import { model, Schema, connection } from 'mongoose';

let autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

interface backCurriculumYoutube {
	BCU_ID: number;
	TITLE: string;
	LINK_URL: string;
	SUMMARY: string;
	REG_USER_ID: string;
	REG_DATE: Date;
	SORT_ORDER: number;
	BC_ID: string;
};

const backCurriculumYoutubeSchema: Schema = new Schema({
	BCU_ID: { type: Number, unique: true },
	TITLE: { type: String, default: NULL, maxLength: 150 },
	LINK_URL: { type: String, required: true },
	SUMMARY: { type: String, default: NULL, maxLength: 4000 },
	REG_USER_ID: Schema.Types.ObjectId,
	REG_DATE: { type: Date, default: Date.now },
	SORT_ORDER: { type: Number, default: 0, required: true },
	BC_ID: Schema.Types.ObjectId
});
backCurriculumYoutubeSchema.index({ BCU_ID: 1, TITLE: 1 });
backCurriculumYoutubeSchema.plugin( autoIncrement.plugin, {
	model: 'back_curriculum_youtube',
	field: 'BCU_ID',
	startAt: 1,
	increment: 1
});

const BackCurriculumYoutubeSchema = model('back_curriculum_youtube', backCurriculumYoutubeSchema);

export { BackCurriculumYoutubeSchema, backCurriculumYoutube };

