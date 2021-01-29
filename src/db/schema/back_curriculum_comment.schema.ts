import { model, Schema, connection } from 'mongoose';

let autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

interface backCurriculumComment {
	BCC_ID: number;
	PARENT_ID: number;
	COMMENT: string;
	REG_USER_ID: number;
	REG_DATE: Date;
	BC_ID: number;
};

const backCurriculumCommentSchema: Schema = new Schema({
	BCC_ID: { type: Number, unique: true },
	PARENT_ID: { type: Number, default: 0 },
	COMMENT: { type: String, default: NULL, maxLength: 1000 },
	REG_USER_ID: { type: Number, default: 0 },
	REG_DATE: { type: Date, default: Date.now },
	BC_ID: { type: Number, default: 0 }
});
backCurriculumCommentSchema.index({ BCC_ID: 1 });
backCurriculumCommentSchema.plugin( autoIncrement.plugin, {
	model: 'back_curriculum_comment',
	field: 'BCC_ID',
	startAt: 1,
	increment: 1
});

const BackCurriculumCommentSchema = model('back_curriculum_comment', backCurriculumCommentSchema);

export { BackCurriculumCommentSchema, backCurriculumComment };
