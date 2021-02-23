import { model, Schema } from 'mongoose';

interface curriculumComment {
    childs: Array<string>;
    comment: string;
    regUser: string;
    regDate: Date;
}

const curriculumCommentSchema: Schema = new Schema({
    childs: { type: [Schema.Types.ObjectId], ref: 'curriculum_comment', default: null },
    comment: { type: String, default: null, maxLength: 1000 },
    regUser: { type: Schema.Types.ObjectId, ref: 'User_INFO', required: true },
    regDate: { type: Date, default: Date.now },
});

const CurriculumCommentSchema = model('curriculum_comment', curriculumCommentSchema);

export { CurriculumCommentSchema, curriculumComment };
