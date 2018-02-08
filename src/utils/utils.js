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
    mkDir(dir) {
        try {
            fs.accessSync(dir);
        } catch (err) {
            this.mkDir(path.dirname(dir)); // 递归上一层目录
            fs.mkdirSync(dir);
        }
    },

    /**
     * 清空目录
     */
    emptyDir(dir) {
        fs.readdirSync(dir).forEach(file => {
            let filePath = path.join(dir, file);
            let lstat = fs.lstatSync(filePath);

            if (lstat.isDirectory()) {
                // 目录
                this.emptyDir(filePath);

                fs.rmdirSync(filePath);
            } else {
                fs.unlinkSync(filePath);
            }
        });
    },

    /**
     * 删除目录
     */
    rmDir(dir) {
        try {
            fs.accessSync(dir);
            this.emptyDir(dir);
            fs.rmdirSync(dir);
        } catch (err) {
            // ignore
        }
    },

    /**
     * 拷贝文件
     */
    copyFile(file, dir, dist) {
        let filePath = path.join(dir, file);

        try {
            fs.accessSync(filePath);
            fs.writeFileSync(path.join(dist, file), fs.readFileSync(filePath));
        } catch (err) {
            // ignore
        }
    },
};
