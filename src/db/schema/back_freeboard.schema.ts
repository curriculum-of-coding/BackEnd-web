import { model, Schema, connection } from 'mongoose';

let autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

interface back_freeboard {
	BFB_ID: string;
	TITLE: string;
	CONTENT: string;
	REG_USER_ID: string;
	REG_DATE: Date;
}

const backFreeBoardSchema: Schema = new Schema({
	BFB_ID: { type: Number, unique: true },
	TITLE: { type: String, default: NULL, maxLength: 150 },
	CONTENT: { type: String, default: NULL, maxLength: 4000 },
	REG_USER_ID: Schema.Types.ObjectId,
	REG_DATE: { type: Date, default: Date.now }
});
backFreeBoardSchema.index({ BFB_ID: 1, TITLE: 1 });
backFreeBoardSchema.plugin( autoIncrement.plugin, {
	model: 'back_freeboard',
	field: 'BFB_ID',
	startAt: 1,
	increment: 1
});

const BackFreeBoardSchema = model('back_freeboard', backFreeBoardSchema);

export { BackFreeBoardSchema, back_freeboard };
