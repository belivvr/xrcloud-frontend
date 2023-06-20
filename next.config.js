/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@babel/preset-react'])

const nextConfig = withTM({})

module.exports = {
    ...nextConfig,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/seed',
                permanent: true
            }
        ]
    }
}
