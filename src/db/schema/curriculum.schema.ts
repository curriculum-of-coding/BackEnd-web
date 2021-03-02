import { model, Schema } from 'mongoose';

interface curriculum {
    title: string;
    contents: Array<string>;
    regUser: string;
    regDate: Date;
    comments: Array<string>;
    likes: Array<string>;
}

const curriculumSchema: Schema = new Schema({
    title: { type: String, default: null, maxLength: 150 },
    contents: { type: [Schema.Types.ObjectId], default: null },
    regUser: { type: Schema.Types.ObjectId, ref: 'userInfo', required: true },
    regDate: { type: Date, default: Date.now },
    comments: { type: [Schema.Types.ObjectId], default: null },
    likes: { type: Schema.Types.ObjectId, default: null },
});
curriculumSchema.index({ title: 1 });

const CurriculumSchema = model('curriculum', curriculumSchema);

export { CurriculumSchema, curriculum };
