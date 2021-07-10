const getGeoCode = (authRestults) => {
    if (authRestults.includes('sender IP is ')) {
        const match = authRestults.match(/(?<=sender IP is +).*?(?=\))/gs)
        return match[0]
    }
    return null
}

module.exports = getGeoCode