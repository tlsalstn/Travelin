const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, "/dist"),
        overlay: true,
        stats: "errors-only"
    },
    devtool: 'inline-source-map',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    entry: ["babel-polyfill", './src/index.tsx'],
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.min.js",
        publicPath: "/"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                include: path.join(__dirname, "/src"),
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.s(a|c)ss?$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugin: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
}