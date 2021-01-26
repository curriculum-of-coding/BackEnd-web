import { Schema, model } from 'mongoose';

let autoIncrement = require('mongoose-auto-increment');

interface back_freeboard_like {
	FFBL_ID: number;
	LIKE_TYPE: enum;
	REG_USER_ID: ObjectId;
	REG_DATE: Date;
	FFB_ID: ObjectId;
};

let like_type: Array<string> = [
	"Good",
	"Bad"
];

const backFreeBoardLikeSchema: Schema = new Schema ({
	FFBL_ID: { type: Number, required: true, unique: true },
	LIKE_TYPE: { type: Number, required: true, enum: like_type },
	REG_USER_ID: Schema.Types.ObjectId,
	REG_DATE: { type: Date, default: Date.now }
	FFB_ID: Schema.Types.ObjectId
});
backFreeBoardLikeSchema.index({ FFBL_ID: 1 });
backFreeBoardLikeSchema.plugin( autoIncrement.plugin, {
	model: 'backFreeBoardLikeSchema',
	field: 'FFBL_ID',
	startAt: 1,
	increment: 1
});

const BackFreeBoardLikeSchema = model('back_freeboard_like', backFreeBoardLikeSchema);

export { BackFreeBoardLikeSchema, back_freeboard_like };
