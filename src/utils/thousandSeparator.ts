export function thousandsSeparator(number: number) {
    const strNumber = number.toString()
    const parts = strNumber.split('.')

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return parts.join('.')
}
