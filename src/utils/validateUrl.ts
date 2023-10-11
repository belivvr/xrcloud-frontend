export const validateURL = (inputValue: string) => {
    const regex = /^(http:\/\/|https:\/\/).*/
    return !regex.test(inputValue)
}
