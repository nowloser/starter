var path = require("path");
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var htmlWebpackPlugin = require("html-webpack-plugin");
// process.env.NODE_ENV  product or dev
// css autoprefix
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var sprites = require('postcss-sprites');

var argv = process.argv,
    last = argv[argv.length - 1],
    enter = last.substring(2, last.length);

var opts = {
    retina: true,//支持retina，可以实现合并不同比例图片
    verbose: true,
    //stylesheetPath: './distSms',
    spritePath: './dist/images',//雪碧图合并后存放地址
    basePath: './',
    filterBy: function (image) {
        //过滤一些不需要合并的图片，返回值是一个promise，默认有一个exist的filter
        if (image.url.indexOf('sprites') === -1) {
            return Promise.reject();
        }
        return Promise.resolve();
    },
    spritesmith: {
        padding: 20
    }
}
var config = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: ['babel-polyfill','./src/entry/' + enter + '.js'],
        lib: ['react', 'redux', 'react-dom', 'react-redux', 'redux-thunk']
    },

    output: {
        path: path.resolve(__dirname, '../../../target/classes/static/dist'),
        filename: enter + ".bundle.js"
    },

    resolve: {
        extensions: ['', '.js', '.jsx', '.scss', '.less']
    },

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: __dirname
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css!postcss")
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style", "css!postcss!sass")
                // loader: ExtractTextPlugin.extract("style", "css?modules&importLoaders=1&localIdentName=[path][name]__[local]___[hash:base64:5]!postcss!sass")
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|json)$/,
                loader: 'url-loader?limit=8888'
            }
        ]
    },
    postcss: [
        autoprefixer({
            // browsers: ['ie >= 8', 'opera 12.1', 'ios 6', 'android 4']
            browsers: ['ie >= 8']
        }),
        precss,
        //cssgrace,
        // sprites(opts)
    ],
    plugins: [
        //分隔文件
        new webpack.optimize.CommonsChunkPlugin('lib', enter+'.react.js'),
        new ExtractTextPlugin(enter+'.bundle.css'),
        new htmlWebpackPlugin({
            filename: path.resolve(__dirname, '../../../target/classes/static/html/' + enter + '.html'),
            chunks: ['app', 'lib'],
            template: './app.html',
            minify: {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                removeRedundantAttributes: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeComments: true
            }
        }),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        // 压缩 提前common文件
        // new webpack.optimize.UglifyJsPlugin({
        //    compress: {
        //        warnings: false
        //    }
        // }),
        // new webpack.DefinePlugin({
        //    "process.env": {
        //        NODE_ENV: JSON.stringify("production")
        //    }
        // })
    ]
};

module.exports = config;

