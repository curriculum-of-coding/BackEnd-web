import { model, Schema, connection } from 'mongoose';

let autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

interface backCurriculum {
	FC_ID: number;
	TITLE: string;
	CONTENT: string;
	REG_USER_ID: string;
	REG_DATE: Date;
};

const backCurriculumSchema: Schema = new Schema ({
	FC_ID: { type: Number, unique: true },
	TITLE: { type: String, default: NULL, maxLength: 150 },
	CONTENT: { type: String, default: NULL, maxLength: 4000 },
	REG_USER_ID: Schema.Types.ObjectId,
	REG_DATE: { type: Date, default: Date.now }
});
backCurriculumSchema.index({ FC_ID: 1, TITLE: 1 });
backCurriculumSchema.plugin( autoIncrement.plugin, {
	model: 'back_curriculum',
	field: 'FC_ID',
	startAt: 1,
	increment: 1
});

const BackCurriculumSchema = model('back_curriculum', backCurriculumSchema);

export { BackCurriculumSchema, backCurriculum };
