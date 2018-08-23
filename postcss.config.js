
module.exports = {
    map: true,
    plugins: {
        'postcss-import': {},
        'postcss-preset-env': {
            stage: 0,
        },
    }
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins['cssnano'] = {};
    module.exports.map = false;
}
