import { model, Schema } from 'mongoose';

interface boardWrap {
    curriculum: Array<string>;
    freeboard: Array<string>;
    qa: Array<string>;
    type: string;
}

const domaintypes: Array<string> = ['backend', 'frontend', 'devOps'];
export const countDomainTypes = domaintypes.length;

const boardWrapSchema: Schema = new Schema({
    curriculum: { type: [Schema.Types.ObjectId], ref: 'curriculum', required: true },
    freeboard: { type: [Schema.Types.ObjectId], ref: 'freeboard', required: true },
    qa: { type: [Schema.Types.ObjectId], ref: 'qa', required: true },
    type: { type: String, required: true, enum: domaintypes },
});

const BoardWrapSchema = model('boardwrap', boardWrapSchema);

export { BoardWrapSchema, boardWrap };
