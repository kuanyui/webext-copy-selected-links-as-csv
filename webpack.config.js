const CopyPlugin = require('copy-webpack-plugin')

const config = {
    entry: {
        background: './src/background.ts',
        content: './src/content.ts',
        // options_ui: './options_ui/index.ts'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                  loader: 'ts-loader',
                }
            },
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.(gif|svg|jpg|png)$/, loader: "file-loader" },
        ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    plugins: [
      new CopyPlugin([
        // { from: 'options_ui/index.html', to: 'options_ui.html', force: true, toType: 'file' },
        // { from: 'img/', to: 'img/', force: true, toType: 'dir' },
        // { from: 'manifest.json', to: 'manifest.json', force: true, toType: 'file' },
      ]),
    ]
}

module.exports = (env, argv) => {
    console.log('mode =', argv.mode)
    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }

    if (argv.mode === 'production') {
        //...
    }

    return config
};
