export interface IData<T> {
  item?: string;
  result?: Array<T> | object;
  code?:200,
  message?: string
}