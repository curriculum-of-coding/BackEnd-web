import { model, Schema, Document } from 'mongoose';
import { countDomainTypes } from './boardwrap.schema';

interface UserINFO extends Document {
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

const defaultInterests = [].fill(false, 0, countDomainTypes);

const userInfoSchema: Schema = new Schema({
    nickname: { type: String, required: true, trim: true, default: 'Guest', maxLength: 20 },
    userPwd: { type: String, required: true, trim: true, maxLength: 100 },
    email: { type: String, required: true, unique: true },
    githubEmail: { type: String },
    githubAuthKey: { type: String },
    kakaoEmail: { type: String },
    kakaoAuthKey: { type: String },
    googleEmail: { type: String },
    googleAuthKey: { type: String },
    pwdQuestType: { type: String, required: true },
    pwdAnswer: { type: String, required: true, default: null },
    interests: { type: Array, required: true, default: defaultInterests },
    TOS_YN: { type: Boolean, required: true },
    PP_YN: { type: Boolean, required: true },
    regDate: { type: Date, default: Date.now },
    updDate: { type: Date, default: null },
    isSuperUser: { type: Boolean, default: false },
});

userInfoSchema.index(
    { nickname: 1, email: 1, githubEmail: 1, kakaoEmail: 1, googleEmail: 1 },
    {
        unique: true,
        partialFilterExpression: {
            githubEmail: {
                $exists: true,
                $gt: '',
            },
            kakaoEmail: {
                $exists: true,
                $gt: '',
            },
            googleEmail: {
                $exists: true,
                $gt: '',
            },
        },
    }
);

/* userInfoSchema.methods.updateUser = function (user, cb) {
    UserInfoSchema.find({ name: user.name }).exec(function (err, docs) {
        if (docs.length) {
            cb('Name exists already', null);
        } else {
            if (Number.isInteger(user.pwdQuestType)) {
                if (
                    Number(user.pwdQuestType) >= 0 &&
                    Number(user.pwdQuestType) < pwdQuestion.length
                ) {
                    user.pwdQuestType = pwdQuestion[Number(user.pwdQuestType)];
                    user.save(function (err) {
                        cb(err, user);
                    });
                }
            }
            cb('pwdQuestType is not correct');
        }
    });
};*/
const UserInfoSchema = model<UserINFO>('user', userInfoSchema);
export { UserInfoSchema, userInfoSchema, UserINFO };
