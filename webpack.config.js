var path = require('path');
var webpack = require('webpack');


module.exports = {
    devtool: 'source-map',
    entry: {
        app: [path.join(__dirname, '/js/index')]
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'static/js')
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            include: [path.resolve(__dirname, 'js'), path.resolve(__dirname, 'node_modules', 'components')],
            query: {
                "presets": ["react", "es2015"],
                "plugins": [
                    ["transform-class-properties"],
                    ["transform-object-rest-spread"]
                ]
            }
        }]
    }
};
