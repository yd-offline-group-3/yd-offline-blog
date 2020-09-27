export interface ICataItem {
    content: string;
    date: string;
}

export interface ICataResultItem {
    type: string;
    ContentList: Array<ICataItem>
}