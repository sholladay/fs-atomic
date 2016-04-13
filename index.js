'use strict';

const
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

module.exports = {
    symlink
};
