# fs-atomic

> Safer filesystem operations.

## Why?

 - Protects you from race conditions.
 - Protects you from making some security mistakes.
 - Automatically creates nested directories as needed.
 - Always overwrites, avoiding `EEXIST` errors.

## Install

```sh
npm install fs-atomic --save
```

## Usage

Get it into your program.
```javascript
const fsAtomic = require('fs-atomic');
```

Create nested directories.
```javascript
fsAtomic.mkdir('nonexisting/thing', 'another/one').then(() => {
    console.log('Directories created.');
});
```

Create a symlink.
```javascript
fsAtomic.symlink('mytarget', '/my/dest').then(() => {
    console.log('Symlinking complete.');
});
```

Write a file.
```javascript
fsAtomic.writeFile('myfile', 'some data').then(() => {
    console.log('Write complete.');
});
```

## Contributing
See our [contributing guidelines](https://github.com/sholladay/fs-atomic/blob/master/CONTRIBUTING.md "The guidelines for being involved in this project.") for more details.

1. [Fork it](https://github.com/sholladay/fs-atomic/fork).
2. Make a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sholladay/fs-atomic/compare "Submit code to this repo now for review.").

## License
[MPL-2.0](https://github.com/sholladay/fs-atomic/blob/master/LICENSE "The license for fs-atomic.")

Go make something, dang it.
