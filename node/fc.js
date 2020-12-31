var line = 0;
var txt = '';

var fs = require('fs'),
    fileList = ['./summary.html', './rhino.html', './legacyAPI.html', './full.html', './deepening.html', './API2.html', './appendix.html']
fileList.forEach((e) => {
    fs.readFile(e, function (err, data) {
        if (err) throw err;
        data = data.toString().split('\n');
        data.splice(line, 0, txt);
        data = data.join('\n');
        fs.writeFile(e, data, function (err) { err || console.log('Data replaced \n', data); });
    });
});