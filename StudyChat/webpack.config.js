const path = require('path');
const webpack= require("webpack");

function makeEntryCB(acc, file){   // reducer for making a large object. entry  below needs to be an object
    return { ... acc, [path.parse(file).name]: './tw/'+file};     // we ... spread the current object, then add one more property
}

// bootstrap entries
const bootstrap= {["reactjs"] : "./src/reactjs/index.js"};

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [].reduce(makeEntryCB, {...bootstrap}),   // all tw entries, plus the tests
    output: {
        path: __dirname +"/public",
        publicPath: '/',
    },
    optimization: {
        splitChunks: {             // split the code coming from others (vendor) from our own code
            chunks: "all",
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "/index.html",
            template: './src/index.html',
            chunks: ["reactjs"],
        }),   // a HTML for each existing bootstrap index.js
        new webpack.SourceMapDevToolPlugin(    // the source map plugin, specifying "Debug here!" in the browser Devtools (chrome)
            {
                moduleFilenameTemplate: "[resource]",
                exclude:[/node_modules/, /webpack/],
                sourceRoot:"Debug here!"
            }),     
    ],
    module: {
        rules: [
            {
                test: /\.?js$/,                   // for each .js file
                exclude: /node_modules/,          // except in node_modules 
                use: {
                    loader: "babel-loader",       // we use babel
                    options: {
                        presets: [['@babel/preset-env',{
                            "targets":  {
                                       /* we set babel to generate code for an advanced browser
                                                    so that the code will change as little as possible.
                                                    This is not suitable for production because older browsers may not understand the code.
                                                    But the focus here is the lab.
                                                    */
                            }
                            }]],
                        "plugins": [
                            [
                                "@babel/transform-runtime", {  // babel can reuse some code to reduce generated code size
                                    "regenerator": true
                                }
                            ],
                            ["@babel/plugin-transform-react-jsx"]  // this transforms JSX into JS
                        ]
                    }
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                exclude: /node_modules/,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
              },
        ]
    },
    devServer: {
        historyApiFallback: true,
        open: 'http://localhost:8080',
        port: 8080,
      },
    devtool: false,  // needed for the SourceMapDevToolPlugin
    mode:'development',
};


