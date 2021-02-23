import { model, Schema } from 'mongoose';

interface freeboard {
    TITLE: string;
    CONTENT: string;
    REG_USER_ID: number;
    REG_DATE: Date;
}

const freeBoardSchema: Schema = new Schema({
    TITLE: { type: String, default: null, maxLength: 150 },
    CONTENT: { type: String, default: null, maxLength: 4000 },
    REG_USER_ID: { type: Number, required: true },
    REG_DATE: { type: Date, default: Date.now },
});
freeBoardSchema.index({ TITLE: 1 });

const FreeBoardSchema = model('freeboard', freeBoardSchema);

export { FreeBoardSchema, freeboard };
