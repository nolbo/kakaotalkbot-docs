var fs = require('fs'),
fileList = ['/index.html', '/summary.html', '/rhino.html', '/legacyAPI.html', '/full.html', '/deepening.html', '/API2.html', '/appendix.html'];
fileList.forEach((e)=>{
fs.readFile(e, function(err, data) { if(err) throw err;
 data = data.toString().split('\n');
 data[13] = '<meta property="og:image" content="img/grp/default.jpg">';
data=data.join('\n');
 fs.writeFile(e, data, function(err) { err || console.log('Data replaced \n', data); }); });
});
