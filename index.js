'use strict';

const
    exec = require('child_process').exec,
    fs = require('fs'),
    tempfile = require('tempfile');

function mkdir() {

    const
        dirs = [...arguments].reduce(
            (accumulated, elem) => {
                return elem ? accumulated + `'${elem}' ` : accumulated;
            },
            ''
        ).trimRight();

    if (!dirs) {
        return Promise.resolve();
    }

    return new Promise((resolve) => {
        exec('mkdir -p ' + dirs, (err) => {
            if (err) {
                throw err;
            }
            resolve();
        });
    });
}

function symlink(target, destPath, type) {

    return new Promise((resolve) => {

        const tempPath = tempfile();

        fs.symlink(target, tempPath, type, (err) => {

            if (err) {
                throw err;
            }

            fs.rename(tempPath, destPath, (err) => {

                if (err) {
                    throw err;
                }

                resolve();
            });
        });
    });
}

function writeFile(destPath, data, options) {

    return new Promise((resolve) => {

        const tempPath = tempfile();

        fs.writeFile(tempPath, data, options, (err) => {

            if (err) {
                throw err;
            }

            fs.rename(tempPath, destPath, (err) => {

                if (err) {
                    throw err;
                }

                resolve();
            });
        });
    });
}

module.exports = {
    mkdir,
    symlink,
    writeFile
};
