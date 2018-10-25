interface Options {
    ignoredCharacters: string;
    numbersAlwaysNewWord: boolean;
}
declare function noCase (value: string, locale?: string, replacement?: string, options?: Options): string;

export = noCase;
