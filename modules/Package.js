
const File = require('@definejs/file');


module.exports = {
    read(dir, usedIds) {
        let file = `${dir}/package.json`;
        let pkg = File.exists(file) ? File.readJSON(file) : {};

        let dependencies = pkg.dependencies || {};
        let ids = Object.keys(dependencies);

        let needAdds = usedIds.filter((id) => {
            return !id.startsWith('./') && !dependencies[id];
        });

        let needDeletes = ids.filter((id) => {
            return !usedIds.includes(id);
        });

        return { dependencies, needAdds, needDeletes, };
    }
};