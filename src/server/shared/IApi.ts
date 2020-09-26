import { IData } from './IData';

export interface IApi {
  getInfo(): Promise<IData>;
  getBlogList(): Promise<IData>;
  getBlogCategories():Promise<IData>;
  getBlogArchives():Promise<IData>;
  getBlogCurrentInfoAndTypeAndTag():Promise<IData>;
  getBlogContent(postUrl:string):Promise<{ htmlStr: string, catalogList: Array<{ title: string, type: string, href: string }> }>;
}