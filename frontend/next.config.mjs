/** @type {import('next').NextConfig} */
export async function rewrites() {
    return [
        {
            source: '/api/auth/:path*',
            destination: 'http://localhost:5000/auth/:path*',
        },
    ]
}
