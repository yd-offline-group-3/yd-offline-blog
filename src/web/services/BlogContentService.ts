import { IArticleContent } from 'web/types/Article';
import { IData } from 'web/types/Data';

export type BlogContentResult = IData<IArticleContent>;

const getBlogContent = (post: string): Promise<BlogContentResult> => {
    return fetch('/api/blog-content', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'post': post
        })
    }).then((res) => res.json());
}
export default {
    getBlogContent
}