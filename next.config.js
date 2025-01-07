/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@babel/preset-react'])
const { i18n } = require('./next-i18next.config')

const nextConfig = withTM({    
    env: {
        REACT_APP_VERSION: process.env.REACT_APP_VERSION,
        REACT_APP_API_URL: process.env.REACT_APP_API_URL
    }
})

module.exports = {
    i18n,
    ...nextConfig,
    reactStrictMode: false   
}
