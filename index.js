'use strict';

const
    exec = require('child_process').exec,
    fs = require('fs'),
    tempfile = require('tempfile');

function symlink(target, path, type) {

    return new Promise((resolve) => {

        const tempPath = tempfile();

        fs.symlink(target, tempPath, type, (err) => {

            if (err) {
                throw err;
            }

            fs.rename(tempPath, path, (err) => {

                if (err) {
                    throw err;
                }

                resolve();
            });
        });
    });
}

function mkdir() {

    const dirs = [...arguments].reduce(
        (accumulated, elem) => {
            if (!elem) {
                return accumulated;
            }
            return accumulated + `'${elem}' `;
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

module.exports = {
    symlink,
    mkdir
};
