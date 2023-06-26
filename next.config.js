/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@babel/preset-react'])

const nextConfig = withTM({
    images: {
        domains: ['flagcdn.com', 'kr.object.ncloudstorage.com']
    },
    env: {
        REACT_APP_VERSION: process.env.REACT_APP_VERSION,
        REACT_APP_API_URL: process.env.REACT_APP_API_URL
    }
})

module.exports = {
    ...nextConfig,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/login',
                permanent: true
            }
        ]
    }
}
