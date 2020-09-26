export interface IData<T> {
    item?: string;
    result?: Array<T> | T;
    code?: number,
    message?: string
}