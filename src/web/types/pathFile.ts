export type pathFile = {
    type: string;
    name: string;
    htmlPath?: string;
    children?: { [props: string]: pathFile }
}