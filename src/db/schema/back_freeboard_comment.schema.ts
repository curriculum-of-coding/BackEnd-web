import { model, Schema, connection } from 'mongoose';

let autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

interface backFreeBoardComment {
	BFBC_ID: number;
	PARENT_ID: string;
	COMMENT: string;
	REG_USER_ID: string;
	REG_DATE: string;
	BFB_ID: string;
};

const backFreeBoardCommentSchema: Schema = new Schema({
	BFBC_ID: { type: Number, default: 0, unique: true },
	PARENT_ID: Schema.Types.ObjectId,
	COMMENT: { type: String, default: NULL, maxLength: 1000 },
	REG_USER_ID: Schema.Types.ObjectId,
	REG_DATE: { type: Date, default: Date.now },
	BFB_ID: Schema.Types.ObjectId
});
backFreeBoardCommentSchema.index({ BFBC_ID: 1 });
backFreeBoardCommentSchema.plugin( autoIncrement.plugin, {
	model: 'back_freeboard_comment',
	field: 'BFBC_ID',
	startAt: 1,
	increment: 1
});

const BackFreeBoardCommentSchema = model('back_freeboard_comment', backFreeBoardCommentSchema);

export { BackFreeBoardCommentSchema, backFreeBoardComment };
