
const webpack_es6 = require('./webpack.config.js');

let webpack_es6_min = Object.assign({}, webpack_es6, {
    output: { filename: "index.min.js" },
    optimization: {
        minimize: true
    }
})


let webpack_es5 = Object.assign({}, webpack_es6, {
    entry: __dirname + "/out-es5/index.js",
    output: { filename: "index.es5.js" }
})

let webpack_es5_min = Object.assign({}, webpack_es6, {
    entry: __dirname + "/out-es5/index.js",
    output: { filename: "index.es5.min.js" },
    optimization: {
        minimize: true, 
    }
})

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    var config = {
        babel: {
            options: {
                sourceMap: true,
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            "chrome": "58",
                            "ie": "11"
                        }
                    }]
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'out',
                    src: ['**/*.js'],
                    dest: 'out-es5/'
                }]
            }
        },
        shell: {
            src: {
                command: 'tsc -p src',
                options: {
                    failOnError: false
                }
            }
        },
        webpack: {
            es6: webpack_es6,
            es6_min: webpack_es6_min,
            es5: webpack_es5,
            es5_min: webpack_es5_min,
        }
    }

    grunt.initConfig(config);

    grunt.registerTask('build', ['shell', 'babel', 'webpack']);
};