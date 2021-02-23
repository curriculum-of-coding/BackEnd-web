import { model, Schema } from 'mongoose';

interface curriculumContent {
    content: string;
    youtubeUrl: Array<string>;
    filesIncluded: string;
    order: number;
}

const curriculumContentSchema: Schema = new Schema({
    content: { type: String, default: null, maxLength: 4000 },
    youtubeUrl: { type: [Schema.Types.ObjectId], default: null },
    filesIncluded: { type: Schema.Types.ObjectId, default: null },
    order: { type: Number, default: 0, required: true },
});

const CurriculumContentSchema = model('curriculum_content', curriculumContentSchema);

export { CurriculumContentSchema, curriculumContent };
