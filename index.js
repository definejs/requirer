
const File = require('@definejs/file');
const Patterns = require('@definejs/patterns');
const $Array = require('@definejs/array');
const Module = require('./modules/Module');
const Package = require('./modules/Package');

let defaults = {
    patterns: [
        '**/*.js',
        '!**/node_modules/**/*.js',
        '!test.js',
    ],
};

module.exports = exports = {

    parse(dir, patterns) {
        patterns = patterns || defaults.patterns;

        let files = Patterns.getFiles(dir, patterns);
        let file$ids = {};
        let id$files = {};
        let ids = new Set();

        files.forEach((file) => {
            let content = File.read(file);
            let list = Module.parse(content);

           

            list.forEach((item) => {
                let { id, } = item;

                ids.add(id);
                $Array.add(file$ids, file, id);
                $Array.add(id$files, id, file);
            });
        });


        ids = [...ids].sort();

        let {
            dependencies,
            needAdds,
            needDeletes,
        } = Package.read(dir, ids);


        return {
            ids,
            file$ids,
            id$files,
            dependencies,
            needAdds,
            needDeletes,
        };

    },

  

};








