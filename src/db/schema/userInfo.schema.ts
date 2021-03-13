import { model, Schema } from 'mongoose';

import { countDomainTypes } from './boardWrap.schema';

interface UserINFO {
    nickname: string;
    email: string;
    userPwd: string;
    githubEmail: string;
    githubAuthKey: string;
    kakaoEmail: string;
    kakaoAuthKey: string;
    googleEmail: string;
    googleAuthKey: string;
    pwdQuestType: string;
    pwdAnswer: string;
    interests: Array<boolean>;
    TOS_YN: boolean;
    PP_YN: boolean;
    regDate: Date;
    updDate: Date;
    isSuperUser: boolean;
}

const pwdQuestion: Array<string> = ['Where did you born?', 'When is your birth?'];
const defaultInterests = [].fill(false, 0, countDomainTypes);

const userInfoSchema: Schema = new Schema({
    nickname: { type: String, required: true, trim: true, default: 'Guest', maxLength: 20 },
    userPwd: { type: String, required: true, trim: true, maxLength: 100 },
    email: { type: String, required: true, unique: true },
    githubEmail: { type: String, unique: true },
    githubAuthKey: { type: String },
    kakaoEmail: { type: String, unique: true },
    kakaoAuthKey: { type: String },
    googleEmail: { type: String, unique: true },
    googleAuthKey: { type: String },
    pwdQuestType: { type: String, required: true, enum: pwdQuestion },
    pwdAnswer: { type: String, required: true, default: null },
    interests: { type: Array, required: true, default: defaultInterests },
    TOS_YN: { type: Boolean, required: true },
    PP_YN: { type: Boolean, required: true },
    regDate: { type: Date, default: Date.now },
    updDate: { type: Date, default: null },
    isSuperUser: { type: Boolean, default: false },
});

userInfoSchema.index({ nickname: 1, email: 1, github_email: 1, kakao_email: 1, google_email: 1 });

const UserInfoSchema = model('userInfo', userInfoSchema);

export { UserInfoSchema, UserINFO };
