const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 272, 
        height: 270,
        resizable: false,
    });

    mainWindow.loadURL('file://' + __dirname + '/page.html'); // 加载窗口页面
    mainWindow.webContents.openDevTools(); // 打开调试器

    // 监听窗口关闭事件
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    // 当所有窗口都被关闭时，在OS X系统中窗口通常会留在菜单栏直到用户按下 Cmd + Q
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    // 在OS X系统中当其他窗口都关闭时点击图标会重新创建一个窗口
    if (mainWindow === null) createWindow();
});
