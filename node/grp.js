var fs = require('fs'),
    fileList = ['./index.html', './summary.html', './rhino.html', './legacyAPI.html', './full.html', './deepening.html', './API2.html', './appendix.html'],
    path = 'img/grp/default.jpg',
    date = ((new Date()).getMonth() + 1) + '/' + (new Date()).getDate();
if (date == '12/25') {
    path = 'img/grp/christmas.jpg';
} else if ([].includes(date)) {
    path = 'img/grp/grp_holid.jpg';
} else if ([].includes(date)) {
    path = 'img/grp/grp_ko.jpg';
}
fileList.forEach((e) => {
    fs.readFile(e, function (err, data) {
        if (err) throw err;
        data = data.toString().split('\n');
        data[13] = '    <meta property="og:image" content="' + path + '">';
        data = data.join('\n');
        fs.writeFile(e, data, function (err) { err || console.log('Data replaced \n', data); });
    });
});
