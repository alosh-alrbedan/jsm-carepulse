/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains : ['cdn.imagin.studio']
    },
    typescript : {
        ignoreBuildErrors : true,
    },
    eslint: {
        ignoreBuildErrors: true
    },
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            path: false,
            os: false
        };
        return config;
    }
};

export default nextConfig;
