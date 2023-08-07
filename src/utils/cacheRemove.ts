export function cacheRemove(url: string) {
    if (url.split(':')[0] === 'blob') {
        return url
    }
    return `${url}?timestamp=${Date.now()}`
}
