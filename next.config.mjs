import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,

    env: {
        GEOAPIFY_API_KEY: "91d279c8ff464a518a59585456b179be",
        USE_IMAGE_ROTATOR: 1
    },

    images: {
        remotePatterns: [
            {
                hostname: "a0.muscache.com",
                protocol: "https",
                port: ""
            },
            {
                protocol: "https",
                hostname: "*.googleusercontent.com",
                port: "",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "vihbisloauhjiimyfhfu.supabase.co",
                port: "",
                pathname: "**",
            } 
        ]
    }
};

export default nextConfig;

