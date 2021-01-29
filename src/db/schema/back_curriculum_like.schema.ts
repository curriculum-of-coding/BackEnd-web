import { Schema, model, connection } from 'mongoose';

let autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

interface backCurriculumLike {
	BCL_ID: number;
	LIKE_TYPE: enum;
	REG_USER_ID: number;
	REG_DATE: Date;
	BC_ID: number;
};

let like_type: Array<string> = [
	"Good",
	"Bad"
];

const backCurriculumLikeSchema: Schema = new Schema ({
	BCL_ID: { type: Number, required: true, unique: true },
	LIKE_TYPE: { type: Number, required: true, enum: like_type },
	REG_USER_ID: { type: Number, default: 0 },
	REG_DATE: { type: Date, default: Date.now },
	BC_ID: { type: Number, default: 0, required: true }
});
backCurriculumLikeSchema.index({ BCL_ID: 1 });
backCurriculumLikeSchema.plugin( autoIncrement.plugin, {
	model: 'back_curriculum_like',
	field: 'BCL_ID',
	startAt: 1,
	increment: 1
});

const BackCurriculumLikeSchema = model('back_curriculum_like', backCurriculumLikeSchema);

export { BackCurriculumLikeSchema, backCurriculumLike };
