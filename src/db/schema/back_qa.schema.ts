import { model, Schema, connection } from 'mongoose';

import autoIncrement from 'mongoose-auto-increment';
autoIncrement.initialize(connection);

interface backQA {
    BA_ID: number;
    PARENT_ID: number;
    TITLE: string;
    CONTENT: string;
    REG_USER_ID: number;
    REG_DATE: Date;
}

const backQASchema: Schema = new Schema({
    BA_ID: { type: Number, unique: true },
    PARENT_ID: { type: Number, default: 0 },
    TITLE: { type: String, default: null, maxLength: 150 },
    CONTENT: { type: String, default: null, maxLength: 4000 },
    REG_USER_ID: { type: Number, default: 0 },
    REG_DATE: { type: Date, default: Date.now },
});
backQASchema.index({ BA_ID: 1, TITLE: 1 });
backQASchema.plugin(autoIncrement.plugin, {
    model: 'back_QA',
    field: 'BA_ID',
    startAt: 1,
    increment: 1,
});

const BackQASchema = model('back_QA', backQASchema);

export { BackQASchema, backQA };
