const gm = require('gm')

gm('./coding.jpg')
.resize(20)
.write('r.jpg', function (err) {
  err && console.log(err)
});