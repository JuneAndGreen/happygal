const fs = require('fs');
const path = require('path');

module.exports = {
    /**
     * 补全路径
     */
    formatPath(filePath) {
        if (filePath.indexOf('/') === -1 && filePath.indexOf('\\') === -1) {
            return `./${filePath}`;
        } else {
            return filePath;
        }
    },

    /**
     * 是否是绝对路径
     */
    isAbsolute(filePath) {
        return filePath.indexOf('.') !== 0; 
    },

    /**
     * 扔出异常并结束进程
     */
    error(msg) {
        console.error(msg);
        process.exit(1);
    },

    /**
     * 递归创建目录
     */
    mkdir(dir) {
        try {
            fs.accessSync(dir);
        } catch (err) {
            this.mkdir(path.dirname(dir)); // 递归上一层目录
            fs.mkdirSync(dir);
        }
    }
};
