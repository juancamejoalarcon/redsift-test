const getStringInResults = (authRestults, valueToMatch) => {
    if (authRestults.includes(valueToMatch)) {
        // TODO: Change this to a regex
        const start = authRestults.substring(authRestults.indexOf(valueToMatch) + valueToMatch.length)
        return start.split(' ')[0];
    } else {
        return null
    }
}

const getAuthResults = (authRestults) => {
    return {
        DMARC: getStringInResults(authRestults, 'dmarc='),
        SPF: getStringInResults(authRestults, 'spf='),
        DKIM: getStringInResults(authRestults, 'dkim=')
    }
}

module.exports = getAuthResults