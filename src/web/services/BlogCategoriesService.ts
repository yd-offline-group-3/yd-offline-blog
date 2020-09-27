import { IData } from 'web/types/Data';
import { ICataResultItem } from 'web/types/Categories';

export type BlogCategoriesResult = IData<ICataResultItem>;

const getBlogCategories = ():Promise<BlogCategoriesResult> => {
    return fetch(`/api/blog-categories`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json());
}
export default {
    getBlogCategories
}