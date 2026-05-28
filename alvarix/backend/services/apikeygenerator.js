function generateapikey(type = 'live') {
    const random = Math.random().toString(36).substring(2)
    const timestamp = Date.now().toString(36)

    return "alvarix_" + type + "_" + random + timestamp
}

function getCreditsByPlan(plan) {
    switch (plan) {

        case 'free':
            return 100

        case 'basic':
            return 10000

        case 'pro':
            return 50000

        case 'enterprise':
            return 999999

        default:
            return 0
    }
}

module.exports = {
    generateapikey,
    getCreditsByPlan
}