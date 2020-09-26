import { IData } from './IData';

export interface IApi {
  getInfo(): Promise<IData<number | string>>;
  getBlogList(page: number): Promise<IData<number | string>>;
  getBlogCategories(): Promise<IData<number | string>>;
  getBlogArchives(): Promise<IData<number | string>>;
  getBlogCurrentInfoAndTypeAndTag(): Promise<IData<number | string>>;
  getBlogContent(postUrl: string): Promise<IData<{ htmlStr: string, catalogList: Array<{ title: string, type: string, href: string }> }>>;
}