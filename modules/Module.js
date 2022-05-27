
const Fn = require('@definejs/fn');
const Lines = require('@definejs/lines');

function getId(item) {
    let code = `
        function require(id) {
            return id;
        }

        let id = ${item};
        return id;
    `;

    let id = Fn.exec(code);

    return id;
}

module.exports = {

    parse(content) {
        let regexp = /\s+require\s*\(\s*["']\S+["']\)?/g;
        let list = content.match(regexp);
        if (!list) {
            return [];
        }

        let lines = Lines.split(content);
        let startNo = 0;    //下次搜索的起始行号

        lines = lines.filter((line) => {
            line = line.trimLeft();

            if (line.startsWith('//') ||
                line.startsWith('/*') ||
                line.startsWith('*')) {
                return false;
            }

            return true;
        });


        list = list.map((item, index) => {
            item = item.split('\n\r').join('');
            item = item.split('\n').join('');
            item = item.split('\r').join('');

            let no = Lines.getIndex(lines, item, startNo);  //行号。

            //没有找到该行，可能是给注释掉了。
            if (no < 0) {
                return null;
            }

            let line = lines[no];                           //整一行的 html。


            startNo = no + 1;



            if (line.trim().startsWith('//')) {
                console.log(`${no + 1}`.bgCyan, line.green);
                return null;
            }


            let id = getId(item);

            return {
                'id': id,
                'no': no,
                'match': item,
                'line': line,
            };

        });


        list = list.filter((item) => {
            return !!item;
        })

        return list;
    },

};