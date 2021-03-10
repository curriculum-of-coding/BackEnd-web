import { Document, Model } from 'mongoose';
export interface IUser {
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

export interface IUserDocument extends IUser, Document {
    setPasswordQuest: (this: IUserDocument, idx: number) => Promise<void>;
}
export interface IUserModel extends Model<IUserDocument> {
    findByUsername: (this: IUserModel, nickname: string) => Promise<IUserDocument>;
    updateUser: (this, user) => Promise<IUserDocument>;
}
