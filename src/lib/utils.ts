export const formatCurrency = (amount: number) => {
    return (amount / 100).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    })
}

export const formatDateToLocal = (
    dateStr: string,
    locale: string = 'en-US',
) => {
    const date = new Date(dateStr)
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }
    const formatter = new Intl.DateTimeFormat(locale, options)
    return formatter.format(date)
}

export const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 4) {
        return Array.from({ length: Math.min(7, totalPages) }, (_, i) => i + 1)
    }

    if (currentPage > totalPages - 4) {
        return Array.from({ length: 7 }, (_, i) => totalPages - 6 + i)
    }

    return Array.from({ length: 7 }, (_, i) => currentPage - 3 + i)
}