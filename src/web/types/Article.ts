export interface IArticleContent {
    htmlStr: string;
    title: string;
    subTitle: string;
    catalogList: Array<IContentCatalog>;
}

export interface IArticleList {
    content: string;
    date: string;
    link: string;
    title: string;
    type?: string;
}

export interface IContentCatalog {
    title: string;
    type: 'h2' | 'h3';
    href: string;
}