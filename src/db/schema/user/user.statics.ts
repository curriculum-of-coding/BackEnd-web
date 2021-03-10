import { UserModel } from './user.model';
import { pwdQuestion, UserSchema } from './user.schema';
import { IUser, IUserDocument, IUserModel } from './user.types';

/**
 *
 * @param {IUserModel} this
 * @param {user} user
 */
export async function updateUser(this: IUserModel, user): Promise<IUserDocument> {
    const result = await this.findOne({ nickname: user.nickname }).exec(function (err, docs) {
        if (docs) {
            return new Error('Name exists already');
        } else {
            if (Number.isInteger(user.pwdQuestType)) {
                if (
                    Number(user.pwdQuestType) >= 0 &&
                    Number(user.pwdQuestType) < pwdQuestion.length
                ) {
                    user.pwdQuestType = pwdQuestion[Number(user.pwdQuestType)];
                    new UserModel({
                        email: user.email,
                        userPwd: user.password,
                        nickname: user.nickname,
                        pwdQuestType: user.PWDQuestType,
                        pwdAnswer: user.PWDAnswer,
                        interests: user.interest,
                        TOS_YN: user.TOS === 'Y',
                        PP_YN: user.PP === 'Y',
                    }).save(function (err) {
                        if (err) {
                            return new Error('save error');
                        } else {
                            return null;
                        }
                    });
                }
            } else {
                return new Error('pwdQuestType is not correct');
            }
        }
    });

    return result;
}
