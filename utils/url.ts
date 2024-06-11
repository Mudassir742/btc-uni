import { ReadonlyURLSearchParams } from "next/navigation";

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams | string, cb?: () => void) => {

    cb && cb()
    const paramsString = params.toString();
    const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

    return `${pathname}${queryString}`;
};
type SearchParamsObj = {
    [key: string]: string | string[] | undefined | null;
};

export function objectToURLSearchParams(obj: SearchParamsObj) {
    const params = new URLSearchParams();
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];

            if (value !== undefined && value !== null) {
                if (Array.isArray(value)) {
                    // If the value is an array, iterate over its elements and append them individually
                    value.forEach((v) => {
                        if (v !== undefined && v !== null) {
                            params.append(key, v);
                        }
                    });
                } else {
                    // For other types, convert to string and append
                    params.append(key, value as string);
                }
            }
        }
    }

    return params;
}


export function transformWpUrl(url: string | undefined): string {
    const regex = /https:\/\/.*?\.wpengine.com\/wp-content\/(.*)/;
    const match = url?.match(regex);
    if (match && match[1]) {
        return `${process.env.NEXT_PUBLIC_SITE_URL}/images/${match[1]}`;
    }
    return url as string
}


// export function transformDataForWpUrl<DataType>(data: DataType): DataType {
//     const dataStr = JSON.stringify(data);
//     const transformedDataStr = dataStr.replace(
//         /https:\/\/.*?\.wpengine.com\/wp-content/g,
//         `${process.env.NEXT_PUBLIC_SITE_URL}/images`
//     );
//     console.log("transformedDataStr is: ", transformedDataStr);
//     console.log("parsed transformedDataStr is: ", JSON.parse(transformedDataStr));
//     return JSON.parse(transformedDataStr);
// }
// above updated to below on jan 8 as it was affecting other urls such as arcscissors one in externalLink in products

export function transformDataForWpUrl<DataType>(data: DataType): DataType {
    // if (data === null) {
    //     // Handle the null case. You could also throw an error, return a default value, etc. -- added jan 11
    //     return null;
    // }

    const dataStr = JSON.stringify(data);
    const wpEnginePattern = /https:\/\/[\w-]+\.wpengine\.com\/wp-content/g;

    // Check if the pattern is found in dataStr -- added jan 11
    if (wpEnginePattern.test(dataStr)) {
        const transformedDataStr = dataStr.replace(
            wpEnginePattern,
            `${process.env.NEXT_PUBLIC_SITE_URL}/images`
        );
        return JSON.parse(transformedDataStr);
    } else {
        // If the pattern is not found, return the original data -- added jan 11
        return data;
    }
}


export function replaceDomain(originalUrl: string, oldDomain: string, newDomain: string): string {
    // Replace the old domain with the new domain in the URL
    return originalUrl.replace(oldDomain, newDomain);
}
