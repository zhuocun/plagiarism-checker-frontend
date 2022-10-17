interface IResultDetail {
    source: {
        similarTo: string,
        author: {
            username: string,
            email: string
        }
    }[],
    htmlStrings: string[],
    similarity: number
}
