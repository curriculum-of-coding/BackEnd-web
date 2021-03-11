import { like, LikeSchema } from '../schema/like.schema';

/**
 *
 * @param { Array<like> } likes
 * @return { Promise } Promise<{ plus, minus }>
 */
export async function classifyLikeHate(likes: Array<like>) {
    let plus = 0;
    let minus = 0;
    for (const id of likes) {
        const like = await LikeSchema.findById({ _id: id });
        if (like['likeType'] == 'Good') {
            plus += 1;
        } else {
            minus += 1;
        }
    }
    return { plus, minus };
}
