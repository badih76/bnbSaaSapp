import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,

    env: {
        GEOAPIFY_API_KEY: "91d279c8ff464a518a59585456b179be",
        
        USE_IMAGE_ROTATOR: "0",
        THUMBNAIL_HEIGHT: "224",
        
        NEXT_PUBLIC_STRIPE_PUBLIC_KEY: "pk_test_51QeAElQkI0tYRrg4i9vKJySj91s0lcCQPWuyRvYTQCQhbTjVE1T8HdrGUrAIV2YaRahvdzDHGtFvMBDRHBhIn3to00v8EevSiU",
        STRIPE_SECRET_KEY: "sk_test_51QeAElQkI0tYRrg4XpWYjpUQp6cns0Y3bFz3qjdiz5axHf4Lv6vKxgLqhnMxXFalDp0FHBmYZzoOWoB9fFfDBm2o00MVeGVXR8",

        SUPABASE_URL: "https://vihbisloauhjiimyfhfu.supabase.co",
        SUPABASE_STORAGE_BUCKET_NAME: "esm-bnb-images",

        NSFW_JS_MODEL: "MobileNetV2"

        // the above model options are below
        // const options = [
        //     {
        //       type: 'group',
        //       name: 'Mobilenet v2 Model',
        //       items: [
        //         {
        //           value: 'MobileNetV2',
        //           label: '90% Accurate - 2.6MB',
        //         },
        //         {
        //           value: 'MobileNetV2Mid',
        //           label: '93% Accurate - 4.2MB',
        //         },
        //       ],
        //     },
        //     {
        //       type: 'group',
        //       name: 'Inception v3 Model',
        //       items: [
        //         {
        //           value: 'InceptionV3',
        //           label: '93% Accurate - Huge!',
        //         },
        //       ],
        //     },
        //   ]

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

