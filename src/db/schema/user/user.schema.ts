import { Schema } from 'mongoose';
import { countDomainTypes } from './../boardwrap.schema';
import { setPasswordQuest } from './user.methods';
import { updateUser } from './user.statics';
const pwdQuestion: Array<string> = ['Where did you born?', 'When is your birth?'];
const defaultInterests = [].fill(false, 0, countDomainTypes);

const UserSchema: Schema = new Schema({
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

UserSchema.index({ nickname: 1, email: 1, github_email: 1, kakao_email: 1, google_email: 1 });
UserSchema.methods.setPasswordQuest = setPasswordQuest;
UserSchema.statics.updateUser = updateUser;
export { UserSchema, pwdQuestion };
