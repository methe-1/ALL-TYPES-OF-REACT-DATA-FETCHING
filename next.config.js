/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "upload.wikimedia.org",
            "img.a.transfermarkt.technology",
            "www.allosport.net",
            "imgresizer.eurosport.com",
            "i0.wp.com",
            "assets.goal.com",
            "images2.minutemediacdn.com",
            't0.gstatic.com',
            'www.salonlfc.com'
        ],
    },
}

module.exports = nextConfig
