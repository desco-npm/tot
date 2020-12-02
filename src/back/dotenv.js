require('dotenv').config()

process.env = global.objectFilter(process.env, (v, k) => {
    return k.indexOf('') === 0
})