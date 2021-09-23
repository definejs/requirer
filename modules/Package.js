
const File = require('@definejs/file');


module.exports = {
    read(dir, usedIds) {
        let file = `${dir}/package.json`;
        let pkg = File.exists(file) ? File.readJSON(file) : {};

        let dependencies = pkg.dependencies || {};
        let ids = Object.keys(dependencies);

        let needAdds = usedIds.filter((id) => {
            if (id.startsWith('./') || id.startsWith('../')) {
                return false;
            }

            return !dependencies[id];
        });

        let needDeletes = ids.filter((id) => {
            return !usedIds.includes(id);
        });

        return { dependencies, needAdds, needDeletes, };
    }
};