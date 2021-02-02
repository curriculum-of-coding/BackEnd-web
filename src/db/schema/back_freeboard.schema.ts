import { model, Schema, connection } from 'mongoose';

import autoIncrement from 'mongoose-auto-increment';
autoIncrement.initialize(connection);

interface backFreeboard {
    BFB_ID: number;
    TITLE: string;
    CONTENT: string;
    REG_USER_ID: number;
    REG_DATE: Date;
}

const backFreeBoardSchema: Schema = new Schema({
    BFB_ID: { type: Number, unique: true },
    TITLE: { type: String, default: null, maxLength: 150 },
    CONTENT: { type: String, default: null, maxLength: 4000 },
    REG_USER_ID: { type: Number, default: 0 },
    REG_DATE: { type: Date, default: Date.now },
});
backFreeBoardSchema.index({ BFB_ID: 1, TITLE: 1 });
backFreeBoardSchema.plugin(autoIncrement.plugin, {
    model: 'back_freeboard',
    field: 'BFB_ID',
    startAt: 1,
    increment: 1,
});

const BackFreeBoardSchema = model('back_freeboard', backFreeBoardSchema);

export { BackFreeBoardSchema, backFreeboard };
