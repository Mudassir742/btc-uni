export interface IWpErrors {
    message?: string,
    extensions: { category: string },
    locations: [{ line?: number, column?: number }]
}

export const generateWpPageError = (wpError: IWpErrors[]) => {
    return new Error(wpError[0]?.message ?? "Something went wrong")
}