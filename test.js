const File = require('@definejs/file');
const Requirer = require('./index.js');

// let dir = './';
// let dir = `/Users/micty/Studio/@definejs/browser/app/`;
// let dir = `/Users/micty/Studio/@definejs/browser/local-storage/`;
// let dir = `/Users/micty/Studio/@definejs/browser/local-storage`;
// let dir = `/Users/micty/Studio/@definejs/browser/api`;
let dir = `/Users/micty/Studio/@definejs/mobile/iscroll`;

let info = Requirer.parse(dir, [
    '**/*.js',
    '!**/node_modules/**/*.js',
    '!test.js',
    '!data/**/*.js',
]);

console.log(info);

// File.writeJSON('output/info.json', info);