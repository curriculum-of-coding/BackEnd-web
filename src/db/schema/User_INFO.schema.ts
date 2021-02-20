import { model, Schema, connection } from 'mongoose';

import autoIncrement from 'mongoose-auto-increment';
autoIncrement.initialize(connection);

interface UserINFO {
    USER_ID: number;
    USER_PWD: string;
    EMAIL: string;
    GITHUB_MAIL: string;
    GITHUB_AUTH_KEY: string;
    KAKAO_MAIL: string;
    KAKAO_AUTH_KEY: string;
    GOOGLE_MAIL: string;
    GOOGLE_AUTH_KEY: string;
    PWD_QUEST_TYPE: number;
    PWD_ANSWER: string;
    INTEREST_FRONT: boolean;
    INTEREST_BACK: boolean;
    INTEREST_DEVOPS: boolean;
    TOS_YN: boolean;
    PP_YN: boolean;
    REG_DATE: Date;
    UPD_DATE: Date;
    SUPER_USER: boolean;
}

const pwdQuestion: Array<string> = ['Where did you born?', 'When is your birth?'];

const userInfoSchema: Schema = new Schema({
    USER_ID: { type: Number, unique: true },
    NICKNAME: { type: String, required: true, trim: true, default: 'Guest' },
    USER_PWD: { type: String, required: true, trim: true, maxLength: 100 },
    EMAIL: { type: String, required: true, unique: true },
    GITHUB_MAIL: { type: String, unique: true },
    GITHUB_AUTH_KEY: { type: String },
    KAKAO_MAIL: { type: String, unique: true },
    KAKAO_AUTH_KEY: { type: String },
    GOOGLE_MAIL: { type: String, unique: true },
    GOOGLE_AUTH_KEY: { type: String },
    PWD_QUEST_TYPE: { type: Number, required: true, enum: pwdQuestion },
    PWD_ANSWER: { type: String, required: true, default: null },
    INTEREST_FRONT: { type: Boolean, default: false },
    INTEREST_BACK: { type: Boolean, default: false },
    INTEREST_DEVOPS: { type: Boolean, default: false },
    TOS_YN: { type: Boolean, required: true },
    PP_YN: { type: Boolean, required: true },
    REG_DATE: { type: Date, default: Date.now },
    UPD_DATE: { type: Date, default: null },
    SUPER_USER: { type: Boolean, default: false },
});

userInfoSchema.index({ EMAIL: 1, GITHUB_MAIL: 1, KAKAO_MAIL: 1, GOOGLE_MAIL: 1 });
userInfoSchema.plugin(autoIncrement.plugin, {
    model: 'User_INFO',
    field: 'USER_ID',
    startAt: 1,
    increment: 1,
});

const UserInfoSchema = model('User_INFO', userInfoSchema);

export { UserInfoSchema, UserINFO };
