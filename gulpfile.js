

// var gulp = require('gulp');
// gulp.task('default', ['connect', 'watch']);

// let gulp = require('gulp'),
//     childProcess = require('child_process'),
//     electron = require('electron-prebuilt'),
//     kill = require('tree-kill'),
//     index,
//     urls;

// // 创建 gulp 任务
// gulp.task('default', function () {
//     index = childProcess.spawn(electron, ['--debug=5858', '.'], { stdio: 'inherit' });
//     console.log(index);
//     urls.
// });

// // 监听
// gulp.task('watch', function () {
//     gulp.watch(['./src/main'], ['restart:browser']);
//     gulp.watch(['./src/renderer'], ['reload:renderer']);

// });

// gulp.task('restart:browser', function (done) {
//     kill(index.pid, 'SIGTERM');
//     index = childProcess.spawn(electron, ['--debug=5858', '.'], { stdio: 'inherit' });
//     done();
// });

// gulp.task('reload:renderer', function (done) {

//     done();
// });

// let webSocket = require('ws');

// let unit = (function () {
//     var self = function () { };

//     self.sendMessage = function (socket, type, data) {
//         if (!type || !socket || socket.readyState !== webSocket.OPEN) return;
//         var obj = { type: type };
//         if (data) obj.data = data;
//         socket.send(JSON.stringify(obj));
//     }
//     self.getIdFromUrl = function (url) {
//         var matched = url.match(/\?window_id=([^&])/);
//         return matched && matched[1];
//     }
// })();



var gulp = require('gulp');
var electron = require('electron-connect').server.create({
    stopOnClose: true,
    // logLevel: 2
});

var callback = function (electronProcState) {
    console.log('electron process state: ' + electronProcState);
    if (electronProcState == 'stopped') {
        process.exit();
    }
};

gulp.task('server', function () {

    // Start browser process
    electron.start(callback);

    // Restart browser process
    //gulp.watch(['./src/main/*'], electron.restart);
    gulp.watch(['./src/main/*'], ['restart:browser']);

    // Reload renderer process
    //gulp.watch(['./src/main/index.js', './src/main/index.html'], electron.reload);
    gulp.watch(['./src/main/index.js', './src/main/index.html'], ['reload:renderer']);

    // setTimeout(() => {
    //     process.exit();
    // }, 1000*2);
});

gulp.task('restart:browser', function (done) {
    electron.restart(callback);
    done();
});

gulp.task('reload:renderer', function (done) {
    // Reload renderer process
    electron.reload(callback);
    setTimeout(function () {
        done();
    });
});

gulp.task('default', ['server']);
