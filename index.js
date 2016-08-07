'use strict';

const { exec } = require('child_process');
const fs = require('fs');
const tempfile = require('tempfile');

const mkdir = (...args) => {
    const dirs = args.reduce(
        (accumulated, dir) => {
            return dir ? accumulated + `'${dir}' ` : accumulated;
        },
        ''
    ).trimRight();

    if (!dirs) {
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        exec('mkdir -p ' + dirs, (err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve();
        });
    });
};

const symlink = (target, destPath, type) => {
    return new Promise((resolve, reject) => {
        const tempPath = tempfile();

        fs.symlink(target, tempPath, type, (err) => {
            if (err) {
                reject(err);
                return;
            }

            fs.rename(tempPath, destPath, (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            });
        });
    });
};

const writeFile = (destPath, ...writeArgs) => {
    return new Promise((resolve, reject) => {
        const tempPath = tempfile();

        fs.writeFile(tempPath, ...writeArgs, (err) => {
            if (err) {
                reject(err);
                return;
            }

            fs.rename(tempPath, destPath, (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            });
        });
    });
};

module.exports = {
    mkdir,
    symlink,
    writeFile
};
