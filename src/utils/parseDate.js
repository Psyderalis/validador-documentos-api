
const parseDate = (date) => {
    // Mapa de months texto a número (0-based para JS Date)
    const months = {
        ENERO: 0, FEBRERO: 1, MARZO: 2, ABRIL: 3, MAYO: 4, JUNIO: 5,
        JULIO: 6, AGOSTO: 7, SEPTIEMBRE: 8, OCTUBRE: 9, NOVIEMBRE: 10, DICIEMBRE: 11
    }

    const isTextDate = /\b\d{1,2}\s+(ENERO|FEBRERO|MARZO|ABRIL|MAYO|JUNIO|JULIO|AGOSTO|SEPTIEMBRE|OCTUBRE|NOVIEMBRE|DICIEMBRE)\s+\d{4}\b/g.test(date)
    const isSlashDate = (/\b(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}\b/g).test(date)

    if (isTextDate) {
        const parts = date.toUpperCase().split(' ')
        if (parts.length !== 3) return null
        const day = parseInt(parts[0], 10)
        const month = months[parts[1]]
        const year = parseInt(parts[2], 10)
        if (isNaN(day) || month === undefined || isNaN(year)) return null

        return new Date(year, month, day)

    } else if (isSlashDate) {
        const parts = date.split('/')
        if (parts.length !== 3) return null
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1 // JS Date months 0-based
        const year = parseInt(parts[2], 10)
        if (isNaN(day) || isNaN(month) || isNaN(year)) return null

        return new Date(year, month, day)

    } else {
        console.error('Fecha no válida')
        return null
    }
}

module.exports = {
    parseDate
}