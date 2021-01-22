import { model, Schema } from 'mongoose';

interface ITest {
    email: string;
    password: string;
    nickname: string;
    created: Date;
    id?: string;
    gender: number;
}

const testSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, trim: true },
    nickname: { type: String, required: true, lowercase: true, trim: true },
    created: { type: Date, default: Date.now },
    id: Schema.Types.ObjectId,
    gender: { type: Number, default: 1, min: 0, max: 3 },
});
testSchema.index({ email: 1, nickname: 1 });

const TestSchema = model('User', testSchema);

export { TestSchema, ITest };
