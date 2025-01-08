import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,

    env: {
        GEOAPIFY_API_KEY: "91d279c8ff464a518a59585456b179be",
        USE_IMAGE_ROTATOR: "0",
        THUMBNAIL_HEIGHT: "224",
        NEXT_PUBLIC_STRIPE_PUBLIC_KEY: "pk_test_51QeAElQkI0tYRrg4i9vKJySj91s0lcCQPWuyRvYTQCQhbTjVE1T8HdrGUrAIV2YaRahvdzDHGtFvMBDRHBhIn3to00v8EevSiU",
        STRIPE_SECRET_KEY: "sk_test_51QeAElQkI0tYRrg4XpWYjpUQp6cns0Y3bFz3qjdiz5axHf4Lv6vKxgLqhnMxXFalDp0FHBmYZzoOWoB9fFfDBm2o00MVeGVXR8"

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

