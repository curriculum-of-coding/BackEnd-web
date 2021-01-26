import { model, Schema } from 'mongoose';

let autoIncrement = require('mongoose-auto-increment');

interface backQA {
	FA_ID: number;
	PARENT_ID: string;
	TITLE: string;
	CONTENT: string;
	REG_USER_ID: string;
	REG_DATE: Date;
};

const backQASchema: Schema = new Schema({
	FA_ID: { type: Number, unique: true },
	PARENT_ID: Schema.Types.ObjectID,
	TITLE: { type: String, default: NULL, maxLength: 150 },
	CONTENT: { type: String, default: NULL, maxLength: 4000 },
	REG_USER_ID: Schema.Types.ObjectID,
	REG_DATE: { type: Date, default: Date.now }
});
backQASchema.index({ FA_ID: 1, TITLE: 1 });
backQASchema.plugin( autoIncrement.plugin, {
	model: 'backQASchema',
	field: 'FA_ID',
	startAt: 1,
	increment: 1
});

const BackQASchema = model('back_QA', backQASchema);

export { BackQASchema, backQA };
