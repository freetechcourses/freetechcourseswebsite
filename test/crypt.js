const bcrypt = require('bcrypt');

bcrypt.hash('admin',10).then(res => { console.log(res); });
