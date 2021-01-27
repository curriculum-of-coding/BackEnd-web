import { model, Schema, connection } from 'mongoose';

let autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

interface backCurriculumComment {
	BCC_ID: number;
	PARENT_ID: string;
	COMMENT: string;
	REG_USER_ID: string;
	REG_DATE: Date;
	BC_ID: string;
};

const backCurriculumCommentSchema: Schema = new Schema({
	BCC_ID: { type: Number, unique: true },
	PARENT_ID: Schema.Types.ObjectId,
	COMMENT: { type: String, default: NULL, maxLength: 1000 },
	REG_USER_ID: Schema.Types.ObjectId,
	REG_DATE: { type: Date, default: Date.now },
	FC_ID: Schema.Types.ObjectId
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
