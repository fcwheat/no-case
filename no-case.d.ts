interface Options {
    ignoredCharacters: string;
    splitNumbers: boolean;
}
declare function noCase (value: string, locale?: string, replacement?: string, options?: Options): string;

export = noCase;
