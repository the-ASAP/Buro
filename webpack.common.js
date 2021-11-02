/* eslint-disable no-undef */
const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    target: "web",
    context: path.resolve(__dirname, "src"),
    entry: Object.assign(
        {},
        ...glob.sync("./src/js/*.js").map((jsFile) => ({
            [jsFile.replace("./src/js/", "").replace(".js", "")]: `${jsFile}`.replace("./src", "."),
        }))
    ),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "js/[name].js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sassOptions: { outputStyle: "expanded" },
                        },
                    },
                ],
            },
            {
                test: /\.(html)$/,
                use: "html-loader",
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                type: "asset",
                generator: {
                    filename: "[path][name]-[hash][ext]",
                },
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                type: "asset",
                generator: {
                    filename: "[path][name]-[hash][ext]",
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
        // Копирование css каталога в директорию src
        // new MiniCssExtractPlugin({
        //     filename: "../src/css/[name].css",
        // }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve("./src/img"),
                    to: path.resolve("./build/img"),
                    noErrorOnMissing: true,
                },
                {
                    from: path.resolve("./src/fonts"),
                    to: path.resolve("./build/fonts"),
                    noErrorOnMissing: true,
                },
            ],
        }),
        ...glob.sync("./src/*.html").map(
            (htmlFile) =>
                new HtmlWebpackPlugin({
                    chunks: [htmlFile.replace("./src/", "").replace(".html", "")],
                    inject: "body",
                    filename: path.basename(htmlFile),
                    template: path.basename(htmlFile),
                    xhtml: true,
                })
        ),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
        }),
    ],
};
