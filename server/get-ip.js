const getIp = (authRestults) => {
    const match = authRestults.match(/(?<=sender IP is +).*?(?=\))/gs)
    return match ? match[0] : null
}

module.exports = getIp