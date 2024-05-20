/** @param {import("webpack").Configuration} config */
export function webpack(config) {
    config.resolve.fallback = {
        "crypto": false
    }
    
    return config;
}